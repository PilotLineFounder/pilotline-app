# Pilotline Product Gap Analysis & Development Roadmap

**As of:** 2026-04-13  
**Role:** Technical Product Owner / Software Development Lead  
**Product Goal:** Give design-build teams a fast, traceable loop across design → prototype → test. Teams must be able to create design trees, assign parts and BOMs, build process plans with work instructions and material callouts, connect to measurement/test methods, and retain full traceability of revisions, instructions, and material throughout.

**References:**
- `PilotLineFounder/pilotline` (Vue 3 + Laravel, commit `30139f0e`) — the product being evaluated
- `PilotLineFounder/buildwise-capture` (React + Supabase, commit `9caadfada`) — working prototype
- Industry benchmarks: PTC Windchill PDMLink + Windchill Navigate, PTC FlexPLM, Dassault ENOVIA + DELMIA, Arena PLM, Propel PLM

---

## Current State Summary

Pilotline has a solid foundation:

| Capability | Status |
|---|---|
| Design tree (`design_tree_link`) | Implemented |
| BOM hierarchy (tree display, editable rows) | Implemented |
| Part library + manufacturer parts (AVL) | Implemented |
| Part design revisions (`draft`/`released`) | Partial |
| Artifact upload/storage | Implemented |
| RLS multi-tenancy | Implemented |
| CDC audit triggers | Implemented |
| Review/sign-off workflow | **Missing** |
| Flat BOM rollup | **Missing** |
| Build process plans / work instructions | **Missing** |
| Test methods / measurement linkage | **Missing** |
| Prototype build records | **Missing** |
| Specification-to-test traceability | **Missing** |
| Change management (ECR/ECO) | **Missing** |
| Notifications | **Missing** |

---

## Prioritized Gap List

Priority tiers:
- **P0 — Blocks the core loop.** The product doesn't deliver its stated value without these.
- **P1 — Makes the loop trustworthy.** Users will work around these but lose confidence in the data.
- **P2 — Makes the loop compliant and scalable.** Required for regulated industries and team growth.
- **P3 — Enterprise differentiation.** Valuable at scale; defer until P0–P2 are solid.

---

### P0 — Blocks the Core Design→Prototype→Test Loop

---

#### P0-1: Revision Lifecycle — Expand `revision_status` to Full State Machine

**What's missing:** Pilotline has only `draft` / `released`. Buildwise has 5 states: `draft → in_review → locked → released → obsolete`. Without `in_review` and `locked`, there is no enforceable gate before release, and parts can be edited while nominally under review.

**Why it matters:** In PTC Windchill, a part revision moves through a lifecycle that prevents modification once it's been submitted for review. Dassault ENOVIA calls this "maturity states." Without it, a build team cannot trust that what they're building to is frozen.

**Recommended fix:**

1. Migrate `part_design_revision.revision_status` column to add states: `draft`, `in_review`, `locked`, `released`, `obsolete`
2. Add `locked_at TIMESTAMPTZ`, `released_at TIMESTAMPTZ`, `change_summary TEXT` columns to `part_design_revision`
3. Add Laravel model transitions (`PartDesignRevision.php`) with guard logic — a `released` revision cannot be edited; you must create a new revision
4. Update `PartDesignController` to enforce state transitions via a state machine (use a package like `asantibanez/laravel-eloquent-state-machines` or implement manually)
5. Update `ArtifactRevision.vue` and `designStore.ts` to reflect state badges and transition buttons

**Liquibase migration:** `L0000_000_21__part_design_revision_lifecycle.sql`

---

#### P0-2: Review / Sign-Off Workflow

**What's missing:** Zero implementation. Buildwise has the `artifact_review` table with full submit → approve/reject → release flow, mandatory comments, and reviewer assignment. Pilotline has no equivalent.

**Why it matters:** Without a sign-off gate, "released" means nothing. In any PLM (Windchill, ENOVIA, Arena), the release process is a first-class workflow — someone submits, a designated reviewer approves or rejects with a comment, and only then does the revision advance. This is mandatory for ISO 13485, AS9100D, and FDA 21 CFR Part 820.

**Recommended fix:**

1. New table: `part_design_review` (`id`, `part_design_revision_id`, `reviewer_user_id`, `status ENUM(submitted, approved, rejected, released, unlocked)`, `comment TEXT NOT NULL`, `created_at`, `updated_at`)
2. New table: `company_notification` (`id`, `company_id`, `user_id`, `entity_type`, `entity_id`, `message`, `read_at`, `created_at`)
3. New Laravel controller: `PartDesignReviewController` — methods: `submit`, `approve`, `reject`, `release`
4. New API routes in `api.php`: `POST /part-design-revisions/{id}/submit`, `/approve`, `/reject`, `/release`
5. New Vue components: `ReviewPanel.vue` (shows current review state + history), `SubmitForReviewDialog.vue`
6. Release gating logic: a revision can only move to `released` if at least one review with `approved` status exists and the revision is in `locked` state
7. Notification dispatch on each transition

**Liquibase migrations:**
- `L0000_000_22__part_design_review.sql`
- `L0000_000_23__company_notification.sql`

---

#### P0-3: Flat BOM Computation (Recursive Rollup)

**What's missing:** Pilotline has a BOM hierarchy tree display but no confirmed flat BOM rollup. Buildwise's `computeFlatBom()` in `useDesignTreeBom.ts` recursively traverses `design_tree_link`, rolls up quantities, propagates DNP flags, and guards against cycles. This is how you answer "what do I need to buy to build one of this assembly?"

**Why it matters:** Without a flat BOM, procurement can't run material requirements. A build team can't pull a pick list. This is a table-stakes PLM feature.

**Recommended fix:**

1. Implement server-side in `DesignTreeLinkController.php` as a `GET /design-tree-links/{rootRevisionId}/flat-bom` endpoint
2. Use a recursive PostgreSQL CTE (`WITH RECURSIVE`) for performance — do not do this in PHP loops:
   ```sql
   WITH RECURSIVE bom_tree AS (
     SELECT dtl.*, 1 AS depth, dtl.quantity AS rolled_qty, ARRAY[dtl.id] AS path
     FROM design_tree_link dtl
     WHERE dtl.parent_design_tree_link_id IS NULL
       AND dtl.part_design_revision_id = :rootId
     UNION ALL
     SELECT dtl.*, bt.depth + 1,
            bt.rolled_qty * dtl.quantity,
            bt.path || dtl.id
     FROM design_tree_link dtl
     JOIN bom_tree bt ON dtl.parent_design_tree_link_id = bt.id
     WHERE NOT dtl.id = ANY(bt.path) -- cycle guard
   )
   SELECT * FROM bom_tree WHERE is_dnp = FALSE;
   ```
3. Response: flat list of `{ part_number, description, total_qty, unit, manufacturer_part, is_dnp }`
4. Frontend: `FlatBomView.vue` tab inside `BOMManager.vue`, with CSV/Excel export
5. Include DNP rollup (DNP on a parent propagates to all children)

---

#### P0-4: Build Process Plan (Router / Work Instructions)

**What's missing entirely.** This is the largest gap relative to the product's stated goal. In PTC Windchill Manufacturing Process Planner, Dassault DELMIA, or even SAP PP/Opcenter, a "process plan" is the manufacturing analog to the design BOM: it defines the ordered sequence of operations required to build an assembly, what materials are consumed at each step, what tooling is needed, and what the work instructions are.

Pilotline has no schema, no model, no controller, no UI for any of this.

**Why it matters:** The user's stated product goal explicitly includes "create build process plans that call for the material, process input data, and provide work instructions." Without this, pilotline is a PLM-lite with no MES capability.

**Recommended schema design:**

```
process_plan
  id, part_design_revision_id, plan_status (draft/released), version, created_by, created_at

process_step  (analogous to a router operation in PTC)
  id, process_plan_id, step_number INT, name, description,
  estimated_duration_minutes, workstation_type,
  created_at, updated_at

process_step_material  (BOM callout per step)
  id, process_step_id, design_tree_link_id, quantity_required,
  unit_of_measure, notes

process_step_instruction  (work instruction block)
  id, process_step_id, sequence INT, instruction_type ENUM(text, image, video, file),
  content TEXT, file_ref_id, created_at

process_step_measurement  (links to test/measurement methods — see P0-5)
  id, process_step_id, measurement_method_id, is_required, acceptance_criteria
```

**Recommended fix:**

1. Liquibase migrations for all tables above (`L0000_000_24__process_plan.sql`)
2. Laravel models + controllers: `ProcessPlan`, `ProcessStep`, `ProcessStepMaterial`, `ProcessStepInstruction`
3. API routes: full CRUD on `process-plans`, `process-steps`, `process-steps/{id}/materials`, `process-steps/{id}/instructions`
4. Vue component: `ProcessPlanEditor.vue` — drag-and-drop step ordering, inline work instruction authoring, material callout via BOM picker
5. Link `process_plan` to `part_design_revision_id` so a plan is always revision-specific (same as how Windchill links a process plan to a specific part revision)

---

#### P0-5: Measurement Methods & Test Method Registry

**What's missing:** No test method schema, no measurement method registry, no linkage from specifications to test methods, no linkage from process steps to required inspections.

**Why it matters:** The user explicitly wants to "connect to measurement methods and test methods once built." In Dassault ENOVIA + SIMULIA, and in PTC Windchill Quality, a measurement method (also called verification method) is a reusable definition: "measure dimension X using caliper Y to tolerance Z." It is linked to a specification as the means of verification.

**Recommended schema:**

```
measurement_method
  id, company_id, name, description,
  method_type ENUM(dimensional, functional, visual, electrical, environmental, destructive),
  procedure_ref TEXT, equipment_required TEXT,
  acceptance_criteria TEXT, created_by, created_at

specification  (extend existing AddSpecificationDialog work)
  id, part_design_revision_id, name,
  spec_type ENUM(variable, attribute),
  nominal_value DECIMAL, tolerance_upper, tolerance_lower, unit,
  risk_level ENUM(critical, major, minor),
  measurement_method_id FK,
  created_at
```

**Recommended fix:**

1. Liquibase migrations: `L0000_000_25__measurement_method.sql`, `L0000_000_26__specification.sql`
2. `MeasurementMethod` Laravel model + CRUD controller
3. `Specification` model linked to `part_design_revision` and optionally to a `measurement_method`
4. Extend `AddSpecificationDialog.vue` to persist to DB (currently likely in-memory based on Vue component naming pattern)
5. `MeasurementMethodLibrary.vue` — company-wide library, reusable across revisions

---

### P1 — Makes the Loop Trustworthy

---

#### P1-1: Prototype Build Record (Device History Record)

**What's missing:** No way to record "we built unit serial #001 on 2026-03-15 to revision B of part X, using lot 4521 of component Y, and it deviated from the BOM in the following way."

**Why it matters:** This is the DHR (Device History Record) in FDA 21 CFR 820, the traveler in aerospace. Even without regulatory intent, any team building prototypes needs to know *exactly what went into each build* to debug failures. "Which revision was this built to?" is a question that should be answerable in one click.

**Recommended schema:**

```
build_order
  id, company_id, part_design_revision_id, process_plan_id,
  build_quantity INT, serial_prefix,
  status ENUM(planned, in_progress, complete, cancelled),
  planned_start, actual_start, actual_complete, created_by

build_record  (one per unit or lot)
  id, build_order_id, serial_number, lot_number,
  status ENUM(in_progress, passed, failed, scrapped),
  notes, completed_by, completed_at

build_record_material_consumption
  id, build_record_id, process_step_material_id,
  lot_number_used, quantity_consumed, supplier_lot_ref

build_record_step_result
  id, build_record_id, process_step_id,
  status ENUM(complete, skipped, failed),
  operator_id, completed_at, notes

build_record_measurement_result
  id, build_record_step_result_id, measurement_method_id,
  actual_value DECIMAL, pass_fail ENUM(pass, fail, conditional),
  operator_id, measured_at, notes
```

**Recommended fix:** Liquibase migration `L0000_000_27__build_record.sql`, full Laravel controller + Vue `BuildOrderForm.vue` + `BuildRecordView.vue`.

---

#### P1-2: Specifications — Persist to Database

**What's missing:** `AddSpecificationDialog.vue` exists but specifications appear to be managed in Vue state (not persisted). The `specification` table does not appear in confirmed Liquibase migrations.

**Why it matters:** If specs are lost on page refresh, the design loop has no durable requirements baseline. Specs are the input to verification — you can't close a design loop without them persisted.

**Recommended fix:** Implement `L0000_000_26__specification.sql` (from P0-5) and wire `AddSpecificationDialog.vue` to `POST /specifications`. Add `SpecificationsPanel.vue` to the part design revision detail view.

---

#### P1-3: Where-Used / Impact Analysis

**What's missing:** No ability to ask "which assemblies use this part revision?" In PTC Windchill this is called "Where Used" and is one of the most-used queries in any PLM.

**Why it matters:** When you release a new revision of a purchased component, you need to know every assembly in the design tree that references the old revision. Without this, teams manually hunt for impacts.

**Recommended fix:**

1. New endpoint in `DesignTreeLinkController`: `GET /parts/{id}/where-used` — query `design_tree_link` for all rows where `child_part_design_revision_id` resolves to this part, return parent assembly tree
2. Vue component: `WhereUsedPanel.vue` — shown in part detail sidebar
3. No schema change required — data is already in `design_tree_link`

---

#### P1-4: BOM Comparison (Revision Diff)

**What's missing:** No ability to compare the flat BOM of revision A vs. revision B of an assembly. In Arena PLM and Windchill, BOM redlines are a first-class feature.

**Why it matters:** When a design revision is submitted for review, the reviewer's first question is "what changed?" Without a diff view, reviewers must manually compare two BOMs.

**Recommended fix:**

1. Endpoint: `GET /part-design-revisions/{idA}/bom-diff/{idB}` — compute two flat BOMs and return added/removed/changed lines
2. Vue component: `BomDiffView.vue` — red/green highlighting of changes, part of the review panel
3. No schema change required

---

#### P1-5: Notifications System

**What's missing:** Pilotline has no confirmed notification system. Buildwise has `company_notifications` table. Without notifications, a reviewer doesn't know when a revision is submitted; a designer doesn't know when their submission is rejected.

**Why it matters:** Workflow without notifications degrades to email chains. The sign-off workflow (P0-2) is not useful without notifications.

**Recommended fix:** Implement `L0000_000_23__company_notification.sql` from P0-2 above. Laravel event/listener pattern: fire a `RevisionSubmittedForReview` event, listener creates a `company_notification` row and optionally sends email. Vue `NotificationBell.vue` component in the top nav, polling or WebSocket (Laravel Echo + Pusher/Soketi).

---

### P2 — Compliance and Scale

---

#### P2-1: Engineering Change Order (ECO) Workflow

**What's missing:** No formal change request → change order → implementation → verification loop.

**Why it matters:** In PTC Windchill Change Management and Dassault ENOVIA Change Action, an ECO is the formal record of *why* a change was made, which parts/documents it affects, who approved it, and when it was implemented. This is mandatory for ISO 9001, AS9100D, and FDA 21 CFR 820.30(i).

**Recommended schema:**

```
change_request  (ECR)
  id, company_id, title, description, priority, status, created_by, created_at

change_order  (ECO)
  id, change_request_id, title, description, status ENUM(draft/in_review/approved/implemented),
  affected_revisions JSONB, approved_by, approved_at

change_order_action
  id, change_order_id, part_design_revision_id, action_type ENUM(revise/obsolete/create),
  new_revision_id, notes
```

---

#### P2-2: Effectivity and Configuration Baseline

**What's missing:** No concept of "as-designed" configuration baselines. In Windchill, a Configuration Baseline (or Product Baseline) captures the exact revision of every part in an assembly at a point in time.

**Recommended fix:** New table `design_baseline` (`id`, `part_design_revision_id` [root], `name`, `frozen_at`, `baseline_links JSONB` snapshot of `design_tree_link` at freeze time). A build order always references a specific baseline.

---

#### P2-3: Non-Conformance Records (NCR)

**What's missing:** No disposition workflow for out-of-spec results captured in build records.

**Recommended schema:**

```
nonconformance_record
  id, build_record_id OR measurement_result_id, description,
  disposition ENUM(rework/scrap/use_as_is/return_to_supplier),
  disposition_justification, approved_by, created_at
```

---

#### P2-4: Document / Drawing Management

**What's missing:** While artifact upload exists, there is no version-controlled drawing management with a title block, drawing number, revision letter on the face, and controlled release. In Dassault ENOVIA, SOLIDWORKS PDM, and Windchill, a "document" is a first-class object separate from a 3D model.

**Recommended fix:** Extend `part_design_artifact` with `document_type ENUM(drawing, specification_sheet, test_report, work_instruction, SOP, other)`, `drawing_number`, `revision_letter`, and enforce that a `released` part design revision must have at least one released drawing.

---

### P3 — Enterprise Differentiation

These are important but can wait until P0–P2 are solid:

| Feature | Description | Analogous to |
|---|---|---|
| **Digital Twin linkage** | Attach simulation results (FEA, CFD) to a part revision | PTC Creo Simulation / ANSYS integration |
| **Supplier portal** | Invite external suppliers to view drawings and submit CAI data | Arena PLM supplier collaboration |
| **MBOM vs. EBOM** | Distinguish engineering BOM from manufacturing BOM (structure diverges during process planning) | Dassault ENOVIA EBOM/MBOM sync |
| **CAD integration** | Sync design tree from Onshape/SOLIDWORKS PDM via API | Year 1 pilotline roadmap item |
| **Regulatory submission package** | Auto-generate a DHF/DMR package for 510(k) or PMA | Arena QMS, Greenlight Guru |
| **Real-time collaboration** | Multiple users editing a process plan simultaneously | Google Docs-style, requires WebSockets |

---

## Recommended Development Sequence

```
Sprint 1–2:   P0-1 (revision lifecycle)  +  P0-2 (review/sign-off)  +  P1-5 (notifications)
              → You now have a trustworthy release process

Sprint 3:     P0-3 (flat BOM rollup)  +  P1-3 (where-used)  +  P1-4 (BOM diff)
              → BOM is now procurement-ready and change-aware

Sprint 4–5:   P0-4 (process plan + work instructions)  +  P0-5 (measurement methods)
              → Core design→build loop is closed

Sprint 6:     P0-5 (specifications persistence)  +  P1-1 (build record / DHR)
              → Full design→test traceability chain exists

Sprint 7+:    P2-1 (ECO), P2-2 (baselines), P2-3 (NCR), P2-4 (drawing management)
              → Compliance-ready

Beyond:       P3 items driven by customer traction
```

---

## Schema Migration Sequence (Liquibase)

```
L0000_000_21__part_design_revision_lifecycle.sql
L0000_000_22__part_design_review.sql
L0000_000_23__company_notification.sql
L0000_000_24__process_plan.sql
L0000_000_25__measurement_method.sql
L0000_000_26__specification.sql
L0000_000_27__build_record.sql
L0000_000_28__change_order.sql
L0000_000_29__design_baseline.sql
L0000_000_30__nonconformance_record.sql
```

---

## What Buildwise Has That Pilotline Should Adopt

| Pattern | Buildwise location | Recommended pilotline adoption |
|---|---|---|
| `computeFlatBom` recursive rollup with cycle guard | `src/hooks/useDesignTreeBom.ts` | Port to PostgreSQL recursive CTE in `DesignTreeLinkController` |
| `artifact_review` sign-off table structure | `supabase/migrations/` | Implement as `part_design_review` (P0-2 above) |
| `lifecycle_state` 5-state machine | `src/types/bom.ts`, `Design.tsx` | Expand `revision_status` (P0-1 above) |
| `treeLoadedFromDb` + seed data fallback | `Design.tsx` | Add seed/demo data path for new-user onboarding |
| XLSX export from flat BOM | `BomModule.tsx` | Add to `FlatBomView.vue` |
| `company_notifications` table | `src/integrations/supabase/types.ts` | Implement `company_notification` (P1-5) |

## What Pilotline Has That Buildwise Should Adopt

| Pattern | Pilotline location | Why it's better |
|---|---|---|
| CDC triggers for audit | `L0000_000_17__util_enforce_cdc_triggers.sql` | Database-enforced; cannot be bypassed by app bugs |
| Liquibase CI/CD migrations | `database/liquibase/changelog/` | Reproducible, reviewable, orderable migrations |
| `part` → `part_design` → `part_design_revision` 3-tier model | `PartDesign.php`, `PartDesignRevision.php` | Cleaner separation: a part can have multiple design variants (e.g., metric vs. imperial) |
| Dedicated Laravel backend layer | `backend/app/Http/Controllers/` | Business logic not exposed directly to client; safer for multi-tenant data isolation |

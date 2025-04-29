import React, { createContext, useContext, useState, ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalContent {
  title: string;
  content: ReactNode;
}

interface ModalContextType {
  isOpen: boolean;
  modalContent: ModalContent | null;
  openModal: (content: ModalContent) => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContent | null>(null);

  const openModal = (content: ModalContent) => {
    setModalContent(content);
    setIsOpen(true);
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsOpen(false);
    // Re-enable scrolling when modal is closed
    document.body.style.overflow = 'unset';
  };

  return (
    <ModalContext.Provider value={{ isOpen, modalContent, openModal, closeModal }}>
      {children}
      {isOpen && modalContent && (
        <div className="fixed inset-0 z-50 overflow-auto flex justify-center items-center p-4">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeModal}
          ></div>
          <div className="bg-white rounded-lg shadow-xl z-10 max-w-lg w-full max-h-[90vh] overflow-y-auto fade-in">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-semibold text-gray-800">{modalContent.title}</h3>
              <button 
                onClick={closeModal}
                className="p-1 rounded-full hover:bg-gray-200 transition duration-200"
              >
                <X className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            <div className="p-4">
              {modalContent.content}
            </div>
            <div className="p-4 border-t flex justify-end">
              <button 
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 transition duration-200 rounded-md text-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};
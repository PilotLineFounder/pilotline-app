import React from 'react';

interface ChartData {
  size: number;
  labels: string[];
  values: number[];
  colors: string[];
}

interface ChartContainerProps {
  data: ChartData;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({ data }) => {
  // Calculate total for percentage
  const total = data.values.reduce((acc, val) => acc + val, 0);
  
  return (
    <div className="p-4 bg-gray-100 rounded-lg">
      <div className="mb-4">
        <h3 className="text-center font-semibold mb-2">Market Breakdown (${data.size}B)</h3>
        <div className="h-10 w-full flex rounded-md overflow-hidden">
          {data.values.map((value, index) => {
            const percentage = (value / total) * 100;
            return (
              <div 
                key={index}
                style={{ 
                  width: `${percentage}%`,
                  backgroundColor: data.colors[index],
                }}
                className="h-full"
                title={`${data.labels[index]}: ${percentage.toFixed(1)}%`}
              />
            );
          })}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        {data.labels.map((label, index) => (
          <div key={index} className="flex items-center">
            <div
              className="w-4 h-4 mr-2 rounded-sm"
              style={{ backgroundColor: data.colors[index] }}
            ></div>
            <span className="text-sm">{label}: {((data.values[index] / total) * 100).toFixed(1)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};
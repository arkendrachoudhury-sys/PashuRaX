import React from 'react';
import { StatusBadge } from '../components/ui/StatusBadge';

const LabManagement = () => {
  const columns = ['COLLECTED', 'IN_TRANSIT', 'TESTING', 'COMPLETED'];
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Lab Management</h1>
      <div className="grid grid-cols-4 gap-4 overflow-x-auto min-h-[500px]">
        {columns.map(col => (
          <div key={col} className="bg-gray-100 rounded-lg p-4 min-w-[250px]">
            <h3 className="font-semibold mb-4">{col.replace('_', ' ')}</h3>
            {col === 'TESTING' && (
              <div className="bg-white p-3 rounded shadow-sm border border-gray-200">
                <p className="font-medium text-sm">SMP-8902</p>
                <p className="text-xs text-gray-500 mb-2">Blood Serum</p>
                <StatusBadge status={col} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
export default LabManagement;

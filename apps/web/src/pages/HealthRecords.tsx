import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../components/ui/Table';
import { Button } from '../components/ui/Button';

const HealthRecords = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Health Records</h1>
        <Button>Add Record</Button>
      </div>
      <div className="rounded-lg border bg-white shadow-sm p-4 text-gray-500">
        No health records found.
      </div>
    </div>
  );
};
export default HealthRecords;

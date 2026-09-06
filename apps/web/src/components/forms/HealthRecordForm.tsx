import React from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export const HealthRecordForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit({}); }} className="space-y-4">
      <Input label="Animal ID" required />
      <Input type="number" step="0.1" label="Temperature (°C)" required />
      <Input label="Symptoms (comma separated)" required />
      <Input label="Diagnosis" />
      <Input label="Notes" />
      <Button type="submit" className="w-full">Save Record</Button>
    </form>
  );
};

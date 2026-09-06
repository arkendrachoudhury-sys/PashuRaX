import React from 'react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';

export const ReportForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit({}); }} className="space-y-4">
      <Input label="Animal ID" required />
      <Input label="Suspected Disease" required />
      <Select label="Severity" required>
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
        <option value="CRITICAL">Critical</option>
      </Select>
      <Input label="Description" required />
      <Button type="button" variant="outline" className="w-full">Use Current Location</Button>
      <Button type="submit" className="w-full">Submit Report</Button>
    </form>
  );
};

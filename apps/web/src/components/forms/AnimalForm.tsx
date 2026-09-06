import React from 'react';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';

export const AnimalForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit({}); }} className="space-y-4">
      <Input label="Tag Number" required />
      <Select label="Species" required>
        <option value="CATTLE">Cattle</option>
        <option value="BUFFALO">Buffalo</option>
        <option value="GOAT">Goat</option>
        <option value="SHEEP">Sheep</option>
      </Select>
      <Input label="Breed" required />
      <Input type="date" label="Birth Date" required />
      <Select label="Sex" required>
        <option value="M">Male</option>
        <option value="F">Female</option>
      </Select>
      <div className="flex gap-4">
        <Input type="number" step="any" label="Latitude" required />
        <Input type="number" step="any" label="Longitude" required />
      </div>
      <Button type="submit" className="w-full">Save Animal</Button>
    </form>
  );
};

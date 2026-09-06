import React from 'react';
import { Link } from 'react-router-dom';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../components/ui/Table';
import { Button } from '../components/ui/Button';
import { StatusBadge } from '../components/ui/StatusBadge';

const Animals = () => {
  const mockAnimals = [
    { id: '1', tag_number: 'TAG-001', species: 'CATTLE', breed: 'Holstein', owner: 'Ramesh', status: 'HEALTHY' },
    { id: '2', tag_number: 'TAG-002', species: 'GOAT', breed: 'Jamnapari', owner: 'Suresh', status: 'SICK' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Animals</h1>
        <Button>Add Animal</Button>
      </div>
      <div className="rounded-lg border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tag Number</TableHead>
              <TableHead>Species</TableHead>
              <TableHead>Breed</TableHead>
              <TableHead>Owner</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockAnimals.map(animal => (
              <TableRow key={animal.id}>
                <TableCell className="font-medium">{animal.tag_number}</TableCell>
                <TableCell>{animal.species}</TableCell>
                <TableCell>{animal.breed}</TableCell>
                <TableCell>{animal.owner}</TableCell>
                <TableCell><StatusBadge status={animal.status} /></TableCell>
                <TableCell><Link to={`/animals/${animal.id}`}><Button variant="outline" size="sm">View</Button></Link></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
export default Animals;

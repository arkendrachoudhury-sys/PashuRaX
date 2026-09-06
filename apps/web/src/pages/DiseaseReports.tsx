import React from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../components/ui/Table';
import { Button } from '../components/ui/Button';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Badge } from '../components/ui/Badge';

const DiseaseReports = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Disease Reports</h1>
        <Button>Report Disease</Button>
      </div>
      <div className="rounded-lg border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Disease</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>2023-10-15</TableCell>
              <TableCell>Foot and Mouth Disease</TableCell>
              <TableCell><Badge variant="danger">HIGH</Badge></TableCell>
              <TableCell><StatusBadge status="SUSPECTED" /></TableCell>
              <TableCell><Button variant="outline" size="sm">Escalate</Button></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
export default DiseaseReports;

import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { StatusBadge } from '../components/ui/StatusBadge';

const AnimalDetail = () => {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Animal Details: TAG-001</h1>
      <Card>
        <CardHeader><CardTitle>Information</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <div><p className="text-sm text-gray-500">Species</p><p className="font-medium">Cattle</p></div>
          <div><p className="text-sm text-gray-500">Breed</p><p className="font-medium">Holstein</p></div>
          <div><p className="text-sm text-gray-500">Status</p><StatusBadge status="HEALTHY" /></div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Timeline</CardTitle></CardHeader>
        <CardContent>
          <div className="border-l-2 border-gray-200 ml-3 pl-4 space-y-4">
            <div className="relative">
              <span className="absolute -left-6 bg-primary h-4 w-4 rounded-full"></span>
              <p className="font-medium">Vaccination</p>
              <p className="text-sm text-gray-500">FMD Vaccine administered on 2023-10-01</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
export default AnimalDetail;

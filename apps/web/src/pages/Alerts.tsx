import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { BellRing } from 'lucide-react';

const Alerts = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Active Alerts</h1>
      <div className="grid gap-4">
        <Card className="border-danger">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <BellRing className="text-danger h-5 w-5" /> FMD Outbreak Suspected in District A
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600">Multiple cases reported in the last 48 hours. Field officers deployed.</p>
            <p className="text-xs text-gray-400 mt-2">Issued: 2 hours ago</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default Alerts;

import React from 'react';
import { KPICard } from '../components/ui/KPICard';
import { Epicurve } from '../components/charts/Epicurve';
import { SpeciesDonut } from '../components/charts/SpeciesDonut';
import { Users, AlertTriangle, BellRing, Syringe } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPICard title="Total Animals" value="24,592" icon={Users} trend="up" trendValue="+12%" />
        <KPICard title="Active Reports" value="142" icon={AlertTriangle} trend="down" trendValue="-5%" />
        <KPICard title="Active Alerts" value="3" icon={BellRing} trend="up" trendValue="+2" />
        <KPICard title="Vaccination Rate" value="84%" icon={Syringe} trend="up" trendValue="+2%" />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <h3 className="mb-4 text-lg font-medium">Disease Cases</h3>
          <Epicurve data={[
            { date: 'Mon', suspected: 10, confirmed: 5, resolved: 20 },
            { date: 'Tue', suspected: 15, confirmed: 8, resolved: 18 }
          ]} />
        </div>
        <div className="rounded-lg border bg-white p-4 shadow-sm">
          <h3 className="mb-4 text-lg font-medium">Cases by Species</h3>
          <SpeciesDonut data={[
            { name: 'Cattle', value: 400 },
            { name: 'Buffalo', value: 300 },
            { name: 'Goat', value: 200 }
          ]} />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;

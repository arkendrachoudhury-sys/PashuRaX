import React from 'react';
import { VaccinationRadar } from '../components/charts/VaccinationRadar';
import { KPICard } from '../components/ui/KPICard';
import { Syringe } from 'lucide-react';

const Vaccinations = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Vaccinations</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KPICard title="Total Vaccinated" value="18,245" icon={Syringe} />
        <KPICard title="FMD Coverage" value="92%" icon={Syringe} />
        <KPICard title="Due Next 30 Days" value="1,450" icon={Syringe} />
      </div>
      <div className="rounded-lg border bg-white p-4 shadow-sm">
        <h3 className="mb-4 text-lg font-medium">Vaccination Coverage</h3>
        <VaccinationRadar data={{ indicators: [{ name: 'FMD', max: 100 }, { name: 'Brucellosis', max: 100 }, { name: 'Anthrax', max: 100 }, { name: 'Rabies', max: 100 }, { name: 'HS', max: 100 }], values: [92, 75, 88, 60, 85] }} />
      </div>
    </div>
  );
};
export default Vaccinations;

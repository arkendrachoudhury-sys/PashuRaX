import React from 'react';
import { SurveillanceMap as MapComponent } from '../components/maps/SurveillanceMap';

const SurveillanceMapPage = () => {
  return (
    <div className="h-[calc(100vh-8rem)] rounded-lg overflow-hidden border">
      <MapComponent
        reports={[{ id: '1', animal_id: 'A1', date: '2023', suspected_disease: 'FMD', severity: 'HIGH' as any, status: 'SUSPECTED' as any, description: '...', latitude: 20.5937, longitude: 78.9629 }]}
        riskZones={[]}
      />
    </div>
  );
};
export default SurveillanceMapPage;

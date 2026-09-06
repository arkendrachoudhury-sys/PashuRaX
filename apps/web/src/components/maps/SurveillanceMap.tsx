import React, { useState } from 'react';
import Map, { NavigationControl, Marker, Popup, FullscreenControl } from 'react-map-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { DiseaseReport, RiskZone } from '../../types';
import { MapPin } from 'lucide-react';
import maplibregl from 'maplibre-gl';

export const SurveillanceMap = ({ reports, riskZones }: { reports: DiseaseReport[], riskZones: RiskZone[] }) => {
  const [selectedReport, setSelectedReport] = useState<DiseaseReport | null>(null);

  return (
    <Map
      initialViewState={{ longitude: 78.9629, latitude: 20.5937, zoom: 4 }}
      mapStyle="https://api.maptiler.com/maps/basic/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL" // Fallback style if osm not setup as style.json
      style={{ width: '100%', height: '100%' }}
      mapLib={maplibregl}
    >
      <FullscreenControl position="top-right" />
      <NavigationControl position="top-right" />

      {reports.map((report) => (
        <Marker key={report.id} longitude={report.longitude} latitude={report.latitude} anchor="bottom" onClick={e => {
          e.originalEvent.stopPropagation();
          setSelectedReport(report);
        }}>
          <MapPin className="h-6 w-6 text-danger cursor-pointer" />
        </Marker>
      ))}

      {selectedReport && (
        <Popup longitude={selectedReport.longitude} latitude={selectedReport.latitude} onClose={() => setSelectedReport(null)}>
          <div className="p-2">
            <h4 className="font-bold">{selectedReport.suspected_disease}</h4>
            <p className="text-sm">Severity: {selectedReport.severity}</p>
            <p className="text-sm">Status: {selectedReport.status}</p>
          </div>
        </Popup>
      )}
    </Map>
  );
};

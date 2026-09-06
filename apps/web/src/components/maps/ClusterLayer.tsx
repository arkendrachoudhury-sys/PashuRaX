import React from 'react';
import { Source, Layer } from 'react-map-gl';

export const ClusterLayer = ({ clusters }: { clusters: any }) => {
  return (
    <Source id="clusters" type="geojson" data={clusters}>
      <Layer
        id="cluster-polygon"
        type="fill"
        paint={{
          'fill-color': '#f97316',
          'fill-opacity': 0.4,
          'fill-outline-color': '#c2410c'
        }}
      />
    </Source>
  );
};

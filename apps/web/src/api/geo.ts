import { client } from './client';
export const getClusters = (params: any) => client.get('/geo/clusters', { params }).then(res => res.data);
export const getRiskZones = () => client.get('/geo/risk-zones').then(res => res.data);
export const getHeatmapData = (params: any) => client.get('/geo/heatmap', { params }).then(res => res.data);

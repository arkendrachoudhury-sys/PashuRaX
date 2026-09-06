import { client } from './client';
export const getDiseaseReports = (params: any) => client.get('/reports/disease', { params }).then(res => res.data);
export const createDiseaseReport = (data: any) => client.post('/reports/disease', data).then(res => res.data);
export const escalateReport = (id: string) => client.post(`/reports/disease/${id}/escalate`).then(res => res.data);
export const getMortalityReports = (params: any) => client.get('/reports/mortality', { params }).then(res => res.data);
export const createMortalityReport = (data: any) => client.post('/reports/mortality', data).then(res => res.data);

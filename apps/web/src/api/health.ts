import { client } from './client';
export const getHealthRecords = (params: any) => client.get('/health-records', { params }).then(res => res.data);
export const createHealthRecord = (data: any) => client.post('/health-records', data).then(res => res.data);
export const updateHealthRecord = (id: string, data: any) => client.put(`/health-records/${id}`, data).then(res => res.data);

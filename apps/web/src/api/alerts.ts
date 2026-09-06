import { client } from './client';
export const getAlerts = (params: any) => client.get('/alerts', { params }).then(res => res.data);
export const createAlert = (data: any) => client.post('/alerts', data).then(res => res.data);
export const deactivateAlert = (id: string) => client.post(`/alerts/${id}/deactivate`).then(res => res.data);
export const getActiveAlerts = () => client.get('/alerts/active').then(res => res.data);

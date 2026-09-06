import { client } from './client';
export const getDashboardStats = () => client.get('/dashboard/stats').then(res => res.data);
export const getDashboardTrends = (params: any) => client.get('/dashboard/trends', { params }).then(res => res.data);
export const getKPIs = () => client.get('/dashboard/kpis').then(res => res.data);

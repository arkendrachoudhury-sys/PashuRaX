import { client } from './client';
export const getVaccinations = (params: any) => client.get('/vaccinations', { params }).then(res => res.data);
export const createVaccination = (data: any) => client.post('/vaccinations', data).then(res => res.data);
export const getVaccinationCoverage = (params: any) => client.get('/vaccinations/coverage', { params }).then(res => res.data);
export const getDueVaccinations = () => client.get('/vaccinations/due').then(res => res.data);

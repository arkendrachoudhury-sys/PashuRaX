import { client } from './client';
export const getSamples = (params: any) => client.get('/labs/samples', { params }).then(res => res.data);
export const createSample = (data: any) => client.post('/labs/samples', data).then(res => res.data);
export const updateSampleStatus = (id: string, status: string) => client.put(`/labs/samples/${id}/status`, { status }).then(res => res.data);
export const getLabResults = (params: any) => client.get('/labs/results', { params }).then(res => res.data);
export const createLabResult = (data: any) => client.post('/labs/results', data).then(res => res.data);
export const getSamplePipeline = () => client.get('/labs/pipeline').then(res => res.data);

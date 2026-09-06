import { client } from './client';
export const getAnimals = (params: any) => client.get('/animals', { params }).then(res => res.data);
export const getAnimal = (id: string) => client.get(`/animals/${id}`).then(res => res.data);
export const createAnimal = (data: any) => client.post('/animals', data).then(res => res.data);
export const updateAnimal = (id: string, data: any) => client.put(`/animals/${id}`, data).then(res => res.data);
export const deleteAnimal = (id: string) => client.delete(`/animals/${id}`).then(res => res.data);
export const getAnimalTimeline = (id: string) => client.get(`/animals/${id}/timeline`).then(res => res.data);
export const getHerds = (params: any) => client.get('/herds', { params }).then(res => res.data);
export const createHerd = (data: any) => client.post('/herds', data).then(res => res.data);

import { client } from './client';
export const login = (data: any) => client.post('/auth/login', data).then(res => res.data);
export const register = (data: any) => client.post('/auth/register', data).then(res => res.data);
export const refreshToken = () => client.post('/auth/refresh').then(res => res.data);
export const getMe = () => client.get('/auth/me').then(res => res.data);

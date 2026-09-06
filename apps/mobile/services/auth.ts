import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const authService = {
  login: async (email, password) => {
    const res = await api.post('/auth/login', { email, password });
    await AsyncStorage.setItem('token', res.data.token);
    return res.data;
  },
  register: async (data) => {
    const res = await api.post('/auth/register', data);
    await AsyncStorage.setItem('token', res.data.token);
    return res.data;
  },
  logout: async () => {
    await AsyncStorage.removeItem('token');
  },
  getStoredToken: async () => {
    return await AsyncStorage.getItem('token');
  },
  isAuthenticated: async () => {
    const token = await AsyncStorage.getItem('token');
    return !!token;
  }
};

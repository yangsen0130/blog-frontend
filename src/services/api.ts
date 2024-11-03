import axios from 'axios';
import { LoginForm, ApiResponse, User } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const login = async (data: LoginForm): Promise<ApiResponse<User>> => {
  const response = await api.post<ApiResponse<User>>('/user/login', data);
  return response.data;
};

export const logout = async (): Promise<ApiResponse<null>> => {
  const response = await api.post<ApiResponse<null>>('/user/logout');
  return response.data;
};
import axios from 'axios';
import { LoginForm, ApiResponse, User, Blog, BlogListResponse } from '../types';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true
});

export const login = async (data: LoginForm): Promise<ApiResponse<User>> => {
  const response = await api.post<ApiResponse<User>>('/user/login', data);
  return response.data;
};

export const logout = async (): Promise<ApiResponse<null>> => {
  const response = await api.post<ApiResponse<null>>('/user/logout');
  return response.data;
};

export const getBlogs = async (page = 0): Promise<ApiResponse<BlogListResponse>> => {
  const response = await api.get<ApiResponse<BlogListResponse>>(`/blog/list?page=${page}`);
  return response.data;
};

export const getBlog = async (id: number): Promise<ApiResponse<Blog>> => {
  const response = await api.get<ApiResponse<Blog>>(`/blog/${id}`);
  return response.data;
};

export const createBlog = async (formData: FormData): Promise<ApiResponse<Blog>> => {
  const response = await api.post<ApiResponse<Blog>>('/blog/create', formData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const updateBlog = async (id: number, formData: FormData): Promise<ApiResponse<Blog>> => {
  const response = await api.put<ApiResponse<Blog>>(`/blog/${id}`, formData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const deleteBlog = async (id: number): Promise<ApiResponse<null>> => {
  const response = await api.delete<ApiResponse<null>>(`/blogs/${id}`);
  return response.data;
};
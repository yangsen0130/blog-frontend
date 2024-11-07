export interface LoginForm {
  username: string;
  password: string;
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

export interface User {
  id: number;
  username: string;
}

export interface Blog {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  authorId: number;
  author: {
    username: string;
  };
}

export interface BlogListResponse {
  content: Blog[];
  total: number;
}
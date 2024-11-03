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
export interface User {
  isLogin: boolean;
  username: string;
  password: string;
  id: number;
  token: string;
  role: number;
  status: number;
  createTime: number;
  response: {
    loading: boolean;
    login: {
      error: number;
      message: string;
      remember_password: boolean;
    };
    register: {
      error: number;
      message: string;
    };
  };
  language: 'vi' | 'en';
}

export interface LoginData {
  username: string;
  password: string;
  remember_password: boolean;
}

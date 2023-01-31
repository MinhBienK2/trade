export interface User {
  isLogin: boolean;
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
    };
    register: {
      error: number;
      message: string;
    };
  };
  language: 'vi' | 'en';
}

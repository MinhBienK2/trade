import { ErrorResponse } from 'utils/http/response';

export interface UserResponse extends ErrorResponse {
  data: {
    id: number;
    role: number;
    createTime: number;
    status: number;
    token: string;
    username: string;
  };
}
export interface LoginData {
  phoneNumber: string;
  password: string;
}
export interface ProfileResponse extends ErrorResponse {
  data: {
    name: number;
    investorType: string;
    position: string;
  };
}

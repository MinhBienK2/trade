import { ErrorResponse } from 'utils/http/response';

// profile
export interface Profile {
  userId: number;
  role?: number;
  fullname?: string;
  avatar?: string;
  gender?: number;
  date_of_birth?: string;
  shopping_preferences?: number[];
}
export interface ProfileResponse extends ErrorResponse {
  data: {
    userId: number;
    role: number;
    fullname: string;
    gender: number;
    avatar: string;
    date_of_birth: string;
    shopping_preferences: number[];
  };
}
export interface UploadResponse extends ErrorResponse {
  data?: string[];
}
export interface GetFileNameResponse extends ErrorResponse {
  data?: { filename: string };
}

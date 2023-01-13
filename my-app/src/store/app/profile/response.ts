import { ErrorResponse } from 'utils/http/response';
import { Profile } from './types';

export interface ProfileInfoResponse {
  userId: number;
  displayName: string;
  investorType: number;
  position: number;
}
export interface responseProfile extends ErrorResponse {
  data: ProfileInfoResponse;
}

export interface CheckLinkTelegramResponse extends ErrorResponse {
  data: { telegram_info: string };
}

export interface LinkTelegramResponse extends ErrorResponse {
  data: { link: string };
}

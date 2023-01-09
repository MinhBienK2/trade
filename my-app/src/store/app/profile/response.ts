import { ErrorResponse } from 'utils/http/response';
import { Profile } from './types';
export interface responseProfile extends ErrorResponse {
  data: Profile;
}

export interface CheckLinkTelegramResponse extends ErrorResponse {
  data: { telegram_info: string };
}

export interface LinkTelegramResponse extends ErrorResponse {
  data: { link: string };
}

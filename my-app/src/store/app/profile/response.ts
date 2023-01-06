import { ErrorResponse } from 'utils/http/response';
import { Profile } from './types';
export interface responseProfile extends ErrorResponse {
  data: Profile;
}

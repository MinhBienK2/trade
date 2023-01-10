import { InvestedProject } from './types';

export interface ErrorResponse {
  error: number;
  message: string;
}

export interface InvestedProjectResponse extends ErrorResponse {
  data: InvestedProject[];
}

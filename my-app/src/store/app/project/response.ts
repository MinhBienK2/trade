import { ErrorResponse } from 'utils/http/response';
import { InvestedProject, InvestShares } from './types';

export interface SimpleProjectResponse {
  id: number;
  project: string;
  shortName: string;
  price: number;
  supply: number;
  marketCap: number;
  listed: number;
  listedCap: number;
  outstanding: number;
  outstandingCap: number;
  createTime: number;
}

export interface ListProjectResponse extends ErrorResponse {
  data?: SimpleProjectResponse[];
}

export interface InvestedProjectResponse extends ErrorResponse {
  data: InvestedProject[];
}

export interface ProjectDetailResponse extends ErrorResponse {
  data: InvestShares[];
}

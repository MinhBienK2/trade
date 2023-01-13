export interface DataProject {
  projectId: number;
  nameProject: string;
  shortName: string;
  pricePerShare: number;
  supply: number;
  marketCap: number; //Vốn hóa thị trường
  maxTradingShare: number; //Số phiếu Lưu hành tối đa
  maxTradingValue: number; //Giá trị lưu hành tối đa
  currentTradingShare: number; //Số phiếu đang lưu hành
  currentTradingValue: number; //Giá trị đang lưu hành
}
export interface InvestedProject {
  id: number;
  project: string;
  pricePerShare: number;
  quantity: number;
  priceTotal: number;
}

export interface InvestShares {
  id: number;
  project: string;
  type: number; // 0 : balance   1: ESOP
  maxBuyShare: number;
  boughtShare: number;
  canBuyShare: number;
  createTime: number;
}

export interface Project {
  projects: DataProject[];
  investedProject: InvestedProject[];
  investShares: InvestShares[];
  investSharesESOP: InvestShares[];
  response: {
    loading: boolean;
    error: number;
    message: string;
  };
}

export interface DataProject {
  projectId: number;
  nameProject: string;
  pricePerShare: number;
  supply: number;
  marketCap: number; //Vốn hóa thị trường
  maxTradingShare: number; //Số phiếu Lưu hành tối đa
  maxTradingValue: number; //Giá trị lưu hành tối đa
  currentTradingShare: number; //Số phiếu đang lưu hành
  currentTradingValue: number; //Giá trị đang lưu hành
}
export interface InvestedProject {
  projectId: number;
  nameProject: string;
  numberOfSharesPurchased: number;
  pricePerShare: number;
}

export interface Project {
  projects: DataProject[];
  investedProject: InvestedProject[];
  response: {
    loading: boolean;
    error: number;
    message: string;
  };
}

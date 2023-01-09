export interface InvestSharesTransaction {
  projectId: number;
  project: string;
  numberOfShare: number;
  pricePerShare: number;
}
export interface Profile {
  name: string;
  investorType: 1 | 2 | 3 | -1; // 1:Strategy Investor 2:Finance Investor 3:Team
  position: 1 | 2 | 3 | -1; // 1:Investor 2:Tech 3:BA
  nameTelegram: string;
  pathLinkTelegram: string;
  investSharesTransaction: InvestSharesTransaction[];
  response: {
    loading;
    error: number;
    message: string;
  };
}

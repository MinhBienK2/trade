export interface Profile {
  name: string;
  investorType: 1 | 2 | 3; // 1:Strategy Investor 2:Finance Investor 3:Team
  position: 1 | 2 | 3; // 1:Investor 2:Tech 3:BA
  response: {
    loading;
    error: number;
    message: string;
  };
}

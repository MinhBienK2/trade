export interface Profile {
  name: string;
  investorType: 'Strategy Investor' | 'Finance Investor' | 'Team';
  position: 'investor' | 'teck' | 'BA';
  response: {
    loading;
    error: number;
    message: string;
  };
}

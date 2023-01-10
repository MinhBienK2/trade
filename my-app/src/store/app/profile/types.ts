export interface ProfileInfo {
  name: string;
  investorType: number; // 1:Strategy Investor 2:Finance Investor 3:Team
  position: number; // 1:Investor 2:Tech 3:BA
}
export interface Profile extends ProfileInfo {
  nameTelegram: string;
  pathLinkTelegram: string;
  response: {
    loading;
    error: number;
    message: string;
  };
}

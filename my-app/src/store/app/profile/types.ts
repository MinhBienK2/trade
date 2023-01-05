export interface Profile {
  name: string;
  investorType: string;
  position: string;
  response: {
    loading;
    error: number;
    message: string;
  };
}

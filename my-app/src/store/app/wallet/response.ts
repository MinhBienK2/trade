export interface ErrorResponse {
  error: number;
  message: string;
}

export interface DataBalance {
  userId: number;
  balance: number;
  esopBalance: number;
  shareBalance: number;
}
export interface HistoryTransaction {
  id: number;
  project: number;
  boughtShares: number;
  pricePerShare: number;
  priceTotal: number;
  transactionTime: number;
  detail: string;
}

export interface HistoryTransactionResponse extends ErrorResponse {
  data: HistoryTransaction[];
}

export interface walletBalanceResponse extends ErrorResponse {
  data: DataBalance;
}

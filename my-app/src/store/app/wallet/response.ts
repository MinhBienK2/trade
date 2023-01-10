export interface ErrorResponse {
  error: number;
  message: string;
}
// wallet
export interface HistoryTransaction {
  id: number;
  userId: number;
  project: string;
  service: 'ADD' | 'BUY STOCK' | 'SELL STOCK';
  previousBalance: number;
  exchange: number;
  currentBalance: number;
  timestamp: number;
  detail: string;
}

export interface HistoryTransactionResponse
  extends ErrorResponse,
    ErrorResponse {}

export interface walletBalanceResponse extends ErrorResponse {
  data: {
    balance: number;
    esop: number;
    stock: number;
  };
}

import { HistoryTransaction } from './response';

export interface Wallet {
  balance: number;
  esop: number;
  stock: number;
  history_transaction: HistoryTransaction[];
  history_transaction_ESOP: HistoryTransaction[];
  response: {
    loading: boolean;
    error: number;
    message: string;
  };
}

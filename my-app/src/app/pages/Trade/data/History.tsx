import React from 'react';

export interface HistoryTransaction {
  id: number;
  userId: number;
  service: 'add' | 'buy stock' | 'sell stock';
  previousBalance: number;
  exchange: number;
  curentBalance: number;
  timestamp: string;
  detail: string;
}

export const dataHistory: HistoryTransaction[] = [
  {
    id: 0,
    userId: 1,
    service: 'add',
    previousBalance: 20000,
    exchange: 200,
    curentBalance: 20200,
    timestamp: 'no',
    detail: 'ok',
  },
  {
    id: 1,
    userId: 1,
    service: 'buy stock',
    previousBalance: 20000,
    exchange: 200,
    curentBalance: 19800,
    timestamp: 'no',
    detail: 'ok',
  },
  {
    id: 2,
    userId: 1,
    service: 'add',
    previousBalance: 20000,
    exchange: 200,
    curentBalance: 20200,
    timestamp: 'no',
    detail: 'ok',
  },
  {
    id: 3,
    userId: 1,
    service: 'sell stock',
    previousBalance: 20000,
    exchange: 200,
    curentBalance: 20200,
    timestamp: 'no',
    detail: 'ok',
  },
];

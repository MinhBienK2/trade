/**
 * Asynchronously loads the component for HomePage
 */
import React from 'react';
import { lazyLoad } from 'utils/loadable';
import { LoadingOverlay } from 'app/components/poppup/LoadingOverlay';

export const TradePage = lazyLoad(
  () => import('./TradePage'),
  module => module.TradePage,
  // { fallback: <LoadingOverlay /> },
);

export const FormTrade = lazyLoad(
  () => import('./FormTrade'),
  module => module.FormTrade,
  // { fallback: <LoadingOverlay /> },
);

export const HistoryTransaction = lazyLoad(
  () => import('./HistoryTransaction'),
  module => module.HistoryTransaction,
  // { fallback: <LoadingOverlay /> },
);

export const HistoryDetail = lazyLoad(
  () => import('./HistoryDetail'),
  module => module.HistoryDetail,
  // { fallback: <LoadingOverlay /> },
);

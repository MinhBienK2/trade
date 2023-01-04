/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const TradePage = lazyLoad(
  () => import('./TradePage'),
  module => module.TradePage,
);

export const FormTrade = lazyLoad(
  () => import('./FormTrade'),
  module => module.FormTrade,
);

export const HistoryTransaction = lazyLoad(
  () => import('./HistoryTransaction'),
  module => module.HistoryTransaction,
);

export const HistoryDetail = lazyLoad(
  () => import('./HistoryDetail'),
  module => module.HistoryDetail,
);

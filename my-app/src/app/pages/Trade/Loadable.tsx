/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const TradePage = lazyLoad(
  () => import('./TradePage'),
  module => module.TradePage,
);

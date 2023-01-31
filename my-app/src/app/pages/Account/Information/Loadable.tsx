import { LoadingOverlay } from 'app/components/poppup/LoadingOverlay';
import React from 'react';
import { lazyLoad } from 'utils/loadable';

export const Assets = lazyLoad(
  () => import('./Assets'),
  module => module.Assets,
  { fallback: <LoadingOverlay /> },
);

export const General = lazyLoad(
  () => import('./General'),
  module => module.General,
  { fallback: <LoadingOverlay /> },
);

export const InvestDetail = lazyLoad(
  () => import('./InvestDetail'),
  module => module.InvestDetail,
  { fallback: <LoadingOverlay /> },
);
export const Investment = lazyLoad(
  () => import('./Investment'),
  module => module.Investment,
  { fallback: <LoadingOverlay /> },
);
export const Profile = lazyLoad(
  () => import('./Profile'),
  module => module.Profile,
  { fallback: <LoadingOverlay /> },
);

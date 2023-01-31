import { LoadingOverlay } from 'app/components/poppup/LoadingOverlay';
import React from 'react';
import { lazyLoad } from 'utils/loadable';

export const ConfirmationPage = lazyLoad(
  () => import('./ConfirmationPage'),
  module => module.ConfirmationPage,
  { fallback: <LoadingOverlay /> },
);

import { LoadingOverlay } from 'app/components/poppup/LoadingOverlay';
import React from 'react';
import { lazyLoad } from 'utils/loadable';

export const RegisterPage = lazyLoad(
  () => import('./RegisterPage'),
  module => module.RegisterPage,
  // { fallback: <LoadingOverlay /> },
);

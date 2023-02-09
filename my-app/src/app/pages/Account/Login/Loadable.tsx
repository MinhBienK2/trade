import { LoadingOverlay } from 'app/components/poppup/LoadingOverlay';
import React from 'react';
import { lazyLoad } from 'utils/loadable';

export const LoginPage = lazyLoad(
  () => import('./LoginPage'),
  module => module.LoginPage,
  // { fallback: <LoadingOverlay /> },
);

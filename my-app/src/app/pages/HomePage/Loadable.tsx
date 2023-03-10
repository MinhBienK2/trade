/**
 * Asynchronously loads the component for HomePage
 */

import { LoadingOverlay } from 'app/components/poppup/LoadingOverlay';
import React from 'react';
import { lazyLoad } from 'utils/loadable';

export const HomePage = lazyLoad(
  () => import('./HomePage'),
  module => module.HomePage,
  { fallback: <LoadingOverlay /> },
);

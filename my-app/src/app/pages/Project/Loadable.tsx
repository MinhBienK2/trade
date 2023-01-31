/**
 * Asynchronously loads the component for HomePage
 */

import { LoadingOverlay } from 'app/components/poppup/LoadingOverlay';
import React from 'react';
import { lazyLoad } from 'utils/loadable';

export const ProjectPage = lazyLoad(
  () => import('./ProjectPage'),
  module => module.ProjectPage,
  { fallback: <LoadingOverlay /> },
);

export const ProjectDetailPage = lazyLoad(
  () => import('./ProjectDetailPage'),
  module => module.ProjectDetailPage,
  { fallback: <LoadingOverlay /> },
);

/**
 * Asynchronously loads the component for HomePage
 */

import { lazyLoad } from 'utils/loadable';

export const ProjectPage = lazyLoad(
  () => import('./ProjectPage'),
  module => module.ProjectPage,
);

export const ProjectDetailPage = lazyLoad(
  () => import('./ProjectDetailPage'),
  module => module.ProjectDetailPage,
);

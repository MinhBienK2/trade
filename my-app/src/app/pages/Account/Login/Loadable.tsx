import { lazyLoad } from 'utils/loadable';

export const LoginPage = lazyLoad(
  () => import('./LoginPage'),
  module => module.LoginPage,
);

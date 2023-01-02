import { lazyLoad } from 'utils/loadable';

export const RegisterPage = lazyLoad(
  () => import('./RegisterPage'),
  module => module.RegisterPage,
);

import { lazyLoad } from 'utils/loadable';

export const Assets = lazyLoad(
  () => import('./Assets'),
  module => module.Assets,
);

export const General = lazyLoad(
  () => import('./General'),
  module => module.General,
);

export const InvestDetail = lazyLoad(
  () => import('./InvestDetail'),
  module => module.InvestDetail,
);
export const Investment = lazyLoad(
  () => import('./Investment'),
  module => module.Investment,
);
export const Profile = lazyLoad(
  () => import('./Profile'),
  module => module.Profile,
);

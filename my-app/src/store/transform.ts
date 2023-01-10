import { createTransform } from 'redux-persist';

import { User } from './app/user/types';
import { Profile } from './app/profile/types';

export const userTransform = createTransform(
  (inboundState: any, key) => {
    return {
      ...inboundState,
      // password: inboundState.response.login.remember_password
      //   ? inboundState.password
      //   : '',
    };
  },
  (outboundState: any, key): {} => {
    return {
      ...(outboundState as User),
      response: {
        loading: false,
        login: {
          error: -1,
          message: '',
        },
        register: {
          error: -1,
          message: '',
        },
      },
      language: outboundState.language,
    };
  },
  { whitelist: ['user'] },
);

export const profileTransform = createTransform(
  (inboundState: any, key) => {
    return {
      ...(inboundState as any),
    };
  },
  (outboundState: any, key): {} => {
    return {
      ...(outboundState as Profile),
      response: {
        loading: false,
        error: -1,
        message: '',
      },
    };
  },
  { whitelist: ['profile'] },
);

export const walletTransform = createTransform(
  (inboundState: any, key) => {
    return {
      ...(inboundState as any),
    };
  },
  (outboundState: any, key): {} => {
    return {
      ...(outboundState as Profile),
      response: {
        loading: false,
        error: -1,
        message: '',
      },
    };
  },
  { whitelist: ['wallet'] },
);

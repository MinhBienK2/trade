import { createTransform } from 'redux-persist';

import { User } from './app/user/types';
import { Profile } from './app/profile/types';
import { Wallet } from './app/wallet/types';
import { System } from './app/system/types';

export const userTransform = createTransform(
  (inboundState: any, key) => {
    return {
      ...inboundState,
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
      // language: outboundState.language,
    };
  },
  { whitelist: ['user'] },
);

export const profileTransform = createTransform(
  (inboundState: any, key) => {
    return {
      ...inboundState,
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
      ...inboundState,
    };
  },
  (outboundState: any, key): {} => {
    return {
      ...(outboundState as Wallet),
      response: {
        loading: false,
        error: -1,
        message: '',
      },
    };
  },
  { whitelist: ['wallet'] },
);

export const systemTransform = createTransform(
  (inboundState: any, key) => {
    return {
      ...inboundState,
    };
  },
  (outboundState: any, key): {} => {
    return {
      ...(outboundState as System),
      errorSystem: '',
    };
  },
  { whitelist: ['system'] },
);

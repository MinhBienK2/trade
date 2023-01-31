// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly

import { Profile } from 'store/app/profile/types';
import { Project } from 'store/app/project/types';
import { System } from 'store/app/system/types';
import { User } from 'store/app/user/types';
import { Wallet } from 'store/app/wallet/types';

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
  user?: User;
  wallet?: Wallet;
  profile?: Profile;
  project?: Project;
  system?: System;
}

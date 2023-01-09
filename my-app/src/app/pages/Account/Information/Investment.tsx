import * as React from 'react';
import {
  Blockquote,
  Card,
  Center,
  Group,
  Paper,
  Stack,
  Table,
  Text,
} from '@mantine/core';
import { IconUserCircle, IconPigMoney, IconId } from '@tabler/icons';
import { useNavigate } from 'react-router-dom';

import { InvestCard } from './Components/InvestCard';
import { PageTitle } from './Components/PageTitle';
import { WalletCard } from './Components/WalletCard';
import { useTranslation } from 'react-i18next';
import { useUserSlice } from 'store/app/user';
import { useDispatch, useSelector } from 'react-redux';
import { selectLanguage } from 'store/app/user/selector';
import { useProfileSlice } from 'store/app/profile';
import { selectInvestSharesTransaction } from 'store/app/profile/selector';

export function Investment() {
  useUserSlice();
  const profileSlice = useProfileSlice();
  const { t } = useTranslation();
  const navitation = useNavigate();
  const dispatch = useDispatch();

  const investSharesTransaction = useSelector(selectInvestSharesTransaction);
  const userLanguage = useSelector(selectLanguage);

  React.useEffect(() => {
    console.log(investSharesTransaction.length === 0);
    if (investSharesTransaction.length === 0) {
      dispatch(profileSlice.actions.requestUpdateInvestShareTransaction());
    }
  }, []);

  const moveToGeneralPage = () => {
    navitation('/account/general');
  };
  return (
    <Center sx={{ height: '100vh' }}>
      <Paper
        withBorder
        sx={{
          height: '100%',
          width: '100%',
          minWidth: '300px',
          padding: '5px',
        }}
      >
        <Stack>
          <PageTitle
            text={t('Account.general.investment')}
            back={moveToGeneralPage}
            selectLanguage={userLanguage}
          />
          <InvestCard data={investSharesTransaction} />
        </Stack>
      </Paper>
    </Center>
  );
}

import * as React from 'react';
import { Center, Paper, Stack } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { PageTitle } from './Components/PageTitle';
import { WalletCard } from './Components/WalletCard';
import { WalletData } from '../Data/WalletData';
import { useWalletSlice } from 'store/app/wallet';
import { selectBalance, selectESOP, selectStock } from 'store/app/wallet/selector';
import { selectLanguage } from 'store/app/user/selector';
import { useTranslation } from 'react-i18next';

export function Assets() {
  const walletSlice = useWalletSlice();
  const navitation = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const balance = useSelector(selectBalance);
  const esop = useSelector(selectESOP);
  const userLanguage = useSelector(selectLanguage);
  const stock = useSelector(selectStock);
  const sampleWallet: WalletData = {
    balance: balance ?? 0,
    esop: esop ?? 0,
    stock: stock ?? 0,
    total: Number(balance) + Number(esop) + Number(stock) ?? 0,
  };

  // update wallet
  React.useEffect(() => {
    if (balance === 0 && esop === 0 && stock === 0) dispatch(walletSlice.actions.requestUpdateBalance());
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
          <PageTitle text={t('Account.assets.title')} back={moveToGeneralPage} selectLanguage={userLanguage} />
          <WalletCard data={sampleWallet}></WalletCard>
        </Stack>
      </Paper>
    </Center>
  );
}

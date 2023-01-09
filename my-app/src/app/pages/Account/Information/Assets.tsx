import * as React from 'react';
import {
  Blockquote,
  Card,
  Center,
  Group,
  Paper,
  Stack,
  Text,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { PageQuote } from './Components/PageQuote';
import { PageRow } from './Components/PageRow';
import { PageTitle } from './Components/PageTitle';
import { randomQuote } from '../Data/QuoteData';
import { WalletCard } from './Components/WalletCard';
import { sampleWallet, WalletData } from '../Data/WalletData';
import { useWalletSlice } from 'store/app/wallet';
import {
  selectBalance,
  selectESOP,
  selectStock,
} from 'store/app/wallet/selector';
import { useUserSlice } from 'store/app/user';
import { selectLanguage } from 'store/app/user/selector';

export function Assets() {
  useWalletSlice();
  useUserSlice();
  const navitation = useNavigate();

  const balance = useSelector(selectBalance);
  const esop = useSelector(selectESOP);
  const userLanguage = useSelector(selectLanguage);
  const stock = useSelector(selectStock);
  const sampleWallet: WalletData = {
    balance,
    esop,
    stock,
    total: balance + esop + stock,
  };

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
            text="Assets"
            back={moveToGeneralPage}
            selectLanguage={userLanguage}
          />
          <WalletCard data={sampleWallet}></WalletCard>
        </Stack>
      </Paper>
    </Center>
  );
}

import {
  Blockquote,
  Card,
  Center,
  Group,
  Paper,
  Stack,
  Text,
} from '@mantine/core';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageQuote } from './Components/PageQuote';
import { PageRow } from './Components/PageRow';
import { PageTitle } from './Components/PageTitle';
import { randomQuote } from '../Data/QuoteData';
import { WalletCard } from './Components/WalletCard';
import { sampleWallet } from '../Data/WalletData';

export function Assets() {
  const navitation = useNavigate();
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
          <PageTitle text="Assets" back={moveToGeneralPage} />
          <WalletCard data={sampleWallet}></WalletCard>
        </Stack>
      </Paper>
    </Center>
  );
}

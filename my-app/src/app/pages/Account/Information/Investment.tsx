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
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { sampleData } from '../Data/InvestmentData';
import { InvestCard } from './Components/InvestCard';
import { PageTitle } from './Components/PageTitle';
import { WalletCard } from './Components/WalletCard';
export function Investment() {
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
          <PageTitle text="Investment" back={moveToGeneralPage} />
          <InvestCard data={sampleData} />
        </Stack>
      </Paper>
    </Center>
  );
}

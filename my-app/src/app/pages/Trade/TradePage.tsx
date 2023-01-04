import {
  Center,
  Paper,
  Stack,
  Card,
  Group,
  Text,
  Divider,
  Button,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconGift, IconWallet, IconHistory } from '@tabler/icons';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useWalletSlice } from 'store/app/wallet';
import { selectBalance, selectESOP } from 'store/app/wallet/selector';
import { PageTitle } from '../Account/Information/Components/PageTitle';
import { FormTrade } from './Loadable';

export function TradePage() {
  useWalletSlice();
  const balance = useSelector(selectBalance);
  const esop = useSelector(selectESOP);
  const navitation = useNavigate();
  const smallThan576 = useMediaQuery('(max-width:576px)');
  function moveToHomePage() {
    navitation('/');
  }
  function moveToHistoryTransactionPage() {
    navitation('/history');
  }

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
          <PageTitle text="Trade" back={moveToHomePage} />
          <Card shadow="sm" p="md" radius="md" withBorder>
            <Center>
              <Group spacing={smallThan576 ? 5 : 16}>
                <IconWallet color={'orange'} />
                <Text color={'orange'}>{balance}</Text>
                <Divider orientation="vertical" />
                <IconGift color={'cyan'} />
                <Text color={'cyan'}>{esop}</Text>
                <Button
                  variant="outline"
                  onClick={moveToHistoryTransactionPage}
                  leftIcon={<IconHistory />}
                >
                  History
                </Button>
              </Group>
            </Center>
            <Divider mt={20} mb={20} />
            <Center>
              <FormTrade />
            </Center>
          </Card>
        </Stack>
      </Paper>
    </Center>
  );
}

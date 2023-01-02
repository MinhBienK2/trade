import {
  Center,
  Paper,
  Stack,
  Card,
  Group,
  Text,
  Divider,
} from '@mantine/core';
import { IconGift, IconWallet } from '@tabler/icons';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { sampleWallet } from '../Account/Data/WalletData';
import { PageTitle } from '../Account/Information/Components/PageTitle';
export function TradePage() {
  const navitation = useNavigate();
  function moveToHomePage() {
    navitation('/');
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
            <Group>
              <IconWallet color={'orange'} />
              <Text color={'orange'}>{sampleWallet.balance}</Text>
              <Divider orientation="vertical" />
              <IconGift color={'cyan'} />
              <Text color={'cyan'}>{sampleWallet.esop}</Text>
            </Group>
          </Card>
        </Stack>
      </Paper>
    </Center>
  );
}

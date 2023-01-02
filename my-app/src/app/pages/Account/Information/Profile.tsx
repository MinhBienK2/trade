import {
  Blockquote,
  Card,
  Center,
  Group,
  Paper,
  Stack,
  Text,
} from '@mantine/core';
import { IconUserCircle, IconPigMoney, IconId } from '@tabler/icons';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageQuote } from './Components/PageQuote';
import { PageRow } from './Components/PageRow';
import { PageTitle } from './Components/PageTitle';
export function Profile() {
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
          <PageTitle text="Profile" back={moveToGeneralPage} />
          <PageRow leftIcon={<IconUserCircle />} text="Nguyễn Khánh Thịnh" />
          <PageRow leftIcon={<IconPigMoney />} text="Nhà đầu tư chiến lược" />
          <PageRow leftIcon={<IconId />} text="Leader" />
          <PageQuote />
        </Stack>
      </Paper>
    </Center>
  );
}

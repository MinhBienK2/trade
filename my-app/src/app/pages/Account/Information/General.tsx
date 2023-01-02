import { Paper, Stack, Center } from '@mantine/core';
import {
  IconBrandTelegram,
  IconChevronRight,
  IconEdit,
  IconLock,
  IconMoneybag,
  IconPhone,
  IconPigMoney,
  IconUserCircle,
} from '@tabler/icons';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageRow } from './Components/PageRow';
import { PageRowButton } from './Components/PageRowButton';
import { PageTitle } from './Components/PageTitle';

export function General() {
  const navitation = useNavigate();
  function moveToHomePage() {
    navitation('/');
  }
  function moveToProfilePage() {
    navitation('/account/profile');
  }
  function moveToAssetsPage() {
    navitation('/account/assets');
  }
  function moveToInvestmentPage() {
    navitation('/account/investment');
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
          <PageTitle text="Account" back={moveToHomePage} />
          <PageRow leftIcon={<IconPhone />} text="0836993400" />
          <PageRow
            leftIcon={<IconLock />}
            text="********"
            rightIcon={<IconEdit />}
          />
          <PageRow
            leftIcon={<IconUserCircle />}
            text="Profile"
            rightIcon={<IconChevronRight />}
            next={moveToProfilePage}
          />
          <PageRow
            leftIcon={<IconMoneybag />}
            text="Assets"
            rightIcon={<IconChevronRight />}
            next={moveToAssetsPage}
          />
          <PageRow
            leftIcon={<IconPigMoney />}
            text="Investment"
            rightIcon={<IconChevronRight />}
            next={moveToInvestmentPage}
          />
          <PageRowButton
            leftIcon={<IconBrandTelegram />}
            indicator={true}
            text="Link to Telegram"
          />
        </Stack>
      </Paper>
    </Center>
  );
}

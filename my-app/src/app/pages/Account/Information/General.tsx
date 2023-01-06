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
  IconLogout,
} from '@tabler/icons';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useUserSlice } from 'store/app/user';
import { selectPhoneNumber } from 'store/app/user/selector';
import { PageRow } from './Components/PageRow';
import { PageRowButton } from './Components/PageRowButton';
import { PageTitle } from './Components/PageTitle';

export function General() {
  const { actions } = useUserSlice();
  const phoneNumber = useSelector(selectPhoneNumber);

  const dispatch = useDispatch();
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
  function handleLogout() {
    dispatch(actions.requestLogout());
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
          <PageRow leftIcon={<IconPhone />} text={'+' + phoneNumber} />
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
          <PageRow
            leftIcon={<IconLogout />}
            text="Logout"
            next={handleLogout}
          />
        </Stack>
      </Paper>
    </Center>
  );
}

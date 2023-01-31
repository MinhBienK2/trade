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
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useProfileSlice } from 'store/app/profile';
import { selectNameTelegram, selectPathLinkTelegram } from 'store/app/profile/selector';
import { selectLanguage } from 'store/app/user/selector';
import { PageRow } from './Components/PageRow';
import { PageRowButton } from './Components/PageRowButton';
import { PageTitle } from './Components/PageTitle';
import { useWalletSlice } from 'store/app/wallet';
import { formatPhoneNumber } from 'helpers/formatPhoneNumber';
import { userActions } from 'store/app/user';

export function General() {
  useWalletSlice();
  const profileSlice = useProfileSlice();
  const { t } = useTranslation();
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const nameTelegram = useSelector(selectNameTelegram);
  const language = useSelector(selectLanguage);

  React.useEffect(() => {
    dispatch(profileSlice.actions.requestCheckedLinkTelegram());
  }, []);

  function moveToHomePage() {
    navigation('/');
  }
  function moveToProfilePage() {
    navigation('/account/profile');
  }
  function moveToAssetsPage() {
    navigation('/account/assets');
  }
  function moveToInvestmentPage() {
    navigation('/account/investment');
  }
  function handleLogout() {
    dispatch(userActions.requestLogout());
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
          <PageTitle text={t('Account.general.title')} back={moveToHomePage} selectLanguage={language} />
          <PageRow leftIcon={<IconUserCircle />} text={nameTelegram} />
          <PageRow
            leftIcon={<IconUserCircle />}
            text={t('Account.detailCard.profile')}
            rightIcon={<IconChevronRight />}
            next={moveToProfilePage}
          />
          <PageRow
            leftIcon={<IconMoneybag />}
            text={t('Account.general.assets')}
            rightIcon={<IconChevronRight />}
            next={moveToAssetsPage}
          />
          <PageRow
            leftIcon={<IconPigMoney />}
            text={t('Account.general.investment')}
            rightIcon={<IconChevronRight />}
            next={moveToInvestmentPage}
          />
          <PageRow leftIcon={<IconLogout />} text={t('Account.general.logout')} next={handleLogout} />
        </Stack>
      </Paper>
    </Center>
  );
}

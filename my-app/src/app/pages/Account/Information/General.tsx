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
import {
  selectNameTelegram,
  selectPathLinkTelegram,
} from 'store/app/profile/selector';
import { useUserSlice } from 'store/app/user';
import { selectLanguage, selectPhoneNumber } from 'store/app/user/selector';
import { PageRow } from './Components/PageRow';
import { PageRowButton } from './Components/PageRowButton';
import { PageTitle } from './Components/PageTitle';

export function General() {
  const { actions } = useUserSlice();
  const profileSlice = useProfileSlice();
  const { t } = useTranslation();
  const phoneNumber = useSelector(selectPhoneNumber);
  const nameTelegram = useSelector(selectNameTelegram);
  const language = useSelector(selectLanguage);
  const pathLinkTelegram = useSelector(selectPathLinkTelegram);
  const dispatch = useDispatch();
  const navitation = useNavigate();

  // checked link
  React.useEffect(() => {
    console.log('hello');
    if (nameTelegram === '')
      dispatch(profileSlice.actions.requestCheckedLinkTelegram());
  }, []);
  // link telegram
  React.useEffect(() => {
    if (pathLinkTelegram) {
      window.open(pathLinkTelegram);
      dispatch(profileSlice.actions.resetPathLinkTelegram());
    }
  }, [pathLinkTelegram]);

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
  function handleLinkTelegram() {
    console.log('first');
    dispatch(profileSlice.actions.requestLinkThirdParty());
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
          <PageTitle
            text={t('Account.detailCard.amount')}
            back={moveToHomePage}
            selectLanguage={language}
          />
          <PageRow leftIcon={<IconPhone />} text={'+' + phoneNumber} />
          <PageRow
            leftIcon={<IconLock />}
            text="********"
            rightIcon={<IconEdit />}
          />
          <PageRow
            leftIcon={<IconUserCircle />}
            text={t('Account.detailCard.project')}
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
          <PageRowButton
            leftIcon={<IconBrandTelegram />}
            indicator={true}
            text={t('Account.general.link_to_telegram')}
            userNameTelegram={nameTelegram}
            next={nameTelegram ? undefined : handleLinkTelegram}
          />
          <PageRow
            leftIcon={<IconLogout />}
            text={t('Account.general.logout')}
            next={handleLogout}
          />
        </Stack>
      </Paper>
    </Center>
  );
}

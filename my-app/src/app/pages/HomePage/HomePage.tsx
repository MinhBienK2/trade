import { Paper, Center, Stack, Card, Text } from '@mantine/core';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserSlice } from 'store/app/user';
import { selectLanguage } from 'store/app/user/selector';
import { PageRow } from '../Account/Information/Components/PageRow';
import { PageTitle } from '../Account/Information/Components/PageTitle';

export function HomePage() {
  const { t } = useTranslation();
  useUserSlice();
  const userLanguage = useSelector(selectLanguage);
  const navitation = useNavigate();
  const moveToGeneralPage = () => {
    navitation('/account/general');
  };
  const moveToTradePage = () => {
    navitation('/trade');
  };
  const moveToProjectPage = () => {
    navitation('/projects');
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
          <PageTitle text={t('Home.title')} selectLanguage={userLanguage} />
          <PageRow text={t('Home.account')} next={moveToGeneralPage} />
          <PageRow text={t('Home.projects')} next={moveToProjectPage} />
          <PageRow text={t('Home.trade')} next={moveToTradePage} />
        </Stack>
      </Paper>
    </Center>
  );
}

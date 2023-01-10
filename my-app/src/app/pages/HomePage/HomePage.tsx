import { Paper, Center, Stack } from '@mantine/core';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useProjectSlice } from 'store/app/project';
import { useUserSlice } from 'store/app/user';
import { selectLanguage } from 'store/app/user/selector';
import { PageRow } from '../Account/Information/Components/PageRow';
import { PageTitle } from '../Account/Information/Components/PageTitle';
import Storage from 'utils/Storage';

export function HomePage() {
  useUserSlice();
  const projectSlice = useProjectSlice();
  const { t } = useTranslation();
  const navitation = useNavigate();
  const dispatch = useDispatch();

  const userLanguage = useSelector(selectLanguage);

  React.useEffect(() => {
    Storage.setFieldOfUser('phoneNumber', '112312312312312312');
    dispatch(projectSlice.actions.requestUpdateListProject());
  }, []);

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

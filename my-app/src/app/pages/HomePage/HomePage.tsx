import { Paper, Center, Stack, LoadingOverlay } from '@mantine/core';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { useProjectSlice } from 'store/app/project';
import { selectLanguage } from 'store/app/user/selector';
import { PageRow } from '../Account/Information/Components/PageRow';
import { PageTitle } from '../Account/Information/Components/PageTitle';
import { selectInvestShares, selectListProject, selectLoading, selectProject } from 'store/app/project/selector';
import { Helmet } from 'react-helmet-async';

export function HomePage() {
  const projectSlice = useProjectSlice();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const investShares = useSelector(selectInvestShares);
  const userLanguage = useSelector(selectLanguage);
  const loadingProject = useSelector(selectLoading);
  const projects = useSelector(selectListProject);

  React.useEffect(() => {
    if (projects.length !== 0) return;
    dispatch(projectSlice.actions.requestUpdateListProject());
  }, []);

  const moveToGeneralPage = () => {
    navigate('/account/general');
  };
  const moveToTradePage = () => {
    if (investShares.length === 0) {
      dispatch(projectSlice.actions.requestUpdateInvestShares());
    }

    navigate('/trade');
  };
  const moveToProjectPage = () => {
    navigate('/projects');
  };
  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="home" content="Share Inverst" />
      </Helmet>

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
      <LoadingOverlay visible={loadingProject} overlayBlur={2} />
    </>
  );
}

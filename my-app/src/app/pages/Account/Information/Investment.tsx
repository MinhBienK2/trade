import * as React from 'react';
import { Center, LoadingOverlay, Paper, Stack } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import { InvestCard } from './Components/InvestCard';
import { PageTitle } from './Components/PageTitle';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { selectLanguage } from 'store/app/user/selector';
import { useProfileSlice } from 'store/app/profile';
import { useProjectSlice } from 'store/app/project';
import { selectInvestedProject, selectLoading } from 'store/app/project/selector';
import { Helmet } from 'react-helmet-async';

export function Investment() {
  useProfileSlice();
  const ProjectSlice = useProjectSlice();
  const { t } = useTranslation();
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const userLanguage = useSelector(selectLanguage);
  const investedProject = useSelector(selectInvestedProject);
  const loadingProject = useSelector(selectLoading);

  React.useEffect(() => {
    if (investedProject.length === 0) {
      dispatch(ProjectSlice.actions.requestUpdateInvestedProject());
    }
  }, []);

  const moveToGeneralPage = () => {
    navigation('/account/general');
  };
  return (
    <>
      <Helmet>
        <title>Inverstment</title>
        <meta name="Inverstment" content="Share Inverst" />
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
            <PageTitle text={t('Account.general.investment')} back={moveToGeneralPage} selectLanguage={userLanguage} />
            <InvestCard data={investedProject} />
          </Stack>
        </Paper>
      </Center>
      <LoadingOverlay visible={loadingProject} overlayBlur={2} />
    </>
  );
}

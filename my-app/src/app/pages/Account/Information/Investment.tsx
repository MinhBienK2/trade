import * as React from 'react';
import {
  Blockquote,
  Card,
  Center,
  Group,
  Paper,
  Stack,
  Table,
  Text,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';

import { InvestCard } from './Components/InvestCard';
import { PageTitle } from './Components/PageTitle';
import { useTranslation } from 'react-i18next';
import { useUserSlice } from 'store/app/user';
import { useDispatch, useSelector } from 'react-redux';
import { selectLanguage } from 'store/app/user/selector';
import { useProfileSlice } from 'store/app/profile';
import { useProjectSlice } from 'store/app/project';
import { selectInvestedProject } from 'store/app/project/selector';

export function Investment() {
  useUserSlice();
  useProfileSlice();
  const ProjectSlice = useProjectSlice();
  const { t } = useTranslation();
  const navitation = useNavigate();
  const dispatch = useDispatch();

  const userLanguage = useSelector(selectLanguage);
  const investedProject = useSelector(selectInvestedProject);

  React.useEffect(() => {
    if (investedProject.length === 0) {
      dispatch(ProjectSlice.actions.requestUpdateInvestedProject());
    }
  }, []);

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
          <PageTitle
            text={t('Account.general.investment')}
            back={moveToGeneralPage}
            selectLanguage={userLanguage}
          />
          <InvestCard data={investedProject} />
        </Stack>
      </Paper>
    </Center>
  );
}

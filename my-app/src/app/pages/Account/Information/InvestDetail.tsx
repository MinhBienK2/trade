import { Paper, Center, Stack } from '@mantine/core';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useProfileSlice } from 'store/app/profile';
import { selectInvestedProject } from 'store/app/project/selector';
import { InvestedProject } from 'store/app/project/types';
import { useUserSlice } from 'store/app/user';
import { selectLanguage } from 'store/app/user/selector';
import { DetailCard } from './Components/DetailCard';
import { PageQuote } from './Components/PageQuote';
import { PageTitle } from './Components/PageTitle';

function getInvestmentData(
  projectId: number,
  data,
): InvestedProject | undefined {
  for (let i = 0; i < data.length; i++) {
    if (data[i].projectId === projectId) {
      return data[i];
    }
  }
  return undefined;
}

export function InvestDetail() {
  useUserSlice();
  useProfileSlice();
  const navitation = useNavigate();
  const params = useParams();

  const userLanguage = useSelector(selectLanguage);
  const investedProject = useSelector(selectInvestedProject);
  const projectId = params['projectId'] ? parseInt(params['projectId']) : 0;
  const investData = getInvestmentData(projectId, investedProject);

  const moveToGeneralPage = () => {
    navitation('/account/investment');
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
            text={investData ? investData.nameProject : 'Project Not Found'}
            back={moveToGeneralPage}
            selectLanguage={userLanguage}
          />
          {investData ? <DetailCard data={investData} /> : <PageQuote />}
        </Stack>
      </Paper>
    </Center>
  );
}

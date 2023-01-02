import { Paper, Center, Stack } from '@mantine/core';
import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getInvestmentData } from '../Data/InvestmentData';
import { DetailCard } from './Components/DetailCard';
import { PageQuote } from './Components/PageQuote';
import { PageTitle } from './Components/PageTitle';

export function InvestDetail() {
  const navitation = useNavigate();
  const moveToGeneralPage = () => {
    navitation('/account/investment');
  };
  const params = useParams();
  const projectId = params['project'] ? parseInt(params['project']) : 0;
  const investData = getInvestmentData(projectId);
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
            text={investData ? investData.project : 'Project Not Found'}
            back={moveToGeneralPage}
          />
          {investData ? <DetailCard data={investData} /> : <PageQuote />}
        </Stack>
      </Paper>
    </Center>
  );
}

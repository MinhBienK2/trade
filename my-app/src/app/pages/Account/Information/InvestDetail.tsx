import { Paper, Center, Stack } from '@mantine/core';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useProfileSlice } from 'store/app/profile';
import { selectInvestSharesTransaction } from 'store/app/profile/selector';
import { InvestSharesTransaction } from 'store/app/profile/types';
import { useUserSlice } from 'store/app/user';
import { selectLanguage } from 'store/app/user/selector';
import { DetailCard } from './Components/DetailCard';
import { PageQuote } from './Components/PageQuote';
import { PageTitle } from './Components/PageTitle';

function getInvestmentData(
  projectId: number,
  data,
): InvestSharesTransaction | undefined {
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
  const investSharesTransaction = useSelector(selectInvestSharesTransaction);
  const projectId = params['project'] ? parseInt(params['project']) : 0;
  const investData = getInvestmentData(projectId, investSharesTransaction);

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
            text={investData ? investData.project : 'Project Not Found'}
            back={moveToGeneralPage}
            selectLanguage={userLanguage}
          />
          {investData ? <DetailCard data={investData} /> : <PageQuote />}
        </Stack>
      </Paper>
    </Center>
  );
}

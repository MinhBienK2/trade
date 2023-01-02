import { Paper, Center, Stack, Card, Text } from '@mantine/core';
import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageRow } from '../Account/Information/Components/PageRow';
import { PageTitle } from '../Account/Information/Components/PageTitle';

export function HomePage() {
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
          <PageTitle text="Easy Invest" />
          <PageRow text={'Account'} next={moveToGeneralPage} />
          <PageRow text={'Projects'} next={moveToProjectPage} />
          <PageRow text={'Trade'} next={moveToTradePage} />
        </Stack>
      </Paper>
    </Center>
  );
}

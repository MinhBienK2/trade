import {
  Card,
  Center,
  Divider,
  Group,
  Paper,
  Stack,
  Text,
} from '@mantine/core';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageTitle } from '../Account/Information/Components/PageTitle';

import { dataHistory } from './data/History';

type Props = {};

export const HistoryDetail = (props: Props) => {
  const navitation = useNavigate();
  const { historyId } = useParams();
  const detail = dataHistory[historyId ? historyId : 0];

  const moveToHistoryPage = () => {
    navitation('/history');
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
          <PageTitle text={'Detail Trade'} back={moveToHistoryPage} />

          <Card shadow="sm" p="md" radius="xs" withBorder>
            <Stack>
              <Divider />
              <Group>
                <Text w={100}>type Trade</Text>
                <Text fw={500}>{detail.detail}</Text>
              </Group>
              <Divider />
              <Group>
                <Text w={100}>previous balance</Text>
                <Text fw={500}>{detail.previousBalance}</Text>
              </Group>
              <Divider />
              <Group>
                <Text w={100}>exchange</Text>
                <Text fw={500}>{detail.exchange}</Text>
              </Group>
              <Divider />
              <Group>
                <Text w={100}>current balance</Text>
                <Text fw={500}>{detail.curentBalance}</Text>
              </Group>
              <Divider />
              <Group>
                <Text w={100}>time</Text>
                <Text fw={500}>{detail.timestamp}</Text>
              </Group>
              <Divider />
              <Group>
                <Text w={100}>details</Text>
                <Text fw={500}>{detail.detail}</Text>
              </Group>
              {/* <Button onClick={() => moveToTrade(data.projectId)}>BUY</Button> */}
            </Stack>
          </Card>
        </Stack>
      </Paper>
    </Center>
  );
};

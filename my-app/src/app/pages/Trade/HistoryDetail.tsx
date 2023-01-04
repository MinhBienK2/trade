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
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useWalletSlice } from 'store/app/wallet';
import {
  selectHistoryTransaction,
  selectHistoryTransactionESOP,
} from 'store/app/wallet/selector';
import convertDate from 'utils/date';
import { PageTitle } from '../Account/Information/Components/PageTitle';

const RenderChildDetail = (props: { data: any }) => {
  return (
    <Card shadow="sm" p="md" radius="xs" withBorder>
      <Stack>
        <Group>
          <Text w={100}>ID</Text>
          <Text fw={500}>{props.data.id}</Text>
        </Group>
        <Divider />
        <Group>
          <Text w={100}>Project</Text>
          <Text fw={500}>{props.data.project}</Text>
        </Group>
        <Divider />
        <Group>
          <Text w={100}>Type</Text>
          <Text fw={500}>{props.data.service}</Text>
        </Group>
        <Divider />
        <Group>
          <Text w={100}>Exchange</Text>
          <Text fw={500}>{props.data.exchange}</Text>
        </Group>
        <Divider />
        <Group>
          <Text w={100}>Balance</Text>
          <Text fw={500}>{props.data.currentBalance}</Text>
        </Group>
        <Divider />
        <Group>
          <Text w={100}>Time</Text>
          <Text fw={500}>
            {convertDate.GetDDMMYY_HHMMSS(
              convertDate.createNewDate(props.data.timestamp),
            )}
          </Text>
        </Group>
        <Divider />
        <Group>
          <Text w={100}>Details</Text>
          <Text fw={500}>{props.data.detail}</Text>
        </Group>
      </Stack>
    </Card>
  );
};

export const HistoryDetail = () => {
  useWalletSlice();
  const dataHistory = useSelector(selectHistoryTransaction);
  const dataHistoryESOP = useSelector(selectHistoryTransactionESOP);
  const navitation = useNavigate();
  const { historyId } = useParams();
  const location = useLocation();
  const detail = dataHistory[historyId ? historyId : 0];
  const detailESOP = dataHistoryESOP[historyId ? historyId : 0];

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
          {/history-esop/.test(location.pathname) ? (
            <>
              <PageTitle text={'Transaction detail'} back={moveToHistoryPage} />
              <RenderChildDetail data={detailESOP} />
            </>
          ) : (
            <>
              <PageTitle text={'Detail Trade'} back={moveToHistoryPage} />
              <RenderChildDetail data={detail} />
            </>
          )}
        </Stack>
      </Paper>
    </Center>
  );
};

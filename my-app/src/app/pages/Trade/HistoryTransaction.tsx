import { ActionIcon, Card, Center, Paper, Stack, Table } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconSquareChevronsRight } from '@tabler/icons';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageTitle } from '../Account/Information/Components/PageTitle';

import { dataHistory } from './data/History';

type Props = {};

export const HistoryTransaction = (props: Props) => {
  const navitation = useNavigate();
  const largerThan576 = useMediaQuery('(min-width:576px)');

  function moveToTrade() {
    navitation('/history');
  }

  function moveToTradeDetail(id) {
    navitation(`/history/detail/${id}`);
  }

  const rows = dataHistory.map(element => (
    <tr key={element.id}>
      <td>{element.service}</td>
      {largerThan576 && <td>{element.previousBalance}</td>}
      <td>{element.exchange}</td>
      {largerThan576 && <td>{element.curentBalance}</td>}
      {largerThan576 && <td>{element.timestamp}</td>}
      <td>{element.detail}</td>
      {!largerThan576 && (
        <ActionIcon onClick={() => moveToTradeDetail(element.id)}>
          <IconSquareChevronsRight />
        </ActionIcon>
      )}
    </tr>
  ));

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
          <PageTitle text="Trade" back={moveToTrade} />
          <Card shadow="sm" p="md" radius="md" withBorder>
            <Table striped highlightOnHover withColumnBorders>
              <thead>
                <tr>
                  {<th>type Trade</th>}
                  {largerThan576 && <th>previous balance</th>}
                  <th>exchange</th>
                  {largerThan576 && <th>current balance</th>}
                  {largerThan576 && <th>time</th>}
                  {<th>details</th>}
                  {!largerThan576 && <th></th>}
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
          </Card>
        </Stack>
      </Paper>
    </Center>
  );
};

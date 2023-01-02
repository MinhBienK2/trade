import { ActionIcon, Card, MediaQuery, Table } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconShoppingCart, IconSquareChevronsRight } from '@tabler/icons';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatVND } from 'utils/number';
import { InvestmentData } from '../../Data/InvestmentData';

export interface InvestCardProps {
  data: InvestmentData[];
}

export function InvestCard(props: InvestCardProps) {
  const navitation = useNavigate();
  const moveToInvestDetail = (project: number) => {
    navitation('/account/investment/detail/' + project);
  };
  const moveToTrade = (project: number) => {
    navitation('/trade/' + project);
  };
  const xs = useMediaQuery('(max-width: 500px)');
  let data = props.data;
  const rows = data.map(element => (
    <tr
      key={element.project}
      onClick={() =>
        xs
          ? moveToInvestDetail(element.projectId)
          : moveToTrade(element.projectId)
      }
    >
      <td>{element.project}</td>
      {!xs && <td>{element.numberOfShare}</td>}
      {!xs && <td>{element.pricePerShare}</td>}
      <td>{formatVND(element.totalValue)}</td>
      <td>
        {xs ? (
          <ActionIcon onClick={() => moveToTrade(element.projectId)}>
            <IconSquareChevronsRight />
          </ActionIcon>
        ) : (
          <ActionIcon onClick={() => moveToInvestDetail(element.projectId)}>
            <IconShoppingCart />
          </ActionIcon>
        )}
      </td>
    </tr>
  ));
  return (
    <Card shadow="sm" p="md" radius="xs" withBorder>
      <Table striped highlightOnHover withColumnBorders>
        <thead>
          <tr>
            <th>Project</th>
            {!xs && <th>Amount</th>}
            {!xs && <th>Price</th>}
            <th>Value</th>
            {xs ? <th>Detail</th> : <th>BUY MORE</th>}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Card>
  );
}

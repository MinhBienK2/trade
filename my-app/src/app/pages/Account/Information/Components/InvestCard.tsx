import { ActionIcon, Card, MediaQuery, Table } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconShoppingCart, IconSquareChevronsRight } from '@tabler/icons';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { formatVND } from 'helpers/formatCurrencyVND';
import { InvestedProject } from 'store/app/project/types';

export interface InvestCardProps {
  data: InvestedProject[];
}

export function InvestCard(props: InvestCardProps) {
  const { t } = useTranslation();
  const navitation = useNavigate();
  const moveToInvestDetail = (project: number) => {
    navitation('/account/investment/detail/' + project);
  };
  const moveToTrade = (project: number) => {
    navitation('/trade/buy/' + project);
  };

  const xs = useMediaQuery('(max-width: 500px)');
  let data = props.data;
  const rows = data.map(element => (
    <tr
      key={element.projectId}
      onClick={() =>
        xs
          ? moveToInvestDetail(element.projectId)
          : moveToTrade(element.projectId)
      }
    >
      <td>{element.nameProject}</td>
      {!xs && <td>{element.numberOfSharesPurchased}</td>}
      {!xs && <td>{element.pricePerShare}</td>}
      <td>
        {formatVND(element.numberOfSharesPurchased * element.pricePerShare)}
      </td>
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
            <th>{t('Account.detailCard.project')}</th>
            {!xs && <th>{t('Account.detailCard.amount')}</th>}
            {!xs && <th>{t('Account.detailCard.price')}</th>}
            <th>{t('Account.detailCard.value')}</th>
            {xs ? <th>Detail</th> : <th> {t('Account.detailCard.buyMore')}</th>}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Card>
  );
}

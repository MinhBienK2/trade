import { Card, Text, Center, Stack, Group, Divider, Button } from '@mantine/core';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { formatVND } from 'helpers/formatCurrencyVND';
import { InvestedProject } from 'store/app/project/types';
import { selectInvestShares } from 'store/app/project/selector';
import { useDispatch, useSelector } from 'react-redux';
import { useProjectSlice } from 'store/app/project';

export interface DetailCardProps {
  data: InvestedProject;
}

export function DetailCard(props: DetailCardProps) {
  const projectSlice = useProjectSlice();
  const { t } = useTranslation();
  const navigation = useNavigate();
  const dispatch = useDispatch();

  const investShares = useSelector(selectInvestShares);

  const moveToTrade = (project: number) => {
    if (investShares.length === 0) {
      dispatch(projectSlice.actions.requestUpdateInvestShares());
    }

    navigation('/trade/buy/' + project);
  };

  return (
    <Card shadow="sm" p="md" radius="md" withBorder>
      <Stack>
        <Group>
          <Text w={100}>ID</Text>
          <Text fw={500}>{props.data.id}</Text>
        </Group>
        <Divider />
        <Group>
          <Text w={100}>{t('Account.detailCard.project')}</Text>
          <Text fw={500}>{props.data.project}</Text>
        </Group>
        <Divider />
        <Group>
          <Text w={100}>{t('Account.detailCard.amount')}</Text>
          <Text fw={500}>{props.data.quantity}</Text>
        </Group>
        <Divider />
        <Group>
          <Text w={100}>{t('Account.detailCard.price')}</Text>
          <Text fw={500}>{formatVND(props.data.pricePerShare)}</Text>
        </Group>
        <Divider />
        <Group>
          <Text w={100}>{t('Account.detailCard.value')}</Text>
          <Text fw={500}>{formatVND(props.data.pricePerShare * props.data.quantity)}</Text>
        </Group>
        <Button onClick={() => moveToTrade(props.data.id)}>{t('Account.detailCard.buyMore')}</Button>
      </Stack>
    </Card>
  );
}

import { Card, Text, Center, Stack, Group, Divider, Button } from '@mantine/core';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { formatVND } from 'helpers/formatCurrencyVND';
import { InvestedProject } from 'store/app/project/types';

export interface DetailCardProps {
  data: InvestedProject;
}

export function DetailCard(props: DetailCardProps) {
  const { t } = useTranslation();
  const navitation = useNavigate();

  console.log(props.data);
  const moveToTrade = (project: number) => {
    navitation('/trade/buy/' + project);
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

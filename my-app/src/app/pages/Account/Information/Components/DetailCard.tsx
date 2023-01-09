import {
  Card,
  Text,
  Center,
  Stack,
  Group,
  Divider,
  Button,
} from '@mantine/core';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { InvestSharesTransaction } from 'store/app/profile/types';
import { formatVND } from 'utils/number';

export interface DetailCardProps {
  data: InvestSharesTransaction;
}

export function DetailCard(props: DetailCardProps) {
  const { t } = useTranslation();
  const navitation = useNavigate();

  const moveToTrade = (project: number) => {
    navitation('/trade/buy/' + project);
  };
  let data = props.data;
  return (
    <Card shadow="sm" p="md" radius="md" withBorder>
      <Stack>
        <Group>
          <Text w={100}>{t('Account.detailCard.project')}</Text>
          <Text fw={500}>{data.project}</Text>
        </Group>
        <Divider />
        <Group>
          <Text w={100}>{t('Account.detailCard.amount')}</Text>
          <Text fw={500}>{data.numberOfShare}</Text>
        </Group>
        <Divider />
        <Group>
          <Text w={100}>{t('Account.detailCard.price')}</Text>
          <Text fw={500}>{formatVND(data.pricePerShare)}</Text>
        </Group>
        <Divider />
        <Group>
          <Text w={100}>{t('Account.detailCard.value')}</Text>
          <Text fw={500}>
            {formatVND(data.pricePerShare * data.numberOfShare)}
          </Text>
        </Group>
        <Button onClick={() => moveToTrade(data.projectId)}>
          {t('Account.detailCard.buyMore')}
        </Button>
      </Stack>
    </Card>
  );
}

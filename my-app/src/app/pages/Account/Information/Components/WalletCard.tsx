import {
  Card,
  Text,
  Box,
  Stack,
  Group,
  Flex,
  Center,
  Divider,
  RingProgress,
  ActionIcon,
  createStyles,
} from '@mantine/core';
import {
  IconChevronRight,
  IconCircle,
  IconCoin,
  IconGift,
  IconPigMoney,
  IconReportMoney,
  IconZoomMoney,
  TablerIcon,
} from '@tabler/icons';
import * as React from 'react';
import { formatVND } from 'helpers/formatCurrencyVND';
import { WalletData } from '../../Data/WalletData';
import { useTranslation } from 'react-i18next';

export interface WalletCardProps {
  data: WalletData;
}

export function WalletCard(props: WalletCardProps) {
  const { t } = useTranslation();
  const { classes } = useStyle();
  const p1 = (props.data.balance * 100) / props.data.total;
  const p2 = (props.data.esop * 100) / props.data.total;
  const p3 = 100 - p1 - p2;

  return (
    <Card shadow="sm" p="md" radius="xs" withBorder>
      <Center>
        <Stack>
          <Group className={classes.groupValue}>
            <IconReportMoney color="violet" />
            <Text fw={500} fz={20} color="violet">
              {formatVND(props.data.total)}
            </Text>
            <ActionIcon></ActionIcon>
          </Group>
          <Divider label={t('Profile.assets.total')} labelPosition="center" />
          <Group className={classes.containerValue}>
            <Stack className={classes.stackValue}>
              <Group className={classes.groupValue}>
                <IconCoin color="orange" />
                <Text color="orange">{formatVND(props.data.balance)}</Text>
                <ActionIcon></ActionIcon>
              </Group>
              <Divider
                label={t('Profile.assets.balance')}
                labelPosition="center"
              />
              <Group className={classes.groupValue}>
                <IconGift color="cyan" />
                <Text color="cyan">{formatVND(props.data.esop)}</Text>
                <ActionIcon></ActionIcon>
              </Group>
              <Divider
                label={t('Profile.assets.esop')}
                labelPosition="center"
              />
              <Group className={classes.groupValue}>
                <IconPigMoney color="green" />
                <Text color="green">{formatVND(props.data.stock)}</Text>
                <ActionIcon></ActionIcon>
              </Group>
              <Divider
                label={t('Profile.assets.stock')}
                labelPosition="center"
              />
            </Stack>
            <RingProgress
              size={200}
              thickness={40}
              sections={[
                { value: p1, color: 'orange', tooltip: 'Balance' },
                { value: p2, color: 'cyan', tooltip: 'Esop' },
                { value: p3, color: 'green', tooltip: 'Stock' },
              ]}
            />
          </Group>
        </Stack>
      </Center>
    </Card>
  );
}

const useStyle = createStyles(theme => ({
  containerValue: {
    '@media (max-width:576px)': {
      justifyContent: 'center',
    },
  },
  stackValue: {
    '@media (max-width:576px)': {
      width: '100%',
    },
  },
  groupValue: {
    '@media (max-width:576px)': {
      justifyContent: 'space-between',
    },
  },
}));

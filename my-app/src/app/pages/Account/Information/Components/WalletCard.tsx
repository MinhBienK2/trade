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
import { formatVND } from 'utils/number';
import { WalletData } from '../../Data/WalletData';

export interface WalletCardProps {
  data: WalletData;
}

export function WalletCard(props: WalletCardProps) {
  const p1 = (props.data.balance * 100) / props.data.total;
  const p2 = (props.data.esop * 100) / props.data.total;
  const p3 = 100 - p1 - p2;
  return (
    <Card shadow="sm" p="md" radius="xs" withBorder>
      <Center>
        <Stack>
          <Group>
            <IconReportMoney color="violet" />
            <Text fw={500} fz={20} color="violet">
              {formatVND(props.data.total)}
            </Text>
          </Group>
          <Divider label="total" labelPosition="center" />
          <Group>
            <Stack>
              <Group>
                <IconCoin color="orange" />
                <Text color="orange">{formatVND(props.data.balance)}</Text>
              </Group>
              <Divider label="balance" labelPosition="center" />
              <Group>
                <IconGift color="cyan" />
                <Text color="cyan">{formatVND(props.data.esop)}</Text>
              </Group>
              <Divider label="esop" labelPosition="center" />
              <Group>
                <IconPigMoney color="green" />
                <Text color="green">{formatVND(props.data.stock)}</Text>
              </Group>
              <Divider label="stock" labelPosition="center" />
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

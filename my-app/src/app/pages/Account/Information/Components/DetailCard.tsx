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
import { useNavigate } from 'react-router-dom';
import { formatVND } from 'utils/number';
import { InvestmentData } from '../../Data/InvestmentData';

export interface DetailCardProps {
  data: InvestmentData;
}

export function DetailCard(props: DetailCardProps) {
  const navitation = useNavigate();
  const moveToTrade = (project: number) => {
    navitation('/trade/buy/' + project);
  };
  let data = props.data;
  return (
    <Card shadow="sm" p="md" radius="md" withBorder>
      <Stack>
        <Group>
          <Text w={100}>Project</Text>
          <Text fw={500}>{data.project}</Text>
        </Group>
        <Divider />
        <Group>
          <Text w={100}>Amount</Text>
          <Text fw={500}>{data.numberOfShare}</Text>
        </Group>
        <Divider />
        <Group>
          <Text w={100}>Price</Text>
          <Text fw={500}>{formatVND(data.pricePerShare)}</Text>
        </Group>
        <Divider />
        <Group>
          <Text w={100}>Value</Text>
          <Text fw={500}>{formatVND(data.totalValue)}</Text>
        </Group>
        <Button onClick={() => moveToTrade(data.projectId)}>BUY MORE</Button>
      </Stack>
    </Card>
  );
}

import {
  Card,
  Text,
  Center,
  Stack,
  Group,
  Divider,
  Button,
  Accordion,
  Anchor,
} from '@mantine/core';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatVND } from 'utils/number';
import { ProjectData } from './ProjectData';

export interface ProjectCardProps {
  data: ProjectData;
}

export function ProjectCard(props: ProjectCardProps) {
  const navitation = useNavigate();
  const moveToTrade = (project: number) => {
    navitation('/trade/buy/' + project);
  };
  let data = props.data;
  return (
    <Card shadow="sm" p="md" radius="xs" withBorder>
      <Stack>
        <Divider />
        <Group>
          <Text w={100}>Price</Text>
          <Text fw={500}>{formatVND(data.price)}</Text>
        </Group>
        <Divider />
        <Group>
          <Text w={100}>Supply</Text>
          <Text fw={500}>{data.totalShare}</Text>
        </Group>
        <Divider />
        <Group>
          <Text w={100}>Market Cap</Text>
          <Text fw={500}>{formatVND(data.totalValue)}</Text>
        </Group>
        <Divider />
        <Group>
          <Text w={100}>Listed</Text>
          <Text fw={500}>{data.maxTradingShare}</Text>
        </Group>
        <Divider />
        <Group>
          <Text w={100}>Listed Cap</Text>
          <Text fw={500}>{formatVND(data.maxTradingValue)}</Text>
        </Group>
        <Divider />
        <Group>
          <Text w={100}>Outstanding</Text>
          <Text fw={500}>{data.currentTradingShare}</Text>
        </Group>
        <Divider />
        <Group>
          <Text w={100}>Outstanding Cap</Text>
          <Text fw={500}>{formatVND(data.currentTradingValue)}</Text>
        </Group>
        <Divider />
        <Button onClick={() => moveToTrade(data.projectId)}>BUY</Button>
      </Stack>
    </Card>
  );
}

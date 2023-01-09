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
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { formatVND } from 'utils/number';
import { ProjectData } from './ProjectData';

export interface ProjectCardProps {
  data: ProjectData;
}

export function ProjectCard(props: ProjectCardProps) {
  const { t } = useTranslation();
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
          <Text w={100}>{t('Project.project_card.price')}</Text>
          <Text fw={500}>{formatVND(data.price)}</Text>
        </Group>
        <Divider />
        <Group>
          <Text w={100}>{t('Project.project_card.supply')}</Text>
          <Text fw={500}>{data.totalShare}</Text>
        </Group>
        <Divider />
        <Group>
          <Text w={100}>{t('Project.project_card.market_cap')}</Text>
          <Text fw={500}>{formatVND(data.totalValue)}</Text>
        </Group>
        <Divider />
        <Group>
          <Text w={100}>{t('Project.project_card.listed')}</Text>
          <Text fw={500}>{data.maxTradingShare}</Text>
        </Group>
        <Divider />
        <Group>
          <Text w={100}>{t('Project.project_card.listed_cap')}</Text>
          <Text fw={500}>{formatVND(data.maxTradingValue)}</Text>
        </Group>
        <Divider />
        <Group>
          <Text w={100}>{t('Project.project_card.outstanding')}</Text>
          <Text fw={500}>{data.currentTradingShare}</Text>
        </Group>
        <Divider />
        <Group>
          <Text w={100}>{t('Project.project_card.outstanding_cap')}</Text>
          <Text fw={500}>{formatVND(data.currentTradingValue)}</Text>
        </Group>
        <Divider />
        <Button onClick={() => moveToTrade(data.projectId)}>
          {t('Project.project_card.buy')}
        </Button>
      </Stack>
    </Card>
  );
}

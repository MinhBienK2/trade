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
import { formatVND } from 'helpers/formatCurrencyVND';
import { DataProject } from 'store/app/project/types';

export interface ProjectCardProps {
  data: DataProject;
}

export function ProjectCard(props: ProjectCardProps) {
  const { t } = useTranslation();
  const navitation = useNavigate();

  const moveToTrade = (project: number) => {
    navitation('/trade/buy/' + project);
  };

  return (
    <Card shadow="sm" p="md" radius="xs" withBorder>
      <Stack>
        <Divider />
        <Group>
          <Text w={100}>{t('Project.project_card.price')}</Text>
          <Text fw={500}>{formatVND(props.data.pricePerShare)}</Text>
        </Group>
        <Divider />
        <Group>
          <Text w={100}>{t('Project.project_card.supply')}</Text>
          <Text fw={500}>{props.data.supply}</Text>
        </Group>
        <Divider />
        <Group>
          <Text w={100}>{t('Project.project_card.market_cap')}</Text>
          <Text fw={500}>{formatVND(props.data.marketCap)}</Text>
        </Group>
        <Divider />
        <Group>
          <Text w={100}>{t('Project.project_card.listed')}</Text>
          <Text fw={500}>{props.data.maxTradingShare}</Text>
        </Group>
        <Divider />
        <Group>
          <Text w={100}>{t('Project.project_card.listed_cap')}</Text>
          <Text fw={500}>{formatVND(props.data.maxTradingValue)}</Text>
        </Group>
        <Divider />
        <Group>
          <Text w={100}>{t('Project.project_card.outstanding')}</Text>
          <Text fw={500}>{props.data.currentTradingShare}</Text>
        </Group>
        <Divider />
        <Group>
          <Text w={100}>{t('Project.project_card.outstanding_cap')}</Text>
          <Text fw={500}>{formatVND(props.data.currentTradingValue)}</Text>
        </Group>
        <Divider />
        <Button onClick={() => moveToTrade(props.data.projectId)}>
          {t('Project.project_card.buy')}
        </Button>
      </Stack>
    </Card>
  );
}

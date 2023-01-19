import * as React from 'react';
import { Badge, Center, Paper, Stack } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { selectListProject } from 'store/app/project/selector';
import { selectLanguage } from 'store/app/user/selector';
import { PageRow } from '../Account/Information/Components/PageRow';
import { PageTitle } from '../Account/Information/Components/PageTitle';

export function ProjectPage() {
  const { t } = useTranslation();
  const navitation = useNavigate();

  const userLanguage = useSelector(selectLanguage);
  const projects = useSelector(selectListProject);

  function moveToHomePage() {
    navitation('/');
  }
  function moveToProjectDetail(projectId: number) {
    navitation('/projects/detail/' + projectId);
  }
  return (
    <Center sx={{ height: '100vh' }}>
      <Paper
        withBorder
        sx={{
          height: '100%',
          width: '100%',
          minWidth: '300px',
          padding: '5px',
        }}
      >
        <Stack>
          <PageTitle text={t('Account.detailCard.project')} back={moveToHomePage} selectLanguage={userLanguage} />
          {projects.map(item => (
            <PageRow
              key={item.projectId}
              leftIcon={<Badge>{item.projectId}</Badge>}
              rightIcon={<IconChevronRight />}
              text={item.nameProject}
              next={() => moveToProjectDetail(item.projectId)}
            />
          ))}
        </Stack>
      </Paper>
    </Center>
  );
}

import { Badge, Center, Paper, Stack } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { PageRow } from '../Account/Information/Components/PageRow';
import { PageTitle } from '../Account/Information/Components/PageTitle';
import { ProjectCard } from './ProjectCard';
import { sampleProjectData } from './ProjectData';
export function ProjectPage() {
  const navitation = useNavigate();
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
          <PageTitle text="Projects" back={moveToHomePage} />
          {sampleProjectData.map(item => (
            <PageRow
              key={item.projectId}
              leftIcon={<Badge>{item.projectId}</Badge>}
              rightIcon={<IconChevronRight />}
              text={item.project}
              next={() => moveToProjectDetail(item.projectId)}
            />
          ))}
        </Stack>
      </Paper>
    </Center>
  );
}

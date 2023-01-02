import { Paper, Center, Stack } from '@mantine/core';
import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageQuote } from '../Account/Information/Components/PageQuote';
import { PageTitle } from '../Account/Information/Components/PageTitle';
import { ProjectCard } from './ProjectCard';
import { getProjectData } from './ProjectData';

export function ProjectDetailPage() {
  const navitation = useNavigate();
  const moveToProjectPage = () => {
    navitation('/projects');
  };
  const params = useParams();
  const projectId = params['project'] ? parseInt(params['project']) : 0;
  const projectData = getProjectData(projectId);
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
          <PageTitle
            text={projectData ? projectData.project : 'Project Not Found'}
            back={moveToProjectPage}
          />
          {projectData ? <ProjectCard data={projectData} /> : <PageQuote />}
        </Stack>
      </Paper>
    </Center>
  );
}

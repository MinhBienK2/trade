import { Paper, Center, Stack } from '@mantine/core';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useUserSlice } from 'store/app/user';
import { selectLanguage } from 'store/app/user/selector';
import { PageQuote } from '../Account/Information/Components/PageQuote';
import { PageTitle } from '../Account/Information/Components/PageTitle';
import { ProjectCard } from './ProjectCard';
import { getProjectData } from './ProjectData';

export function ProjectDetailPage() {
  useUserSlice();
  const userLanguage = useSelector(selectLanguage);
  const navitation = useNavigate();
  const param = useParams();

  console.log(param);

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
            selectLanguage={userLanguage}
          />
          {projectData ? <ProjectCard data={projectData} /> : <PageQuote />}
        </Stack>
      </Paper>
    </Center>
  );
}

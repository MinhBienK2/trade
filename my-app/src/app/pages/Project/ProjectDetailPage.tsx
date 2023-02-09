import { Paper, Center, Stack } from '@mantine/core';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useProjectSlice } from 'store/app/project';
import { selectListProject } from 'store/app/project/selector';
import { selectLanguage } from 'store/app/user/selector';
import { PageQuote } from '../Account/Information/Components/PageQuote';
import { PageTitle } from '../Account/Information/Components/PageTitle';
import { getProjectData } from '../Trade/FormTrade';
import { ProjectCard } from './ProjectCard';

export function ProjectDetailPage() {
  useProjectSlice();
  const navitation = useNavigate();

  const userLanguage = useSelector(selectLanguage);
  const listProject = useSelector(selectListProject);
  const params = useParams();
  const projectId = params['project'] ? parseInt(params['project']) : 0;
  const projectData = getProjectData(projectId, listProject);

  const moveToProjectPage = () => {
    navitation('/projects');
  };

  return (
    <>
      <Helmet>
        <title>Project Detail</title>
        <meta name="ProjectDetail" content="Share Inverst" />
      </Helmet>

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
              text={projectData ? projectData.nameProject : 'Project Not Found'}
              back={moveToProjectPage}
              selectLanguage={userLanguage}
            />
            {projectData ? <ProjectCard data={projectData} /> : <PageQuote />}
          </Stack>
        </Paper>
      </Center>
    </>
  );
}

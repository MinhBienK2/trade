import { createStyles, LoadingOverlay as LoadingOverlayMantine } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React from 'react';

interface styleLoadingOverlayProfile {
  media: boolean;
}

export const LoadingOverlay = () => {
  const smallThan768 = useMediaQuery('(max-width:768px');
  const { classes } = useStyleLoadingOVerlay({ media: smallThan768 });

  return (
    <LoadingOverlayMantine
      // loaderProps={{ size: 'xl', color: '#9B2259', variant: 'oval' }}
      overlayOpacity={0.7}
      overlayColor="#c5c5c5"
      visible
      className={classes.root}
    />
  );
};

const useStyleLoadingOVerlay = createStyles((theme, params: styleLoadingOverlayProfile) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: params.media ? '100%' : '100vw',
    height: params.media ? '100%' : '100vh',
  },
}));

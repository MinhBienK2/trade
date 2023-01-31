import * as React from 'react';
import { Box, Title, Center, Divider, Stack, ActionIcon, createStyles } from '@mantine/core';

import 'react-phone-input-2/lib/bootstrap.css';
import { useTranslation } from 'react-i18next';

import { ReactComponent as LogoTelegram } from 'assets/icons/logostelegram.svg';
import { apiGet } from 'utils/http/request';

export function LoginForm() {
  const { t } = useTranslation();
  const { classes } = useStyle();

  const handleCLickButton = async () => {
    const url = '/v1/tele/getlinklogin';

    const res = await apiGet(url, null);

    if (res?.data?.link) window.location.href = res.data.link;
  };

  return (
    <Box sx={{ minWidth: '300px' }}>
      <Center>
        <Title>{t('Register.loginPage.title')}</Title>
      </Center>
      <Divider my="sm" />
      <Stack mt={30} align={'center'} onClick={handleCLickButton}>
        <ActionIcon className={classes.iconLogin}>
          <LogoTelegram className={classes.iconLogin} />
        </ActionIcon>
      </Stack>
    </Box>
  );
}

const useStyle = createStyles(theme => ({
  iconLogin: {
    width: '50px',
    height: '50px',
    '&:hover': {
      background: '#fff',
    },
  },
}));

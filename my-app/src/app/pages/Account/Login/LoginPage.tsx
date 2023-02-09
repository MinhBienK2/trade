import { Center, Paper } from '@mantine/core';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { LoginForm } from './LoginForm';
export function LoginPage() {
  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="Login" content="Share Inverst" />
      </Helmet>

      <Center sx={{ height: '100vh' }}>
        <Paper shadow="sm" p="lg" radius="md" withBorder>
          <LoginForm></LoginForm>
        </Paper>
      </Center>
    </>
  );
}

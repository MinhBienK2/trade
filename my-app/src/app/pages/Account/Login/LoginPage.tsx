import { Center, Paper } from '@mantine/core';
import * as React from 'react';
import { LoginForm } from './LoginForm';
export function LoginPage() {
  return (
    <Center sx={{ height: '100vh' }}>
      <Paper shadow="sm" p="lg" radius="md" withBorder>
        <LoginForm></LoginForm>
      </Paper>
    </Center>
  );
}

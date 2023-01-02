import { Center, Paper } from '@mantine/core';
import * as React from 'react';
import { RegisterForm } from './RegisterForm';
export function RegisterPage() {
  return (
    <Center sx={{ height: '100vh' }}>
      <Paper shadow="sm" p="lg" radius="md" withBorder>
        <RegisterForm></RegisterForm>
      </Paper>
    </Center>
  );
}

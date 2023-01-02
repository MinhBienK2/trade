import * as React from 'react';

import {
  TextInput,
  Button,
  Group,
  PasswordInput,
  Box,
  Text,
  Anchor,
  Title,
  Center,
  Divider,
  Stack,
} from '@mantine/core';
import { IconLock, IconUser } from '@tabler/icons';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';

export function LoginForm() {
  const form = useForm({
    initialValues: {
      account: '',
      password: '',
    },
    validate: {
      account: value =>
        value.length < 6 ? 'Account is at least 8 characters' : null,
      password: value =>
        value.length < 6 ? 'Password is at least 8 characters' : null,
    },
  });

  const submitForm = () => {
    console.log('submitForm', form.values);
    form.validate();
  };
  const navigate = useNavigate();
  const linkToRegisterPage = () => {
    navigate('/account/register');
  };

  return (
    <Box sx={{ minWidth: '300px', minHeight: '300px' }}>
      <form>
        <Center>
          <Title>EASY INVEST</Title>
        </Center>
        <Divider my="sm" />
        <Stack>
          <TextInput
            icon={<IconUser />}
            label={<Text size={'lg'}>Account</Text>}
            placeholder="Input your account"
            {...form.getInputProps('account')}
          />
          <PasswordInput
            icon={<IconLock />}
            label={<Text size={'lg'}>Password</Text>}
            placeholder="Input your password"
            {...form.getInputProps('password')}
          />
          <Stack mt="md">
            <Button onClick={submitForm}>Login</Button>
            <Center>
              <Anchor onClick={linkToRegisterPage}>Create New Account</Anchor>
            </Center>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
}

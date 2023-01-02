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

export function RegisterForm() {
  const form = useForm({
    initialValues: {
      account: '',
      password: '',
      confirm_password: '',
    },
    validate: {
      account: value =>
        value.length < 6 ? 'Account is at least 8 characters.' : null,
      password: value =>
        value.length < 6 ? 'Password is at least 8 characters.' : null,
      confirm_password: value =>
        value !== form.values.password ? 'Password is not match.' : null,
    },
  });

  const registerAccount = () => {
    console.log('submitForm', form.values);
    form.validate();
  };
  const navigate = useNavigate();
  const linkToLoginPage = () => {
    navigate('/account/login');
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
          <PasswordInput
            icon={<IconLock />}
            label={<Text size={'lg'}>Confirm Password</Text>}
            placeholder="Confirm your password"
            {...form.getInputProps('confirm_password')}
          />
          <Stack mt="md">
            <Button onClick={registerAccount}>Register</Button>
            <Center>
              <Anchor onClick={linkToLoginPage}>Already Have An Account</Anchor>
            </Center>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
}

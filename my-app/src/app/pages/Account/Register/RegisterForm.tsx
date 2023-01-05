import * as React from 'react';
import PhoneInput from 'react-phone-input-2';
import {
  Button,
  PasswordInput,
  Box,
  Text,
  Anchor,
  Title,
  Center,
  Divider,
  Stack,
  createStyles,
} from '@mantine/core';
import { IconLock } from '@tabler/icons';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';

import { useUserSlice } from 'store/app/user';
import { useDispatch, useSelector } from 'react-redux';
import { selectErrorRegister, selectLoading } from 'store/app/user/selector';
import { LoginData } from 'store/app/user/response';

import 'react-phone-input-2/lib/bootstrap.css';

export function RegisterForm() {
  const { actions } = useUserSlice();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const errorResponseRegister = useSelector(selectErrorRegister);
  const { classes } = useStyle();
  const form = useForm({
    initialValues: {
      phoneNumber: '',
      password: '',
      confirm_password: '',
    },
    validate: {
      phoneNumber: value =>
        value.length < 6 ? 'Account is at least 8 characters.' : null,
      password: value =>
        value.length < 6 ? 'Password is at least 8 characters.' : null,
      confirm_password: value =>
        value !== form.values.password ? 'Password is not match.' : null,
    },
  });

  const handleCLickButton = () => {
    dispatch(actions.resetResponseError({ type: 'register' }));
  };

  const registerAccount = values => {
    const body: LoginData = {
      phoneNumber: values.phoneNumber,
      password: values.password,
    };

    dispatch(actions.requestRegister(body));
  };
  const navigate = useNavigate();
  const linkToLoginPage = () => {
    navigate('/login');
  };

  return (
    <Box sx={{ minWidth: '300px', minHeight: '300px' }}>
      <form onSubmit={form.onSubmit(values => registerAccount(values))}>
        <Center>
          <Title>EASY INVEST</Title>
        </Center>
        <Divider my="sm" />
        <Stack>
          <Box>
            <Text className={classes.labelPhone}>Phone Number</Text>
            <PhoneInput
              placeholder="Enter phone number"
              enableSearch
              country="vn"
              countryCodeEditable={false}
              value={form.values.phoneNumber}
              onChange={value =>
                form.setFieldValue('phoneNumber', String(value))
              }
            />
          </Box>

          {errorResponseRegister === 10 && (
            <Text c={'red'}>Số điện thoại đã tồn tại </Text>
          )}

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
            <Button
              loading={loading}
              type={'submit'}
              onClick={handleCLickButton}
            >
              Register
            </Button>
            <Center>
              <Anchor onClick={linkToLoginPage}>Already Have An Account</Anchor>
            </Center>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
}

const useStyle = createStyles(theme => ({
  labelPhone: {
    fontFamily:
      '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji',
    color: 'black',
    fontSize: '18px',
    lineHeight: 1.55,
    fontWeight: 500,
    marginBottom: '3px',
  },
}));

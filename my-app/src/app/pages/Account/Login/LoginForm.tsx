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
import { selectErrorLogin, selectLoading } from 'store/app/user/selector';

import {
  RESPONSE_ERROR_PASSWORD_NOT_AXISTS,
  RESPONSE_ERROR_PHONE_NUMBER_NOT_AXISTS,
} from 'const/register';

import 'react-phone-input-2/lib/bootstrap.css';

export function LoginForm() {
  const { actions } = useUserSlice();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const errorResponseLogin = useSelector(selectErrorLogin);
  const { classes } = useStyle();

  const form = useForm({
    initialValues: {
      phoneNumber: '',
      password: '',
    },
    validate: {
      phoneNumber: value =>
        value.length < 6 ? 'Account is at least 8 characters' : null,
      password: value =>
        value.length < 6 ? 'Password is at least 8 characters' : null,
    },
  });

  const handleCLickButton = () => {
    dispatch(actions.resetResponseError({ type: 'login' }));
  };

  const submitForm = values => {
    dispatch(actions.requestLogin(values));
  };

  const navigate = useNavigate();
  const linkToRegisterPage = () => {
    navigate('/register');
  };

  return (
    <Box sx={{ minWidth: '300px', minHeight: '300px' }}>
      <form onSubmit={form.onSubmit(values => submitForm(values))}>
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

          <PasswordInput
            icon={<IconLock />}
            label={<Text size={'lg'}>Password</Text>}
            placeholder="Input your password"
            {...form.getInputProps('password')}
          />

          {(errorResponseLogin === RESPONSE_ERROR_PASSWORD_NOT_AXISTS ||
            errorResponseLogin === RESPONSE_ERROR_PHONE_NUMBER_NOT_AXISTS) && (
            <Text c={'red'}>Sai số điện thoại hoặc mật khẩu</Text>
          )}

          <Stack mt="md">
            <Button
              loading={loading}
              type={'submit'}
              onClick={handleCLickButton}
            >
              Login
            </Button>
            <Center>
              <Anchor onClick={linkToRegisterPage}>Create New Account</Anchor>
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

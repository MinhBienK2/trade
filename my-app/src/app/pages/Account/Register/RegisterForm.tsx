import * as React from 'react';
import PhoneInput from 'react-phone-input-2';
import { Button, PasswordInput, Box, Text, Anchor, Title, Center, Divider, Stack, createStyles } from '@mantine/core';
import { IconLock } from '@tabler/icons';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { selectErrorRegister, selectLoading } from 'store/app/user/selector';
import { LoginData } from 'store/app/user/response';
import { userActions } from 'store/app/user';

import 'react-phone-input-2/lib/bootstrap.css';
import { useTranslation } from 'react-i18next';

export function RegisterForm() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { classes } = useStyle();

  const loading = useSelector(selectLoading);
  const errorResponseRegister = useSelector(selectErrorRegister);

  const form = useForm({
    initialValues: {
      phoneNumber: '',
      password: '',
      confirm_password: '',
    },
    validate: {
      phoneNumber: value => (value.length < 6 ? 'Account is at least 8 characters.' : null),
    },
  });

  const handleCLickButton = () => {
    dispatch(userActions.resetResponseError({ type: 'register' }));
  };

  const registerAccount = values => {
    const body: LoginData = {
      phoneNumber: values.phoneNumber,
      password: values.password,
    };

    dispatch(userActions.requestRegister(body));
  };
  const navigate = useNavigate();
  const linkToLoginPage = () => {
    navigate('/login');
  };

  return (
    <Box sx={{ minWidth: '300px', minHeight: '300px' }}>
      <form onSubmit={form.onSubmit(values => registerAccount(values))}>
        <Center>
          <Title>{t('Register.loginPage.title')}</Title>
        </Center>
        <Divider my="sm" />
        <Stack spacing={8}>
          <Box>
            <Text className={classes.labelPhone}>{t('Register.loginPage.label_phone_number')}</Text>
            <PhoneInput
              placeholder={t('Register.loginPage.placeholder_phone_number')}
              enableSearch
              country="vn"
              countryCodeEditable={false}
              value={form.values.phoneNumber}
              onChange={value => form.setFieldValue('phoneNumber', String(value))}
            />
          </Box>

          {errorResponseRegister === 10 && <Text c={'red'}>{t('Register.error.account_not_axist')}</Text>}

          <Stack mt="md">
            <Button loading={loading} type={'submit'} onClick={handleCLickButton}>
              {t('Register.registerPage.button_title')}
            </Button>
            <Center>
              <Anchor onClick={linkToLoginPage}>{t('Register.registerPage.already_have_an_account')}</Anchor>
            </Center>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
}

const useStyle = createStyles(theme => ({
  labelPhone: {
    fontFamily: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji',
    color: 'black',
    fontSize: '18px',
    lineHeight: 1.55,
    fontWeight: 500,
    marginBottom: '3px',
  },
  innerInput: {
    height: '57px',
  },
  input: {
    height: '57px',
  },
}));

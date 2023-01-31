import * as React from 'react';
import PhoneInput from 'react-phone-input-2';
import { Button, PasswordInput, Box, Text, Anchor, Title, Center, Divider, Stack, createStyles } from '@mantine/core';
import { IconLock } from '@tabler/icons';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { selectErrorLogin, selectLoading } from 'store/app/user/selector';
import { userActions } from 'store/app/user';
import { RESPONSE_ERROR_PASSWORD_NOT_AXISTS, RESPONSE_ERROR_PHONE_NUMBER_NOT_AXISTS } from 'constants/register';

import 'react-phone-input-2/lib/bootstrap.css';
import { useTranslation } from 'react-i18next';

export function LoginForm() {
  const { t } = useTranslation();
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
      phoneNumber: value => (value.length < 6 ? 'Account is at least 8 characters' : null),
    },
  });

  const handleCLickButton = () => {
    dispatch(userActions.resetResponseError({ type: 'login' }));
  };

  const submitForm = values => {
    dispatch(userActions.requestLogin(values));
  };

  const navigate = useNavigate();
  const linkToRegisterPage = () => {
    navigate('/register');
  };

  return (
    <Box sx={{ minWidth: '300px', minHeight: '300px' }}>
      <form onSubmit={form.onSubmit(values => submitForm(values))}>
        <Center>
          <Title>{t('Register.loginPage.title')}</Title>
        </Center>
        <Divider my="sm" />
        <Stack spacing={10}>
          <Box>
            <Text className={classes.labelPhone}>{t('Register.loginPage.label_phone_number')}</Text>
            <PhoneInput
              placeholder={t('Register.loginPage.placeholder_phone_number')} //"Enter phone number"
              enableSearch
              country="vn"
              countryCodeEditable={false}
              value={form.values.phoneNumber}
              onChange={value => form.setFieldValue('phoneNumber', String(value))}
            />
          </Box>

          {(errorResponseLogin === RESPONSE_ERROR_PASSWORD_NOT_AXISTS ||
            errorResponseLogin === RESPONSE_ERROR_PHONE_NUMBER_NOT_AXISTS) && (
            <Text c={'red'}>{t('Register.error.wrong_error')}</Text>
          )}

          <Stack mt="md">
            <Button loading={loading} type={'submit'} onClick={handleCLickButton}>
              {t('Register.loginPage.ButtonTitle')}
            </Button>
            <Center>
              <Anchor onClick={linkToRegisterPage}>{t('Register.loginPage.create_new_account')}</Anchor>
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

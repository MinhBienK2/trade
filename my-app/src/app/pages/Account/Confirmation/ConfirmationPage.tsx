import { Button, Center, createStyles, Group, Stack, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useInterval } from '@mantine/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from '@mantine/hooks';
import OtpInput from 'libs/OtpInput';

import { PageTitle } from '../Information/Components/PageTitle';
import { selectErrorLogin, selectLanguage } from 'store/app/user/selector';
import { userActions } from 'store/app/user';
import { selectNameTelegram } from 'store/app/profile/selector';

export const ConfirmationPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { classes } = useStyles();
  const navigation = useNavigate();

  const [otp, setOtp] = useState('');
  const smallThan768 = useMediaQuery('(max-width:768px');
  const userLanguage = useSelector(selectLanguage);
  const ErrorUserLogin = useSelector(selectErrorLogin);
  const nameTelegram = useSelector(selectNameTelegram);

  const [seconds, setSeconds] = useState(300);
  const interval = useInterval(() => setSeconds(s => s - 1), 1000);

  // reset error login to navigate
  useEffect(() => {
    dispatch(userActions.resetResponseError({ type: 'login' }));
  }, []);

  useEffect(() => {
    interval.start();
    return interval.stop;
  }, []);

  useEffect(() => {
    if (seconds === 0) return interval.stop;
  }, [seconds]);

  const handleChange = otp => {
    return setOtp(otp);
  };

  const handleConfirmOTP = () => {
    const REQUIRED_INPUT_CHARACTERS = 6;

    if (otp.length === REQUIRED_INPUT_CHARACTERS) {
      dispatch(userActions.requestConfirmOTP({ otpCode: otp }));
    }
  };

  const handleResendOTP = () => {
    const url = '';

    const { data } = { data: { error: 0, message: 'success' } };

    if (data.error === 0) {
      setSeconds(300);
    }
  };

  const moveToHomePage = () => {
    navigation('/login');
  };

  return (
    <>
      <PageTitle text={t('Confirmation.title')} back={moveToHomePage} selectLanguage={userLanguage} />
      <Center px={16}>
        <Stack className={classes.stack} spacing={smallThan768 ? 0 : 16}>
          <Text mt={20}>
            {t('Confirmation.required')}: <span style={{ fontWeight: 600 }}>{nameTelegram}</span>
          </Text>
          <OtpInput
            value={otp}
            onChange={handleChange}
            numInputs={6}
            isInputNum={true}
            shouldAutoFocus={true}
            containerStyle={classes.optContainer}
            inputStyle={classes.otpInput}
          />
          <Group>
            {seconds < 0 ? (
              <Text className={classes.textErrorEffect}>{t('Confirmation.expire')}</Text>
            ) : ErrorUserLogin !== -1 ? (
              <Text className={classes.textErrorEffect}>{t('Confirmation.errorEffect')}</Text>
            ) : (
              <Text className={classes.textEffect}>
                {t('Confirmation.effect')}
                <Text span className={classes.textEffect}>
                  {seconds}
                </Text>
                s!
              </Text>
            )}

            <Text
              underline={true}
              className={classes.textResend}
              onClick={() => {
                handleResendOTP();
              }}
            >
              {t('Confirmation.resend')}
            </Text>
          </Group>

          <Group position={'center'} mt={'24px'}>
            <Button onClick={handleConfirmOTP}>{t('Confirmation.button')}</Button>
          </Group>
        </Stack>
      </Center>
    </>
  );
};

const useStyles = createStyles(theme => ({
  stack: {
    maxWidth: '710px',
    width: '100%',
  },
  label: {
    fontFamily: 'Poppins Semibold',
    marginTop: '64px',
  },
  optContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    margin: '24px 0',
  },
  otpInput: {
    width: '70px !important',
    height: '78px',
    background: '#FFEBF3',
    borderRadius: '8px',
    border: 0,
    fontSize: '30px',
    color: '#000000',
    fontWeight: 700,
    '@media (max-width : 576px)': {
      width: '47px !important',
      height: '48px',
      fontSize: '24px',
    },
  },

  // text
  textEffect: {
    fontSize: '18px',
  },
  textErrorEffect: {
    fontSize: '18px',
    color: '#FF0000',
  },
  textResend: {
    fontFamily: 'Poppins Semibold',
    fontSize: '18px',
    cursor: 'pointer',
  },

  styleErrorInput: {
    background: theme.white,
    border: '1px red solid',
    color: 'red',
  },
}));

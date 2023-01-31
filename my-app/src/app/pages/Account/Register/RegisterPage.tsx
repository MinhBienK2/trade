import { Center, Paper } from '@mantine/core';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useProfileSlice } from 'store/app/profile';
import { selectPathLinkTelegram } from 'store/app/profile/selector';
import { selectErrorRegister } from 'store/app/user/selector';
import { RegisterForm } from './RegisterForm';
import { userActions } from 'store/app/user';

export function RegisterPage() {
  useProfileSlice();
  const dispatch = useDispatch();

  const ErrorUserRegister = useSelector(selectErrorRegister);
  const LinkPartyThree = useSelector(selectPathLinkTelegram);

  React.useEffect(() => {
    if (ErrorUserRegister === 0 && LinkPartyThree) {
      window.open(`${LinkPartyThree}`);
      dispatch(userActions.resetResponseError({ type: 'register' }));
      dispatch(userActions.resetLoading());
    }
  }, [ErrorUserRegister, LinkPartyThree]);

  return (
    <Center sx={{ height: '100vh' }}>
      <Paper shadow="sm" p="lg" radius="md" withBorder>
        <RegisterForm></RegisterForm>
      </Paper>
    </Center>
  );
}

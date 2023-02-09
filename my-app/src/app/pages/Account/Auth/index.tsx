import { LoadingOverlay } from '@mantine/core';
import React, { useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { profileActions } from 'store/app/profile';
import { projectActions } from 'store/app/project';
import { ListProjectResponse } from 'store/app/project/response';
import { userActions, useUserSlice } from 'store/app/user';
import { selectId, selectIsLogin, selectLoading, selectToken } from 'store/app/user/selector';
import { walletActions } from 'store/app/wallet';
import { apiGet } from 'utils/http/request';
import Storage from 'utils/Storage';

type Props = {};

export const Auth = (props: Props) => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const queryId = searchParams.get('id');
  const queryToken = searchParams.get('token');
  const redirectTo = searchParams.get('to');
  const isLogin = useSelector(selectIsLogin);

  useLayoutEffect(() => {
    if (queryToken && queryId) {
      const url = '/v1/invest/getallproject';

      apiGet(url, { userId: queryId, token: queryToken })?.then(res => {
        console.log(res);
        if (res.data.error === 2 && res.data.message === 'unauthorized') {
          dispatch(userActions.responseLogout());
          dispatch(profileActions.resetProfile());
          dispatch(walletActions.resetWallet());
          dispatch(projectActions.resetProject());
          navigate('/login');
        } else if (res.data.error === 0) {
          console.log(res.data);
          dispatch(userActions.setLoginTelegram({ id: parseInt(queryId), token: queryToken }));

          if (redirectTo) navigate(`${redirectTo}`);
          else if (!redirectTo) navigate('/');
        }
      });
    }
  }, []);

  return (
    <>
      <LoadingOverlay visible={isLogin} overlayBlur={2} />
    </>
  );
};

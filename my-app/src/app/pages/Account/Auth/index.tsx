import React, { useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { userActions, useUserSlice } from 'store/app/user';
import { selectId, selectIsLogin, selectLoading, selectToken } from 'store/app/user/selector';

type Props = {};

export const Auth = (props: Props) => {
  useUserSlice();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const isLogin = useSelector(selectIsLogin);
  const queryId = searchParams.get('userid');
  const queryToken = searchParams.get('token');
  const redirectTo = searchParams.get('to');

  // useLayoutEffect(() => {
  if (queryToken && queryId) {
    dispatch(userActions.setLoginTelegram({ id: parseInt(queryId), token: queryToken }));

    if (redirectTo && isLogin) navigate(`${redirectTo}`);
    else if (!redirectTo && isLogin) navigate('/');
  }
  // }, [isLogin]);

  return <></>;
};

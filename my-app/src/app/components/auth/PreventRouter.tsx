import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useUserSlice } from 'store/app/user';
import { selectIsLogin } from 'store/app/user/selector';

interface Props {
  children: JSX.Element;
}

export const PreventRouter = (props: Props) => {
  useUserSlice();
  const navigate = useNavigate();
  const isLogin = useSelector(selectIsLogin);

  useEffect(() => {
    if (!isLogin) {
      navigate('/login');
    }
  }, [isLogin]);

  return <>{props.children}</>;
};

export const PreventRouterLogin = (props: Props) => {
  useUserSlice();
  const isLogin = useSelector(selectIsLogin);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      navigate('/');
    }
  }, [isLogin]);

  return <>{props.children}</>;
};

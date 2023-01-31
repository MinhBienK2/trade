import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { selectIsLogin } from 'store/app/user/selector';

interface Props {
  children?: JSX.Element;
}

export const PublicRouter = (props: Props) => {
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
  const navigate = useNavigate();
  const isLogin = useSelector(selectIsLogin);

  useEffect(() => {
    if (isLogin) {
      navigate('/');
    }
  }, [isLogin]);

  return <>{props.children}</>;
};

export const PreventRouterConfirmOTP = (props: Props) => {
  const navigate = useNavigate();
  const isLogin = useSelector(selectIsLogin);

  useEffect(() => {
    if (isLogin) {
      navigate('/');
    }
  }, [isLogin]);

  return <>{props.children}</>;
};

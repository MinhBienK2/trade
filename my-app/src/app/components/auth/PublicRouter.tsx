import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { selectErrorLogin, selectErrorRegister, selectIsLogin } from 'store/app/user/selector';

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
  const errorLogin = useSelector(selectErrorLogin);
  const navigate = useNavigate();

  useEffect(() => {
    if (errorLogin === 0) {
      navigate('/confirmation');
    }
  }, [errorLogin]);

  return <>{props.children}</>;
};

// export const PreventRouterConfirmation = (props: Props) => {
//   const navigate = useNavigate();

//   const ErrorUserRegister = useSelector(selectErrorRegister);

//   useEffect(() => {
//     if (ErrorUserRegister === 0) {
//       navigate('/');
//     }
//   }, [isLogin]);

//   return <>{props.children}</>;
// };

import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import PageHeader from '@components/PageHeader';
import LoginForm, { FormInputs } from '@components/LoginForm';

import useStateContext from '@context/index';
import { login } from '@context/operations';

const Login = () => {
  const router = useRouter();
  const {
    state: { isLoggedIn },
    dispatch,
  } = useStateContext();

  const handleSubmit = (values: FormInputs) => dispatch(login(values));
  const handleClose = () => router.push('/');

  // return to home on successful login
  useEffect(() => {
    if (isLoggedIn) router.push('/');
  }, [router, isLoggedIn]);

  return (
    <>
      <PageHeader />
      <LoginForm {...{ handleSubmit, handleClose }} />
    </>
  );
};

export default Login;

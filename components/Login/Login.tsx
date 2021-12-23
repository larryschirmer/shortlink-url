import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';

import PageHeader from '@components/PageHeader';
import LoginForm, { FormInputs } from '@components/LoginForm';

import { useMst } from '@models/index';

const Login = () => {
  const router = useRouter();
  const {
    server: { isLoggedIn, login },
  } = useMst();

  const handleSubmit = (values: FormInputs) => login(values);
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

export default observer(Login);

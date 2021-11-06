import React, {useEffect, FormEvent} from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/router'

import Button from '@components/Button';
import Input from '@components/Input';

import useStateContext from '@context/index';
import { login } from '@context/operations';

import styles from './LoginForm.module.scss';

const { 'login-form': loginFormClass, 'form-row': formRowClass, ctas: ctasClass } = styles;

type Inputs = {
  user: string;
  password: string;
};

const LoginForm = () => {
  const router = useRouter();
  const { state, dispatch } = useStateContext();

  const { handleChange, values, submitForm } = useFormik<Inputs>({
    initialValues: { user: '', password: '' },
    onSubmit: (values) => dispatch(login(values)),
  });
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitForm();
  }

  const handleClose = () => router.push('/');

  // return to home on successful login
  useEffect(() => {
    if (state.isLoggedIn) router.push('/');
  }, [router, state.isLoggedIn]);

  return (
    <div className={loginFormClass}>
      <form
        onSubmit={handleSubmit}
      >
        <div className={`${formRowClass} grid-name`}>
          <Input
            id="name"
            label="Name"
            name="user"
            value={values.user}
            placeholder="Name"
            onChange={handleChange}
          />
        </div>
        <div className={`${formRowClass} grid-password`}>
          <Input
            id="password"
            label="Password"
            name="password"
            value={values.password}
            placeholder="Password"
            onChange={handleChange}
          />
        </div>
        <div className={`${formRowClass} grid-ctas`}>
          <div className={ctasClass}>
            <Button isSecondary type="button" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

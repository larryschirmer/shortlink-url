import React, { useEffect, FormEvent } from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup';

import PageHeader from '@components/PageHeader';
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

  const initialValues = { user: '', password: '' };
  const validationSchema = Yup.object({
    user: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const { handleChange, values, submitForm, errors, touched, setFieldTouched, isValid } =
    useFormik<Inputs>({
      initialValues,
      validationSchema,
      onSubmit: (values) => dispatch(login(values)),
      validateOnMount: true,
    });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitForm();
  };

  const handleClose = () => router.push('/');

  // return to home on successful login
  useEffect(() => {
    if (state.isLoggedIn) router.push('/');
  }, [router, state.isLoggedIn]);

  return (
    <div className={loginFormClass}>
      <PageHeader />
      <form onSubmit={handleSubmit}>
        <div className={`${formRowClass} grid-name`}>
          <Input
            id="name"
            label="Name"
            name="user"
            value={values.user}
            placeholder="Name"
            error={touched.user ? errors.user : ''}
            onChange={handleChange}
            onBlur={() => setFieldTouched('user', true)}
          />
        </div>
        <div className={`${formRowClass} grid-password`}>
          <Input
            id="password"
            label="Password"
            name="password"
            value={values.password}
            placeholder="Password"
            error={touched.password ? errors.password : ''}
            onChange={handleChange}
            onBlur={() => setFieldTouched('password', true)}
          />
        </div>
        <div className={`${formRowClass} grid-ctas`}>
          <div className={ctasClass}>
            <Button isSecondary type="button" onClick={handleClose}>
              Close
            </Button>
            <Button disabled={!isValid} type="submit">
              Save
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

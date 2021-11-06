import React from 'react';
import { useFormik } from 'formik';

import Button from '@components/Button';
import Input from '@components/Input';

import useStateContext from '@context/index';

import styles from './LoginForm.module.scss';

const { 'login-form': loginFormClass, 'form-row': formRowClass, ctas: ctasClass } = styles;

type Inputs = {
  name: string;
  password: string;
};

const LoginForm = () => {
  const { dispatch } = useStateContext();

  const handleClose = () => {};

  const { handleChange, values } = useFormik<Inputs>({
    initialValues: { name: '', password: '' },
    onSubmit: (values) => {
      // dispatch new values
    },
  });

  return (
    <div className={loginFormClass}>
      <form onSubmit={handleChange}>
        <div className={`${formRowClass} grid-name`}>
          <Input
            id="name"
            label="Name"
            name="name"
            value={values.name}
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

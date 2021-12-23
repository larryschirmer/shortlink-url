import React from 'react';
import { observer } from 'mobx-react-lite';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinnerThird } from '@fortawesome/pro-regular-svg-icons';

import Button from '@components/Button';
import Input from '@components/Input';

import { useMst } from '@models/index';

import styles from './LoginForm.module.scss';

const {
  'login-form': loginFormClass,
  'form-row': formRowClass,
  ctas: ctasClass,
} = styles;

export type Inputs = {
  name: string;
  password: string;
};

type Props = {
  handleSubmit: (values: Inputs) => void;
  handleClose: () => void;
};

const LoginForm = ({ handleSubmit, handleClose }: Props) => {
  const {
    server: { loading },
  } = useMst();

  const initialValues = { name: '', password: '' };
  const validationSchema = Yup.object({
    name: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const {
    handleChange,
    values,
    submitForm,
    errors,
    touched,
    setFieldTouched,
    isValid,
  } = useFormik<Inputs>({
    initialValues,
    validationSchema,
    onSubmit: (values: Inputs) => handleSubmit(values),
    validateOnMount: true,
  });

  return (
    <div className={loginFormClass}>
      <form
        onSubmit={e => {
          e.preventDefault();
          submitForm();
        }}
      >
        <div className={`${formRowClass} grid-name`}>
          <Input
            id='name'
            label='Name'
            name='name'
            value={values.name}
            placeholder='Name'
            error={touched.name ? errors.name : ''}
            onChange={handleChange}
            onBlur={() => setFieldTouched('name', true)}
          />
        </div>
        <div className={`${formRowClass} grid-password`}>
          <Input
            id='password'
            label='Password'
            type='password'
            name='password'
            value={values.password}
            placeholder='Password'
            error={touched.password ? errors.password : ''}
            onChange={handleChange}
            onBlur={() => setFieldTouched('password', true)}
          />
        </div>
        <div className={`${formRowClass} grid-ctas`}>
          <div className={ctasClass}>
            <Button
              isSecondary
              type='button'
              onClick={handleClose}
              aria-label='return to link list'
            >
              Close
            </Button>
            <Button
              disabled={!isValid || loading}
              type='submit'
              aria-label='sending request'
            >
              {loading ? (
                <>
                  <FontAwesomeIcon spin icon={faSpinnerThird} /> Loading
                </>
              ) : (
                'Save'
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default observer(LoginForm);

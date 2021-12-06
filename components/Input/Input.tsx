import React, { InputHTMLAttributes } from 'react';

import styles from './Input.module.scss';

const { input: inputClass, error: errorClass } = styles;

export type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

const Input = ({
  id,
  label,
  type = 'text',
  name,
  value,
  placeholder,
  error,
  onChange,
  onBlur,
}: Props) => {
  return (
    <div className={inputClass}>
      <label htmlFor={id}>{label}</label>
      <input
        {...{ id, type, name, value, placeholder, onChange, onBlur }}
        size={1}
      />
      <div className={errorClass}>{error && <p role='alert'>{error}</p>}</div>
    </div>
  );
};

export default Input;

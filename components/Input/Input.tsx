import React, { ChangeEventHandler, FocusEventHandler } from 'react';

import styles from './Input.module.scss';

const { input: inputClass, error: errorClass } = styles;

export type Props = {
  id: string;
  label: string;
  name: string;
  value: string;
  placeholder: string;
  error?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
};

const Input = ({ id, label, name, value, placeholder, error, onChange, onBlur }: Props) => {
  return (
    <div className={inputClass}>
      <label htmlFor={id}>{label}</label>
      <input {...{ id, name, value, placeholder, onChange, onBlur }} type="text" size={1} />
      <div className={errorClass}>{error && <p>{error}</p>}</div>
    </div>
  );
};

export default Input;

import React, { ChangeEventHandler } from 'react';

import styles from './Input.module.scss';

const { input: inputClass } = styles;

export type Props = {
  id: string;
  label: string;
  name: string;
  value: string;
  placeholder: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const Input = ({ id, label, name, value, placeholder, onChange }: Props) => {
  return (
    <div className={inputClass}>
      <label htmlFor={id}>{label}</label>
      <input {...{ id, name, value, placeholder, onChange }} type="text" size={1} />
    </div>
  );
};

export default Input;

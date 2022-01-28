import { InputHTMLAttributes } from 'react';

import styles from './TextArea.module.scss';

export type Props = InputHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
};

const TextArea = ({
  id,
  label,
  type = 'text',
  name,
  value,
  placeholder,
  error,
  onChange,
  onBlur,
  onFocus,
}: Props) => {
  return (
    <div className={styles['text-area']}>
      <label htmlFor={id}>{label}</label>
      <textarea
        {...{ id, type, name, value, placeholder, onChange, onBlur, onFocus }}
      />
      <div className='error'>{error && <p role='alert'>{error}</p>}</div>
    </div>
  );
};

export default TextArea;

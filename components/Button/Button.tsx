import React, { ReactNode, ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './Button.module.scss';

const { button: buttonClass, secondary: secondaryClass } = styles;

export type Props = {
  children: ReactNode;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  disabled?: boolean;
  isSecondary?: boolean;
  onClick?: () => void;
};

const Button = (props: Props) => {
  const { children, isSecondary = false, disabled = false, type = 'button', onClick } = props;
  const buttonClasses = classNames(buttonClass, {
    [secondaryClass]: isSecondary,
  });
  return (
    <button {...{ type, disabled, onClick }} className={buttonClasses}>
      {children}
    </button>
  );
};

export default Button;

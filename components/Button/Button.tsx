import React, { ReactNode, ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './Button.module.scss';

const { button: buttonClass, secondary: secondaryClass } = styles;

export type Props = {
  children: ReactNode;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  isSecondary?: boolean;
  onClick?: () => void;
};

const Button = (props: Props) => {
  const { children, isSecondary = false, type = 'button', onClick } = props;
  const buttonClasses = classNames(buttonClass, {
    [secondaryClass]: isSecondary,
  });
  return (
    <button {...{ type, onClick }} className={buttonClasses}>
      {children}
    </button>
  );
};

export default Button;

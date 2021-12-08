import React, { ReactNode, ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';

import styles from './Button.module.scss';

const { button: buttonClass, secondary: secondaryClass } = styles;

export type Props = {
  children: ReactNode;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  'aria-label'?: string;
  disabled?: boolean;
  isSecondary?: boolean;
  onClick?: () => void;
};

const Button = (props: Props) => {
  const {
    children,
    type = 'button',
    'aria-label': ariaLabel = 'button',
    disabled = false,
    isSecondary = false,
    onClick,
  } = props;
  const buttonClasses = classNames(buttonClass, {
    [secondaryClass]: isSecondary,
  });
  return (
    <button
      {...{ type, disabled, onClick }}
      className={buttonClasses}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default Button;

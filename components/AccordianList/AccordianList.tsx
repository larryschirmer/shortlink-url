import React, { useState } from 'react';
import classNames from 'classnames';

import styles from './AccordianList.module.scss';

const {
  'accoridian-list': accordianListClass,
  'open-list': openListClass,
  title: titleClass,
  list: listClass,
} = styles;

export type Props = {
  id?: string;
  title: string;
  list: JSX.Element[];
  initialOpen?: boolean;
  handleHeaderOpen?: () => void;
  handleHeaderClose?: () => void;
};

const AccordianList = ({
  id,
  title,
  list,
  initialOpen = false,
  handleHeaderOpen,
  handleHeaderClose,
}: Props) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const handleTogle = () => {
    if (isOpen) handleHeaderClose && handleHeaderClose();
    else handleHeaderOpen && handleHeaderOpen();
    setIsOpen(prev => !prev);
  };

  const accordianListClasses = classNames(accordianListClass, {
    [openListClass]: isOpen,
  });

  return (
    <div {...{ id }} className={accordianListClasses}>
      <button className={titleClass} onClick={handleTogle}>
        {title}
      </button>
      <div className={listClass}>{list.map(listItem => listItem)}</div>
    </div>
  );
};

export default AccordianList;

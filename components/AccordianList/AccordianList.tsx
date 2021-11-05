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
  title: string;
  list: JSX.Element[];
  initialOpen?: boolean;
};

const AccordianList = ({ title, list, initialOpen = false }: Props) => {
  const [isOpen, setIsOpen] = useState(initialOpen);

  const handleTogle = () => {
    setIsOpen((prev) => !prev);
  };

  const accordianListClasses = classNames(accordianListClass, {
    [openListClass]: isOpen,
  });

  return (
    <div className={accordianListClasses}>
      <button className={titleClass} onClick={handleTogle}>
        {title}
      </button>
      <div className={listClass}>{list.map((listItem) => listItem)}</div>
    </div>
  );
};

export default AccordianList;

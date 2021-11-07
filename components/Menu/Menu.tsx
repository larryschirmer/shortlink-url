import React from 'react';
import classNames from 'classnames';

import EditForm from '@components/EditForm';

import useStateContext from '@context/index';

import styles from './Menu.module.scss';

const { menu: menuClass, hidden: hiddenClass } = styles;

const Menu = () => {
  const { state: {selectedLink, createLink} } = useStateContext();

  const menuClasses = classNames(menuClass, {
    [hiddenClass]: !selectedLink && !createLink,
  });

  return (
    <div className={menuClasses}>
      <EditForm />
    </div>
  );
};

export default Menu;

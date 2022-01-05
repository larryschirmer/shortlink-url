import React from 'react';

import EditForm from '@components/EditForm';

import styles from './Menu.module.scss';

const { menu: menuClass } = styles;

const Menu = () => {
  return (
    <div className={menuClass}>
      <EditForm />
    </div>
  );
};

export default Menu;

import React from 'react';

import EditForm from '@components/EditForm';

import useStateContext from '@context/index';

import styles from './Menu.module.scss';

const { menu: menuClass } = styles;

const Menu = () => {
  // const { state } = useStateContext();



  return (
    <div className={menuClass}>
      <EditForm />
    </div>
  );
};

export default Menu;

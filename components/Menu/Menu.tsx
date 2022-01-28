import React from 'react';
import { observer } from 'mobx-react-lite';

import DisplayLink from '@components/DisplayLink';
import EditForm from '@components/EditForm';

import { useMst } from '@models/index';

import styles from './Menu.module.scss';

const { menu: menuClass } = styles;

const Menu = () => {
  const {
    app: { createMode, editMode },
  } = useMst();

  return (
    <div className={menuClass}>
      {createMode || editMode ? <EditForm /> : <DisplayLink />}
    </div>
  );
};

export default observer(Menu);

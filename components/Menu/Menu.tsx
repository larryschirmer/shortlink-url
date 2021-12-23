import React from 'react';
import classNames from 'classnames';
import { observer } from 'mobx-react-lite';

import EditForm from '@components/EditForm';

import { useMst } from '@models/index';

import styles from './Menu.module.scss';

const { menu: menuClass, hidden: hiddenClass } = styles;

const Menu = () => {
  const {
    app: { selectedLink, createMode },
  } = useMst();

  const menuClasses = classNames(menuClass, {
    [hiddenClass]: !selectedLink && !createMode,
  });

  return (
    <div className={menuClasses}>
      <EditForm />
    </div>
  );
};

export default observer(Menu);

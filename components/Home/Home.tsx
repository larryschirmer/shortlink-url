import React from 'react';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';

import UrlList from '@components/UrlList';
import Menu from '@components/Menu';

import { useMst } from '@models/index';

import styles from './Home.module.scss';

const { home: homeClass, 'menu-open': menuOpenClass } = styles;

const Home = () => {
  const {
    app: { selectedLink, createMode, isMenuOpen },
  } = useMst();

  const homeClasses = classNames(homeClass, {
    [menuOpenClass]: isMenuOpen,
  });

  return (
    <div className={homeClasses}>
      <UrlList />
      {(!!selectedLink || createMode) && <Menu />}
    </div>
  );
};

export default observer(Home);

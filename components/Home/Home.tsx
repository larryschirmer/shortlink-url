import React from 'react';
import { observer } from 'mobx-react-lite';

import UrlList from '@components/UrlList';
import Menu from '@components/Menu';

import { useMst } from '@models/index';

import styles from './Home.module.scss';

const { home: homeClass } = styles;

const Home = () => {
  const {
    app: { selectedLink, createMode },
  } = useMst();

  return (
    <div className={homeClass}>
      <UrlList />
      {(!!selectedLink || createMode) && <Menu />}
    </div>
  );
};

export default observer(Home);

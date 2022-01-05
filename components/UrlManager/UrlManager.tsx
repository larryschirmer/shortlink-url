import React from 'react';
import { observer } from 'mobx-react-lite';

import UrlList from '@components/UrlList';
import Menu from '@components/Menu';

import { useMst } from '@models/index';

import styles from './UrlManager.module.scss';

const { 'url-manager': urlManagerClass } = styles;

const UrlManager = () => {
  const {
    app: { selectedLink, createMode },
  } = useMst();

  return (
    <div className={urlManagerClass}>
      <UrlList />
      {(!!selectedLink || createMode) && <Menu />}
    </div>
  );
};

export default observer(UrlManager);

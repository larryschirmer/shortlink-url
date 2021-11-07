import React from 'react';

import UrlList from '@components/UrlList';
import Menu from '@components/Menu';

import styles from './UrlManager.module.scss';

const { 'url-manager': urlManagerClass } = styles;

const UrlManager = () => {
  return (
    <div className={urlManagerClass}>
      <UrlList />
      <Menu />
    </div>
  );
};

export default UrlManager;

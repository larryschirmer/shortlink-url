import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/pro-regular-svg-icons';

import UrlList from '@components/UrlList';
import Menu from '@components/Menu';

import styles from './UrlManager.module.scss';

const { 'url-manager': urlManagerClass } = styles;

const UrlManager = () => {
  return (
    <div className={urlManagerClass}>
      <button>
        New{' '}
        <span>
          <FontAwesomeIcon icon={faLink} />
        </span>
      </button>
      <UrlList />
      <Menu />
    </div>
  );
};

export default UrlManager;

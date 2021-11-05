import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/pro-regular-svg-icons';

import UrlList from '@components/UrlList';

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
    </div>
  );
};

export default UrlManager;

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/pro-regular-svg-icons';

import UrlList from '@components/UrlList';

import useStateContext from '@context/index';
import { getLinks } from '@context/urls/operations';

import styles from './UrlManager.module.scss';

const { 'url-manager': urlManagerClass } = styles;

const UrlManager = () => {
  const { dispatch } = useStateContext();

  const handleFetchLinks = () => {
    dispatch(getLinks());
  };

  return (
    <div className={urlManagerClass}>
      <button onClick={handleFetchLinks}>
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

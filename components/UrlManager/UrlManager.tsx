import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePlus, faTrash, faSignInAlt } from '@fortawesome/pro-regular-svg-icons';

import UrlList from '@components/UrlList';
import Menu from '@components/Menu';

import styles from './UrlManager.module.scss';
import Button from '@components/Button';

const {
  'url-manager': urlManagerClass,
  header: headerClass,
  'link-management': linkMangementClass,
} = styles;

const UrlManager = () => {
  return (
    <div className={urlManagerClass}>
      <div className={headerClass}>
        <div>
          <Button>
            <FontAwesomeIcon icon={faFilePlus} />
          </Button>
          <Button>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
          <Button>
            <FontAwesomeIcon icon={faSignInAlt} />
          </Button>
        </div>
      </div>
      <div className={linkMangementClass}>
        <UrlList />
        <Menu />
      </div>
    </div>
  );
};

export default UrlManager;

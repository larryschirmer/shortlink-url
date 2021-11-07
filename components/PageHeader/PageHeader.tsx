import React from 'react';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePlus, faTrash, faSignInAlt } from '@fortawesome/pro-regular-svg-icons';

import Button from '@components/Button';

import useStateContext from '@context/index';
import { createLink, toggleDeleteMode } from '@context/operations';

import styles from './PageHeader.module.scss';

const { 'page-header': pageHeaderClass, header: headerClass } = styles;

const PageHeader = () => {
  const router = useRouter();
  const { dispatch, state } = useStateContext();

  const handleCreateLink = () => {
    dispatch(createLink());
  };

  const handleToggleDeleteMode = () => {
    dispatch(toggleDeleteMode());
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <div className={pageHeaderClass}>
      <h1>URL Shortener - larryschirmer</h1>
      <div className={headerClass}>
        <div>
          <Button onClick={handleCreateLink}>
            <FontAwesomeIcon icon={faFilePlus} />
          </Button>
          <Button onClick={handleToggleDeleteMode}>
            <FontAwesomeIcon icon={faTrash} />
          </Button>
          {!state.isLoggedIn && (
            <Button onClick={handleLogin}>
              <FontAwesomeIcon icon={faSignInAlt} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;

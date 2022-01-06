import React from 'react';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFilePlus as faFilePlusRegular,
  faPencil as faPencilRegular,
  faSignInAlt,
} from '@fortawesome/pro-regular-svg-icons';
import {
  faFilePlus as faFilePlusSolid,
  faPencil as faPencilSolid,
} from '@fortawesome/pro-solid-svg-icons';

import Button from '@components/Button';

import { useMst } from '@models/index';

import styles from './PageHeader.module.scss';

const { 'page-header': pageHeaderClass, header: headerClass } = styles;

const PageHeader = () => {
  const router = useRouter();
  const {
    server: { isLoggedIn, getLinks },
    app: { createMode, editMode, toggleCreateMode, toggleEditMode },
  } = useMst();

  const handleCreateLink = () => {
    toggleCreateMode();
  };

  const handleToggleDeleteMode = () => {
    toggleEditMode();
    if (editMode) getLinks();
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <div className={pageHeaderClass}>
      <h1>Lnk Shrtnr - larryschirmer</h1>
      <div className={headerClass}>
        <div>
          <Button disabled={!isLoggedIn} onClick={handleCreateLink}>
            {createMode ? (
              <FontAwesomeIcon icon={faFilePlusSolid} />
            ) : (
              <FontAwesomeIcon icon={faFilePlusRegular} />
            )}
          </Button>
          <Button disabled={!isLoggedIn} onClick={handleToggleDeleteMode}>
            {editMode ? (
              <FontAwesomeIcon icon={faPencilSolid} />
            ) : (
              <FontAwesomeIcon icon={faPencilRegular} />
            )}
          </Button>
          {!isLoggedIn && (
            <Button onClick={handleLogin}>
              <FontAwesomeIcon icon={faSignInAlt} />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default observer(PageHeader);

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
  faTrashAlt as faTrashAltSolid,
} from '@fortawesome/pro-solid-svg-icons';
import { faTrashAlt as faTrashAltLight } from '@fortawesome/pro-light-svg-icons';

import Button from '@components/Button';

import { useMst } from '@models/index';

import styles from './PageHeader.module.scss';

const { 'page-header': pageHeaderClass, header: headerClass } = styles;

const PageHeader = () => {
  const router = useRouter();
  const {
    server: { isLoggedIn },
    app: {
      createMode,
      editMode,
      deleteMode,
      toggleCreateMode,
      toggleEditMode,
      toggleDeleteMode,
    },
  } = useMst();

  const handleCreateLink = () => {
    toggleCreateMode();
  };

  const handleToggleEditMode = () => {
    toggleEditMode();
  };

  const handleToggleDeleteMode = () => {
    toggleDeleteMode();
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <div className={pageHeaderClass}>
      <h3>Short Link Manager</h3>
      <div className={headerClass}>
        <div>
          {isLoggedIn ? (
            <>
              <Button onClick={handleCreateLink}>
                {createMode ? (
                  <FontAwesomeIcon icon={faFilePlusSolid} />
                ) : (
                  <FontAwesomeIcon icon={faFilePlusRegular} />
                )}
              </Button>
              <Button onClick={handleToggleEditMode}>
                {editMode ? (
                  <FontAwesomeIcon icon={faPencilSolid} />
                ) : (
                  <FontAwesomeIcon icon={faPencilRegular} />
                )}
              </Button>
              <Button onClick={handleToggleDeleteMode}>
                {deleteMode ? (
                  <FontAwesomeIcon icon={faTrashAltSolid} />
                ) : (
                  <FontAwesomeIcon icon={faTrashAltLight} />
                )}
              </Button>
            </>
          ) : (
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

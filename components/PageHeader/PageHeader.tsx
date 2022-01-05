import React from 'react';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFilePlus,
  faTrash,
  faSignInAlt,
} from '@fortawesome/pro-regular-svg-icons';

import Button from '@components/Button';

import { useMst } from '@models/index';

import styles from './PageHeader.module.scss';

const { 'page-header': pageHeaderClass, header: headerClass } = styles;

const PageHeader = () => {
  const router = useRouter();
  const {
    server: { isLoggedIn },
    app: { toggleCreateMode, toggleEditMode },
  } = useMst();

  const handleCreateLink = () => {
    toggleCreateMode();
  };

  const handleToggleDeleteMode = () => {
    toggleEditMode();
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
            <FontAwesomeIcon icon={faFilePlus} />
          </Button>
          <Button disabled={!isLoggedIn} onClick={handleToggleDeleteMode}>
            <FontAwesomeIcon icon={faTrash} />
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

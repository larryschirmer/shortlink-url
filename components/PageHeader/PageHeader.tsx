import React from 'react';

import styles from './PageHeader.module.scss';

const { 'page-header': pageHeaderClass } = styles;

const PageHeader = () => {
  return (
    <div className={pageHeaderClass}>
      <h1>URL Shortener - larryschirmer</h1>
    </div>
  );
};

export default PageHeader;

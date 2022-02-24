import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Head from 'next/head';

import PageHeader from '@components/PageHeader';
import Home from '@components/Home';

import { getCookie } from '@utils/index';

import { Provider, rootStore } from '@models/index';

const Page = () => {
  // if token exists, set isLoggedIn to true
  useEffect(() => {
    if (!!getCookie(document.cookie, 'token')) {
      rootStore.server.setIsLoggedIn(true);
      rootStore.server.getUser();
    }
  }, []);

  return (
    <Provider value={rootStore}>
      <Head>
        <title>Short Link Manager</title>
      </Head>
      <PageHeader />
      <Home />
    </Provider>
  );
};

export default observer(Page);

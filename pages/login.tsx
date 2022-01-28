import React from 'react';
import Head from 'next/head';

import Login from '@components/Login';

import { Provider, rootStore } from '@models/index';

const Page = () => {
  return (
    <Provider value={rootStore}>
      <Head>
        <title>Short Link Manager</title>
      </Head>
      <Login />
    </Provider>
  );
};

export default Page;

import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { observer } from 'mobx-react-lite';
import Head from 'next/head';

import PageHeader from '@components/PageHeader';
import Home from '@components/Home';

import { Provider, rootStore } from '@models/index';

type Props = { cookies: { [cookie: string]: string } };

const Page = ({ cookies }: Props) => {
  // if token exists, set isLoggedIn to true
  useEffect(() => {
    if (!!cookies['token']) {
      rootStore.server.setIsLoggedIn(true);
      rootStore.server.getUser();
    }
  }, [cookies]);

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

export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
  const {
    req: { cookies },
  } = ctx;

  return { props: { cookies } };
};

export default observer(Page);

import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { observer } from 'mobx-react-lite';
import Head from 'next/head';

import PageHeader from '@components/PageHeader';
import UrlManager from '@components/UrlManager';

import { Provider, rootStore } from '@models/index';

type Props = { cookies: { [cookie: string]: string } };

const Home = ({ cookies }: Props) => {
  // if token exists, set isLoggedIn to true
  useEffect(() => {
    if (!!cookies['token']) {
      rootStore.server.setIsLoggedIn(true);
    }
  }, [cookies]);

  return (
    <Provider value={rootStore}>
      <Head>
        <title>Lnk Shrtnr</title>
      </Head>
      <PageHeader />
      <UrlManager />
    </Provider>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ctx => {
  const {
    req: { cookies },
  } = ctx;

  return { props: { cookies } };
};

export default observer(Home);

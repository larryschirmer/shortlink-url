import React, { useReducer } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';

import PageHeader from '@components/PageHeader';
import UrlManager from '@components/UrlManager';

import { Provider, reducer, initialState } from '@context/index';

type Props = { cookies: { [cookie: string]: string } };

const Home = ({ cookies }: Props) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    isLoggedIn: !!cookies['charming-smile'],
  });

  return (
    <Provider value={{ state, dispatch }}>
      <Head>
        <title>URL Shortener - larryschirmer</title>
      </Head>
      <PageHeader />
      <UrlManager />
    </Provider>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const {
    req: { cookies },
  } = ctx;

  return { props: { cookies } };
};

export default Home;

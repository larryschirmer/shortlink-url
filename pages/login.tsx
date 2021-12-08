import React, { useReducer } from 'react';
import Head from 'next/head';

import Login from '@components/Login';

import { Provider, reducer, initialState } from '@context/index';

const Home = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Provider value={{ state, dispatch }}>
      <Head>
        <title>Lnk Shrtnr</title>
      </Head>
      <Login />
    </Provider>
  );
};

export default Home;

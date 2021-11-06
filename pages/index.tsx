import React, { useReducer } from "react";
import Head from "next/head";

import UrlManager from "@components/UrlManager";

import { Provider, reducer, initialState } from "@context/index";

const Home = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Provider value={{ state, dispatch }}>
      <Head>
        <title>URL Shortened List</title>
      </Head>
      <UrlManager />
    </Provider>
  );
};

export default Home;

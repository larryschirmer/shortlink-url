import React, { useReducer } from "react";
import Head from "next/head";

import LoginForm from "@components/LoginForm";

import { Provider, reducer, initialState } from "@context/index";

const Home = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Provider value={{ state, dispatch }}>
      <Head>
        <title>URL Shortened Login</title>
      </Head>
      <LoginForm />
    </Provider>
  );
};

export default Home;

import React, { useReducer } from "react";
import Head from "next/head";

import LoginForm from "@components/LoginForm";

import { Provider } from "@context/index";
import reducer, { initialState } from "@context/urls";

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

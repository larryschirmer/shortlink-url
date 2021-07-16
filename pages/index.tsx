import React from "react";
import Head from "next/head";

import UrlList from "../Components/UrlList";

const Home = () => {
  return (
    <div>
      <Head>
        <title>URL Shortened List</title>
      </Head>
      <UrlList />
    </div>
  );
};

export default Home;

import React from 'react';
import type { AppProps } from 'next/app';

import PageHeader from '@components/PageHeader';

import '@styles/global.scss';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <PageHeader />
      <Component {...pageProps} />
    </>
  );
};
export default App;

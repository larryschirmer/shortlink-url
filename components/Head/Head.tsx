import React from "react";
import NextHead from "next/head";

type Props = {
  children: React.ReactNode;
};

const Head = ({ children }: Props) => {
  return <NextHead>{children}</NextHead>;
};

export default Head;

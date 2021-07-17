import React from "react";

import styles from "./UrlList.module.scss";

const { "url-list": urlListClass } = styles;

const UrlList = () => {
  return (
    <div className={urlListClass}>
      <div>Card One</div>
      <div>Card Two</div>
    </div>
  );
};

export default UrlList;

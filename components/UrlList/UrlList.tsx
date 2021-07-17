import React from "react";

import useStateContext, { Context } from "@context/index";
import { State, Actions } from "@context/urls/types";

import styles from "./UrlList.module.scss";

const { "url-list": urlListClass } = styles;

const UrlList = () => {
  const { state } = useStateContext<Context<State, Actions>>();

  return (
    <div className={urlListClass}>
      {state.data?.map(({ _id, name, slug, url, opens, isListed }) => {
        const opensAmt = opens.length;
        return (
          <div key={_id}>
            <div>
              {name} - [listed: {isListed.toString()}]
            </div>
            <div>
              <div>
                <div>domain.com/{slug}</div>
                <div>{url}</div>
              </div>
              <div>
                <div>{opensAmt} Opens</div>
                <div>{opens[opensAmt - 1]}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UrlList;

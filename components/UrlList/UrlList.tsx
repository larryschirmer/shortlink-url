import React from "react";
import classNames from "classnames";

import useStateContext, { Context } from "@context/index";
import { State, Actions } from "@context/urls/types";

import styles from "./UrlList.module.scss";

const {
  "url-list": urlListClass,
  "short-link-card": shortLinkCardClass,
  "card-name": cardNameClass,
  "card-listed-badge": cardListedBadgeClass,
  "card-details": cardDetailsClass,
  "card-detail": cardDetailClass,
  "card-detail-title": cardDetailTitleClass,
  "card-detail-subtitle": cardDetailSubtitleClass,
} = styles;

const UrlList = () => {
  const { state } = useStateContext<Context<State, Actions>>();

  const cardListedBadgeClasses = (isListed: boolean) =>
    classNames(cardListedBadgeClass, { active: isListed });

  return (
    <div className={urlListClass}>
      {state.data?.map(({ _id, name, slug, url, opens, isListed }) => {
        const opensAmt = opens.length;
        return (
          <div key={_id} className={shortLinkCardClass}>
            <div className={cardNameClass}>
              <h1>{name}</h1>
              <div className={cardListedBadgeClasses(isListed)}>listed</div>
            </div>
            <div className={cardDetailsClass}>
              <div className={cardDetailClass}>
                <div className={cardDetailTitleClass}>domain.com/<strong>{slug}</strong></div>
                <div className={cardDetailSubtitleClass}>{url}</div>
              </div>
              <div className={cardDetailClass}>
                <div className={cardDetailTitleClass}>{opensAmt} Opens</div>
                <div className={cardDetailSubtitleClass}>
                  {opens[opensAmt - 1]}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UrlList;

import React from "react";
import classNames from "classnames";
import format from "date-fns/format";
import formatDistance from "date-fns/formatDistance";

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

const opensCopy = (opens: number) => {
  if (!opens) return "Unopened";
  if (opens === 1) return "1 Open";
  return `${opens} Opens`;
};

const opensDateCopy = (openDate: string) => {
  const formattedDate = format(new Date(openDate), "MMM, dd, yyyy");
  const formattedDistance = formatDistance(new Date(openDate), new Date(), {
    addSuffix: true,
  })
    .replace("about", "")
    .trim();

  return `${formattedDate} - ${formattedDistance}`;
};

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
                <div className={cardDetailTitleClass}>
                  domain.com/<strong>{slug}</strong>
                </div>
                <div className={cardDetailSubtitleClass}>{url}</div>
              </div>
              <div className={cardDetailClass}>
                <div className={cardDetailTitleClass}>
                  {opensCopy(opensAmt)}
                </div>
                <div className={cardDetailSubtitleClass}>
                  {!!opensAmt && opensDateCopy(opens[opensAmt - 1])}
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

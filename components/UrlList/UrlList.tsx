import React, { useEffect } from 'react';
import classNames from 'classnames';
import formatDistance from 'date-fns/formatDistance';

import AccordianList from '@components/AccordianList';
import InlineFreqGraph from '@components/InlineFreqGraph';

import sortLinks from '@utils/sortLinks';

import useStateContext from '@context/index';
import { getLinks } from '@context/urls/operations';

import styles from './UrlList.module.scss';

const {
  'url-list': urlListClass,
  'list-item': listItemClass,
  'item-name': itemNameClass,
  'item-details': itemDetailsClass,
} = styles;

const opensCopy = (opens: number) => {
  if (!opens) return 'Unopened';
  if (opens === 1) return '1 Open';
  return `${opens} Opens`;
};

const opensDateCopy = (openDate: string) => {
  const formattedDistance = formatDistance(new Date(openDate), new Date(), {
    addSuffix: true,
  })
    .replace('about', '')
    .trim();

  return formattedDistance;
};

const UrlList = () => {
  const { state, dispatch } = useStateContext();

  const links = sortLinks(state.data || []);

  // Fetch links on mount
  useEffect(() => {
    dispatch(getLinks());
  }, [dispatch]);

  return (
    <div className={urlListClass}>
      {links.map((link) => (
        <AccordianList
          initialOpen
          key={link.tag}
          title={link.tag}
          list={link.links.map(({ _id, name, opens }) => {
            const lastOpened = opens[opens.length - 1];
            return (
              <div key={_id} className={listItemClass}>
                <div className={itemNameClass}>{name}</div>
                <div className={itemDetailsClass}>
                  <p>
                    {!!opens.length
                      ? `${opensCopy(opens.length)} - ${opensDateCopy(lastOpened)}`
                      : 'Unopened'}
                  </p>
                  <InlineFreqGraph color="black" data={opens} />
                </div>
              </div>
            );
          })}
        />
      ))}
    </div>
  );
};

export default UrlList;

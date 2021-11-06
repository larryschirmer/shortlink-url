import React, { useEffect } from 'react';
import classNames from 'classnames';

import AccordianList from '@components/AccordianList';
import InlineFreqGraph from '@components/InlineFreqGraph';

import useStateContext from '@context/index';
import { getLinks, selectLink } from '@context/operations';

import styles from './UrlList.module.scss';

const {
  'url-list': urlListClass,
  condensed: condensedClass,
  'list-item': listItemClass,
  'item-name': itemNameClass,
  'item-details': itemDetailsClass,
} = styles;

const opensCopy = (opens: number) => {
  if (!opens) return 'Unopened';
  if (opens === 1) return '1 Open';
  return `${opens} Opens`;
};

const UrlList = () => {
  const { state, dispatch } = useStateContext();

  const { tagGroups = [] } = state.data;

  const handleSelect = (link: string) => {
    dispatch(selectLink(link));
  };

  // Fetch links on mount
  useEffect(() => {
    dispatch(getLinks());
  }, [dispatch]);

  const urlListClasses = classNames(urlListClass, {
    [condensedClass]: !!state.selectedLink,
  });

  return (
    <div className={urlListClasses}>
      {tagGroups.map((link) => (
        <AccordianList
          initialOpen
          key={link.tag}
          title={link.tag}
          list={link.links.map(({ _id, name, opens }) => (
            <button key={_id} className={listItemClass} onClick={() => handleSelect(_id)}>
              <div className={itemNameClass}>{name}</div>
              <div className={itemDetailsClass}>
                <p>{!!opens.length ? opensCopy(opens.length) : 'Unopened'}</p>
                <InlineFreqGraph color="black" data={opens} />
              </div>
            </button>
          ))}
        />
      ))}
    </div>
  );
};

export default UrlList;

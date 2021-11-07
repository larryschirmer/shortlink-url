import React, { useEffect } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/pro-regular-svg-icons';

import AccordianList from '@components/AccordianList';
import InlineFreqGraph from '@components/InlineFreqGraph';
import Button from '@components/Button';

import useStateContext from '@context/index';
import { getLinks, selectLink } from '@context/operations';

import styles from './UrlList.module.scss';

const {
  'url-list': urlListClass,
  condensed: condensedClass,
  'list-group': listGroupClass,
  'delete-mode': deleteModeClass,
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
  const {
    state: { data, selectedLink, createLink, deleteMode },
    dispatch,
  } = useStateContext();

  const { tagGroups = [] } = data;

  const handleSelect = (link: string) => {
    dispatch(selectLink(link));
  };

  // Fetch links on mount
  useEffect(() => {
    dispatch(getLinks());
  }, [dispatch]);

  const urlListClasses = classNames(urlListClass, {
    [condensedClass]: !!selectedLink || createLink,
    [deleteModeClass]: deleteMode,
  });

  return (
    <div className={urlListClasses}>
      {tagGroups.map((link) => (
        <AccordianList
          initialOpen
          key={link.tag}
          title={link.tag}
          list={link.links.map(({ _id, name, opens }) => (
            <div key={_id} className={listGroupClass}>
              <button disabled={deleteMode} className={listItemClass} onClick={() => handleSelect(_id)}>
                <div className={itemNameClass}>{name}</div>
                <div className={itemDetailsClass}>
                  {!deleteMode && (
                    <>
                      <p>{!!opens.length ? opensCopy(opens.length) : 'Unopened'}</p>
                      <InlineFreqGraph color="black" data={opens} />
                    </>
                  )}
                </div>
              </button>
              {deleteMode && (
                <Button isSecondary>
                  <FontAwesomeIcon icon={faTimesCircle} />
                </Button>
              )}
            </div>
          ))}
        />
      ))}
    </div>
  );
};

export default UrlList;

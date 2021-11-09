import React, { useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faSpinnerThird } from '@fortawesome/pro-regular-svg-icons';
import { useRouter } from 'next/router';

import AccordianList from '@components/AccordianList';
import InlineFreqGraph from '@components/InlineFreqGraph';
import Button from '@components/Button';

import useStateContext from '@context/index';
import { getLinks, selectLink, deleteLink, domain } from '@context/operations';

import styles from './UrlList.module.scss';

const {
  'url-list': urlListClass,
  condensed: condensedClass,
  'list-group': listGroupClass,
  'delete-mode': deleteModeClass,
  'list-item': listItemClass,
  unlisted: unlistedClass,
  'item-name': itemNameClass,
  'item-details': itemDetailsClass,
} = styles;

const opensCopy = (opens: number) => {
  if (!opens) return 'Unopened';
  if (opens === 1) return '1 Open';
  return `${opens} Opens`;
};

const UrlList = () => {
  const router = useRouter();
  const {
    state: { data, selectedLink, createLink, deleteMode, loading, isLoggedIn },
    dispatch,
  } = useStateContext();

  const [loaded, setLoaded] = useState(false);

  const { tagGroups = [], list = [] } = data;

  const selectedTag = useMemo(() => {
    const tag = router.asPath.match(/(#[\w-]*)/)?.[0] ?? '';
    const firstTag = tagGroups[0]?.tag;
    return tag || firstTag;
  }, [router.asPath, tagGroups]);

  const handleSelect = (linkId: string) => {
    if (isLoggedIn) dispatch(selectLink(linkId));
    else {
      const slug = list.find((l) => l._id === linkId)?.slug;
      if (slug) router.push(`${domain}/${slug}`);
    }
  };

  const handleDelete = (link: string) => {
    dispatch(deleteLink(link));
  };

  // Fetch links on mount
  useEffect(() => {
    dispatch(getLinks());
  }, [dispatch]);

  // Set loaded state on data change
  useEffect(() => {
    if (!loaded && !loading && list.length) {
      const tag = router.asPath.match(/(#[\w-]*)/)?.[0] ?? '';
      if (tag) {
        document?.getElementById(tag)?.scrollIntoView();
        setLoaded(true);
      }
    }
  }, [list.length, loaded, loading, router.asPath]);

  const urlListClasses = classNames(urlListClass, {
    [condensedClass]: !!selectedLink || createLink,
    [deleteModeClass]: deleteMode,
  });

  const itemNameClasses = (isListed: boolean) =>
    classNames(itemNameClass, {
      [unlistedClass]: !isListed,
    });

  return (
    <div className={urlListClasses}>
      {tagGroups.map((link) => (
        <AccordianList
          initialOpen={selectedTag === link.tag}
          id={link.tag}
          key={link.tag}
          title={link.tag}
          handleHeaderOpen={() => router.replace(`/${link.tag}`)}
          handleHeaderClose={() => router.replace(`/`)}
          list={link.links.map(({ _id, name, opens, isListed }) => (
            <div key={_id} className={listGroupClass}>
              <button
                disabled={deleteMode}
                className={listItemClass}
                onClick={() => handleSelect(_id)}
              >
                <div className={itemNameClasses(isListed)}>{name}</div>
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
                <Button isSecondary onClick={() => handleDelete(_id)}>
                  {loading ? (
                    <FontAwesomeIcon spin icon={faSpinnerThird} />
                  ) : (
                    <FontAwesomeIcon icon={faTimesCircle} />
                  )}
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

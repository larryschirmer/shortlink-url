import React, { useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimesCircle,
  faSpinnerThird,
} from '@fortawesome/pro-regular-svg-icons';
import { useRouter } from 'next/router';

import AccordianList from '@components/AccordianList';
import InlineFreqGraph from '@components/InlineFreqGraph';
import Button from '@components/Button';

import { useMst } from '@models/index';

import styles from './UrlList.module.scss';

const domainName = process.env.NEXT_PUBLIC_DOMAIN ?? '';

const {
  'url-list': urlListClass,
  condensed: condensedClass,
  'list-group': listGroupClass,
  'edit-mode': editModeClass,
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
    server: {
      data: list,
      user,
      tagGroups,
      loading,
      isLoggedIn,
      getLinks,
      createLink,
      deleteLink,
    },
    app: { selectedLink, editMode, editLink },
  } = useMst();

  const [loaded, setLoaded] = useState(false);

  const selectedTag = useMemo(() => {
    const tag = router.asPath.match(/(#[\w-]*)/)?.[0] ?? '';
    const firstTag = tagGroups[0]?.tag;
    return tag || firstTag;
  }, [router.asPath, tagGroups]);

  const handleHeaderOpen = (tag: string) => {
    if (tag !== 'All Links') router.replace(`/${tag}`);
  };

  const handleSelect = (linkId: string) => {
    if (isLoggedIn) editLink(linkId);
    else {
      const slug = list.find(l => l._id === linkId)?.slug;
      if (slug) router.push(`${domainName}/${slug}`);
    }
  };

  const handleDelete = (link: string) => {
    deleteLink(link);
  };

  // Fetch links on mount
  useEffect(() => {
    getLinks();
  }, [getLinks]);

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
    [editModeClass]: editMode,
  });

  const itemNameClasses = (isListed: boolean) =>
    classNames(itemNameClass, {
      [unlistedClass]: user?.isAdmin && !isListed,
    });

  return (
    <div className={urlListClasses}>
      {tagGroups.map(link => (
        <AccordianList
          initialOpen={selectedTag === link.tag}
          id={link.tag}
          key={link.tag}
          title={link.tag}
          handleHeaderOpen={() => handleHeaderOpen(link.tag)}
          handleHeaderClose={() => router.replace(`/`)}
          list={link.links.map(({ _id, name, opens, isListed }) => (
            <div key={_id} className={listGroupClass}>
              <button
                disabled={editMode}
                className={listItemClass}
                onClick={() => handleSelect(_id)}
              >
                <div className={itemNameClasses(isListed)}>{name}</div>
                <div className={itemDetailsClass}>
                  {!editMode && (
                    <>
                      <p>
                        {!!opens.length ? opensCopy(opens.length) : 'Unopened'}
                      </p>
                      <InlineFreqGraph color='black' data={opens} />
                    </>
                  )}
                </div>
              </button>
              {editMode && (
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

export default observer(UrlList);

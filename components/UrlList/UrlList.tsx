import React, { useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimesCircle,
  faHeart as faHeartRegular,
  faQrcode,
} from '@fortawesome/pro-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/pro-solid-svg-icons';
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
  unlisted: unlistedClass,
  'item-name': itemNameClass,
  'item-opens': itemOpensClass,
  'item-details': itemDetailsClass,
  'edit-mode': editModeClass,
  'item-cta': itemCtaClass,
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
      setFavorite,
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
    if (tag.startsWith('#')) router.replace(`/${tag}`);
  };

  const handleSelect = (linkId: string) => {
    if (isLoggedIn) editLink(linkId);
    else {
      const { slug } = list.find(l => l._id === linkId) ?? {};
      if (slug) router.push(`${domainName}/${slug}`);
    }
  };

  const handleFavorite = (link: string) => {
    const { isFavorite } = list.find(l => l._id === link) ?? {};
    if (isFavorite) setFavorite(link, false);
    else setFavorite(link, true);
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

  const itemDetailsClasses = classNames(itemDetailsClass, {
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
          list={link.links.map(({ _id, name, opens, isListed, isFavorite }) => (
            <div key={_id} className={listGroupClass}>
              <div className={itemDetailsClasses}>
                <div className={itemNameClasses(isListed)}>{name}</div>
                <div className={itemOpensClass}>
                  <p>{!!opens.length ? opensCopy(opens.length) : 'Unopened'}</p>
                  <InlineFreqGraph color='black' data={opens} />
                </div>
              </div>
              <div className={itemCtaClass}>
                {!editMode ? (
                  <>
                    <Button isSecondary onClick={() => handleSelect(_id)}>
                      <FontAwesomeIcon icon={faQrcode} />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      isSecondary
                      onClick={() => handleFavorite(_id)}
                      disabled={loading}
                    >
                      {isFavorite ? (
                        <FontAwesomeIcon icon={faHeartSolid} />
                      ) : (
                        <FontAwesomeIcon icon={faHeartRegular} />
                      )}
                    </Button>
                    <Button
                      isSecondary
                      onClick={() => handleDelete(_id)}
                      disabled={loading}
                    >
                      <FontAwesomeIcon icon={faTimesCircle} />
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        />
      ))}
    </div>
  );
};

export default observer(UrlList);

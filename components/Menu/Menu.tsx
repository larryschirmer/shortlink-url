import React, { useMemo } from 'react';

import WordCloud from '@components/WordCloud';

import useStateContext from '@context/index';

import styles from './Menu.module.scss';

const { menu: menuClass } = styles;

const Menu = () => {
  const { state } = useStateContext();

  const words = useMemo(() => {
    const { tagGroups = [] } = state.data;
    return tagGroups.map<{ text: string; value: number }>((group) => ({
      text: group.tag,
      value: group.links.length,
    }));
  }, [state.data]);

  return (
    <div className={menuClass}>
      <WordCloud {...{ words }} size={[300, 600]} />
    </div>
  );
};

export default Menu;

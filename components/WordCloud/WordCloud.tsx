import React from 'react';
import ReactWordcloud, { Props as Cloud } from 'react-wordcloud';

export type Props = {
  words: { text: string; value: number }[];
  size?: [number, number];
};

const WordCloud = ({ words, size = [600, 400] }: Props) => {
  const callbacks: Cloud['callbacks'] = { onWordClick: console.log };
  const options: Cloud['options'] = { rotations: 2, rotationAngles: [-90, 0] };

  return <ReactWordcloud {...{ words, callbacks, options, size }} />;
};

export default WordCloud;

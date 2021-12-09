import React, { useRef, useMemo } from 'react';
import merge from 'lodash/merge';
import { line } from 'd3-shape';

import { d3, date } from '@utils/index';

const { makeTimeScale, makeLinearScale, processBounds, makeAccessor } = d3;

export const defaultDimension = {
  width: 0,
  height: 0,
  margin: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
};

export type Dataset = {
  amt: number;
  dt: number;
};

export type Props = {
  data: string[];
  color: string;
};

const InlineFreqGraph = ({ data, color }: Props) => {
  const xAccessor = makeAccessor<'dt', number>('dt');
  const yAccessor = makeAccessor<'amt', number>('amt');

  const dimensions = useMemo(() => {
    return processBounds(
      merge({}, defaultDimension, { width: 100, height: 10 }),
    );
  }, []);

  const dataset = useMemo(() => {
    return date.padMonthly(date.sumDuplicateDates(data));
  }, [data]);

  const xScale = useMemo(() => {
    const range = { lowest: 0, highest: dimensions.boundedWidth };
    return makeTimeScale<'dt'>(dataset, xAccessor, range);
  }, [dataset, dimensions.boundedWidth, xAccessor]);

  const yScale = useMemo(() => {
    const range = { lowest: dimensions.boundedHeight, highest: 0 };
    return makeLinearScale<'amt'>(dataset, yAccessor, range);
  }, [dataset, dimensions.boundedHeight, yAccessor]);

  const plot = useMemo(() => {
    const lineGenerator = line<Dataset>()
      .x(d => xScale(xAccessor(d)))
      .y(d => yScale(yAccessor(d)));

    return lineGenerator(dataset) || '';
  }, [dataset, xAccessor, xScale, yAccessor, yScale]);

  return (
    <svg width={dimensions.width} height={dimensions.height}>
      <path fill='none' strokeWidth='1' stroke={color} d={plot} />
    </svg>
  );
};

export default InlineFreqGraph;

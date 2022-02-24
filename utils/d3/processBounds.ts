import merge from 'lodash/merge';

export type Dimension = {
  width: number;
  height: number;
  margin: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
};

export type Bounds = {
  boundedWidth: number;
  boundedHeight: number;
};

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

const processBounds = (dimention: Partial<Dimension>): Dimension & Bounds => {
  const { width, height, margin } = merge({}, defaultDimension, dimention);
  const boundedWidth = width - margin.left - margin.right;
  const boundedHeight = height - margin.top - margin.bottom;

  return { width, height, margin, boundedWidth, boundedHeight };
};

export default processBounds;

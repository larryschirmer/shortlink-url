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

const processBounds = (dimention: Dimension): Dimension & Bounds => {
  const { width, height, margin } = dimention;
  const boundedWidth = width - margin.left - margin.right;
  const boundedHeight = height - margin.top - margin.bottom;

  return { ...dimention, boundedWidth, boundedHeight };
};

export default processBounds;

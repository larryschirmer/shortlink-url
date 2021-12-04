import padMonthly from './padMonthly';

describe('padMonthly', () => {
  it('should return an array of length 30', () => {
    expect(padMonthly({ '': 0 })).toHaveLength(30);
  });
});

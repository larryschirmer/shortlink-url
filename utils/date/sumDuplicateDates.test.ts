import sumDuplicateDates from './sumDuplicateDates';

const dates = [
  '2021-11-09T00:26:09.076Z',
  '2021-11-09T15:24:26.269Z',
  '2021-11-09T23:30:23.822Z',
  '2021-11-10T20:46:55.898Z',
  '2021-11-11T16:07:43.206Z',
  '2021-11-11T16:51:41.880Z',
  '2021-11-11T17:06:03.085Z',
  '2021-11-14T16:49:34.355Z',
  '2021-11-17T17:33:32.346Z',
  '2021-11-17T22:27:24.362Z',
];

describe('sumDuplicateDates', () => {
  it('should return the sum of duplicate dates', () => {
    expect(sumDuplicateDates(dates)).toEqual({
      '11-10-21': 1,
      '11-11-21': 3,
      '11-14-21': 1,
      '11-17-21': 2,
      '11-09-21': 3,
    });
  });
});

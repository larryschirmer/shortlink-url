import { getCookie } from '.';

const cookies =
  'SID=a.BCD1; APISID=a.BCD1; SAPISID=a.BCD1; __Secure-1PAPISID=a.BCD1; OTZ=a.BCD1';

describe('getCookie', () => {
  it('should return undefined if the cookie does not exist', () => {
    expect(getCookie(cookies, 'my_cookie')).toBeUndefined();
  });
  it('should return the cookie string for a cookie that does exist', () => {
    expect(getCookie(cookies, '__Secure-1PAPISID')).toBe('a.BCD1');
  });
});

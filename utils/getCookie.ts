const getCookie = (cookies: string, name: string) => {
  let cookieObj: { [cookieName: string]: string } = {};
  cookies.split(';').forEach((cookie) => {
    const [k, v] = cookie.split('=');
    cookieObj[k.trim()] = v;
  });
  return cookieObj[name];
};

export default getCookie;

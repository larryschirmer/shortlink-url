import getCookie from './getCookie';

const removeToken = () =>
  `token=removed; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/`;

export default removeToken;

const weekInMilliseconds = 1000 * 60 * 60 * 24 * 7;
const newToken = (token: string) =>
  `token=${token}; expires=${new Date(
    Date.now() + weekInMilliseconds,
  )}; path=/`;

export default newToken;

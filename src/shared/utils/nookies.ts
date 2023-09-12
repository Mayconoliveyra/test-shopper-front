import { setCookie, destroyCookie, parseCookies } from 'nookies';

type ICookiesName = 'accessToken' | 'themeName' | 'menuSideCollapse';

// Função para definir um cookie
const setCustomCookie = (cookieName: ICookiesName, cookieValue: string, options = {}) => {
  setCookie(null, cookieName, cookieValue, options);
};

// Função para definir um cookie
const parserCustomCookie = (cookieName: ICookiesName) => {
  const cookies = parseCookies();
  return cookies[cookieName];
};

// Função para destruir um cookie
const destroyCustomCookie = (cookieName: ICookiesName) => {
  destroyCookie(null, cookieName);
};

export { setCustomCookie, parserCustomCookie, destroyCustomCookie };

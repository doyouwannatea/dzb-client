import Cookies from 'js-cookie';

export const saveScrollPosition = (key: string) => {
  Cookies.set(key, String(scrollY));
};

export const getScrollPosition = (key: string) => {
  const scrollPos = Cookies.get(key);
  Cookies.remove(key);
  return scrollPos;
};

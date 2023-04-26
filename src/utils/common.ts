const ROUTE_PATH = {
  Home: '/',
};

export const memoize = (fn: any) => {
  const cache: any = {};
  return (...args: any) => {
    const n = args[0];
    if (n in cache) {
      return cache[n];
    } else {
      const result = fn(n);
      cache[n] = result;
      return result;
    }
  };
};

export { ROUTE_PATH };

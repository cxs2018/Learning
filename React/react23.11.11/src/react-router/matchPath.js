import { pathToRegexp } from "path-to-regexp";

const cache = {};
function compilePath(path, options) {
  const cacheKey = path + JSON.stringify(options);
  if (cache[cacheKey]) return cache[cacheKey];
  const keys = [];
  const regexp = pathToRegexp(path, keys, options);
  const result = { keys, regexp };
  cache[cacheKey] = result;
  return result;
}

/**
 * 匹配路径 Route 与 浏览器url
 * @param pathname
 * @param options
 */
function matchPath(pathname, options = {}) {
  const {
    path = "/",
    exact = false,
    strict = false,
    sensitive = false,
  } = options;
  // 用每条路由规则提供的path生成一个正则，去匹配当前的浏览器url
  const { keys, regexp } = compilePath(path, { end: exact, strict, sensitive });
  const match = regexp.exec(pathname);
  if (!match) return null;
  const [url, ...values] = match;
  const isExact = pathname === url;
  if (exact && !isExact) return null;
  console.log("keys", keys, url, values);
  return {
    path,
    url,
    isExact,
    params: keys.reduce((memo, key, index) => {
      memo[key.name] = values[index];
      return memo;
    }, {}),
  };
}

export default matchPath;

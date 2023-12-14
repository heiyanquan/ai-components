export function convertStringToJsonObject(str: string) {
  return JSON.parse(
    str.replace(/(\w+:)|(\w+ :)/g, function (matchedStr: string) {
      return '"' + matchedStr.substring(0, matchedStr.length - 1) + '":';
    }),
  );
}

const hasOwnProperty = Object.prototype.hasOwnProperty;
export const hasOwn = (
  val: object,
  key: string | symbol,
): key is keyof typeof val => hasOwnProperty.call(val, key);
export const isDateNormal = (val: unknown): val is Date => val instanceof Date;
export const isFunction = (val: unknown) => typeof val === 'function';
export const isString = (val: unknown): val is string =>
  typeof val === 'string';
export const isSymbol = (val: unknown): val is symbol =>
  typeof val === 'symbol';
export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === 'object';

export const isPromise = <T = any>(val: unknown): val is Promise<T> => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};

export const patternPwd =
  /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)(?=.*?[!#@*&.])[a-zA-Z\d!#@*&.]{8,}$/;

export function isDate(value: string) {
  return typeof value === 'string' && !isNaN(Date.parse(value));
}

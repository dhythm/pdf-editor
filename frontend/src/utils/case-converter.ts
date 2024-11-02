import cloneDeep from "lodash/cloneDeep";

const lowerCamelStringToSnake = (str: string) => {
  let i = str.search(/[A-Z]/);

  while (i !== -1) {
    str = str.replace(str.charAt(i), `_${str.charAt(i).toLowerCase()}`);
    i = str.search(/[A-Z]/);
  }
  return str;
};

const snakeCaseStringToLowerCamel = (str: string) => {
  let i = str.search(/.[_]./);

  while (i !== -1) {
    str = str.replace(`_${str.charAt(i + 2)}`, str.charAt(i + 2).toUpperCase());
    i = str.search(/.[_]./);
  }
  return str;
};

type Object = object | null | string;

export const convertLowerCamelToSnake = (obj: Object): Object => {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(convertLowerCamelToSnake);
  }

  const ret = {};
  for (const key in obj) {
    if (
      obj[key] !== null &&
      typeof obj[key] === "object" &&
      !Array.isArray(obj[key])
    ) {
      obj[key] = convertLowerCamelToSnake(obj[key]);
    }
    if (Array.isArray(obj[key])) {
      obj[key] = obj[key].map((item) => {
        return convertLowerCamelToSnake(item);
      });
    }
    ret[lowerCamelStringToSnake(key)] = obj[key];
  }
  return ret;
};

export const convertSnakeToLowerCamel = (org: Object): Object => {
  const obj = cloneDeep(org);
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(convertSnakeToLowerCamel);
  }

  const ret = {};
  for (const key in obj) {
    if (
      obj[key] !== null &&
      typeof obj[key] === "object" &&
      !Array.isArray(obj[key])
    ) {
      obj[key] = convertSnakeToLowerCamel(obj[key]);
    }
    if (Array.isArray(obj[key])) {
      obj[key] = obj[key].map((item) => {
        return convertSnakeToLowerCamel(item);
      });
    }
    ret[snakeCaseStringToLowerCamel(key)] = obj[key];
  }
  return ret;
};

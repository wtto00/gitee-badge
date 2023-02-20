import { NextApiRequest } from "next";

/**
 * 转换对象的值为string类型
 * @param params 对象
 * @returns
 */
function transformString(params: Record<string, any>) {
  const res: Record<string, string> = {};
  for (const key in params) {
    res[key] = (params[key] || "").toString();
  }
  return res;
}

/**
 * 在next.js中，当path参数以及query参数同名时，以path参数优先
 * 这里更改为以query参数优先
 * @param req 请求
 * @returns 请求参数
 */
export function getQueryParams(req: NextApiRequest): Record<string, string> {
  const params = req.query;

  const search = new URLSearchParams(req.url?.split("?")[1] || "");
  const query: Record<string, any> = {};
  search.forEach((value, key) => {
    if (value) query[key] = value;
  });
  return { ...transformString(params), ...query };
}

/**
 * 创建字符串模板
 * @param strings 字符串非变量
 * @param keys 字符串变量
 * @returns
 */
export function template(
  strings: TemplateStringsArray,
  ...keys: (string | number)[]
) {
  return function (...values: string[]) {
    const dict = values[values.length - 1] || ({} as Record<string, any>);
    const result = [strings[0]];
    keys.forEach(function (key, i) {
      const value = Number.isInteger(key)
        ? values[key as number]
        : (dict as Record<string, any>)[key as string];
      result.push(value, strings[i + 1]);
    });
    return result.join("");
  };
}

/**
 * 检查颜色字符串是否合法
 * @param color 颜色字符串
 * @returns
 */
export function CheckIsColor(color: string) {
  let type = "";
  if (/^rgb\(/.test(color)) {
    //如果是rgb开头，200-249，250-255，0-199
    type =
      "^[rR][gG][Bb][(]([\\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)[\\s]*,){2}[\\s]*(2[0-4]\\d|25[0-5]|[01]?\\d\\d?)[\\s]*[)]{1}$";
  } else if (/^rgba\(/.test(color)) {
    //如果是rgba开头，判断0-255:200-249，250-255，0-199 判断0-1：0 1 1.0 0.0-0.9
    type =
      "^[rR][gG][Bb][Aa][(]([\\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?)[\\s]*,){3}[\\s]*(1|1.0|0|0.[0-9])[\\s]*[)]{1}$";
  } else if (/^#/.test(color)) {
    //六位或者三位
    type = "^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$";
  } else if (/^hsl\(/.test(color)) {
    //判断0-360 判断0-100%(0可以没有百分号)
    type =
      "^[hH][Ss][Ll][(]([\\s]*(2[0-9][0-9]|360｜3[0-5][0-9]|[01]?[0-9][0-9]?)[\\s]*,)([\\s]*((100|[0-9][0-9]?)%|0)[\\s]*,)([\\s]*((100|[0-9][0-9]?)%|0)[\\s]*)[)]$";
  } else if (/^hsla\(/.test(color)) {
    type =
      "^[hH][Ss][Ll][Aa][(]([\\s]*(2[0-9][0-9]|360｜3[0-5][0-9]|[01]?[0-9][0-9]?)[\\s]*,)([\\s]*((100|[0-9][0-9]?)%|0)[\\s]*,){2}([\\s]*(1|1.0|0|0.[0-9])[\\s]*)[)]$";
  } else {
    return false;
  }
  const re = new RegExp(type);
  return color.match(re) !== null;
}

import { NextApiRequest } from 'next';

/**
 * 转换对象的值为string类型
 * @param params 对象
 * @returns
 */
function transformString(params: Record<string, unknown>) {
  const res: Record<string, string> = {};
  for (const key in params) {
    res[key] = (params[key] || '').toString();
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

  const search = new URLSearchParams(req.url?.split('?')[1] || '');
  const query = {};
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
export function template(strings: TemplateStringsArray, ...keys: (string | number)[]) {
  return function (...values: string[]) {
    const dict = values[values.length - 1] || {};
    const result = [strings[0]];
    keys.forEach(function (key, i) {
      const value = Number.isInteger(key) ? values[key] : dict[key];
      result.push(value, strings[i + 1]);
    });
    return result.join('');
  };
}

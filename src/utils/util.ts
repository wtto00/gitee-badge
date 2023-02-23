import { NextApiRequest } from 'next';

/**
 * query参数都转为string类型
 * @param req 请求
 * @returns 请求参数
 */
export function getQueryParams(req: NextApiRequest): Record<string, string> {
  const params = req.query;

  const res: Record<string, string> = {};

  for (const key in params) {
    res[key] = (params[key] || '').toString();
  }
  return res;
}

/**
 * 创建字符串模板
 * @param strings 字符串非变量
 * @param keys 字符串变量
 * @returns
 */
export function template(strings: TemplateStringsArray, ...keys: (string | number)[]) {
  return function (...values: string[]) {
    const dict = values[values.length - 1] || ({} as Record<string, any>);
    const result = [strings[0]];
    keys.forEach(function (key, i) {
      const value = Number.isInteger(key) ? values[key as number] : (dict as Record<string, any>)[key as string];
      result.push(value, strings[i + 1]);
    });
    return result.join('');
  };
}

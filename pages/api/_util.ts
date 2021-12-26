/**
 * 转换请求query
 * @param query 请求Request query
 * @returns 转换后的query
 */
export function handleQuery(query: NextApiRequestQuery) {
  for (const key in query) {
    const value = query[key];
    if (key === 'label') {
      query.subject = value;
    } else if (key === 'list') {
      query.status = query.status.replace(/,/g, ` ${value} `);
    }
  }
  return query;
}

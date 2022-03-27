interface QueryForHandle {
  subject: string;
  status: string;
  [key: string]: string;
}

/**
 * 转换请求query
 * @param query 请求Request query
 * @returns 转换后的query
 */
export function handleQuery(query: QueryForHandle) {
  for (const key in query) {
    const value = query[key];
    if (key === 'label') {
      query.subject = value;
    } else if (key === 'list' && 'status' in query) {
      query.status = query.status.replace(/,/g, ` ${value} `);
    }
  }
  return query;
}

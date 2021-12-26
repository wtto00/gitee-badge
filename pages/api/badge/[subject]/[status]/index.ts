import { NextApiRequest, NextApiResponse } from 'next';
import { handleQuery } from 'pages/api/_util';
import SVG from 'pages/api/_SVG';
import { parse } from 'qs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 由于nextjs中 path参数和query参数同名的话，会优先path参数，这里改为优先query参数
  const urlQuery = parse(req.url?.substring(req.url.indexOf('?') + 1) || '');

  const requestquery = req.query as unknown as NextApiRequestQuery;

  res.statusCode = 200;
  res.setHeader('Content-Type', 'image/svg+xml');
  const query = handleQuery({ ...requestquery, ...urlQuery });

  const svgCode = await SVG.generate(query);
  res.send(svgCode);
}

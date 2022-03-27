import { NextApiRequest, NextApiResponse } from 'next';
// import SVG from 'pages/api/_SVG';

function query2SvgQuery(
  query: NextApiRequest['query']
): NextApiRequest['query'] {
  // const { subject, owner, repo, param } = query;
  // 调用gitee-api获取status状态值
  return query;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const svgData: NextApiRequest['query'] = query2SvgQuery(req.query);
  // const svg = new SVG(req.query);
  // const svgCode = await svg.generate();

  res.statusCode = 200;
  res.setHeader('Content-Type', 'image/svg+xml');

  res.send(svgData);
}

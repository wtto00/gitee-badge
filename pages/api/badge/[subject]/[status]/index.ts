import { NextApiRequest, NextApiResponse } from 'next';
import SVG from 'pages/api/_SVG';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const svg = new SVG(req.query);
  const svgCode = await svg.generate();

  res.statusCode = 200;
  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(svgCode);
}

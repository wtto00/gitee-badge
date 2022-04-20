import { NextApiRequest, NextApiResponse } from 'next';
import SVG from 'pages/api/_SVG';
import { getSVGData } from 'pages/api/_util';
import config from './_config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const svgData = await getSVGData(req.query, config);

  const svg = new SVG(svgData);
  const svgCode = await svg.generate();

  res.statusCode = 200;
  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(svgCode);
}

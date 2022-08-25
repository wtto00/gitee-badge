import { NextApiRequest, NextApiResponse } from 'next';
import { getSvgData } from 'pages/api/_svg';
import { getQueryParams } from 'pages/api/_util';
import { getApiData } from './_api';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const params = getQueryParams(req);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { subject, owner, repo, _status, ...rest } = params;

  const svgQuery = await getApiData({ subject, owner, repo });

  const svgData = await getSvgData({ ...svgQuery, ...rest });

  res.statusCode = 200;
  res.setHeader('Content-Type', 'image/svg+xml');

  res.send(svgData);
}

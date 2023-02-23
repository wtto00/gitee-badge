import { NextApiRequest, NextApiResponse } from 'next';
import { getQueryParams } from '@/utils/util';
import { getApiData } from '@/utils/api';
import { badgen } from 'badgen';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const params = getQueryParams(req);

  const { subject, owner, repo, param, ...rest } = params;

  const badgeData = await getApiData({ subject, owner, repo, param });

  const badgenOptions = {
    label: badgeData.label || 'badge',
    status: badgeData.message,
    ...rest,
  };
  if (badgeData.color) {
    (badgenOptions as Record<string, string>).color = badgeData.color;
  }

  const svgString = badgen(badgenOptions);

  res.statusCode = 200;
  res.setHeader('Content-Type', 'image/svg+xml');

  res.send(svgString);
}

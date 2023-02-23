import { NextApiRequest, NextApiResponse } from 'next';
import { getQueryParams } from '@/utils/util';
import { getApiData } from '@/utils/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const params = getQueryParams(req);

  const { subject, owner, repo, param, ...rest } = params;

  const badgeData = await getApiData({ subject, owner, repo, param });

  res.statusCode = 200;

  res.json({ schemaVersion: 1, ...badgeData, ...rest });
}

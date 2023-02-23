import { NextApiRequest, NextApiResponse } from 'next';
import request from './index';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await request(req, res);
}

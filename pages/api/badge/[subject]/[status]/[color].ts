import { NextApiRequest, NextApiResponse } from 'next';
import request from './index';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  request(req, res);
}

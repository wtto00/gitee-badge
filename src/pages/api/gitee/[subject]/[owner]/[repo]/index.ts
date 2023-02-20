import { NextApiRequest, NextApiResponse } from "next";
import { getSvgData } from "@/utils/_svg";
import { getQueryParams } from "@/utils/_util";
import { getApiData } from "./_api";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const params = getQueryParams(req);
  const { subject, owner, repo, param, ...rest } = params;

  const svgQuery = await getApiData({ subject, owner, repo, param });

  delete rest.status;
  const svgData = await getSvgData({ ...svgQuery, ...rest });

  res.statusCode = 200;
  res.setHeader("Content-Type", "image/svg+xml");

  res.send(svgData);
}

import { NextApiRequest, NextApiResponse } from "next";
import { getSvgData } from "@/utils/svg";
import { getQueryParams } from "@/utils/util";
import { getApiDataGraphQL } from "@/utils/api";
import { baseUrl, apis } from "@/apis/github";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const params = getQueryParams(req);
  const { subject, owner, repo, param, ...rest } = params;

  const svgQuery = await getApiDataGraphQL(
    { subject, owner, repo, param },
    apis,
    baseUrl
  );

  delete rest.status;
  const svgData = await getSvgData({ ...svgQuery, ...rest });

  res.statusCode = 200;
  res.setHeader("Content-Type", "image/svg+xml");

  res.send(svgData);
}

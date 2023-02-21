import { NextApiRequest, NextApiResponse } from "next";
import { getSvgData } from "@/utils/svg";
import { getQueryParams } from "@/utils/util";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const params = getQueryParams(req);

  const svgData = await getSvgData(params);

  res.statusCode = 200;
  res.setHeader("Content-Type", "image/svg+xml");
  res.send(svgData);
}

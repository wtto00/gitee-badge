import { getQuery, getSvg } from "components/utils/client.js";

export default (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "image/svg+xml");
  const query = getQuery(req.url, { subject: 3, status: 4, color: 5 });
  query.color = "blue";
  res.send(getSvg(query));
};

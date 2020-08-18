import { getSvg, handleQuery } from "components/utils/client.js";

export default (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "image/svg+xml");
  const query = handleQuery(req.query, ["subject", "status"]);
  if (!query.color) query.color = "blue";
  res.send(getSvg(query));
};

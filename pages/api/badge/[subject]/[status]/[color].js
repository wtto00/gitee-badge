import { handleQuery, getSvg } from "components/utils/client.js";

export default (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "image/svg+xml");
  const query = handleQuery(req.query, ["subject", "status"]);
  console.log(query);
  console.log(getSvg(query));
  res.send(getSvg(query));
};

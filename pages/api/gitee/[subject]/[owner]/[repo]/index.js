import { getQuery, getSvg } from "components/utils/client.js";
import * as gitee from "components/apis/gitee.js";

export default async (req, res) => {
  res.statusCode = 200;
  const query = getQuery(req.url, { subject: 3, owner: 4, repo: 5 });
  if (!gitee[query.subject] || !gitee[query.subject] instanceof Function) {
    res.end("Not support API: " + query.subject);
  } else {
    const obj = await gitee[query.subject](query.owner, query.repo);

    if (obj.tag_name) {
      res.setHeader("Content-Type", "image/svg+xml");
      res.end(getSvg({ ...query, subject: "release", status: obj.tag_name }));
    } else if (obj.message) {
      res.end(obj.message);
    } else {
      res.end("something wrong! ");
    }
  }
};

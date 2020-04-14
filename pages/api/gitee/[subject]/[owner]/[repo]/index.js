import { getQuery, getSvg } from "components/utils/client.js";
import gitee from "components/apis/gitee.js";
import defaultSubject from "components/apis/subject/gitee.js";

export default async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "image/svg+xml");
  const query = getQuery(req.url, { subject: 3, owner: 4, repo: 5 });

  const result = await gitee(query.subject, query.owner, query.repo);

  if (result.code === 200) {
    return generate(res, {
      ...query,
      subject: defaultSubject[query.subject] || query.subject,
      ...result.data,
    });
  }

  return generate(res, { subject: "badg", status: result.data, color: "red" });
};

const generate = (res, query) => {
  const svg = getSvg(query);
  return res.end(svg);
};

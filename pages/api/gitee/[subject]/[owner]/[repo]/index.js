import {
  getQueryOptions,
  getSvg,
  handleOptions,
} from "components/utils/client.js";
import gitee from "components/apis/gitee.js";
import defaultSubject from "components/apis/subject/gitee.js";

export default async (req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "image/svg+xml");
  const { query, options } = getQueryOptions(req.url, {
    subject: 3,
    owner: 4,
    repo: 5,
    param: 6,
  });

  const result = await gitee(
    query.subject,
    query.owner,
    query.repo,
    query.param
  );

  if (result.code === 200) {
    const search = {
      ...query,
      subject: defaultSubject[query.subject] || query.subject,
      ...result.data,
    };
    return generate(res, handleOptions(search, options));
  }

  return generate(res, { subject: "badg", status: result.data, color: "red" });
};

const generate = (res, query) => {
  const svg = getSvg(query);
  return res.end(svg);
};

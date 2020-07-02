import {
  getQueryOptions,
  getSvg,
  handleOptions,
} from "components/utils/client.js";
import gitee from "components/apis/gitee.js";
import defaultSubject from "components/apis/gitee/subject";
import defaultColor from "components/apis/gitee/color";

export default async (req, res) => {
  res.statusCode = 200;
  // const { query, options } = getQueryOptions(req.url, {
  //   subject: 3,
  //   owner: 4,
  //   repo: 5,
  //   param: 6,
  // });
  const { query } = req;
  res.send(JSON.stringify({ query }));
  res.setHeader("Content-Type", "image/svg+xml");
  console.log(query, options);

  const result = await gitee(
    query.subject,
    query.owner,
    query.repo,
    query.param
  );

  if (result.code === 200) {
    console.log(result.data);

    const search = {
      ...query,
      ...result.data,
    };
    if (!result.data.subject && defaultSubject[query.subject]) {
      if (typeof defaultSubject[query.subject] === "function") {
        search.subject = defaultSubject[query.subject](query);
      } else {
        search.subject = defaultSubject[query.subject];
      }
    }
    if (!result.data.color && defaultColor[query.subject]) {
      search.color = defaultColor[query.subject];
    }
    return generate(res, handleOptions(search, options));
  }

  return generate(res, { subject: "badg", status: result.data, color: "red" });
};

const generate = (res, query) => {
  const svg = getSvg(query);
  return res.end(svg);
};

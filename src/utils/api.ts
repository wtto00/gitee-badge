import { ApiOptions, ApiParams, ApiResult } from "@/apis/type";
import {
  CrawlerUrlOptions,
  crawlFromUrl,
  ResultCodes,
} from "@wtto00/spider-crawler";

/**
 * 根据预定的爬虫规则 爬取结果
 * @param params 请求参数
 * @returns
 */
export async function getApiData(
  params: ApiParams,
  apis: Record<string, ApiOptions>,
  baseUrl: string
): Promise<ApiResult> {
  const { subject, owner, repo, param } = params;

  if (!(subject in apis))
    return { subject: "badge", status: "404", color: "orange" };

  const apiRule = apis[subject];
  const options: CrawlerUrlOptions = {
    url: baseUrl + apiRule.url(owner, repo, param),
    dataType: apiRule.dataType || "html",
    rules: apiRule.rules,
  };

  const res = await crawlFromUrl(options);

  if (res.code !== ResultCodes.SUCCESS)
    return { subject: "gitee", status: "404", color: "grey" };

  const apiData: ApiResult = {
    subject: apiRule.subject(),
    status: res.data["status"],
  };
  if (res.data["subject"]) {
    apiData.subject = res.data["subject"];
  }
  if (apiRule.color) {
    apiData.color = apiRule.color;
  }
  if (apiRule.handleResult) {
    return apiRule.handleResult(apiData);
  }
  return apiData;
}

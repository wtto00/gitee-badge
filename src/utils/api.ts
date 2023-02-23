import { ApiParams, ApiResult } from '@/types/api';
import { CrawlerUrlOptions, crawlFromUrl, ResultCodes } from '@wtto00/spider-crawler';
import { baseUrl, apis } from '@/apis/gitee';

/**
 * 根据预定的爬虫规则 爬取结果
 * @param params 处理后的请求参数
 * @param apis 爬虫规则
 * @param baseUrl 爬虫请求地址
 * @returns
 */
export async function getApiData(params: ApiParams): Promise<ApiResult> {
  const { subject, owner, repo, param } = params;

  if (!(subject in apis)) return { label: 'badge', message: '404', color: 'orange' };

  const apiRule = apis[subject];
  const options: CrawlerUrlOptions = {
    url: baseUrl + apiRule.url(owner, repo, param),
    dataType: apiRule.dataType || 'html',
    rules: apiRule.rules,
  };

  const res = await crawlFromUrl(options);

  if (res.code !== ResultCodes.SUCCESS) return { label: 'gitee', message: '404', color: 'grey' };

  const apiData: ApiResult = {
    label: apiRule.subject(),
    message: `${res.data['status'] ?? ''}`,
  };
  if (res.data['subject']) {
    apiData.label = res.data['subject'];
  }

  if (!apiData.message || apiData.message === 'null' || apiData.message === 'undefined') {
    return { label: apiData.label, message: 'null', color: 'grey' };
  }

  if (apiRule.color) {
    apiData.color = apiRule.color;
  }
  if (!apiData.color) apiData.color = 'blue';

  if (apiRule.handleResult) {
    return apiRule.handleResult(apiData);
  }
  return apiData;
}

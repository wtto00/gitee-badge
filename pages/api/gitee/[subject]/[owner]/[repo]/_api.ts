/**
 * 根据参数获取结果
 */
import { template } from 'pages/api/_util';
import { crawl, CrawlerOptions, ResultCodes } from '@wtto00/spider-crawler';

const baseUrl = 'https://gitee.com';

type TemplateString = (...values: string[]) => string;
type ApiOptions = Omit<CrawlerOptions, 'url'> & {
  url: TemplateString;
  subject: TemplateString;
};

const apis: Record<string, ApiOptions> = {
  release: {
    url: template`/${0}/${1}/releases`,
    subject: template`release`,
    rules: {
      status: {
        selector: '#releases-index .release-tag-item',
        handlers: [
          { method: 'eq', args: [0] },
          { method: 'find', args: ['.release-header'] },
          { method: 'text' },
          { method: 'trim' },
        ],
      },
    },
  },
};

interface ApiParams {
  subject: string;
  owner: string;
  repo: string;
}
export async function getApiData(params: ApiParams): Promise<{ subject: string; status: string; color?: Colors }> {
  const { subject, owner, repo } = params;

  if (!(subject in apis)) return { subject: 'badge', status: '404', color: 'orange' };

  const apiRule = apis[subject];
  const options: CrawlerOptions = {
    url: baseUrl + apiRule.url(owner, repo),
    rules: apiRule.rules,
  };
  const res = await crawl(options);

  if (res.code !== ResultCodes.SUCCESS) return { subject: 'gitee', status: '404', color: 'grey' };

  return { subject: apiRule.subject(), status: res.data['status'] };
}

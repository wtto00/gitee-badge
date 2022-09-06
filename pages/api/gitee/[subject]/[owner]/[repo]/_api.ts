/**
 * 根据参数获取结果
 */
import { template } from 'pages/api/_util';
import {
  crawlFromUrl,
  CrawlerUrlOptions,
  CrawlDataType,
  CrawlerUrlNoDataTypeOptions,
  CrawlerOptionsType,
  ResultCodes,
} from '@wtto00/spider-crawler';

const baseUrl = 'https://gitee.com';

type TemplateString = (...values: string[]) => string;

type CrawlerOptionsTypeNew<T extends CrawlDataType> = Omit<CrawlerOptionsType<T>, 'url'>;
type CrawlerUrlNoDataTypeOptionsNew = Omit<CrawlerUrlNoDataTypeOptions, 'url'>;
type AllCrawlerOptionsType = {
  [K in CrawlDataType | 'undefined']: K extends CrawlDataType
    ? CrawlerOptionsTypeNew<K>
    : CrawlerUrlNoDataTypeOptionsNew;
};
type ApiOptions = AllCrawlerOptionsType[CrawlDataType | 'undefined'] & {
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
  release_stable: {
    url: template`/${0}/${1}/releases/latest`,
    subject: template`release`,
    dataType: 'json',
    rules: {
      status: {
        selector: 'release.release.title',
        handlers: [{ method: 'trim' }],
      },
    },
  },
  tag: {
    url: template`/${0}/${1}/tags`,
    subject: template`latest tag`,
    rules: {
      status: {
        selector: '#taggeds-index .tag-list .tag-item .tag-name',
        handlers: [{ method: 'eq', args: [0] }, { method: 'text' }, { method: 'trim' }],
      },
    },
  },
  watchers: {
    url: template`/${0}/${1}/watchers`,
    subject: template`watchers`,
    rules: {
      status: {
        selector: '.git-project-header-actions .watch-container .action-social-count',
        handlers: [{ method: 'text' }, { method: 'trim' }],
      },
    },
  },
};

interface ApiParams {
  subject: string;
  owner: string;
  repo: string;
  param: string;
}
export async function getApiData(params: ApiParams): Promise<{ subject: string; status: string; color?: Colors }> {
  const { subject, owner, repo, param } = params;

  const apiKey = subject + (param ? `_${param}` : '');

  if (!(apiKey in apis)) return { subject: 'badge', status: '404', color: 'orange' };

  const apiRule = apis[apiKey];
  const options: CrawlerUrlOptions = {
    url: baseUrl + apiRule.url(owner, repo, param),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    dataType: 'dataType' in apiRule ? apiRule.dataType : 'html',
    rules: apiRule.rules,
  };

  const res = await crawlFromUrl(options);

  if (res.code !== ResultCodes.SUCCESS) return { subject: 'gitee', status: '404', color: 'grey' };

  return { subject: apiRule.subject(), status: res.data['status'] };
}

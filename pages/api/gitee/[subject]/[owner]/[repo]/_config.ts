import { getNodesText } from 'pages/api/_crawl';
import { ConfigType } from 'pages/api/_util';

// Gitee API请求方式有次数限制，全部采用爬虫方式
const config: ConfigType = {
  platform: 'gitee',
  baseUrl: 'https://gitee.com',
  apiBaseUrl: 'https://gitee.com/api/v5',
  subjects: {
    release: (param) => ({
      type: 'html',
      uri: (params) => `/${params.owner}/${params.repo}/releases`,
      rules: {
        content: {
          selector: '.releases-timeline>.release-tag-item',
          handles:
            param === 'stable'
              ? [
                { func: 'not', params: [':has(.release-meta>.pre-version)'] },
                { func: 'eq', params: [0] },
                { func: 'find', params: ['.release-meta>.tag-name>a>span'] },
                { func: 'text' },
                { func: 'trim' },
              ]
              : [
                { func: 'eq', params: [0] },
                { func: 'find', params: ['.release-meta>.tag-name>a>span'] },
                { func: 'text' },
                { func: 'trim' },
              ],
        },
      },
    }),
    tag: () => ({
      subject: 'latest tag',
      type: 'html',
      uri: (params) => `/${params.owner}/${params.repo}/tags`,
      rules: {
        content: {
          selector: '.tag-list>.item.tag-item',
          handles: [
            { func: 'eq', params: [0] },
            { func: 'find', params: ['.tag-name>a'] },
            { func: 'text' },
            { func: 'trim' },
          ],
        },
      },
    }),
    watchers: () => ({
      type: 'html',
      uri: (params) => `/${params.owner}/${params.repo}/watchers`,
      rules: {
        content: {
          selector: '.git-project-header-actions>.watch-container>a.action-social-count',
          handles: [{ func: 'text' }, { func: 'trim' }],
        },
      },
    }),
    stars: () => ({
      type: 'html',
      uri: (params) => `/${params.owner}/${params.repo}/stargazers`,
      rules: {
        content: {
          selector: '.git-project-header-actions>.star-container>a.action-social-count',
          handles: [{ func: 'text' }, { func: 'trim' }],
        },
      },
    }),
    forks: () => ({
      type: 'html',
      uri: (params) => `/${params.owner}/${params.repo}/members`,
      rules: {
        content: {
          selector: '.git-project-header-actions>.fork-container>a.action-social-count',
          handles: [{ func: 'text' }, { func: 'trim' }],
        },
      },
    }),
    issues: () => ({
      type: 'html',
      uri: (params) => `/${params.owner}/${params.repo}/issues`,
      rules: {
        content: {
          selector: '#git-issues-filters>a.item>.label',
          handles: [
            {
              func: 'callback',
              params: [getNodesText],
            },
            { func: 'get' },
            {
              func: 'reduce',
              params: [(sum: number, item: string) => sum + (Number(item) || 0), 0],
            },
          ],
        },
      },
    }),
    'open-issues': () => ({
      subject: 'open issues',
      type: 'html',
      uri: (params) => `/${params.owner}/${params.repo}/issues`,
      rules: {
        content: {
          selector: '#git-issues-filters>a.item',
          handles: [
            { func: 'eq', params: [1] },
            { func: 'find', params: ['.label'] },
            { func: 'text' },
            { func: 'trim' },
          ],
        },
      },
    }),
    'closed-issues': () => ({
      subject: 'closed issues',
      type: 'html',
      uri: (params) => `/${params.owner}/${params.repo}/issues`,
      rules: {
        content: {
          selector: '#git-issues-filters>a.item',
          handles: [
            { func: 'eq', params: [3] },
            { func: 'find', params: ['.label'] },
            { func: 'text' },
            { func: 'trim' },
          ],
        },
      },
    }),
    'label-issues': (param) => ({
      subject: param,
      type: 'html',
      uri: (params) => `/${params.owner}/${params.repo}/issues?label_text=${param}&state=all`,
      rules: {
        content: {
          selector: '#git-issues-filters>a.item>.label',
          handles: [
            {
              func: 'callback',
              params: [getNodesText],
            },
            { func: 'get' },
            {
              func: 'reduce',
              params: [(sum: number, item: string) => sum + (Number(item) || 0), 0],
            },
          ],
        },
      },
    }),
    'open-label-issues': (param) => ({
      subject: param,
      type: 'html',
      uri: (params) => `/${params.owner}/${params.repo}/issues?label_text=${param}&state=open`,
      rules: {
        content: {
          selector: '#git-issues-filters>a.item.active>.label',
          handles: [
            { func: 'text' },
          ],
        },
      },
    }),
    'closed-label-issues': (param) => ({
      subject: param,
      type: 'html',
      uri: (params) => `/${params.owner}/${params.repo}/issues?label_text=${param}&state=closed`,
      rules: {
        content: {
          selector: '#git-issues-filters>a.item.active>.label',
          handles: [
            { func: 'text' },
          ],
        },
      },
    }),
  },
};

export default config;

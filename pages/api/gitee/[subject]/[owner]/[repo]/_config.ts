import {
  betterNumber,
  getNodesText, setNumberColor,
} from 'pages/api/_crawl';
import { ConfigType, sumStr } from 'pages/api/_util';

// Gitee API请求方式有次数限制，全部采用爬虫方式
const config: ConfigType = {
  platform: 'gitee',
  baseUrl: 'https://gitee.com',
  apiBaseUrl: 'https://gitee.com/api/v5',
  subjects: {
    release: (param) => ({
      type: 'html',
      uri: (params) => `/${params.owner}/${params.repo}/releases`,
      rules: [
        {
          field: 'status',
          selector: '.releases-timeline>.release-tag-item',
          handles:
                param === 'stable'
                  ? [
                    { func: 'not', params: [':has(.release-meta>.pre-version)'] },
                    { func: 'eq', params: [0] },
                    { func: 'find', params: ['.release-body>.release-header>a'] },
                    { func: 'text' },
                    { func: 'trim' },
                  ]
                  : [
                    { func: 'eq', params: [0] },
                    { func: 'find', params: ['.release-body>.release-header>a'] },
                    { func: 'text' },
                    { func: 'trim' },
                  ],
        },
      ],
    }),
    tag: () => ({
      subject: 'latest tag',
      type: 'html',
      uri: (params) => `/${params.owner}/${params.repo}/tags`,
      rules: [
        {
          field: 'status',
          selector: '.tag-list>.item.tag-item',
          handles: [
            { func: 'eq', params: [0] },
            { func: 'find', params: ['.tag-name>a'] },
            { func: 'text' },
            { func: 'trim' },
          ],
        },
      ],
    }),
    watchers: () => ({
      type: 'html',
      uri: (params) => `/${params.owner}/${params.repo}/watchers`,
      rules: [
        {
          field: 'status',
          selector: '.git-project-header-actions>.watch-container>a.action-social-count',
          handles: [
            { func: 'text' },
            { func: 'trim' },
            { func: 'callback', params: [betterNumber] },
          ],
        },
        {
          field: 'color',
          handles: [setNumberColor()],
        },
      ],
    }),
    stars: () => ({
      type: 'html',
      uri: (params) => `/${params.owner}/${params.repo}/stargazers`,
      rules: [
        {
          field: 'status',
          selector: '.git-project-header-actions>.star-container>a.action-social-count',
          handles: [
            { func: 'text' },
            { func: 'trim' },
            { func: 'callback', params: [betterNumber] },
          ],
        },
        {
          field: 'color',
          handles: [setNumberColor()],
        },
      ],
    }),
    forks: () => ({
      type: 'html',
      uri: (params) => `/${params.owner}/${params.repo}/members`,
      rules: [
        {
          field: 'status',
          selector: '.git-project-header-actions>.fork-container>a.action-social-count',
          handles: [
            { func: 'text' },
            { func: 'trim' },
            { func: 'callback', params: [betterNumber] },
          ],
        },
        {
          field: 'color',
          handles: [setNumberColor()],
        },
      ],
    }),
    issues: () => ({
      type: 'html',
      uri: (params) => `/${params.owner}/${params.repo}/issues`,
      rules: [
        {
          field: 'status',
          selector: '#git-issues-filters>a.item>.label',
          handles: [
            { func: 'callback', params: [getNodesText] },
            { func: 'reduce', params: [sumStr, 0] },
            { func: 'callback', params: [betterNumber] },
          ],
        },
        {
          field: 'color',
          handles: [setNumberColor()],
        },
      ],
    }),
    'open-issues': () => ({
      subject: 'open issues',
      type: 'html',
      uri: (params) => `/${params.owner}/${params.repo}/issues?state=open`,
      rules: [
        {
          field: 'status',
          selector: '#git-issues-filters>a.item.active>.label',
          handles: [
            { func: 'text' },
            { func: 'trim' },
            { func: 'callback', params: [betterNumber] },
          ],
        },
        {
          field: 'color',
          handles: [setNumberColor()],
        },
      ],
    }),
    'progressing-issues': () => ({
      subject: 'progressing issues',
      type: 'html',
      uri: (params) => `/${params.owner}/${params.repo}/issues?state=progressing`,
      rules: [
        {
          field: 'status',
          selector: '#git-issues-filters>a.item.active>.label',
          handles: [
            { func: 'text' },
            { func: 'trim' },
            { func: 'callback', params: [betterNumber] },
          ],
        },
        {
          field: 'color',
          handles: [setNumberColor()],
        },
      ],
    }),
    'closed-issues': () => ({
      subject: 'closed issues',
      type: 'html',
      uri: (params) => `/${params.owner}/${params.repo}/issues?state=closed`,
      rules: [
        {
          field: 'status',
          selector: '#git-issues-filters>a.item.active>.label',
          handles: [
            { func: 'text' },
            { func: 'trim' },
            { func: 'callback', params: [betterNumber] },
          ],
        },
        {
          field: 'color',
          handles: [setNumberColor('green')],
        },
      ],
    }),
    'rejected-issues': () => ({
      subject: 'rejected issues',
      type: 'html',
      uri: (params) => `/${params.owner}/${params.repo}/issues?state=rejected`,
      rules: [
        {
          field: 'status',
          selector: '#git-issues-filters>a.item.active>.label',
          handles: [
            { func: 'text' },
            { func: 'trim' },
            { func: 'callback', params: [betterNumber] },
          ],
        },
        {
          field: 'color',
          handles: [setNumberColor('red')],
        },
      ],
    }),
    'label-issues': (param) => ({
      subject: param,
      type: 'html',
      uri: (params) => `/${params.owner}/${params.repo}/issues?label_text=${param}&state=all`,
      rules: [
        {
          field: 'status',
          selector: '#git-issues-filters>a.item>.label',
          handles: [
            { func: 'callback', params: [getNodesText] },
            { func: 'reduce', params: [sumStr, 0] },
            { func: 'callback', params: [betterNumber] },
          ],
        },
        {
          field: 'color',
          selector: '#git-issues>.issue-wrapper>.issue-info>.issue-title>.issue-label-item',
          selectNoneCallback: () => 'grey',
          handles: [
            { func: 'eq', params: [0] },
            { func: 'css', params: ['color'] },
            { func: 'substring', params: [1] },
          ],
        },
      ],
    }),
    'open-label-issues': (param) => ({
      subject: param,
      type: 'html',
      uri: (params) => `/${params.owner}/${params.repo}/issues?label_text=${param}&state=open`,
      rules: [
        {
          field: 'status',
          selector: '#git-issues-filters>a.item.active>.label',
          handles: [
            { func: 'text' },
            { func: 'trim' },
            { func: 'callback', params: [betterNumber] },
          ],
        },
        {
          field: 'color',
          selector: '#git-issues>.issue-wrapper>.issue-info>.issue-title>.issue-label-item',
          selectNoneCallback: () => 'grey',
          handles: [
            { func: 'eq', params: [0] },
            { func: 'css', params: ['color'] },
            { func: 'substring', params: [1] },
          ],
        },
      ],
    }),
    'progressing-label-issues': (param) => ({
      subject: param,
      type: 'html',
      uri: (params) => `/${params.owner}/${params.repo}/issues?label_text=${param}&state=progressing`,
      rules: [
        {
          field: 'status',
          selector: '#git-issues-filters>a.item.active>.label',
          handles: [
            { func: 'text' },
            { func: 'trim' },
            { func: 'callback', params: [betterNumber] },
          ],
        },
        {
          field: 'color',
          selector: '#git-issues>.issue-wrapper>.issue-info>.issue-title>.issue-label-item',
          selectNoneCallback: () => 'grey',
          handles: [
            { func: 'eq', params: [0] },
            { func: 'css', params: ['color'] },
            { func: 'substring', params: [1] },
          ],
        },
      ],
    }),
    'closed-label-issues': (param) => ({
      subject: param,
      type: 'html',
      uri: (params) => `/${params.owner}/${params.repo}/issues?label_text=${param}&state=closed`,
      rules: [
        {
          field: 'status',
          selector: '#git-issues-filters>a.item.active>.label',
          handles: [
            { func: 'text' },
            { func: 'trim' },
            { func: 'callback', params: [betterNumber] },
          ],
        },
        {
          field: 'color',
          selector: '#git-issues>.issue-wrapper>.issue-info>.issue-title>.issue-label-item',
          selectNoneCallback: () => 'grey',
          handles: [
            { func: 'eq', params: [0] },
            { func: 'css', params: ['color'] },
            { func: 'substring', params: [1] },
          ],
        },
      ],
    }),
    'rejected-label-issues': (param) => ({
      subject: param,
      type: 'html',
      uri: (params) => `/${params.owner}/${params.repo}/issues?label_text=${param}&state=rejected`,
      rules: [
        {
          field: 'status',
          selector: '#git-issues-filters>a.item.active>.label',
          handles: [
            { func: 'text' },
            { func: 'trim' },
            { func: 'callback', params: [betterNumber] },
          ],
        },
        {
          field: 'color',
          selector: '#git-issues>.issue-wrapper>.issue-info>.issue-title>.issue-label-item',
          selectNoneCallback: () => 'grey',
          handles: [
            { func: 'eq', params: [0] },
            { func: 'css', params: ['color'] },
            { func: 'substring', params: [1] },
          ],
        },
      ],
    }),
    prs: () => ({
      subject: 'PRs',
      type: 'html',
      uri: (params) => `/${params.owner}/${params.repo}/pulls`,
      rules: [
        {
          field: 'status',
          selector: '#git-pull-requests-filters>a.item>.label',
          handles: [
            { func: 'callback', params: [getNodesText] },
            { func: 'reduce', params: [sumStr, 0] },
            { func: 'callback', params: [betterNumber] },
          ],
        },
      ],
    }),
    'open-prs': () => ({
      subject: 'open PRs',
      type: 'html',
      uri: (params) => `/${params.owner}/${params.repo}/pulls?status=open`,
      rules: [
        {
          field: 'status',
          selector: '#git-pull-requests-filters>a.item.active>.label',
          handles: [
            { func: 'text' },
            { func: 'trim' },
            { func: 'callback', params: [betterNumber] },
          ],
        },
      ],
    }),
    'closed-prs': () => ({
      subject: 'closed PRs',
      type: 'html',
      uri: (params) => `/${params.owner}/${params.repo}/pulls?status=closed`,
      rules: [
        {
          field: 'status',
          selector: '#git-pull-requests-filters>a.item.active>.label',
          handles: [
            { func: 'text' },
            { func: 'trim' },
            { func: 'callback', params: [betterNumber] },
          ],
        },
      ],
    }),
    'merged-prs': () => ({
      subject: 'merged PRs',
      type: 'html',
      uri: (params) => `/${params.owner}/${params.repo}/pulls?status=merged`,
      rules: [
        {
          field: 'status',
          selector: '#git-pull-requests-filters>a.item.active>.label',
          handles: [
            { func: 'text' },
            { func: 'trim' },
            { func: 'callback', params: [betterNumber] },
          ],
        },
      ],
    }),
    milestones: (param) => ({
      type: 'html',
      uri: (params) => `/${params.owner}/${params.repo}/milestones/${param}`,
      rules: [
        {
          field: 'status',
          selector: '#git-pull-requests-filters>a.item.active>.label',
          handles: [
            { func: 'text' },
            { func: 'trim' },
          ],
        },
      ],
    }),
  },
};

export default config;

import { template } from '@/utils/util';
import { fromNow } from '@/utils/dayjs';
import { ApiOptions } from '@/types/api';

export const baseUrl = 'https://gitee.com';

/**
 * gitee爬虫规则
 * 参数：
 * 0：owner,
 * 1：repo
 * 2：param
 */
export const apis: Record<string, ApiOptions> = {
  release: {
    url: (owner, repo) => `/${owner}/${repo}/releases`,
    subject: template`release`,
    rules: {
      status: {
        selector: '#releases-index .release-tag-item',
        handlers: [
          { method: 'eq', args: [0] },
          { method: 'find', args: ['.tag-name'] },
          { method: 'text' },
          { method: 'trim' },
        ],
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
  stars: {
    url: template`/${0}/${1}/stargazers`,
    subject: template`stars`,
    rules: {
      status: {
        selector: '.git-project-header-actions .star-container .action-social-count',
        handlers: [{ method: 'text' }, { method: 'trim' }],
      },
    },
  },
  forks: {
    url: template`/${0}/${1}/members`,
    subject: template`forks`,
    rules: {
      status: {
        selector: '.git-project-header-actions .fork-container .action-social-count',
        handlers: [{ method: 'text' }, { method: 'trim' }],
      },
    },
  },
  issues: {
    url: template`/${0}/${1}/issues`,
    subject: template`issues`,
    rules: {
      status: {
        selector: '#git-issues-filters a.item .label',
        handlers: [
          {
            method: 'each',
            args: [[{ method: 'text' }, { method: 'number' }]],
          },
          { method: 'sum' },
        ],
      },
    },
  },
  'open-issues': {
    url: template`/${0}/${1}/issues`,
    subject: template`open issues`,
    color: '8c92a4',
    rules: {
      status: {
        selector: '#git-issues-filters a.item .label',
        handlers: [{ method: 'eq', args: [0] }, { method: 'text' }],
      },
    },
  },
  'progressing-issues': {
    url: template`/${0}/${1}/issues`,
    subject: template`progressing issues`,
    color: '529DF8',
    rules: {
      status: {
        selector: '#git-issues-filters a.item .label',
        handlers: [{ method: 'eq', args: [1] }, { method: 'text' }],
      },
    },
  },
  'closed-issues': {
    url: template`/${0}/${1}/issues`,
    subject: template`closed issues`,
    color: '4baf50',
    rules: {
      status: {
        selector: '#git-issues-filters a.item .label',
        handlers: [{ method: 'eq', args: [2] }, { method: 'text' }],
      },
    },
  },
  'rejected-issues': {
    url: template`/${0}/${1}/issues`,
    subject: template`rejected issues`,
    color: 'E64A19',
    rules: {
      status: {
        selector: '#git-issues-filters a.item .label',
        handlers: [{ method: 'eq', args: [3] }, { method: 'text' }],
      },
    },
  },
  'label-issues': {
    url: template`/${0}/${1}/issues?label_ids=${2}&state=all`,
    subject: template`label-issues`,
    rules: {
      subject: {
        selector: '#git-issues-filters>.label-dropdown>.filter-text',
        handlers: [{ method: 'text' }],
      },
      status: {
        selector: '#git-issues-filters a.item .label',
        handlers: [
          {
            method: 'each',
            args: [[{ method: 'text' }, { method: 'number' }]],
          },
          { method: 'sum' },
        ],
      },
    },
  },
  'open-label-issues': {
    url: template`/${0}/${1}/issues?label_ids=${2}&state=all`,
    subject: template`label-issues`,
    color: '8c92a4',
    rules: {
      subject: {
        selector: '#git-issues-filters>.label-dropdown>.filter-text',
        handlers: [{ method: 'text' }],
      },
      status: {
        selector: '#git-issues-filters a.item .label',
        handlers: [{ method: 'eq', args: [0] }, { method: 'text' }],
      },
    },
  },
  'progressing-label-issues': {
    url: template`/${0}/${1}/issues?label_ids=${2}&state=all`,
    subject: template`label-issues`,
    color: '529DF8',
    rules: {
      subject: {
        selector: '#git-issues-filters>.label-dropdown>.filter-text',
        handlers: [{ method: 'text' }],
      },
      status: {
        selector: '#git-issues-filters a.item .label',
        handlers: [{ method: 'eq', args: [1] }, { method: 'text' }],
      },
    },
  },
  'closed-label-issues': {
    url: template`/${0}/${1}/issues?label_ids=${2}&state=all`,
    subject: template`label-issues`,
    color: '4baf50',
    rules: {
      subject: {
        selector: '#git-issues-filters>.label-dropdown>.filter-text',
        handlers: [{ method: 'text' }],
      },
      status: {
        selector: '#git-issues-filters a.item .label',
        handlers: [{ method: 'eq', args: [2] }, { method: 'text' }],
      },
    },
  },
  'rejected-label-issues': {
    url: template`/${0}/${1}/issues?label_ids=${2}&state=all`,
    subject: template`label-issues`,
    color: 'E64A19',
    rules: {
      subject: {
        selector: '#git-issues-filters>.label-dropdown>.filter-text',
        handlers: [{ method: 'text' }],
      },
      status: {
        selector: '#git-issues-filters a.item .label',
        handlers: [{ method: 'eq', args: [3] }, { method: 'text' }],
      },
    },
  },
  prs: {
    url: template`/${0}/${1}/pulls`,
    subject: template`PRs`,
    rules: {
      status: {
        selector: '#git-pull-requests-filters a.item .label',
        handlers: [{ method: 'each', args: [[{ method: 'text' }]] }, { method: 'sum' }],
      },
    },
  },
  'open-prs': {
    url: template`/${0}/${1}/pulls`,
    subject: template`open PRs`,
    color: '8c92a4',
    rules: {
      status: {
        selector: '#git-pull-requests-filters a.item .label',
        handlers: [{ method: 'eq', args: [0] }, { method: 'text' }],
      },
    },
  },
  'merged-prs': {
    url: template`/${0}/${1}/pulls`,
    subject: template`merged PRs`,
    color: '4baf50',
    rules: {
      status: {
        selector: '#git-pull-requests-filters a.item .label',
        handlers: [{ method: 'eq', args: [1] }, { method: 'text' }],
      },
    },
  },
  'closed-prs': {
    url: template`/${0}/${1}/pulls`,
    subject: template`closed PRs`,
    color: 'd92b2f',
    rules: {
      status: {
        selector: '#git-pull-requests-filters a.item .label',
        handlers: [{ method: 'eq', args: [2] }, { method: 'text' }],
      },
    },
  },
  commits: {
    url: (owner, repo, param) => `/${owner}/${repo}${param ? `/tree/${param}/` : ''}`,
    subject: template`commits`,
    rules: {
      status: {
        selector: '#git-project-info .all-commits>a',
        handlers: [{ method: 'text' }, { method: 'replace', args: ['\\D', ''] }],
      },
    },
  },
  'last-commit': {
    url: (owner, repo, param) => `/${owner}/${repo}${param ? `/tree/${param}/` : ''}`,
    subject: template`last commit`,
    rules: {
      status: {
        selector: '#git-project-info>.recent-commit>.timeago',
        handlers: [{ method: 'attr', args: ['title'] }],
      },
    },
    handleResult: (apiData) => {
      const result = { ...apiData };
      if (!apiData.message) result.message = 'null';
      result.message = fromNow(apiData.message);
      return result;
    },
  },
  branches: {
    url: (owner, repo) => `/${owner}/${repo}/branches`,
    subject: template`branches`,
    dataType: 'json',
    rules: {
      status: {
        selector: 'count',
      },
    },
  },
  releases: {
    url: (owner, repo) => `/${owner}/${repo}`,
    subject: template`releases`,
    rules: {
      status: {
        selector: '#project-wrapper .project__right-side .release .header .text-muted',
        handlers: [{ method: 'text' }, { method: 'replace', args: ['\\D', ''] }],
      },
    },
  },
  tags: {
    url: (owner, repo) => `/${owner}/${repo}`,
    subject: template`tags`,
    rules: {
      status: {
        selector: '#git-project-bread .branches-tags .item:nth-child(2) .button',
        handlers: [{ method: 'text' }, { method: 'replace', args: ['\\D', ''] }],
      },
    },
  },
  license: {
    url: (owner, repo) => `/${owner}/${repo}`,
    subject: template`license`,
    rules: {
      status: {
        selector: '#project-wrapper .project__right-side .intro .content .intro-list #license-popup',
        handlers: [{ method: 'text' }],
      },
    },
  },
  contributors: {
    url: (owner, repo) => `/${owner}/${repo}/contributors_count`,
    subject: template`contributors`,
    dataType: 'json',
    rules: {
      status: {
        selector: 'contributors_count',
      },
    },
  },
};

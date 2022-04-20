import { crawl, CrawlRules } from './_crawl';

interface SVGDataType extends BaseRequestQuery {
  subject: string;
  status: string | number;
}

function subjectNot(): SVGDataType {
  return {
    subject: 'Badge',
    status: '404',
    color: 'orange',
  };
}

interface ApiConfigType {
  subject?: string;
  type: 'api';
  uri: (params: NextQuery) => string;
  handleResult: (res: { [key: string]: unknown }) => { status: unknown, color?:Colors };
}
interface HtmlConfigType {
  subject?: string;
  type: 'html';
  uri: (params: NextQuery) => string;
  rules: CrawlRules;
}

export interface ConfigType {
  platform: string;
  baseUrl: string;
  apiBaseUrl?: string;
  subjects: {
    [key: string]: (param?: string) => ApiConfigType | HtmlConfigType;
  };
}

export async function getSVGData(query: NextQuery, config: ConfigType): Promise<SVGDataType> {
  const {
    subject, owner, repo, param, ...options
  } = query;

  const {
    platform, baseUrl, apiBaseUrl, subjects,
  } = config;

  if (!(subject in subjects)) {
    return subjectNot();
  }

  const subjectConfig = subjects[subject](param);

  try {
    const url = `${subjectConfig.type === 'api' ? apiBaseUrl || baseUrl : baseUrl}${subjectConfig.uri({ owner, repo })}`;
    const res = await fetch(url);
    if (!res.ok) {
      return { subject: platform, status: res.status, color: 'grey' };
    }

    if (subjectConfig.type === 'api') {
      const json = await res.json();
      const content = subjectConfig.handleResult(json);
      return {
        color: content.color,
        ...options,
        subject: subjectConfig.subject || subject,
        status: content.status,
      };
    }

    if (subjectConfig.type === 'html') {
      const html = await res.text();
      const content = crawl(html, subjectConfig.rules);
      if (content?.status === undefined) {
        return { subject: subjectConfig.subject || subject, status: 'none', color: 'yellow' };
      }
      return {
        color: content.color,
        ...options,
        subject: subjectConfig.subject || subject,
        status: content.status,
      };
    }

    return subjectNot();
  } catch (error) {
    return { subject: 'badge', status: (error as Error).message, color: 'red' };
  }
}

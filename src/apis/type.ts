import { CrawlerUrlOptions } from "@wtto00/spider-crawler";

export interface ApiParams {
  subject: string;
  owner: string;
  repo: string;
  param: string;
}

export interface ApiResult {
  subject: string;
  status: string;
  color?: string;
}

type TemplateString = (...values: string[]) => string;

type CrawlerUrlNoDataTypeOptionsNew = Omit<CrawlerUrlOptions, "url">;
export type ApiOptions = CrawlerUrlNoDataTypeOptionsNew & {
  url: TemplateString;
  subject: TemplateString;
  color?: string;
  handleResult?: (result: ApiResult) => ApiResult;
};

import { Cheerio, CheerioAPI, load, Node } from 'cheerio';
import { format } from 'friendly-numbers';

type HandleResType = [] | string | number | undefined;
export type HandleEleType = Cheerio<Node> | HandleResType;

type CrawlRulesKeysType = 'status' | 'color';

interface CrawlRuleHandle {
  func: string;
  params?: unknown[];
}
interface CrawlRule {
  field: CrawlRulesKeysType;
  selector: string;
  selectNoneCallback?: (res: CrawRes) => string | undefined;
  handles: CrawlRuleHandle[];
}
type CrawlRuleCallbackHandle = (res: CrawRes) => string | undefined;
interface CrawlRuleCallback {
  field: CrawlRulesKeysType;
  handles: CrawlRuleCallbackHandle[];
}

export type CrawlRules = (CrawlRule | CrawlRuleCallback)[];

interface CrawRes {
  status: string | undefined;
  color?: string | undefined;
}

/**
 * 获取一组Node的text数组
 * @param $ CheerioAPI
 * @param ele Cheerio的Node对象
 * @returns string[]
 */
export function getNodesText(ele: Cheerio<Node>, $: CheerioAPI) {
  return ele.map((_i: number, elem: Node) => $(elem).text()).get();
}
export function betterNumber(ele: string): string | undefined {
  return format(Number(ele) || 0);
}
export function setNumberColor(color?: ColorsType): (res: CrawRes) => ColorsType | undefined {
  return (res: CrawRes) => {
    if (!Number(res.status)) return 'grey';
    return color;
  };
}

export function crawl(html: string | undefined, rules: CrawlRules | undefined): CrawRes {
  if (!html || !rules) return { status: undefined };
  const $ = load(html);
  const res = { status: undefined };
  rules.forEach((rule) => {
    if (!rule.field || rule.handles.length === 0) {
      res[rule.field] = undefined;
      return;
    }
    if (!('selector' in rule)) {
      rule.handles.forEach((cb) => {
        res[rule.field] = cb(res);
      });
      return;
    }
    let ele: HandleEleType = $(rule.selector);
    for (let i = 0; i < rule.handles.length; i += 1) {
      const { func, params = [] } = rule.handles[i];
      if (ele === undefined || (typeof ele === 'object' && '_root' in ele && !ele.length)) {
        if ('selectNoneCallback' in rule && rule.selectNoneCallback) {
          ele = rule.selectNoneCallback(res);
        } else {
          ele = undefined;
        }
        break;
      }
      if (func === 'callback') {
        const callback = params[0] as (p1: HandleEleType, p2: CheerioAPI) => HandleResType;
        ele = callback(ele, $);
      } else {
        ele = ele[func](...params);
      }
    }
    res[rule.field] = ele;
  });
  return res;
}

import {
  Cheerio, CheerioAPI, load, Node,
} from 'cheerio';

type HandleResType = { status:unknown, color?:Colors };
type HandleEleType = Cheerio<Node> | HandleResType;

export interface CrawlRules {
  content: {
    selector: string;
    handles: { func: string; params?: unknown[], }[];
  };
}

/**
 * 获取一组Node的text数组
 * @param $ CheerioAPI
 * @param ele Cheerio的Node对象
 * @returns string[]
 */
export function getNodesText(ele:Cheerio<Node>, $:CheerioAPI) {
  return ele.map((_i:number, elem:Node) => $(elem).text());
}

function hasOwnProperty(
  obj: HandleEleType,
  prop: string,
):obj is HandleResType & Record<'status', unknown> {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

export function crawl(
  html: string | undefined,
  rules: CrawlRules | undefined,
): HandleResType {
  if (!html || !rules) return { status: undefined };
  const $ = load(html);
  let ele: HandleEleType = $(rules.content.selector);
  if (!ele) return { status: undefined };
  for (let i = 0; i < rules.content.handles.length; i += 1) {
    const { func, params = [] } = rules.content.handles[i];
    if (!hasOwnProperty(ele, 'status') && !ele.length) {
      ele = { status: undefined };
      break;
    }
    if (func === 'callback') {
      const callback = params[0] as (
        p2: HandleEleType,
        p1: CheerioAPI,
      ) => HandleResType;
      ele = callback(ele, $);
    } else {
      ele = ele[func](...params);
    }
  }
  if (hasOwnProperty(ele, 'status')) return ele;
  return { status: ele };
}

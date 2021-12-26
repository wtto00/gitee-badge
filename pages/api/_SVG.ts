import cheerio from 'cheerio';
import { chars, colors } from 'pages/api/_const';

export default class SVG {
  /**
   * 获取字符串的宽度
   * @param text 文本字符串
   * @returns 字符串的宽度
   */
  private static getTextLength = (text: string) => {
    let width = 0;
    for (const t of `${text}`) {
      if (t >= '0' && t <= '9') {
        width += 70;
      } else if (t >= ' ' && t <= '~') {
        width += chars[t] || 0;
      } else {
        width += 110;
      }
    }
    return width;
  };

  /**
   * 获取图标svg以及宽度
   * @param icon 图标名称
   * @returns
   */
  private static async getIcon(icon: string) {
    try {
      const { default: iconRaw } = await import(`assets/icons/${icon}.svg`);
      const $ = cheerio.load(iconRaw);
      const svg = $('svg');
      svg.attr('x', '40');
      svg.attr('y', '35');
      const width = Number(svg.attr('width')) || 0;
      return {
        icon: svg.parent().html(),
        iconWidth: width + 30,
      };
    } catch (error) {
      console.log('error:', error);
      return {
        icon: null,
        iconWidth: 0,
      };
    }
  }

  /**
   * 生成SVG
   * @param query 请求Request query
   * @returns SVG代码
   */
  static async generate(query: NextApiRequestQuery) {
    const subjectLength = this.getTextLength(query.subject);
    const statusLength = this.getTextLength(query.status);
    const color = colors[query.color] || colors.blue;
    const labelColor = colors[query.labelColor] || '#555';
    const { icon = '', iconWidth = 0 } = query.icon
      ? await this.getIcon(query.icon)
      : {};
    const textPosition = subjectLength === 0 ? 12 + iconWidth : 60 + iconWidth;
    let width = (subjectLength + statusLength + 140 + textPosition) / 10;
    let height = 20;
    const scale = Number(query.scale);
    if (!isNaN(scale)) {
      width *= scale;
      height *= scale;
    }

    return `<svg width="${width}" height="${height}" viewBox="0 0 ${
      subjectLength + statusLength + 140 + textPosition
    } 200" xmlns="http://www.w3.org/2000/svg">
  <linearGradient id="badge" x2="0" y2="100%">
    <stop offset="0" stop-opacity=".1" stop-color="#EEE"/>
    <stop offset="1" stop-opacity=".1"/>
  </linearGradient>
  <mask id="mask"><rect width="${
  subjectLength + statusLength + 140 + textPosition
}" height="200" rx="30" fill="#FFF"/></mask>
  <g mask="url(#mask)">
    <rect width="${
  subjectLength + 40 + textPosition
}" height="200" fill="${labelColor}"/>
    <rect width="${statusLength + 100}" height="200" fill="${color}" x="${
  subjectLength + 40 + textPosition
}"/>
    <rect width="${
  subjectLength + statusLength + 140 + textPosition
}" height="200" fill="url(#badge)"/>
  </g>
  <g fill="#fff" text-anchor="start" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="110">
    <text x="${textPosition}" y="148" textLength="${subjectLength}" fill="#000" opacity="0.25">${
  query.subject
}</text>
    <text x="${textPosition - 10}" y="138" textLength="${subjectLength}">${
  query.subject
}</text>
    <text x="${
  subjectLength + 95 + textPosition
}" y="148" textLength="${statusLength}" fill="#000" opacity="0.25">${
  query.status
}</text>
    <text x="${
  subjectLength + 85 + textPosition
}" y="138" textLength="${statusLength}">${query.status}</text>
  </g>
  ${icon}
</svg>`;
  }
}

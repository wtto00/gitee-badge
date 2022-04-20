import { load } from 'cheerio';
import { chars, Colors, Icons } from './_const';

export default class SVG {
  // 类目
  subject: string;

  // 类目状态值
  status: string;

  // 状态值背景色
  color?: Colors;

  // 类目背景色
  labelColor?: Colors;

  // 类目前面的图标
  icon?: Icons;

  // 缩放大小
  scale?: number;

  constructor(props: NextQuery) {
    const {
      subject, status, label, list, color, labelColor, icon, scale,
    } = props;
    // subject可被label参数覆盖
    this.subject = (subject || '').toString();
    if (label !== undefined) {
      this.subject = label.toString();
    }
    // status中的,可被list参数替换
    this.status = (status ?? '').toString();
    if (typeof list === 'string' && list) {
      this.status = this.status.replace(/,/g, ` ${list} `);
    }
    // color
    if (color) this.color = Colors[color.toString()];
    // labelColor
    if (labelColor) this.labelColor = Colors[labelColor.toString()];
    // icon
    if (icon) this.icon = Icons[icon.toString()];

    // scale
    if (scale) {
      const scaleNum = Number(scale);
      if (!Number.isNaN(scaleNum)) {
        this.scale = scaleNum;
      }
    }
  }

  /**
   * 获取字符串的宽度
   * @param text 文本字符串
   * @returns 字符串的宽度
   */
  private getTextLength = (text: string) => {
    let width = 0;
    for (let i = 0; i < text.length; i += 1) {
      const t = text[i];
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
  private async getIcon(): Promise<{ icon: string | null; iconWidth: number }> {
    if (!this.icon) {
      return {
        icon: null,
        iconWidth: 0,
      };
    }
    try {
      const { default: iconRaw } = await import(`assets/icons/${this.icon}.svg`);
      const $ = load(iconRaw);
      const svg = $('svg');
      svg.attr('x', '40');
      svg.attr('y', '35');
      const width = Number(svg.attr('width')) || 0;
      return {
        icon: svg.parent().html(),
        iconWidth: width + 30,
      };
    } catch (error) {
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
  async generate(): Promise<string> {
    const subjectLength = this.getTextLength(this.subject);
    const statusLength = this.getTextLength(this.status);
    const { icon, iconWidth } = await this.getIcon();
    const textPosition = subjectLength === 0 ? 12 + iconWidth : 60 + iconWidth;
    let width = (subjectLength + statusLength + 140 + textPosition) / 10;
    let height = 20;
    if (this.scale) {
      width *= this.scale;
      height *= this.scale;
    }

    return `<svg width="${width}" height="${height}" viewBox="0 0 ${
      subjectLength + statusLength + 140 + textPosition
    } 200" xmlns="http://www.w3.org/2000/svg">
  <linearGradient id="badge" x2="0" y2="100%">
    <stop offset="0" stop-opacity=".1" stop-color="#EEE"/>
    <stop offset="1" stop-opacity=".1"/>
  </linearGradient>
  <mask id="mask"><rect width="${subjectLength + statusLength + 140 + textPosition}" height="200" rx="30" fill="#FFF"/></mask>
  <g mask="url(#mask)">
    <rect width="${subjectLength + 40 + textPosition}" height="200" fill="${this.labelColor || '#555'}"/>
    <rect width="${statusLength + 100}" height="200" fill="${this.color || Colors.blue}" x="${
  subjectLength + 40 + textPosition
}"/>
    <rect width="${subjectLength + statusLength + 140 + textPosition}" height="200" fill="url(#badge)"/>
  </g>
  <g fill="#fff" text-anchor="start" font-family="Verdana,DejaVu Sans,sans-serif" font-size="110">
    <text x="${textPosition}" y="148" textLength="${subjectLength}" fill="#000" opacity="0.25">${this.subject}</text>
    <text x="${textPosition - 10}" y="138" textLength="${subjectLength}">${this.subject}</text>
    <text x="${subjectLength + 95 + textPosition}" y="148" textLength="${statusLength}" fill="#000" opacity="0.25">${
  this.status
}</text>
    <text x="${subjectLength + 85 + textPosition}" y="138" textLength="${statusLength}">${this.status}</text>
  </g>
  ${icon || ''}
</svg>`;
  }
}

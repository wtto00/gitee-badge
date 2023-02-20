import { load } from "cheerio";
import { chars, colors, icons } from "./_const";
import { CheckIsColor } from "./_util";

/**
 * 计算字符串的宽度
 * @param text 字符串
 * @returns
 */
function getTextLength(text: string) {
  let width = 0;
  for (const t of `${text}`) {
    if (t >= "0" && t <= "9") {
      width += 70;
    } else if (t >= " " && t <= "~") {
      width += chars[t] || 0;
    } else {
      width += 110;
    }
  }
  return width;
}

/**
 * 根据图标名称 获取图标的svg字符串以及图标宽度
 * @param icon 图标
 * @returns
 */
async function getIcon(
  icon?: string
): Promise<{ svg: string | null; iconWidth: number }> {
  if (!icon) return { svg: null, iconWidth: 0 };

  try {
    const { default: iconRaw } = await import(`@/assets/icons/${icon}.svg`);

    const $ = load(iconRaw);
    const svg = $("svg");
    svg.attr("x", "40");
    svg.attr("y", "35");
    const width = Number(svg.attr("width")) || 0;
    return { svg: svg.parent().html(), iconWidth: width + 30 };
  } catch (error) {
    console.error(error);
    return { svg: null, iconWidth: 0 };
  }
}

/**
 * 获取渲染的颜色
 * @param color 颜色字符串
 * @returns
 */
function getColor(color: string) {
  if (!color) return colors.blue;
  if (color in colors) return colors[color];
  if (CheckIsColor(color)) return color;
  return colors.blue;
}

/**
 * 根据参数数据 生成svg
 * @param params 获取到的参数数据
 * @returns
 */
export async function getSvgData(params: Record<string, string>) {
  let { subject, status, icon } = params;
  const { color, label, list, labelColor, scale } = params;

  // 根据参数处理要输出的数据
  if (label !== undefined) subject = label;
  if (list) status = status.replace(/,/g, ` ${list} `);
  if (icon && !(icon in icons)) icon = "";
  const statusColor = getColor(color);
  const subjectColor = labelColor in colors ? colors[labelColor] : "#555";
  const scaleNum = Number(scale) || 1;

  const subjectLength = getTextLength(subject);
  const statusLength = getTextLength(status);

  const { svg, iconWidth } = await getIcon(icon);
  const textPosition = subjectLength === 0 ? 12 + iconWidth : 60 + iconWidth;
  let width = (subjectLength + statusLength + 140 + textPosition) / 10;
  let height = 20;
  if (scaleNum) {
    width *= scaleNum;
    height *= scaleNum;
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
  }" height="200" fill="${subjectColor}"/>
  <rect width="${statusLength + 100}" height="200" fill="${statusColor}" x="${
    subjectLength + 40 + textPosition
  }"/>
  <rect width="${
    subjectLength + statusLength + 140 + textPosition
  }" height="200" fill="url(#badge)"/>
</g>
<g fill="#fff" text-anchor="start" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="110">
  <text x="${textPosition}" y="148" textLength="${subjectLength}" fill="#000" opacity="0.25">${subject}</text>
  <text x="${
    textPosition - 10
  }" y="138" textLength="${subjectLength}">${subject}</text>
  <text x="${
    subjectLength + 95 + textPosition
  }" y="148" textLength="${statusLength}" fill="#000" opacity="0.25">${status}</text>
  <text x="${
    subjectLength + 85 + textPosition
  }" y="138" textLength="${statusLength}">${status}</text>
</g>
${svg}
</svg>`;
}

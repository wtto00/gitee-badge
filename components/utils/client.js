import chars from "./chars";
import colors from "./colors";

/**
 * 分割url，得到参数
 * @param {string} url
 * @param {object} format
 */
export function getQuery(url, format) {
  const query = {};
  const arr1 = url.split("?");

  const arr2 = arr1[0].split("/");
  for (const key in format) {
    query[key] = decodeURIComponent(arr2[format[key]]);
  }

  if (arr1.length > 1) {
    const arr3 = arr1[1].split("&");
    arr3.forEach(q => {
      const arr4 = q.split("=");
      query[decodeURIComponent(arr4[0])] = decodeURIComponent(arr4[1]);
    });
  }
  return query;
}

/**
 * 获取字符串的宽度
 * @param {string} text
 */
export function getTextLength(text) {
  let width = 0;
  for (let t of text) {
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
 * 获取svg元素
 * @param {object} query
 */
export function getSvg(query) {
  const subjectLength = getTextLength(query.subject);
  const statusLength = getTextLength(query.status);
  const color = colors[query.color] || colors.blue;

  return `<svg width="${(subjectLength + statusLength + 200) /
    10}" height="20" viewBox="0 0 ${subjectLength +
    statusLength +
    200} 200" xmlns="http://www.w3.org/2000/svg">
  <linearGradient id="a" x2="0" y2="100%">
    <stop offset="0" stop-opacity=".1" stop-color="#EEE"/>
    <stop offset="1" stop-opacity=".1"/>
  </linearGradient>
  <mask id="m"><rect width="${subjectLength +
    statusLength +
    200}" height="200" rx="30" fill="#FFF"/></mask>
  <g mask="url(#m)">
    <rect width="${subjectLength + 100}" height="200" fill="#555"/>
    <rect width="${statusLength +
      100}" height="200" fill="${color}" x="${subjectLength + 100}"/>
    <rect width="${subjectLength +
      statusLength +
      200}" height="200" fill="url(#a)"/>
  </g>
  <g fill="#fff" text-anchor="start" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="110">
    <text x="60" y="148" textLength="${subjectLength}" fill="#000" opacity="0.25">${
    query.subject
  }</text>
    <text x="50" y="138" textLength="${subjectLength}">${query.subject}</text>
    <text x="${subjectLength +
      155}" y="148" textLength="${statusLength}" fill="#000" opacity="0.25">${
    query.status
  }</text>
    <text x="${subjectLength + 145}" y="138" textLength="${statusLength}">${
    query.status
  }</text>
  </g>
</svg>`;
}

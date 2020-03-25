import { createCanvas } from "canvas";

/**
 * 获取颜色
 * @param {string} color
 */
export function getColor(color) {
  switch (color) {
    case "cyan":
      return "#1BC";
    case "green":
      return "#3C1";
    case "yellow":
      return "#DB1";
    case "orange":
      return "#F73";
    case "red":
      return "#E43";
    case "pink":
      return "#E5B";
    case "purple":
      return "#94E";
    case "grey":
      return "#999";
    case "black":
      return "#2A2A2A";
    case "blue":
    default:
      return "#08C";
  }
}

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
  let canvas = createCanvas(200, 50, "svg");
  canvas.font = "110 Verdana,DejaVu Sans";
  let ctx = canvas.getContext("2d");
  return ctx.measureText(text).width;
}

export function getSvg(query) {
  const subjectLength = getTextLength(query.subject) * 12;
  const statusLength = getTextLength(query.status) * 12;
  const color = getColor(query.color);

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
  <g fill="#fff" text-anchor="start" font-size="110">
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

import fetch from "node-fetch";

export async function release(owner, repo) {
  const url = `https://gitee.com/api/v5/repos/${owner}/${repo}/releases/latest`;
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json;charset=UTF-8" }
  });
  const text = await res.json();
  return text;
}

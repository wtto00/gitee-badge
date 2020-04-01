import fetch from "node-fetch";

const options = {
  headers: { "Content-Type": "application/json;charset=UTF-8" }
};

export async function release(owner, repo) {
  const url = `https://gitee.com/api/v5/repos/${owner}/${repo}/releases/latest`;
  const res = await fetch(url, options);

  const json = await res.json();
  return json;
}

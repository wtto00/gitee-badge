import fetch from "node-fetch";
import {
  success,
  warning,
  noneRepo,
  errors,
  noneSubject,
  showBetter,
} from "components/utils/api";

const options = {
  headers: { "Content-Type": "application/json;charset=UTF-8" },
};

export default async (subject, owner, repo) => {
  try {
    const url = getUrl(subject, owner, repo);

    if (!url) {
      return noneSubject();
    }

    const res = await fetch(url, options);
    const json = await res.json();

    switch (subject) {
      case "release":
        if (json.tag_name) {
          return success(json.tag_name);
        }
        if (json.message === "404 Not Found") {
          return warning("none");
        }
        break;
      case "tag":
        if (Array.isArray(json)) {
          if (json.length === 0) {
            return warning("none");
          }
          return success("v" + json[json.length - 1].name);
        }
        break;
      case "watchers":
        if (Array.isArray(json)) {
          if (json.length === 0) {
            return noneRepo("404 Project Not Found");
          }
          return success(showBetter(json[0].watchers_count));
        }
        break;
      case "stars":
        if (Array.isArray(json)) {
          if (json.length === 0) {
            return noneRepo("404 Project Not Found");
          }
          return success(showBetter(json[0].stargazers_count));
        }
        break;
      case "forks":
        if (Array.isArray(json)) {
          if (json.length === 0) {
            return noneRepo("404 Project Not Found");
          }
          return success(showBetter(json[0].forks_count));
        }
        break;
      case "license":
        if (json.license) {
          return success(json.license);
        }
        if (json.message === "404 Not Found") {
          return warning("none");
        }
        break;
      case "open-issues":
        if (Array.isArray(json)) {
          if (json.length === 0) {
            return noneRepo("404 Project Not Found");
          }
          return success(json[0]["open_issues_count"], "orange");
        }
        break;
      case "branches":
        if (Array.isArray(json)) {
          return success(json.length);
        }
        break;
      case "issues":
      case "closed-issues":
        if (Array.isArray(json)) {
          if (json.length < 100) {
            return success(json.length);
          }
          let count = await caclCount(url);
          return success(count + json.length);
        }
        break;
      default:
        return noneSubject();
    }
    return noneRepo(json.message);
  } catch (error) {
    console.log("error:", error);
    return errors();
  }
};

function getUrl(subject, owner, repo) {
  switch (subject) {
    case "release":
      return `https://gitee.com/api/v5/repos/${owner}/${repo}/releases/latest`;
    case "tag":
      return `https://gitee.com/api/v5/repos/${owner}/${repo}/tags`;
    case "branches":
      return `https://gitee.com/api/v5/repos/${owner}/${repo}/${subject}`;
    case "watchers":
    case "stars":
    case "forks":
    case "open-issues":
      return `https://gitee.com/api/v5/search/repositories?q=${repo}&page=1&per_page=1&owner=${owner}&order=desc`;
    case "license":
      return `https://gitee.com/api/v5/repos/${owner}/${repo}/license`;
    case "issues":
      return `https://gitee.com/api/v5/repos/${owner}/${repo}/issues?state=all&page=1&per_page=100`;
    case "closed-issues":
      return `https://gitee.com/api/v5/repos/${owner}/${repo}/issues?state=closed&page=1&per_page=100`;
    default:
      return "";
  }
}

async function caclCount(url) {
  try {
    let length = 100;
    let count = 0;
    let page = 2;
    while (length === 100) {
      const index = url.indexOf("page=");
      const uri = url.substr(0, index) + "page=" + page + url.substr(index + 6);
      const res = await fetch(uri, options);
      const json = await res.json();
      if (Array.isArray(json)) {
        length = json.length;
        count += length;
        page++;
      } else {
        throw new Error();
      }
    }
    return count;
  } catch (error) {
    return 0;
  }
}

import fetch from "node-fetch";
import {
  success,
  warning,
  noneRepo,
  errors,
  noneSubject,
  showBetter,
  showPercent,
  betterDate,
} from "components/utils/api";

const options = {
  headers: { "Content-Type": "application/json;charset=UTF-8" },
  timeout: 0,
};

export default async (subject, owner, repo, param) => {
  try {
    const url = getUrl(subject, owner, repo, param);

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
        if (json.watchers_count) {
          return success(showBetter(json.watchers_count));
        }
        if (json.message === "404 Not Found") {
          return warning("none");
        }
        break;
      case "stars":
        if (json.stargazers_count) {
          return success(showBetter(json.stargazers_count));
        }
        if (json.message === "404 Not Found") {
          return warning("none");
        }
        break;
      case "forks":
        if (json.forks_count) {
          return success(showBetter(json.forks_count));
        }
        if (json.message === "404 Not Found") {
          return warning("none");
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
        if (json.open_issues_count) {
          return success(showBetter(json.open_issues_count));
        }
        if (json.message === "404 Not Found") {
          return warning("none");
        }
        break;
      case "last-commit":
        if (json.pushed_at) {
          return success(betterDate(json.pushed_at));
        }
        if (json.message === "404 Not Found") {
          return warning("none");
        }
        break;
      case "branches":
        if (Array.isArray(json)) {
          return success(json.length);
        }
        break;
      case "contributors":
        if (json.members && Array.isArray(json.members)) {
          return success(json.members.length);
        }
        if (json.message === "404 Not Found") {
          return warning("none");
        }
        break;
      case "issues":
      case "closed-issues":
      case "label-issues":
      case "open-label-issues":
      case "closed-label-issues":
      case "prs":
      case "open-prs":
      case "closed-prs":
      case "merged-prs":
      case "commits":
      case "releases":
        if (Array.isArray(json)) {
          if (json.length < 100) {
            return success(json.length);
          }
          let count = await caclCount(url);
          return success(count + json.length);
        }
        break;
      case "tags":
        if (Array.isArray(json)) {
          return success(json.length);
        }
        break;
      case "milestones":
        const count = { closed: 0, open: 0, progressing: 0, rejected: 0 };
        if (Array.isArray(json)) {
          if (json.length < 100) {
            json.forEach((item) => {
              count[item.state] += 1;
            });
            return success(
              showPercent(
                count.closed + count.rejected,
                count.closed + count.open + count.progressing + count.rejected
              )
            );
          }
          const otherCount = await calcClassCount(url);
          count.closed += otherCount.closed;
          count.open += otherCount.open;
          count.progressing += otherCount.progressing;
          count.rejected += otherCount.rejected;
          return success(
            showPercent(
              count.closed + count.rejected,
              count.closed + count.open + count.progressing + count.rejected
            )
          );
        }
        break;
      case "last-commit-branch":
        const date = json?.commit?.commit?.committer?.date;

        if (date) {
          return success(betterDate(date));
        }
        if (json.message === "404 Not Found") {
          return warning("none");
        }
        break;
      case "last-commit-tag":
        if (Array.isArray(json)) {
          const tag = json.find((t) => t.name === param);
          if (tag) {
            const date = tag?.commit?.date;
            if (date) {
              return success(betterDate(date));
            }
          }
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

function getUrl(subject, owner, repo, param) {
  switch (subject) {
    case "release":
      return `https://gitee.com/api/v5/repos/${owner}/${repo}/releases/latest`;
    case "tag":
    case "last-commit-tag":
    case "tags":
      return `https://gitee.com/api/v5/repos/${owner}/${repo}/tags`;
    case "branches":
    case "last-commit-branch":
      return `https://gitee.com/api/v5/repos/${owner}/${repo}/branches${
        param ? "/" + param : ""
      }`;
    case "watchers":
    case "stars":
    case "forks":
    case "open-issues":
    case "last-commit":
    case "contributors":
      return `https://gitee.com/api/v5/repos/${owner}/${repo}`;
    case "license":
      return `https://gitee.com/api/v5/repos/${owner}/${repo}/license`;
    case "issues":
      return `https://gitee.com/api/v5/repos/${owner}/${repo}/issues?state=all&page=1&per_page=100`;
    case "closed-issues":
      return `https://gitee.com/api/v5/repos/${owner}/${repo}/issues?state=closed&page=1&per_page=100`;
    case "label-issues":
      return `https://gitee.com/api/v5/repos/${owner}/${repo}/issues?state=all&labels=${param}&page=1&per_page=100`;
    case "open-label-issues":
      return `https://gitee.com/api/v5/repos/${owner}/${repo}/issues?state=open&labels=${param}&page=1&per_page=100`;
    case "closed-label-issues":
      return `https://gitee.com/api/v5/repos/${owner}/${repo}/issues?state=closed&labels=${param}&page=1&per_page=100`;
    case "prs":
      return `https://gitee.com/api/v5/repos/${owner}/${repo}/pulls?state=all&page=1&per_page=100`;
    case "open-prs":
      return `https://gitee.com/api/v5/repos/${owner}/${repo}/pulls?state=open&page=1&per_page=100`;
    case "closed-prs":
      return `https://gitee.com/api/v5/repos/${owner}/${repo}/pulls?state=closed&page=1&per_page=100`;
    case "merged-prs":
      return `https://gitee.com/api/v5/repos/${owner}/${repo}/pulls?state=merged&page=1&per_page=100`;
    case "milestones":
      return `https://gitee.com/api/v5/repos/${owner}/${repo}/issues?state=all&page=1&per_page=100&milestone=${param}`;
    case "commits":
      return `https://gitee.com/api/v5/repos/${owner}/${repo}/commits?page=1&per_page=100${
        param ? "&sha=" + param : ""
      }`;
    case "releases":
      return `https://gitee.com/api/v5/repos/${owner}/${repo}/releases?page=1&per_page=100`;
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

async function calcClassCount(url) {
  const count = { closed: 0, open: 0, progressing: 0, rejected: 0 };
  try {
    let length = 100;
    let page = 2;
    while (length === 100) {
      const index = url.indexOf("page=");
      const uri = url.substr(0, index) + "page=" + page + url.substr(index + 6);
      const res = await fetch(uri, options);
      const json = await res.json();
      if (Array.isArray(json)) {
        json.forEach((item) => {
          count[item.state] += 1;
        });
        page++;
      } else {
        throw new Error();
      }
    }
    return count;
  } catch (error) {
    return count;
  }
}

import fetch from "node-fetch";

const options = {
  headers: { "Content-Type": "application/json;charset=UTF-8" }
};

export async function release(owner, repo) {
  try {
    const url = `https://gitee.com/api/v5/repos/${owner}/${repo}/releases/latest`;
    const res = await fetch(url, options);
    const json = await res.json();

    if (json.tag_name) {
      return success(json.tag_name);
    }

    if (json.message === "404 Not Found") {
      return warning("none");
    }

    return noneRepo(json.message);
  } catch (error) {
    console.log("error:", error);
    return errors("something wrong!");
  }
}

export async function tag(owner, repo) {
  try {
    const url = `https://gitee.com/api/v5/repos/${owner}/${repo}/tags`;
    const res = await fetch(url, options);

    const json = await res.json();

    if (Array.isArray(json)) {
      if (json.length === 0) {
        return warning("none");
      }

      return success("v" + json[json.length - 1].name);
    }

    return noneRepo(json.message);
  } catch (error) {
    console.log("error:", error);
    return errors("something wrong!");
  }
}

export async function watchers(owner, repo) {
  try {
    const url = `https://gitee.com/api/v5/search/repositories?q=${repo}&page=1&per_page=1&owner=${owner}&order=desc`;
    const res = await fetch(url, options);

    const json = await res.json();

    if (Array.isArray(json)) {
      if (json.length === 0) {
        return noneRepo("404 Project Not Found");
      }

      return success(json[0].watchers_count);
    }

    return noneRepo(json.message);
  } catch (error) {
    console.log("error:", error);
    return errors("something wrong!");
  }
}

const success = status => {
  return { code: 200, data: { status } };
};

const noneRepo = message => {
  if (message === "404 Project Not Found") {
    return {
      code: 200,
      data: { subject: "gitee", status: "Project Not Found", color: "grey" }
    };
  }

  return warning(message);
};

const warning = status => {
  return { code: 200, data: { status, color: "yellow" } };
};

const errors = message => {
  return { code: 404, data: message };
};

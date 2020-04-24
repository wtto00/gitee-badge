export default {
  tag: "latest tag",
  "open-issues": "open issues",
  "closed-issues": "closed issues",
  "label-issues": (query) => query.param,
  "open-label-issues": (query) => query.param,
  "closed-label-issues": (query) => query.param,
  prs: "PRs",
  "open-prs": "open PRs",
  "closed-prs": "closed PRs",
  "merged-prs": "merged PRs",
  milestones: (query) => query.param,
};

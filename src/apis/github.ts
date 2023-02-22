/**
 * github
 * GraphQL API
 */

import { ApiGraphQLOptions, ApiParams, ApiResult } from "./type";

export const baseUrl = "https://api.github.com/graphql";

export const apis: Record<string, ApiGraphQLOptions> = {
  release: {
    query: (owner, repo, param) =>
      param === "stable"
        ? `
        {
          repository(owner: "${owner}", name: "${repo}") {
            latestRelease {
              tagName
            }
          }
}`
        : `
{
  repository(owner: "${owner}", name: "${repo}") {
    releases(first: 2) {
      nodes {
        isDraft
        tagName
      }
    }
  }
}`,
    handleResult: (apiData: ApiResult, params?: ApiParams) => {
      const result = { ...apiData };

      if (params?.param === "stable") {
        const latestRelease = (result.status as any)?.repository?.latestRelease;
        if (!latestRelease) result.status = "unknown";
        else result.status = latestRelease?.tagName;
        return result;
      }

      const release = (
        (apiData.status as any)?.repository?.releases?.nodes || []
      ).find((item: any) => !item.isDraft);
      if (!release) result.status = "unknown";
      else result.status = release.tagName;

      return result;
    },
  },
  tag: {
    query: (owner, repo) => `
{
  repository(owner: "${owner}", name: "${repo}") {
    releases(first: 2) {
      nodes {
        isDraft
        tagName
      }
    }
  }
}`,
    handleResult: (apiData: ApiResult) => {
      const result = { ...apiData };

      const release = (
        (apiData.status as any)?.repository?.releases?.nodes || []
      ).find((item: any) => !item.isDraft);
      if (!release) result.status = "unknown";
      else result.status = release.tagName;

      return result;
    },
  },
};

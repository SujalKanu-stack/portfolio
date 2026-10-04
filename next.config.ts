import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";
let repoName = "";
if (process.env.GITHUB_REPOSITORY) {
  repoName = process.env.GITHUB_REPOSITORY.split("/")[1] || "";
}

// When building on GitHub Actions for https://<owner>.github.io/<repo>, basePath is /<repo>
const defaultBasePath =
  isGithubActions && repoName && !repoName.endsWith(".github.io")
    ? `/${repoName}`
    : process.env.NODE_ENV === "production"
    ? "/portfolio"
    : "";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? defaultBasePath;

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

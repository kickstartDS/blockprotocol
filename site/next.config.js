// @ts-check

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/** @type {import("next").NextConfig} */
const nextConfig = {
  pageExtensions: ["page.ts", "page.tsx", "api.ts"],

  // We call linters in GitHub Actions for all pull requests. By not linting
  // again during `next build`, we save CI minutes and unlock more feedback.
  // Thus, we can get Playwright test results and Preview releases for WIP PRs.
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  async redirects() {
    return [
      {
        source: "/discord",
        destination: "https://discord.gg/PefPteFe5j",
        permanent: true,
      },
      {
        source: "/faq",
        destination: "/docs/faq",
        permanent: true,
      },
      {
        source: "/partners",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/partners/submitted",
        destination: "/contact/submitted",
        permanent: true,
      },
    ];
  },

  webpack: (webpackConfig) => {
    //  Build the sandbox HTML, which will have the sandbox script injected
    const framedBlockFolder = "/src/components/pages/hub/sandbox/FramedBlock";
    webpackConfig.plugins.push(
      new HtmlWebpackPlugin({
        filename: "static/sandbox.html",
        template: path.join(__dirname, framedBlockFolder, "index.html"),
        chunks: ["blockSandbox"],
      }),
    );
    return {
      ...webpackConfig,
      entry: () =>
        webpackConfig.entry().then((entry) => ({
          ...entry,
          blockSandbox: path.join(__dirname, framedBlockFolder, "index.tsx"),
        })),
    };
  },
};

module.exports = nextConfig;

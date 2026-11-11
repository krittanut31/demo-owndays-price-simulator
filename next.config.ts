import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/demo-owndays-price-simulator" : "",
  images: { unoptimized: true },
};

export default nextConfig;
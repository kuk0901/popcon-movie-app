import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles")]
  },
  images: {
    domains: ["file.koreafilm.or.kr", "img.kmdb.or.kr"]
  }
};

export default nextConfig;

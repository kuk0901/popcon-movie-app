import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles")]
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "file.koreafilm.or.kr",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "http",
        hostname: "file.koreafilm.or.kr",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "img.kmdb.or.kr",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "http",
        hostname: "img.kmdb.or.kr",
        port: "",
        pathname: "/**"
      }
    ]
  }
};

export default nextConfig;

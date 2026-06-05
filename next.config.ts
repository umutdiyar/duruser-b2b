import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "durusergida.com",
      },
      {
        protocol: "https",
        hostname: "www.durusergida.com",
      },
    ],
  },
};

export default nextConfig;

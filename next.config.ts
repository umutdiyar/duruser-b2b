import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,

  allowedDevOrigins: ["192.168.1.107", "localhost", "127.0.0.1"],

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

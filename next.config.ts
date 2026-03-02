import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/pets",
        destination: "/animals",
        permanent: true,
      },
      {
        source: "/pets/:path*",
        destination: "/animals/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

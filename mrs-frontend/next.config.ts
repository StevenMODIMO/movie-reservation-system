import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "t0mrrn6uzcxdc7gp.public.blob.vercel-storage.com",
        port: "",
        pathname: "/mrs/movie-posters/**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "t0mrrn6uzcxdc7gp.public.blob.vercel-storage.com",
        port: "",
        pathname: "/mrs/profiles/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;

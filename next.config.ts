import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "adtxlhrwbztfkcxrmvtw.supabase.co",
      },
    ],
  },
};

export default nextConfig;
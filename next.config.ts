/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
    ],
  },

  experimental: {
    serverActions: {
      bodySizeLimit: "5mb",
    },
    // Add Prisma to external packages
    serverComponentsExternalPackages: ["@prisma/client"],
  },

  // Add webpack configuration to handle Prisma bundling issues
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Prevent Node.js modules from being bundled on the client side
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        dns: false,
        tls: false,
        assert: false,
        path: false,
        url: false,
        util: false,
        querystring: false,
        stream: false,
        crypto: false,
        http: false,
        https: false,
        os: false,
        zlib: false,
        "node:async_hooks": false,
        "node:child_process": false,
        "node:events": false,
        "node:fs/promises": false,
        "node:fs": false,
      };
    }
    return config;
  },
};

export default nextConfig;

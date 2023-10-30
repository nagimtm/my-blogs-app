/** @type {import('next').NextConfig} */

const nextConfig = {
  experimental: {
    appDir: false,
    serverComponentsExternalPackages: ["mongoose"],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
  images: {
    remotePatterns: [
      { hostname: "res.cloudinary.com", protocol: "https", port: "" },
    ],
  },
};

module.exports = nextConfig;

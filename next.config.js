require("dotenv").config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    PAT: process.env.PAT,
  },
};

module.exports = nextConfig;

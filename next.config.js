const WindiCSSWebpackPlugin = require('windicss-webpack-plugin')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // experimental: {
  //   outputStandalone: true,
  // },
  webpack: (config,) => {
    config.plugins.push(new WindiCSSWebpackPlugin())
    return config
  },
}

module.exports = nextConfig

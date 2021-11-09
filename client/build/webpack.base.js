/**
 * @fileoverview Base Webpack configuration, shared between development and production builds.
 * - Default config: https://github.com/dzervoudakes/dztools/blob/main/packages/bundling/webpack-config-react-typescript/config/webpack.base.js
 * - Notes on customizing/extending: https://github.com/dzervoudakes/dztools/tree/main/packages/bundling/webpack-config-react-typescript#readme
 */
const { webpackBaseConfig } = require('@dztools/webpack-config-react-typescript');
const { EnvironmentPlugin } = require('webpack');
const { merge } = require('webpack-merge');

module.exports = merge(webpackBaseConfig, {
  plugins: [
    new EnvironmentPlugin({
      NODE_ENV: process.env.NODE_ENV || 'development',
      API_BASE_URL: process.env.API_BASE_URL || 'http://localhost:3000/api',
      AUTH_USERNAME: process.env.AUTH_USERNAME || 'admin',
      AUTH_PASSWORD: process.env.AUTH_PASSWORD || 'letmein'
    })
  ]
});

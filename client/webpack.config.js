/**
 * @fileoverview Configuration file for Webpack development and production builds.
 */
const { merge } = require('webpack-merge');

const baseConfig = require('./build/webpack.base');

const envs = {
  development: 'dev',
  production: 'prod'
};

const env = envs[process.env.NODE_ENV || 'development'];
const envConfig = require(`./build/webpack.${env}.js`);

module.exports = merge(baseConfig, envConfig);

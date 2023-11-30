module.exports = function override(config, env) {
    // Add or modify Webpack configurations
    config.node = {
      ...config.node,
      fs: 'empty'
    };
    return config;
  }
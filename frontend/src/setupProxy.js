const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api1',
    createProxyMiddleware({
      target: 'https://unidata-nexrad-level3.s3.amazonaws.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api1': '', // rewrite path if needed
      },
    })
  );

//   app.use(
//     '/api2',
//     createProxyMiddleware({
//       target: 'https://second-external-site.com',
//       changeOrigin: true,
//       pathRewrite: {
//         '^/api2': '', // rewrite path if needed
//       },
//     })
//   );

  // ... Add more proxies as needed
};

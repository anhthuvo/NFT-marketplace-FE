const { i18n } = require('./next-i18next.config');

module.exports = {
  distDir: 'build',
  i18n,
  images: {},
  async redirects() {
    return [
      {
        source: '/404',
        destination: '/',
        permanent: true
      }
    ];
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/
      },
      use: ['@svgr/webpack']
    });
    // if (isServer) {
    //   // Perform customizations to webpack config
    //   config.plugins.push(
    //     new webpack.NormalModuleReplacementPlugin(/(.*)-APP_TARGET(\.*)/, function (resource) {
    //       resource.request = resource.request.replace(/-APP_TARGET/, `-${appTarget}`);
    //     })
    //   );
    // }
    // Important: return the modified config
    return config;
  },
  compiler: {
    styledComponents: true
  },
};

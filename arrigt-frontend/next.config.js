module.exports = {
  experimental: {
    outputStandalone: true,
  },
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/events",
        permanent: false,
      },
      {
        source: "/event",
        destination: "/events",
        permanent: false,
      },
    ];
  },
};

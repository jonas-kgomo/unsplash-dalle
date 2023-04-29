module.exports = {
  images: {
    domains: ['store.storeimages.cdn-apple.com', 'images.unsplash.com', 'en.wikipedia.org', 'upload.wikimedia.org'],
  },
  webpack: (config) => {
    // this will override the experiments
    config.experiments = { ...config.experiments, ...{ topLevelAwait: true }};
    // this will just update topLevelAwait property of config.experiments
    // config.experiments.topLevelAwait = true 
    return config;
  },
}

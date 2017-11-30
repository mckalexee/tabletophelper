module.exports = {
  navigateFallback: '/index.html',
  stripPrefix: 'dist',
  root: 'dist/',
  staticFileGlobs: [
    'dist/index.html',
    'dist/**.js',
    'dist/**.css',
    'dist/**.map',
    'dist/**.eot',
    'dist/**.svg',
    'dist/**.woff2',
    'dist/**.ttf',
    'dist/**.woff',
    'dist/assets/**.*'
  ],
  maximumFileSizeToCacheInBytes: 10 * 1024 * 1024,
  runtimeCaching: [{
    urlPattern: '/home',
    handler: 'networkFirst'
  },
  {
    urlPattern: 'index.html',
    handler: 'networkFirst'
  }]
};
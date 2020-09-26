module.exports = {
  productionSourceMap: false,
  filenameHashing: false,
  configureWebpack: {
    plugins: [
    ]
  },
  pwa: {
    name: 'njoy',
    themeColor: '#27E19E',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'white',
    manifestOptions: {
      description: 'A download manager for njoy',
      background_color: '#FFFAFA',
      start_url: '/',
      scope: '/',
      display: 'standalone',
      orientation: 'portrait',
      msTileColor: '#27E19E',
      shortcuts: [
        {
          name: 'Progress Overview',
          short_name: 'Progress',
          description: 'View the progress of all downloads',
          url: '/',
          icons: [{ src: '/img/progress.png', sizes: '512x512' }]
        },
        {
          name: 'New Download',
          short_name: 'Download',
          description: 'Start a new download of one or more files',
          url: '/download',
          icons: [{ src: '/img/download.png', sizes: '512x512' }]
        }
      ],
    },
    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: 'src/assets/sw.js',
    },
    manifestPath: 'manifest.webmanifest'
  }
}
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
      lang: 'en-US',
      background_color: '#FFFAFA',
      url: 'https://deploy-preview-5--njoy-frontend.netlify.app/',
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
        },
      ],
      share_target: {
        action: '/download',
        method: 'GET',
        enctype: 'application/x-www-form-urlencoded',
        params: {
          title: 'title',
          text: 'text',
          url: 'url'
        }
      }
    },
    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    // workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      // swSrc is required in InjectManifest mode.
      swSrc: './src/assets/sw.js',
      exclude: [
        '_redirects',
        'sw.js',
      ]
    },
    manifestPath: 'manifest.webmanifest'
  }
}
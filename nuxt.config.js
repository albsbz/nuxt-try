
module.exports = {
  /*
  ** Headers of the page
  */

  head: {
    title: 'nuxt-app',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icon.png' }
    ]
  },
  modules: [
    '@nuxtjs/axios',
    // '@nuxtjs/pwa',
    ['nuxt-gmaps', {
      key: 'AIzaSyA1vAShQtxMAjvIThqju94x-nJmUQO9EaE',
      //you can use libraries: ['places']
    }]
  ],
  pwa: {
    workbox: {
      /* workbox options */
    },
    meta: {
      /* meta options */
    }
  },
  serverMiddleware: [
    '~/api/app.js',
  ],

  axios: {
    // proxyHeaders: false
    baseURL: process.env.BASE_URL || 'http://localhost:3000'
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  plugins: [
    { src: '@/plugins/globals'},
    { src: '@/plugins/axios'}
  ],
  env:{
    appName: 'BLOG'
  },
  css:[
    '@/themes/mainTheme'
  ]
}

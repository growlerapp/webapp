module.exports = {
  pwa: {
    name: 'GrowlerApp',
    themeColor: '#ff6666',
    msTileColor: '#ff6666',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#ff6666',
    iconPaths: {
      favicon16: 'img/icons/icon-16x16.png',
      favicon32: 'img/icons/icon-32x32.png',
      appleTouchIcon: 'img/icons/icon-152x152.png',
      maskIcon: 'img/icons/safari-pinned-tab.svg',
      msTileImage: 'img/icons/mstile-150x150.png'
    }
  },

  pluginOptions: {
    graphqlMock: false,
    apolloEngine: false
  },

  chainWebpack: config => {
    // GraphQL Loader
    config.module
      .rule('gql')
      .test(/\.gql$/)
      .use('graphql-tag/loader')
      .loader('graphql-tag/loader')
      .end()
  }
}

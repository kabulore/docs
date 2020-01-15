module.exports = {
  base: '/docs/webpack/',
  dest: './dist/webpack',
  plugins: {
    '@vuepress/pwa': {
      serviceWorker: true,
      updatePopup: {
        '/': {
          message: '发现新内容可用',
          buttonText: '刷新',
        }
      }
    },
    '@vuepress/back-to-top': true
  },
  locales: {
    '/': {
      lang: 'zh-CN',
      title: '读书笔记',
      description: 'Webpack 学习笔记',
    },
  },
  themeConfig: {
    docsDir: 'docs',
    locales: {
      '/': {
        lang: 'zh-CN',
        label: '简体中文',
        lastUpdated: '上次更新'
      }
    }
  }
}
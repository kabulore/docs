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
      title: 'Webpack',
      description: 'Webpack 学习笔记',
    }
  },
  themeConfig: {
    repo: 'kabulore/docs',
    docsDir: 'docs',
    smoothScroll: true,
    displayAllHeaders: true,
    locales: {
      '/': {
        lang: 'zh-CN',
        label: '简体中文',
        editLinks: true,
        lastUpdated: '上次更新',
        nav: [
          {
            text: '配置',
            link: '/',
          },
          {
            text: '原理',
            link: '/principle/'
          }
        ]
      }
    }
  }
}
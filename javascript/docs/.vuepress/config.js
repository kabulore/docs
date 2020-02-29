module.exports = {
  base: '/docs/javascript/',
  dest: './dist/javascript',
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
      title: 'Javascript',
      description: 'Javascript 学习笔记',
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
            text: 'Javascript',
            link: '/',
          }
        ]
      }
    }
  }
}
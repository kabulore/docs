module.exports = {
  base: '/docs/interview/',
  dest: './dist/interview',
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
      title: '前端面试题',
      description: '前端面试题',
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
          },
          {
            text: 'Css',
            link: '/css/'
          }
        ]
      }
    }
  }
}
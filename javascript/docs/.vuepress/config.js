module.exports = {
  base: '/docs/javascript/',
  dest: './dist/javascript',
  plugins: {
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
            text: 'Javascript 高级程序设计（第3版）',
            link: '/',
          },
          {
            text: '你不知道的 Javascript',
            link: '/unknown',
          }
        ]
      }
    }
  },
  markdown: {
    lineNumbers: true
  }
}
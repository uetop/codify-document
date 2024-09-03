const base = "/codify-api/"
export default {
  base,
  lang: 'en-US',
  title: 'Codify',
  description: 'Deliver your design draft as code',
  lastUpdated: true,
  ignoreDeadLinks: true,
  themeConfig: {
    logo: { src: '/images/logo.svg', width: 24, height: 24 },
    search: {
      provider: 'local'
    },
    nav: [
      { text: 'Change log', link: '/changelog' },
      { text: 'Guide', link: '/guide/intro' },
      { text: 'Codify', link: 'https://codify.fun' },

      {
        text: 'Language',
        items: [
          { text: 'en', link: 'http://doc.codify-api.com' },
          { text: 'zh', link: 'http://zh-doc.codify-api.com' },
        ],
      },

      // ...
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'What is Codify', link: '/guide/intro' },
          // ...
        ],
      },
      {
        text: 'Started',
        items: [
          { text: 'Install', link: '/guide/install' },
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Playground settings', link: '/guide/playground-setting' },
          { text: 'Custom Properties', link: '/guide/custom-properties' },
          // ...
        ],
      },
      {
        text: 'Configuration',
        items: [
          { text: 'Feature setting', link: '/guide/feature-setting' },
          { text: 'Mappings', link: '/guide/mappings' },
          { text: 'Style parsers', link: '/guide/style-parsers' },
          { text: 'Render options', link: '/guide/render-options' },
          { text: 'Component parsers', link: '/guide/component-parsers' },
        ],
      },
      {
        text: 'Support',
        items: [
          { text: 'FAQ', link: '/guide/faq' },
          { text: 'Creating Components', link: '/guide/createing-components' },
          { text: 'Design adjustment', link: '/guide/design-draft-adjustment' },
          // ...
        ],
      },
      {
        text: 'Resource',
        items: [
          { text: 'Uikit', link: '/guide/uikit' },
          { text: 'Demo', link: '/guide/demo-project' },
          // ...
        ],
      },
    ],
  }
}

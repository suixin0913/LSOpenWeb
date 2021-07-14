const isProd = process.env.NODE_ENV === 'production';
const debug = !isProd

module.exports = {
  title: '聆思文档中心',
  tagline: 'LSOpen资料库',
  url: 'https://github.com/LISTENAI',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'listenai', // Usually your GitHub org/user name.
  projectName: 'LSOpenWeb', // Usually your repo name.
  organizationName: 'LISTENAI',
  themeConfig: {
    navbar: {
      logo: {
        href: '/',
        alt: 'LSOpen Logo',
        src: 'img/logo.svg',
        srcDark: 'img/logo_dark.svg'
      },
      items: [
        {
          to: "/CSK_online_guides",
          label: '开始',
          position: 'left'
        },
        {
          to: "/csksdk_api",
          label: '芯片',
          position: 'left'
        },
        {
          to: "/csksdk_api",
          label: 'SDK',
          position: 'left'
        },
        {
          to: '/download',
          label: '工具',
          position: 'left'
        },
        {
          to: '/lisa',
          label: 'AI应用',
          position: 'left'
        },
        {
          to: '/school',
          label: '行业解决方案',
          position: 'left'
        },
        {
          to: '/school',
          label: 'FAQ',
          position: 'left'
        },
        {
          href: "https://cloud.listenai.com",
          label: "LSCloud",
          position: 'left'
        }
      ],
    },
    subNavbar: [
      {
        dirName: '/CSK_online_guides',
        items: [
          {
            to: "/CSK_online_guides",
            label: '文档导读',
          },
          {
            to: "/csksdk_api",
            label: '学习路径',
          },
          {
            to: "/csksdk_api",
            label: '快速入门',
          },
          {
            to: '/download',
            label: '术语',
          }
        ],
      }
    ],
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      switchConfig: {
        darkIcon: {
          light: 'img/undark.svg',
          dark: 'img/dark.svg' 
        },
        lightIcon: {
          light: 'img/light.svg',
          dark: 'img/unlight.svg',
        },
      }
    },
    footer: {
      style: 'dark',
      links: [],
      copyright: `Copyright © 安徽聆思智能科技有限公司皖ICP备05001217号`,
    }
  },
  presets: [
    [
      // '@docusaurus/preset-classic',
      require.resolve("./src/preset/index.js"),
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/'
          // Please change this to your repo.
          // editUrl:
          //   'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  // themes: [
  //   [require.resolve('@docusaurus/theme-classic'), {
  //     customCss: require.resolve('./src/css/custom.css'),
  //   }],
  // ],

  plugins: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        // ... Your options.
        // `hashed` is recommended as long-term-cache of index file is possible.
        hashed: true,
        indexPages: true,
        docsRouteBasePath: "/",
        // For Docs using Chinese, The `language` is recommended to set to:
        // ```
        language: ["en", "zh"],
        // ```
        // When applying `zh` in language, please install `nodejieba` in your project.
        translations: {
          search_placeholder: "搜索"
        }
      },
    ],
    // [
    //   require.resolve('@docusaurus/plugin-content-docs'),
    //   {
    //     sidebarPath: require.resolve('./sidebars.js'),
    //     routeBasePath: '/'
    //     // Please change this to your repo.
    //     // editUrl:
    //     //   'https://github.com/facebook/docusaurus/edit/master/website/',
    //   },
    // ],
    // [
    //   require.resolve('@docusaurus/plugin-content-pages'),
    //   {},
    // ],
    // debug && require.resolve('@docusaurus/plugin-debug'),
    // isProd && [
    //   require.resolve('@docusaurus/plugin-sitemap'),
    //   {},
    // ],
    // // ... Your other plugins.
    // 'lstenai-analytics',
  ],
};

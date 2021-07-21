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
          activeBasePath: "/start",
          to: "/start/introduction",
          label: '开始',
          position: 'left'
        },
        {
          activeBasePath: "/chips",
          to: "/chips/selection_guide", //跳转哪个目录
          label: '芯片', 
          position: 'left'
        },
        {
          to: "/SDK/SDK/introduction",
          label: 'SDK',
          position: 'left'
        },
        {
          activeBasePath: "/tools",
          to: '/tools/LStudio/introduction',
          label: '工具',
          position: 'left'
        },
        {
          activeBasePath: "/AIsolution",
          to: '/AIsolution/ESR/quicklystart/quicklystart',
          label: 'AI应用',
          position: 'left'
        },
        {
          to: '/Industrysolution/Smartairconditioning/quicklystart/quicklystart',
          label: '行业解决方案',
          position: 'left'
        },
        {
          to: '/FAQ/FAQ/introduction',
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
        dirName: '/start',
        items: [
          {
            to: "/start/introduction",
            label: '文档导读',
          },
          {
            to: "/start/quickstart",
            label: '快速入门',
          },
        ],
      },
      {
        dirName: '/chips',//对应的一级目录
        items: [
          {
            to: "/chips/selection_guide",//跳转哪个目录
            label: '芯片选型指南',
          },
          {
            activeBasePath: "/chips/4002",
            to: "/chips/4002/chip_Introduction",
            label: '4002',
          },
          {
            activeBasePath: "/chips/300X",
            to: "/chips/300X/chip_Introduction",
            label: '300X',
          },
        ],
      },
      {
        dirName: '/SDK',//对应的一级目录
        items: [
          {
            to: "/SDK/SDK/introduction",//跳转哪个目录
            label: 'SDK开发',
          },
        ],
      },
      {
        dirName: '/tools',//对应的一级目录
        items: [
          {
            to: "/tools/LStudio/introduction",//跳转哪个目录
            label: 'LStudio',
          },
          {
            to: "/tools/LISA&LPM/introduction",//跳转哪个目录
            label: 'LISA&LPM',
          },
          {
            activeBasePath: "/tools/tools",
            to: "/tools/tools/Mass_production/tools1",//跳转哪个目录
            label: '轻工具',
          },
        ],
      },
      {
        dirName: '/AIsolution',//对应的一级目录
        items: [
          {
            activeBasePath: "/AIsolution/ESR",
            to: "/AIsolution/ESR/quicklystart/quicklystart",//跳转哪个目录
            label: '离线语音',
          },
          {
            activeBasePath: "/AIsolution/NC",
            to: "/AIsolution/NC/quicklystart/quicklystart",//跳转哪个目录
            label: '通话降噪',
          },
          {
            activeBasePath: "/AIsolution/DSP",
            to: "/AIsolution/DSP/quicklystart/quicklystart",//跳转哪个目录
            label: 'DSP声学前端',
          },
        ],
      },
      {
        dirName: '/Industrysolution',//对应的一级目录
        items: [
          {
            to: "/Industrysolution/Smartairconditioning/quicklystart/quicklystart",//跳转哪个目录
            label: '智能语音空调',
          },
        ],
      },
      {
        dirName: '/FAQ',//对应的一级目录
        items: [
          {
            to: "/FAQ/FAQ/introduction",//跳转哪个目录
            label: '常见FAQ',
          },
        ],
      },
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
          customCss: [
            require.resolve('./src/css/custom.css'),
            require.resolve('./src/css/customMd.css')
          ],
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
        docsRouteBasePath: [],
        
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

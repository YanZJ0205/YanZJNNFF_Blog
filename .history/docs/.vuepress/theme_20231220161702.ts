import { hopeTheme } from 'vuepress-theme-hope'
import { Navbar } from './navbar.js'
import { Sidebar } from './sidebar.js'

export default hopeTheme({
  hostname: 'https://yzjnnff.github.io/blog/',

  author: {
    name: 'YanZJNNFF',
    url: 'https://github.com/yzjnnff/blog',
    email: '1057670698@qq.com'
  },

  favicon: '/favicon.ico',

  navbar: Navbar,
  sidebar: Sidebar,

  iconAssets: '//at.alicdn.com/t/c/font_3926422_48j18vbdiro.css',
  iconPrefix: 'iconfont icon-',

  repo: 'https://github.com/yzjnnff/blog',
  docsBranch: 'master',
  docsDir: 'docs',

  pageInfo: [
    'Author',
    'Original',
    'Date',
    'Category',
    'Tag',
    'ReadingTime',
    'Word',
    'PageView'
  ],

  blog: {
    avatar: '/avatar.jpg',
    roundAvatar: true,
    medias: {
      QQ: "http://wpa.qq.com/msgrd?v=3&uin=1057670698&site=qq&menu=yes",
      GitHub: 'https://github.com//YanZJ0205',
      Email: 'mailto:1057670698@qq.com',
      Bilibili: 'https://space.bilibili.com/237549227?spm_id_from=333.999.0.0',
    },
    description: '',
    intro: '/intro.html'
  },

  footer: 'Enquanto houver 1% de chance,teremo 99% fé.',

  displayFooter: true,

  copyright: 'MIT 协议',

  metaLocales: {
    editLink: '在 GitHub 上编辑此页'
  },

  encrypt: {
    admin: '0525',
    config: {
      '/demo/encrypt.html': ['1234'],
      '/zh/demo/encrypt.html': ['1234']
    }
  },

  plugins: {
    blog: {
      excerptLength: 0,
    },
    /*
    comment: {
      // You should generate and use your own comment service
      provider: 'Waline',
      serverURL: 'https://blog-api-dribble-njr.vercel.app/'
    },
    */
    // all features are enabled for demo, only preserve features you need here
    mdEnhance: {
      align: true,
      attrs: true,
      chart: true,
      codetabs: true,
      container: true,
      demo: true,
      echarts: true,
      figure: true,
      flowchart: true,
      gfm: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      katex: true,
      mark: true,
      mermaid: true,
      playground: {
        presets: ['ts', 'vue']
      },
      presentation: {
        plugins: ['highlight', 'math', 'search', 'notes', 'zoom']
      },
      stylize: [
        {
          matcher: 'Recommended',
          replacer: ({ tag }) => {
            if (tag === 'em')
              return {
                tag: 'Badge',
                attrs: { type: 'tip' },
                content: 'Recommended'
              }
          }
        }
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      vuePlayground: true
    }

    // uncomment these if you want a PWA
    // pwa: {
    //   favicon: "/favicon.ico",
    //   cacheHTML: true,
    //   cachePic: true,
    //   appendBase: true,
    //   apple: {
    //     icon: "/assets/icon/apple-icon-152.png",
    //     statusBarColor: "black",
    //   },
    //   msTile: {
    //     image: "/assets/icon/ms-icon-144.png",
    //     color: "#ffffff",
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/assets/icon/chrome-mask-512.png",
    //         sizes: "512x512",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-mask-192.png",
    //         sizes: "192x192",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //     ],
    //     shortcuts: [
    //       {
    //         name: "Demo",
    //         short_name: "Demo",
    //         url: "/demo/",
    //         icons: [
    //           {
    //             src: "/assets/icon/guide-maskable.png",
    //             sizes: "192x192",
    //             purpose: "maskable",
    //             type: "image/png",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },
  }
})

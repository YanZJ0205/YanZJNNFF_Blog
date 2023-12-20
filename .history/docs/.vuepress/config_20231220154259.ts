import { defineUserConfig } from 'vuepress'
import theme from './theme.js'

export default defineUserConfig({
  base: '/YanZJNNFF_Blog/',
  lang: 'zh-CN',
  title: "YanZJNNFF's Blog",
  description: 'Hiya',
  theme

  // Enable it with pwa
  // shouldPrefetch: false,
})

import { getDirname, path } from "@vuepress/utils";
import { defineUserConfig } from 'vuepress'
import theme from './theme.js'
const __dirname = getDirname(import.meta.url);
export default defineUserConfig({
  base: '/blog/',
  lang: 'zh-CN',
  title: "YanZJNNFF's Blog",
  description: 'Hiya',
  alias: {
    "@MyLink": path.resolve(__dirname, "./components/Mylink.vue"),
    "@BlogLinks": path.resolve(__dirname, "./data/friendData.ts"),
    "@Design": path.resolve(__dirname, "./data/design.ts"),
    "@DocLinks": path.resolve(__dirname, "./data/documents.ts"),
  },
  theme: theme

  // Enable it with pwa
  // shouldPrefetch: false,
})

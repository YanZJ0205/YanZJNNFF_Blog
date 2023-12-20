import {
  computerScience,
  reading
} from './sidebar/index'

import { sidebar } from 'vuepress-theme-hope'

export const Sidebar = sidebar({
  '/computer-science/': computerScience,
  '/reading/': reading,
  '/': ['']
})

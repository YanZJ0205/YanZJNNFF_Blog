import {
  computerScience,
  frontend,
  project,
  reading
} from './sidebar/index'

import { sidebar } from 'vuepress-theme-hope'

export const Sidebar = sidebar({
  '/computer-science/': computerScience,
  '/frontend/': frontend,
  '/project/': project,
  '/reading/': reading,
  '/': ['']
})

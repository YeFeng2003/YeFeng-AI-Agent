import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NewsView from '../views/NewsView.vue'
import AgentView from '../views/AgentView.vue'
import ToolsView from '../views/ToolsView.vue'
import PromptsView from '../views/PromptsView.vue'
import CompareView from '../views/CompareView.vue'
import CostView from '../views/CostView.vue'
import AboutView from '../views/AboutView.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/news', component: NewsView },
  { path: '/agent', component: AgentView },
  { path: '/tools', component: ToolsView },
  { path: '/prompts', component: PromptsView },
  { path: '/compare', component: CompareView },
  { path: '/cost', component: CostView },
  { path: '/about', component: AboutView }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router

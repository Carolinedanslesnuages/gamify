import { createRouter, createWebHistory } from 'vue-router'
import RelevesView from '../views/RelevesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{ path: '/', name: 'releves', component: RelevesView }],
})

// Titre de page qui dit où l'on est (RGAA 8.6).
router.afterEach(() => {
  document.title = 'Relevés — gamify'
})

export default router

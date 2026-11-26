import { createRouter, createWebHistory } from 'vue-router'
import RelevesView from '../views/RelevesView.vue'
import TachesView from '../views/TachesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'releves', component: RelevesView, meta: { titre: 'Relevés' } },
    { path: '/taches', name: 'taches', component: TachesView, meta: { titre: 'Mes tâches du jour' } },
  ],
})

// Titre de page qui dit où l'on est (RGAA 8.6).
router.afterEach((destination) => {
  document.title = `${String(destination.meta.titre ?? 'Accueil')} — gamify`
})

export default router

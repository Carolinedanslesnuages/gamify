<script setup lang="ts">
import { RouterView } from 'vue-router'
import EtatConnexion from '@/components/EtatConnexion.vue'
import MiseAJour from '@/components/MiseAJour.vue'

const logoText = ['République', 'Française']
// Liens d'évitement (RGAA 12.7) : premiers éléments atteints au clavier.
const liensEvitement = [
  { id: 'contenu', text: 'Contenu' },
  { id: 'pied-de-page', text: 'Pied de page' },
]
const liensRapides = [{ label: 'Mes tâches du jour', to: '/taches', icon: 'fr-icon-list-unordered' }]
</script>

<template>
  <DsfrSkipLinks :links="liensEvitement" />
  <DsfrHeader
    service-title="gamify"
    service-description=""
    :logo-text="logoText"
    home-to="/"
    :quick-links="liensRapides"
  />
  <EtatConnexion />
  <MiseAJour />
  <main id="contenu" class="fr-container fr-my-6w" tabindex="-1">
    <RouterView />
  </main>
  <DsfrFooter id="pied-de-page" :logo-text="logoText" />
</template>

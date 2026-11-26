<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue'

/** Une nouvelle version est prête : on le propose, sans recharger d'office (une saisie peut être en cours). */
const { needRefresh, updateServiceWorker } = useRegisterSW()
</script>

<template>
  <div role="status" class="fr-container">
    <div v-if="needRefresh" class="fr-alert fr-alert--info fr-my-2w">
      <h2 class="fr-alert__title">Une nouvelle version est disponible</h2>
      <p>Vos relevés sont conservés.</p>
      <ul class="fr-btns-group fr-btns-group--inline-sm fr-mt-1w">
        <li><DsfrButton size="sm" label="Mettre à jour" @click="updateServiceWorker(true)" /></li>
        <li><DsfrButton size="sm" tertiary label="Plus tard" @click="needRefresh = false" /></li>
      </ul>
    </div>
  </div>
</template>

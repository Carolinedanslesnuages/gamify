<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useTachesStore } from '@/stores/taches'

const magasin = useTachesStore()
const { tachesDuJour, erreur } = storeToRefs(magasin)
const titre = ref('')
const erreurSaisie = ref('')
const annonce = ref('')

function ajouter(): void {
  if (!magasin.ajouter(titre.value)) {
    erreurSaisie.value = 'Saisissez le titre de la tâche avant de l’ajouter'
    annonce.value = ''
    return
  }
  annonce.value = `Tâche « ${titre.value.trim()} » ajoutée.`
  titre.value = ''
  erreurSaisie.value = ''
}
</script>

<template>
  <h1>Mes tâches du jour</h1>
  <p>Les tâches sont enregistrées sur cet appareil et fonctionnent sans connexion.</p>

  <form novalidate class="fr-mb-4w" @submit.prevent="ajouter">
    <p class="fr-hint-text">Les champs marqués d’un astérisque (*) sont obligatoires.</p>
    <DsfrInputGroup
      v-model="titre"
      label="Titre de la tâche *"
      label-visible
      :error-message="erreurSaisie"
      required
      autocomplete="off"
    />
    <DsfrButton type="submit" label="Ajouter la tâche" icon="fr-icon-add-line" />
  </form>

  <p role="status" class="fr-sr-only">{{ annonce }}</p>
  <DsfrAlert v-if="erreur" type="error" small :description="erreur" class="fr-mb-2w" />

  <h2 class="fr-h5">Tâches du jour ({{ tachesDuJour.length }})</h2>
  <p v-if="tachesDuJour.length === 0">Aucune tâche pour aujourd’hui.</p>
  <ul v-else class="fr-p-0 taches">
    <li v-for="tache in tachesDuJour" :key="tache.id" class="fr-mb-2w">{{ tache.titre }}</li>
  </ul>
</template>

<style scoped>
.taches {
  list-style: none;
}
</style>

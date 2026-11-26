<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRelevesStore } from '@/stores/releves'

const magasin = useRelevesStore()
const { releves, erreur } = storeToRefs(magasin)
const texte = ref('')
const erreurSaisie = ref('')
const annonce = ref('')

function ajouter(): void {
  if (!texte.value.trim()) {
    erreurSaisie.value = 'Écrivez le relevé avant de l’ajouter'
    return
  }
  magasin.ajouter(texte.value)
  annonce.value = 'Relevé ajouté.'
  texte.value = ''
  erreurSaisie.value = ''
}

function supprimer(id: string): void {
  magasin.supprimer(id)
  annonce.value = 'Relevé supprimé.'
}

const dateLisible = (iso: string) => new Date(iso).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' })
</script>

<template>
  <h1>gamify</h1>
  <p>Exemple : des relevés saisis sur le terrain, même sans réseau. Ils restent sur cet appareil.</p>

  <form novalidate class="fr-mb-4w" @submit.prevent="ajouter">
    <DsfrInputGroup v-model="texte" label="Nouveau relevé" label-visible :error-message="erreurSaisie" />
    <DsfrButton type="submit" label="Ajouter" icon="fr-icon-add-line" />
  </form>

  <p role="status" class="fr-sr-only">{{ annonce }}</p>
  <DsfrAlert v-if="erreur" type="error" small :description="erreur" class="fr-mb-2w" />

  <h2 class="fr-h5">Relevés ({{ releves.length }})</h2>
  <p v-if="releves.length === 0">Aucun relevé pour l’instant.</p>
  <ul v-else class="fr-p-0 releves">
    <li v-for="releve in releves" :key="releve.id" class="fr-mb-2w">
      <p class="fr-mb-1v">{{ releve.texte }}</p>
      <p class="fr-text--xs fr-mb-1v">Saisi le {{ dateLisible(releve.saisiLe) }}</p>
      <DsfrButton size="sm" tertiary label="Supprimer" :aria-label="`Supprimer le relevé « ${releve.texte} »`" @click="supprimer(releve.id)" />
    </li>
  </ul>

  <DsfrAccordionsGroup class="fr-mt-4w">
    <DsfrAccordion id="installer" title="Installer l’application sur mon téléphone">
      <ul>
        <li><strong>Android (Chrome, Edge)</strong> : menu ⋮, puis « Installer l’application ».</li>
        <li><strong>iPhone (Safari)</strong> : bouton Partager, puis « Sur l’écran d’accueil ».</li>
        <li><strong>Ordinateur (Chrome, Edge)</strong> : icône d’installation dans la barre d’adresse.</li>
      </ul>
      <p class="fr-mb-0">Une fois installée, elle s’ouvre comme une application et fonctionne sans réseau.</p>
    </DsfrAccordion>
  </DsfrAccordionsGroup>
</template>

<style scoped>
.releves {
  list-style: none;
}
</style>

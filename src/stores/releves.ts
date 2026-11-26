import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'
import { ecrire, lire } from '@/services/stockage'

/** Un relevé saisi sur le terrain (exemple de fonctionnalité utilisable hors connexion). */
export interface Releve {
  id: string
  texte: string
  saisiLe: string
}

/** Les relevés de l'appareil : enregistrés à chaque changement, relus au démarrage. */
export const useRelevesStore = defineStore('releves', () => {
  const releves = ref<Releve[]>(lire<Releve[]>('releves', []))
  const erreur = ref<string | null>(null)

  function enregistrer(): void {
    erreur.value = ecrire('releves', releves.value)
      ? null
      : 'L’appareil n’a pas pu enregistrer : son stockage est plein ou désactivé.'
  }

  function ajouter(texte: string): void {
    releves.value = [{ id: crypto.randomUUID(), texte: texte.trim(), saisiLe: new Date().toISOString() }, ...releves.value]
    enregistrer()
  }

  function supprimer(id: string): void {
    releves.value = releves.value.filter((releve) => releve.id !== id)
    enregistrer()
  }

  return { releves, erreur, ajouter, supprimer }
})

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useRelevesStore, import.meta.hot))

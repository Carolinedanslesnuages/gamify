import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { ecrire, lire } from '@/services/stockage'

/** Une tâche de la journée, enregistrée sur l'appareil. */
export interface Tache {
  id: string
  titre: string
  /** Date de création, locale à l'appareil, au format AAAA-MM-JJ. */
  jour: string
  creeLe: string
}

/** Date du jour au format AAAA-MM-JJ, selon le fuseau de l'appareil. */
export function jourLocal(date: Date = new Date()): string {
  const mois = String(date.getMonth() + 1).padStart(2, '0')
  const jourDuMois = String(date.getDate()).padStart(2, '0')
  return `${date.getFullYear()}-${mois}-${jourDuMois}`
}

/** Les tâches de l'appareil : enregistrées à chaque ajout, relues au démarrage. */
export const useTachesStore = defineStore('taches', () => {
  const taches = ref<Tache[]>(lire<Tache[]>('taches', []))
  const erreur = ref<string | null>(null)

  const tachesDuJour = computed(() => taches.value.filter((tache) => tache.jour === jourLocal()))

  /** Ajoute une tâche si son titre n'est pas vide ; renvoie faux sinon. */
  function ajouter(titre: string): boolean {
    const titreNettoye = titre.trim()
    if (!titreNettoye) return false
    const maintenant = new Date()
    taches.value = [
      ...taches.value,
      { id: crypto.randomUUID(), titre: titreNettoye, jour: jourLocal(maintenant), creeLe: maintenant.toISOString() },
    ]
    erreur.value = ecrire('taches', taches.value)
      ? null
      : 'L’appareil n’a pas pu enregistrer : son stockage est plein ou désactivé.'
    return true
  }

  return { taches, tachesDuJour, erreur, ajouter }
})

if (import.meta.hot) import.meta.hot.accept(acceptHMRUpdate(useTachesStore, import.meta.hot))

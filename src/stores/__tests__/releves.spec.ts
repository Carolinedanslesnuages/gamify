import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useRelevesStore } from '../releves'
import { simulerLocalStorage } from '@/__tests__/stockage-simule'

describe('Relevés enregistrés sur l’appareil', () => {
  beforeEach(() => setActivePinia(createPinia()))
  afterEach(() => vi.unstubAllGlobals())

  it('enregistre chaque ajout et chaque suppression sur l’appareil', () => {
    const memoire = simulerLocalStorage()
    const magasin = useRelevesStore()
    magasin.ajouter('  Compteur n° 4 : 1250  ')
    expect(magasin.releves[0]!.texte).toBe('Compteur n° 4 : 1250')
    const enregistres = JSON.parse([...memoire.values()][0]!)
    expect(enregistres).toHaveLength(1)
    magasin.supprimer(magasin.releves[0]!.id)
    expect(JSON.parse([...memoire.values()][0]!)).toEqual([])
  })

  it('relit les relevés au démarrage (après fermeture, ou hors connexion)', () => {
    simulerLocalStorage({ 'gamify:releves': JSON.stringify([{ id: 'a', texte: 'Déjà saisi', saisiLe: '2026-11-16T10:00:00Z' }]) })
    expect(useRelevesStore().releves.map((releve) => releve.texte)).toEqual(['Déjà saisi'])
  })

  it('prévient si l’appareil refuse d’enregistrer', () => {
    simulerLocalStorage({}, true)
    const magasin = useRelevesStore()
    magasin.ajouter('Relevé')
    expect(magasin.erreur).toMatch(/n’a pas pu enregistrer/)
  })
})

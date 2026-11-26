import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { jourLocal, useTachesStore } from '../taches'
import { simulerLocalStorage } from '@/__tests__/stockage-simule'

describe('Tâches du jour enregistrées sur l’appareil', () => {
  beforeEach(() => setActivePinia(createPinia()))
  afterEach(() => vi.unstubAllGlobals())

  it('ajoute une tâche avec un titre et l’enregistre sur l’appareil, sans réseau', () => {
    const memoire = simulerLocalStorage()
    const fetchEspion = vi.fn<() => Promise<Response>>()
    vi.stubGlobal('fetch', fetchEspion)
    const magasin = useTachesStore()
    expect(magasin.ajouter('  Préparer la réunion  ')).toBe(true)
    expect(magasin.tachesDuJour.map((tache) => tache.titre)).toEqual(['Préparer la réunion'])
    expect(JSON.parse(memoire.get('gamify:taches')!)).toHaveLength(1)
    expect(fetchEspion).not.toHaveBeenCalled()
  })

  it('refuse un titre vide ou fait d’espaces : rien n’est ajouté', () => {
    simulerLocalStorage()
    const magasin = useTachesStore()
    expect(magasin.ajouter('')).toBe(false)
    expect(magasin.ajouter('   ')).toBe(false)
    expect(magasin.taches).toEqual([])
  })

  it('relit les tâches du jour au démarrage, mais pas celles des jours précédents', () => {
    simulerLocalStorage({
      'gamify:taches': JSON.stringify([
        { id: 'a', titre: 'Hier', jour: '2020-01-01', creeLe: '2020-01-01T10:00:00Z' },
        { id: 'b', titre: 'Aujourd’hui', jour: jourLocal(), creeLe: new Date().toISOString() },
      ]),
    })
    expect(useTachesStore().tachesDuJour.map((tache) => tache.titre)).toEqual(['Aujourd’hui'])
  })

  it('prévient si l’appareil refuse d’enregistrer', () => {
    simulerLocalStorage({}, true)
    const magasin = useTachesStore()
    magasin.ajouter('Tâche')
    expect(magasin.erreur).toMatch(/n’a pas pu enregistrer/)
  })
})

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import VueDsfr from '@gouvminint/vue-dsfr'
import TachesView from '../TachesView.vue'
import { simulerLocalStorage } from '@/__tests__/stockage-simule'
import { violationsAccessibilite } from '@/__tests__/accessibilite'

const monter = () => mount(TachesView, { global: { plugins: [VueDsfr] }, attachTo: document.body })

describe('Écran « Mes tâches du jour »', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    simulerLocalStorage()
  })
  afterEach(() => {
    vi.unstubAllGlobals()
    document.body.innerHTML = ''
  })

  it('affiche un message quand la liste est vide', () => {
    const wrapper = monter()
    expect(wrapper.find('h1').text()).toBe('Mes tâches du jour')
    expect(wrapper.text()).toContain('Aucune tâche pour aujourd’hui.')
    wrapper.unmount()
  })

  it('ajoute une tâche avec un titre et l’annonce', async () => {
    const wrapper = monter()
    await wrapper.find('input').setValue('Répondre aux courriels')
    await wrapper.find('form').trigger('submit')
    expect(wrapper.find('ul.taches').text()).toContain('Répondre aux courriels')
    expect(wrapper.find('h2').text()).toBe('Tâches du jour (1)')
    expect(wrapper.find('p[role="status"]').text()).toContain('ajoutée')
    wrapper.unmount()
  })

  it('refuse un titre vide avec une erreur reliée au champ, sans rien ajouter', async () => {
    const wrapper = monter()
    await wrapper.find('form').trigger('submit')
    expect(wrapper.text()).toContain('Saisissez le titre de la tâche avant de l’ajouter')
    expect(wrapper.find('input').attributes('required')).toBeDefined()
    expect(wrapper.find('h2').text()).toBe('Tâches du jour (0)')
    wrapper.unmount()
  })

  it('retrouve la liste après fermeture de l’application (nouvel écran, mémoire vidée)', async () => {
    const premier = monter()
    await premier.find('input').setValue('Tâche conservée')
    await premier.find('form').trigger('submit')
    premier.unmount()
    setActivePinia(createPinia())
    const second = monter()
    expect(second.find('ul.taches').text()).toContain('Tâche conservée')
    second.unmount()
  })

  it('aucune violation d’accessibilité automatique', async () => {
    const wrapper = monter()
    await wrapper.find('input').setValue('Tâche')
    await wrapper.find('form').trigger('submit')
    expect(await violationsAccessibilite(document.body)).toEqual([])
    await wrapper.find('form').trigger('submit')
    expect(await violationsAccessibilite(document.body)).toEqual([])
    wrapper.unmount()
  })
})

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import VueDsfr from '@gouvminint/vue-dsfr'
import RelevesView from '../RelevesView.vue'
import { simulerLocalStorage } from '@/__tests__/stockage-simule'
import { violationsAccessibilite } from '@/__tests__/accessibilite'

const monter = () => mount(RelevesView, { global: { plugins: [VueDsfr] }, attachTo: document.body })

describe('Écran des relevés', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    simulerLocalStorage()
  })
  afterEach(() => {
    vi.unstubAllGlobals()
    document.body.innerHTML = ''
  })

  it('ajoute un relevé, l’annonce, puis le supprime', async () => {
    const wrapper = monter()
    expect(wrapper.text()).toContain('Aucun relevé pour l’instant.')
    await wrapper.find('input').setValue('Compteur n° 4 : 1250')
    await wrapper.find('form').trigger('submit')
    expect(wrapper.find('.releves').text()).toContain('Compteur n° 4 : 1250')
    expect(wrapper.find('h2').text()).toBe('Relevés (1)')
    expect(wrapper.find('p[role="status"]').text()).toBe('Relevé ajouté.')
    await wrapper.find('button[aria-label="Supprimer le relevé « Compteur n° 4 : 1250 »"]').trigger('click')
    expect(wrapper.find('h2').text()).toBe('Relevés (0)')
    expect(wrapper.find('p[role="status"]').text()).toBe('Relevé supprimé.')
    wrapper.unmount()
  })

  it('refuse un relevé vide avec un message clair', async () => {
    const wrapper = monter()
    await wrapper.find('form').trigger('submit')
    expect(wrapper.text()).toContain('Écrivez le relevé avant de l’ajouter')
    wrapper.unmount()
  })

  it('explique comment installer l’application', async () => {
    const wrapper = monter()
    await wrapper.find('button[aria-expanded]').trigger('click')
    expect(wrapper.text()).toContain('« Sur l’écran d’accueil »')
    wrapper.unmount()
  })

  it('aucune violation d’accessibilité automatique', async () => {
    const wrapper = monter()
    await wrapper.find('input').setValue('Relevé')
    await wrapper.find('form').trigger('submit')
    expect(await violationsAccessibilite(document.body)).toEqual([])
    wrapper.unmount()
  })
})

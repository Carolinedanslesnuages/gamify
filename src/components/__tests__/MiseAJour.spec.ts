import { describe, it, expect, vi } from 'vitest'
import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import VueDsfr from '@gouvminint/vue-dsfr'
import { violationsAccessibilite } from '@/__tests__/accessibilite'

const nouvelleVersion = ref(true)
const mettreAJour = vi.fn<(recharger?: boolean) => Promise<void>>(async () => {})
vi.mock('virtual:pwa-register/vue', () => ({
  useRegisterSW: () => ({ needRefresh: nouvelleVersion, offlineReady: ref(false), updateServiceWorker: mettreAJour }),
}))

describe('Mise à jour de l’application', () => {
  it('propose la nouvelle version sans l’imposer, et l’installe à la demande', async () => {
    const { default: MiseAJour } = await import('../MiseAJour.vue')
    const wrapper = mount(MiseAJour, { global: { plugins: [VueDsfr] }, attachTo: document.body })
    expect(wrapper.text()).toContain('Une nouvelle version est disponible')
    expect(await violationsAccessibilite(document.body)).toEqual([])
    await wrapper.findAll('button').find((bouton) => bouton.text() === 'Mettre à jour')!.trigger('click')
    expect(mettreAJour).toHaveBeenCalledWith(true)
    await wrapper.findAll('button').find((bouton) => bouton.text() === 'Plus tard')!.trigger('click')
    expect(wrapper.text()).toBe('')
    wrapper.unmount()
  })
})

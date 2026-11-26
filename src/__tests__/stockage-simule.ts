import { vi } from 'vitest'

/**
 * localStorage en mémoire : celui de jsdom est masqué par celui, expérimental, de Node 25 et plus.
 * `plein` simule un appareil qui refuse d'enregistrer.
 */
export function simulerLocalStorage(initial: Record<string, string> = {}, plein = false) {
  const memoire = new Map(Object.entries(initial))
  vi.stubGlobal('localStorage', {
    getItem: (cle: string) => memoire.get(cle) ?? null,
    setItem: (cle: string, valeur: string) => {
      if (plein) throw new DOMException('Quota dépassé', 'QuotaExceededError')
      memoire.set(cle, valeur)
    },
    removeItem: (cle: string) => void memoire.delete(cle),
    clear: () => memoire.clear(),
  })
  return memoire
}

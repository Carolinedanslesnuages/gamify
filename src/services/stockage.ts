/**
 * Données enregistrées sur l'appareil (localStorage) : l'application fonctionne sans réseau.
 * Rien ne quitte l'appareil. Si le stockage est indisponible (navigation privée stricte), on le dit.
 */
const PREFIXE = 'gamify:'

export function lire<T>(cle: string, valeurParDefaut: T): T {
  try {
    const brut = window.localStorage.getItem(PREFIXE + cle)
    return brut === null ? valeurParDefaut : (JSON.parse(brut) as T)
  } catch {
    return valeurParDefaut
  }
}

/** Faux si l'appareil refuse d'enregistrer (stockage plein ou désactivé). */
export function ecrire<T>(cle: string, valeur: T): boolean {
  try {
    window.localStorage.setItem(PREFIXE + cle, JSON.stringify(valeur))
    return true
  } catch {
    return false
  }
}

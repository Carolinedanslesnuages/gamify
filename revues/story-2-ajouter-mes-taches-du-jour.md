# Relecture : Ajouter mes tâches du jour

**Branche :** story/2-ajouter-mes-taches-du-jour
**Story :** En tant qu'utilisateur, je veux saisir les tâches de ma journée afin d'avoir ma liste de travail au même endroit. « Liste du jour » = tâches créées à la date du jour ; les jours précédents ne s'affichent plus (décision validée au plan). Issue de la demande #1.

## Critères d'acceptation
- [x] Ajouter une tâche, titre obligatoire — prouvé par `src/views/__tests__/TachesView.spec.ts` « ajoute une tâche avec un titre et l’annonce » et « refuse un titre vide avec une erreur reliée au champ, sans rien ajouter » ; `src/stores/__tests__/taches.spec.ts` « refuse un titre vide ou fait d’espaces : rien n’est ajouté »
- [x] Liste du jour affichée, même après fermeture — prouvé par `TachesView.spec.ts` « retrouve la liste après fermeture de l’application » ; `taches.spec.ts` « relit les tâches du jour au démarrage, mais pas celles des jours précédents »
- [x] Fonctionne sans connexion — prouvé par `taches.spec.ts` « ajoute une tâche avec un titre et l’enregistre sur l’appareil, sans réseau » (aucun appel réseau, enregistrement local)

## Accessibilité (RGAA)
Contrôle automatique (axe-core) : aucune violation, états testés : écran avec une tâche ajoutée, écran avec l'erreur de titre vide.
Vérifications manuelles (thèmes touchés uniquement) :
- [x] Champ DSFR avec étiquette visible, astérisque et mention des champs obligatoires, erreur reliée au champ (thème 11)
- [x] Ajout annoncé par `role="status"` (critère 7.5) ; un seul h1, h2 sans saut (thème 9) ; vraie liste `ul` (9.3)
- [x] Titre de page propre à chaque écran (8.6)
- [ ] **À vérifier par un humain** : parcours complet au clavier, focus visible, lecture avec un lecteur d'écran (annonce de l'ajout et de l'erreur)
- [ ] **À vérifier par un humain** : affichage à 320 px, cibles d'au moins 44 px, contrastes
- [ ] **À vérifier par un humain** : essai hors connexion après `npm run build-only && npx vite preview`

## Périmètre
8 fichiers modifiés ou créés (store, écran, route, lien dans l'en-tête, 2 tests, fiche, suivi du projet) ; retiré car hors sujet : rien ; dépendances ajoutées : aucune.
À traiter séparément : l'écran d'accueil « Relevés » est encore l'exemple du modèle ; la page « Mes tâches du jour » n'est pas encore ajoutée à la liste `pages:` du contrôle RGAA en CI (dossier réservé aux développeurs).

## État partagé
Store Pinia `taches` : la liste servira aux stories suivantes (terminer une tâche, points, niveaux).

## À vérifier en priorité par le développeur
- Un « jour » suit le fuseau de l'appareil ; la liste du jour n'est pas recalculée si l'application reste ouverte après minuit.
- Les tâches des jours précédents restent stockées, mais ne sont pas affichées.
- L'accès à l'écran se fait par un lien rapide de l'en-tête (`/taches`).

## Résultat du contrôle final
- Tests : tous réussis (dont 1 d'accessibilité pour l'écran) — code de retour 0
- Lint : code de retour 0
- Compilation : code de retour 0
- Anti-fuite (gitleaks) : aucun secret

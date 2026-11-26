# ADR-0001 — Choix de la stack : application web installable (Vue 3, DSFR)

- **Statut** : Accepted
- **Date** : 2026-11-26
- **Décideurs** : Carolinedanslesnuages, via ADA
- **Sujet** : stack technique du projet gamify

## Contexte
M'éclater dans mon travail. Le service doit s'utiliser sur téléphone, y compris sans réseau. Seules les stacks
d'ADA sont autorisées.

## Options considérées
### Option A — Application web installable (PWA) : Vue 3, DSFR, service worker
- Un seul code pour téléphone et ordinateur ; installation depuis le navigateur ; hors connexion.
### Option B — Applications natives (Android, iOS)
- **Pourquoi pas** : deux codes, publication dans les magasins d'applications ; inutile pour un POC.

## Décision
**Option retenue : A.** Les données de l'utilisateur restent sur l'appareil, jusqu'à une story
qui prévoit leur envoi à un serveur.

## Conséquences
- **Positives** : installable sans magasin d'applications ; fonctionne sans réseau.
- **Négatives** : données propres à l'appareil (pas de partage entre appareils) ; fonctions natives limitées.
- **À surveiller** : synchronisation avec un serveur = nouvelle ADR (conflits, données personnelles).

# gamify

M'éclater dans mon travail.

Application mobile créée avec ADA (Vue 3, DSFR, application web installable) : elle s'installe
sur téléphone depuis le navigateur et fonctionne hors connexion. Fiche projet :
[PROJET.md](PROJET.md) ; consignes pour les agents de code : [AGENTS.md](AGENTS.md) ;
décisions : [docs/adr/](docs/adr/README.md).

## Essayer hors connexion
`npm ci && npm run build-only && npx vite preview`, ouvrir l'adresse affichée, puis couper le
réseau (outils de développement du navigateur) et recharger : l'application reste disponible.

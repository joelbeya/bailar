# EventFusion

EventFusion est une plateforme moderne de gestion d'événements construite avec NestJS et PostgreSQL.

## Prérequis

- Node.js (v16 ou supérieur)
- Docker et Docker Compose
- PostgreSQL (via Docker)

## Installation

1. Cloner le repository
```bash
git clone <repository-url>
cd eventfusion
```

2. Installer les dépendances
```bash
npm install
```

3. Démarrer la base de données PostgreSQL
```bash
docker-compose up -d
```

4. Démarrer l'application en mode développement
```bash
npm run start:dev
```

## Structure du Projet

- `src/` - Code source de l'application
  - `entities/` - Modèles de données et entités TypeORM
  - `modules/` - Modules NestJS
  - `controllers/` - Contrôleurs HTTP
  - `services/` - Services métier

## Base de données

L'application utilise PostgreSQL comme base de données. La configuration de la connexion se trouve dans `src/app.module.ts`.

## Tests

```bash
# tests unitaires
npm run test

# tests e2e
npm run test:e2e

# couverture de test
npm run test:cov
```

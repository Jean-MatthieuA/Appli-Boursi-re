# 📈 Appli Boursière

> **FR** — Application de suivi de portefeuille boursier avec visualisation de données en temps réel.  
> **EN** — Stock portfolio tracking app with real-time data visualization.

---

## 🇫🇷 Français

### Présentation

Appli Boursière est une application full-stack permettant de suivre un portefeuille d'actions et de visualiser les données de cours (OHLC) sous forme de graphiques en chandeliers.

> ⚠️ **État actuel du projet :** pas d'authentification ni de gestion de compte. L'application est orientée visualisation de données.

### Fonctionnalités

- 📊 Visualisation des cours en chandeliers (OHLC)
- 💼 Suivi d'un portefeuille d'actions
- 🔄 Données boursières via l'API Alpha Vantage
- 🐳 Environnement Docker (PostgreSQL)

### Stack technique

| Côté | Technologie |
|------|-------------|
| Backend | Laravel 11 (API REST) |
| Base de données | PostgreSQL (Docker) |
| Frontend | React + Vite |
| CSS | Tailwind CSS |
| Graphiques | lightweight-charts |
| Données | Alpha Vantage API |

### Prérequis

- PHP 8.2+
- Composer
- Node.js 18+
- Docker & Docker Compose
- Clé API [Alpha Vantage](https://www.alphavantage.co/support/#api-key) (gratuite)

### Installation

```bash
# 1. Cloner le dépôt
git clone https://github.com/Jean-MatthieuA/Appli-Boursi-re.git
cd appli-boursiere

# 2. Variables d'environnement
cp .env.example .env
# → Renseigner ALPHA_VANTAGE_KEY et les credentials DB dans .env

# 3. Lancer PostgreSQL via Docker
docker-compose up -d

# 4. Backend Laravel
composer install
php artisan key:generate
php artisan migrate
php artisan db:seed

# 5. Frontend React
cd front
npm install
npm run dev
```

### Nommage des commits
. chore: pour une modification qui n'a pas d'impact (correction class, div structurelle...)
. feat: pour l'ajout d'une fonctionnalité
. fix: pour une correction de bug
. docs: pour la partie documentaire "commentaires, readme..."
. revert : pour annuler un commit

### Aperçu

> 📸 *Screenshots à venir*

<!-- Une fois les screenshots prêts :
![Dashboard](docs/screenshots/dashboard.png)
![Candlestick Chart](docs/screenshots/chart.png)
-->

---

## 🇬🇧 English

### Overview

Appli Boursière is a full-stack application to track a stock portfolio and visualize OHLC price data through candlestick charts.

> ⚠️ **Current project state:** no authentication or account management. The app is focused on data visualization.

### Features

- 📊 Candlestick chart visualization (OHLC data)
- 💼 Stock portfolio tracking
- 🔄 Real-time stock data via Alpha Vantage API
- 🐳 Dockerized environment (PostgreSQL)

### Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Laravel 11 (REST API) |
| Database | PostgreSQL (Docker) |
| Frontend | React + Vite |
| CSS | Tailwind CSS |
| Charts | lightweight-charts |
| Data | Alpha Vantage API |

### Prerequisites

- PHP 8.2+
- Composer
- Node.js 18+
- Docker & Docker Compose
- [Alpha Vantage](https://www.alphavantage.co/support/#api-key) API key (free tier available)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Jean-MatthieuA/Appli-Boursi-re.git
cd appli-boursiere

# 2. Environment variables
cp .env.example .env
# → Fill in ALPHA_VANTAGE_KEY and DB credentials in .env

# 3. Start PostgreSQL via Docker
docker-compose up -d

# 4. Laravel backend
composer install
php artisan key:generate
php artisan migrate
php artisan db:seed

# 5. React frontend
cd frontend
npm install
npm run dev
```

### Preview

> 📸 *Screenshots coming soon*

<!-- Once screenshots are ready:
![Dashboard](docs/screenshots/dashboard.png)
![Candlestick Chart](docs/screenshots/chart.png)
-->

---

## Licence / License

MIT
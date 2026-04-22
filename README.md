# Maison Lumière — Site vitrine HTML/CSS/JS

Site web statique d'un hôtel de luxe, prêt à brancher sur ton backend PHP/MySQL.

## Stack

- **HTML5** sémantique
- **Tailwind CSS** via CDN (`https://cdn.tailwindcss.com`) — aucune installation requise
- **CSS custom** (`assets/css/styles.css`) pour le design system (couleurs, typographies, animations)
- **JavaScript vanilla** (`assets/js/main.js`) — header sticky, menu hamburger, formulaire

## Structure

```
maison-lumiere/
├── index.html          → Accueil (hero, suites, services, galerie, témoignages)
├── suites.html         → Détail des 3 suites
├── reservation.html    → Formulaire de réservation
├── contact.html        → Coordonnées
└── assets/
    ├── css/styles.css  → Design system + composants
    ├── js/main.js      → Interactions (burger, form…)
    └── images/         → 13 photos haute qualité
```

## Démarrage

Ouvre simplement `index.html` dans un navigateur, ou sers le dossier avec n'importe quel serveur statique :

```bash
# avec PHP (parfait pour ton stack)
php -S localhost:8000

# ou avec Python
python3 -m http.server 8000
```

Puis va sur http://localhost:8000

## Brancher le backend PHP

Le formulaire de réservation est dans `reservation.html`. Pour le connecter à ta base MySQL :

1. **Modifie le `<form>`** ligne ~58 :
   ```html
   <form id="reservation-form" action="traitements/reserver.php" method="POST">
   ```

2. **Retire l'intercepteur JS** dans `assets/js/main.js` (les lignes `if (form) { form.addEventListener("submit", ...) }`) — ou garde-le pour faire de l'AJAX.

3. **Crée `traitements/reserver.php`** qui INSERT les champs : `nom`, `email`, `telephone`, `arrivee`, `depart`, `adultes`, `chambre`, `message`.

## Schéma BDD suggéré

```sql
CREATE TABLE chambres (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100),
  description TEXT,
  prix DECIMAL(10,2),
  image VARCHAR(255),
  disponible TINYINT(1) DEFAULT 1
);

CREATE TABLE reservations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nom_client VARCHAR(100),
  email VARCHAR(150),
  telephone VARCHAR(30),
  date_arrivee DATE,
  date_depart DATE,
  chambre_id INT,
  message TEXT,
  statut ENUM('en_attente','confirmee','refusee') DEFAULT 'en_attente',
  cree_le TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (chambre_id) REFERENCES chambres(id)
);
```

## Personnalisation

Toutes les couleurs et polices sont en haut de `assets/css/styles.css` :

```css
:root {
  --onyx: #1a1714;       /* noir profond */
  --ivory: #f6f1e7;      /* ivoire */
  --gold: #c9a961;       /* or champagne */
  --gold-soft: #e0c987;
}
```

Bonne création ✨

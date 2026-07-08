# Plan d'implémentation : Portfolio Professionnel en Ligne

Ce projet consiste à concevoir et développer de zéro un site de portfolio professionnel moderne, interactif et haut de gamme. Le portfolio adoptera un design épuré, réactif, avec des transitions fluides, un mode sombre/clair, et une mise en page optimisée pour captiver les recruteurs et clients.

## Décisions de Conception & Esthétique

*   **Palette de couleurs** : Thème sombre par défaut (fond bleu ardoise foncé `#0f172a`, accents bleu indigo et violet `#6366f1` / `#a855f7`, cartes avec effet verre dépoli / glassmorphism) et un thème clair assorti (fond `#f8fafc`, accents identiques).
*   **Typographie** : Police Google Fonts **Outfit** pour les titres (moderne, géométrique et dynamique) et **Inter** pour le corps du texte (haute lisibilité).
*   **Animations & Interactions** :
    *   Transition fluide entre mode sombre et mode clair.
    *   Effet d'apparition au défilement (Scroll Reveal) pour les différentes sections.
    *   Effets de survol (hover) interactifs sur les boutons et cartes de projet (légère élévation, halo de couleur, zoom d'image).
    *   Filtrage dynamique des projets par catégorie sans rechargement de page.

## Questions Ouvertes pour l'Utilisateur

> [!IMPORTANT]
> Pour personnaliser au mieux votre portfolio, merci de nous préciser (lors de la validation ou après) :
> 1. **Quel est votre domaine d'activité ?** (ex. Développeur Web, UX/UI Designer, Chef de Projet, Data Analyst...)
> 2. **Quels sont vos liens professionnels principaux ?** (GitHub, LinkedIn, Email, etc.)
> 3. Souhaitez-vous que nous insérions de fausses informations (placeholders professionnels réalistes) que vous pourrez modifier par la suite ?

## Structure Proposée du Projet

Le projet sera créé dans le répertoire de travail : `C:\Users\Pascal\.gemini\antigravity\scratch\portfolio-professionnel`.

### 📂 Fichiers du projet :
*   `index.html` : Structure sémantique HTML5 (SEO optimisé, meta tags, accessibilité).
*   `styles.css` : Design system complet avec variables CSS pour le changement de thème, animations clés, styles des composants (Hero, About, Projects, Contact, Cards).
*   `script.js` : Logique de changement de thème, filtrage des projets, animation au défilement et validation de formulaire.
*   `assets/` : Dossier contenant les images générées pour illustrer les projets et l'avatar.

---

### [Composant 1] Structure & Contenu (HTML)

#### [NEW] [index.html](file:///C:/Users/Pascal/.gemini/antigravity/scratch/portfolio-professionnel/index.html)
*   **Header** : Logo/Nom, Navigation collante (sticky) avec liens actifs et bouton de changement de thème.
*   **Hero Section** : Titre d'accroche percutant, sous-titre dynamique, liens vers réseaux sociaux (icones SVG propres) et bouton d'appel à l'action.
*   **À Propos** : Bio de présentation, compétences clés classées par catégories (badges colorés), et une frise chronologique (timeline) d'expérience/formation.
*   **Projets** : Onglets de filtrage (Tous, Dev, Design, etc.) et grille de projets avec des cartes modernes contenant des images de haute qualité, tags et liens vers le code/démo.
*   **Contact** : Formulaire de contact moderne et coordonnées.
*   **Footer** : Copyright et rappels des liens de réseaux sociaux.

---

### [Composant 2] Styles & Thèmes (CSS)

#### [NEW] [styles.css](file:///C:/Users/Pascal/.gemini/antigravity/scratch/portfolio-professionnel/styles.css)
*   Variables CSS (`--bg-color`, `--text-color`, `--accent-primary`, etc.) avec media-query `prefers-color-scheme` et classe de surcharge `.light-theme`.
*   Style de verre dépoli (`backdrop-filter`) pour la barre de navigation et les cartes.
*   Grille réactive (`grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))`).
*   Animations `@keyframes` pour l'effet de fondu et l'apparition des éléments.

---

### [Composant 3] Interactions & Logique (JS)

#### [NEW] [script.js](file:///C:/Users/Pascal/.gemini/antigravity/scratch/portfolio-professionnel/script.js)
*   Toggle du mode sombre/clair avec sauvegarde de la préférence utilisateur dans le `localStorage`.
*   Logique de filtrage des projets par catégories.
*   Effets d'animation légers lors de l'apparition des éléments à l'écran.
*   Validation en temps réel du formulaire de contact.

---

## Plan de Vérification

### Validation Manuelle
*   **Responsive Design** : Tester l'affichage sur mobile, tablette et grand écran.
*   **Changement de Thème** : Vérifier que les contrastes restent de qualité en mode clair et en mode sombre.
*   **Filtres de projets** : S'assurer que le clic sur les catégories filtre instantanément les cartes avec une transition de fondu.
*   **Formulaire de contact** : Tester la validation des champs obligatoires et le format de l'adresse e-mail.
*   **SEO & Performance** : Utiliser un serveur local pour s'assurer que le site se charge instantanément et que toutes les balises SEO sont présentes.

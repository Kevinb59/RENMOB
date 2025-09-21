# Comment ajouter une nouvelle page

## Exemple : Ajouter page "Témoignages"

### 1. Créer le fichier page
`/app/frontend/src/pages/Testimonials.jsx`

### 2. Ajouter la route
Dans `/app/frontend/src/App.js` :
```jsx
import { Testimonials } from "./pages/Testimonials";

// Dans les routes :
<Route path="/temoignages" element={<Testimonials />} />
```

### 3. Ajouter au menu
Dans `/app/frontend/src/components/Header.jsx` :
```jsx
const navigation = [
  { name: 'Accueil', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Témoignages', href: '/temoignages' }, // ← Nouvelle page
  { name: 'Contact', href: '/contact' }
];
```

### 4. Reconstruire et déployer
```bash
yarn build
# Puis transférer build/ vers OVH
```

C'est tout ! Votre nouvelle page est en ligne.
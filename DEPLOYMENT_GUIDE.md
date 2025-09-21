# Guide de Déploiement RENMOB

## 📦 Préparation pour la production

### Frontend (React)
```bash
cd /app/frontend
yarn build
```
Cela créera un dossier `build/` avec votre site optimisé.

### Backend (FastAPI)
Le backend est déjà prêt dans `/app/backend/`

## 🏗️ Structure de déploiement

### Fichiers à transférer sur OVH :
- `frontend/build/` → Dossier public du site
- `backend/` → Scripts serveur (si nécessaire)
- Base de données : MongoDB ou MySQL selon OVH

## 🔧 Configuration requise sur OVH

### Variables d'environnement :
- `REACT_APP_BACKEND_URL` → URL de votre domaine
- `MONGO_URL` → Base de données OVH

### Fichiers de configuration :
- `.htaccess` pour les routes React
- `package.json` pour les dépendances

## 📋 Checklist avant déploiement

- [ ] Tests complets du site
- [ ] Vérification responsive
- [ ] Optimisation images
- [ ] Configuration emails de contact
- [ ] Sauvegarde locale du code

## 🚀 Étapes de mise en ligne

1. Acheter domaine + hébergement OVH
2. Configurer DNS
3. Transférer fichiers
4. Configurer base de données
5. Tester en ligne
6. Formation maintenance

## 📞 Contacts techniques
- Support OVH : aide technique
- Documentation React : reactjs.org
- Guide FastAPI : fastapi.tiangolo.com
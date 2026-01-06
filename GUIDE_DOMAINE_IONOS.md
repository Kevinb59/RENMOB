# 🌐 Guide Configuration Domaine IONOS avec GitHub Pages

Guide étape par étape pour connecter votre nom de domaine IONOS à votre site GitHub Pages.

## 📋 Prérequis

- ✅ Site déjà déployé sur GitHub Pages
- ✅ Nom de domaine acheté chez IONOS
- ✅ Accès à votre compte IONOS
- ✅ Accès à votre dépôt GitHub

## 🔧 Étape 1 : Créer le Fichier CNAME

Le fichier `CNAME` doit contenir votre nom de domaine (sans `http://` ou `https://`).

**Exemple** : Si votre domaine est `renmob.fr`, le fichier CNAME contient :
```
renmob.fr
```

**OU** si vous voulez utiliser `www.renmob.fr` :
```
www.renmob.fr
```

⚠️ **Important** :
- Utilisez **SOIT** `renmob.fr` **SOIT** `www.renmob.fr`, pas les deux
- GitHub recommande d'utiliser `www.renmob.fr` pour éviter les problèmes de redirection

## 🔧 Étape 2 : Configurer le Domaine dans GitHub Pages

1. Allez sur votre dépôt GitHub : `https://github.com/Kevinb59/renmob-site` (ou votre nom de dépôt)
2. Cliquez sur **Settings** (⚙️ Paramètres)
3. Dans le menu de gauche, cliquez sur **Pages**
4. Dans la section **"Custom domain"** :
   - Entrez votre nom de domaine : `www.renmob.fr` (ou `renmob.fr`)
   - Cliquez sur **Save**
5. **IMPORTANT** : Cochez **"Enforce HTTPS"** (après la propagation DNS, voir étape 4)

## 🔧 Étape 3 : Configurer les DNS chez IONOS

### Accéder à la Gestion DNS

1. Connectez-vous à votre compte IONOS : [https://www.ionos.fr/](https://www.ionos.fr/)
2. Allez dans **"Domaines & SSL"** ou **"Mes domaines"**
3. Cliquez sur votre domaine (ex: `renmob.fr`)
4. Cliquez sur **"DNS"** ou **"Gestion DNS"**

### Configuration DNS pour GitHub Pages

Vous devez créer **4 enregistrements A** et **1 enregistrement CNAME**.

#### Option A : Utiliser `www.renmob.fr` (RECOMMANDÉ)

**Enregistrements A** (pour le domaine racine `renmob.fr`) :

| Type | Nom/Hôte | Valeur/Pointage | TTL |
|------|----------|-----------------|-----|
| A | @ | 185.199.108.153 | 3600 |
| A | @ | 185.199.109.153 | 3600 |
| A | @ | 185.199.110.153 | 3600 |
| A | @ | 185.199.111.153 | 3600 |

**Enregistrement CNAME** (pour `www.renmob.fr`) :

| Type | Nom/Hôte | Valeur/Pointage | TTL |
|------|----------|-----------------|-----|
| CNAME | www | kevinb59.github.io | 3600 |

⚠️ **Remplacez `kevinb59.github.io` par votre URL GitHub Pages** :
- Si votre dépôt est `renmob-site`, l'URL est : `kevinb59.github.io`
- Si votre dépôt a un autre nom, l'URL est : `kevinb59.github.io/nom-du-depot`

#### Option B : Utiliser `renmob.fr` (sans www)

**Enregistrements A** uniquement :

| Type | Nom/Hôte | Valeur/Pointage | TTL |
|------|----------|-----------------|-----|
| A | @ | 185.199.108.153 | 3600 |
| A | @ | 185.199.109.153 | 3600 |
| A | @ | 185.199.110.153 | 3600 |
| A | @ | 185.199.111.153 | 3600 |

### Instructions Détaillées IONOS

1. **Supprimer les anciens enregistrements** (si existants) :
   - Cherchez les anciens enregistrements A ou CNAME pointant vers d'autres serveurs
   - Supprimez-les ou modifiez-les

2. **Ajouter les 4 enregistrements A** :
   - Cliquez sur **"Ajouter un enregistrement"** ou **"+"**
   - Type : **A**
   - Nom/Hôte : **@** (ou laissez vide, selon l'interface IONOS)
   - Valeur/Pointage : **185.199.108.153**
   - TTL : **3600** (ou laissez par défaut)
   - Répétez pour les 3 autres IP : 185.199.109.153, 185.199.110.153, 185.199.111.153

3. **Ajouter l'enregistrement CNAME** (si vous utilisez www) :
   - Cliquez sur **"Ajouter un enregistrement"** ou **"+"**
   - Type : **CNAME**
   - Nom/Hôte : **www**
   - Valeur/Pointage : **kevinb59.github.io** (remplacez par votre URL GitHub Pages)
   - TTL : **3600** (ou laissez par défaut)

4. **Sauvegarder** :
   - Cliquez sur **"Enregistrer"** ou **"Valider"**
   - Les modifications DNS peuvent prendre quelques minutes à s'appliquer

## ⏱️ Étape 4 : Attendre la Propagation DNS

### Délai de Propagation

- **Minimum** : 5-10 minutes
- **Moyen** : 1-2 heures
- **Maximum** : 24-48 heures

### Vérifier la Propagation

Utilisez ces outils pour vérifier si les DNS sont propagés :

1. **WhatsMyDNS** : [https://www.whatsmydns.net/](https://www.whatsmydns.net/)
   - Entrez votre domaine : `renmob.fr`
   - Sélectionnez le type : **A** ou **CNAME**
   - Vérifiez que les valeurs correspondent

2. **DNS Checker** : [https://dnschecker.org/](https://dnschecker.org/)

3. **Commande Windows** :
   ```bash
   nslookup renmob.fr
   ```

### Vérifier dans GitHub

1. Retournez sur GitHub : **Settings** > **Pages**
2. Vérifiez que le domaine personnalisé est **"Verified"** (vérifié) avec une coche verte ✅
3. Si c'est vérifié, vous pouvez cocher **"Enforce HTTPS"**

## 🔒 Étape 5 : Activer HTTPS (SSL)

1. Une fois le domaine vérifié dans GitHub (coche verte ✅)
2. Dans **Settings** > **Pages**
3. Cochez **"Enforce HTTPS"**
4. Attendez quelques minutes
5. Votre site sera accessible en HTTPS : `https://www.renmob.fr`

## ✅ Étape 6 : Tester le Site

1. Ouvrez votre navigateur
2. Allez sur : `https://www.renmob.fr` (ou `https://renmob.fr`)
3. Vérifiez que :
   - ✅ Le site s'affiche correctement
   - ✅ L'URL dans la barre d'adresse montre votre domaine
   - ✅ Le cadenas HTTPS est vert (pas d'erreur SSL)
   - ✅ Toutes les pages fonctionnent (navigation, formulaire, etc.)

## 🔄 Redirection www vers non-www (Optionnel)

Si vous avez configuré `www.renmob.fr` mais voulez rediriger `renmob.fr` vers `www.renmob.fr` :

### Chez IONOS

Ajoutez un enregistrement de redirection ou utilisez la fonctionnalité de redirection IONOS :

1. Allez dans **"Domaines & SSL"** > Votre domaine
2. Cherchez **"Redirections"** ou **"Redirects"**
3. Créez une redirection :
   - **De** : `renmob.fr` (ou `@`)
   - **Vers** : `https://www.renmob.fr`
   - **Type** : **301 (Permanent)**

## 🐛 Dépannage

### Le domaine ne se vérifie pas dans GitHub

1. **Vérifiez le fichier CNAME** :
   - Le fichier doit être à la racine du dépôt
   - Le contenu doit être exactement votre domaine (sans http://, sans slash)
   - Exemple : `www.renmob.fr` (pas `https://www.renmob.fr`)

2. **Vérifiez les DNS** :
   - Utilisez [whatsmydns.net](https://www.whatsmydns.net/) pour vérifier
   - Les enregistrements A doivent pointer vers les 4 IP GitHub
   - L'enregistrement CNAME doit pointer vers votre URL GitHub Pages

3. **Attendez plus longtemps** :
   - La propagation peut prendre jusqu'à 48h
   - Videz le cache DNS : `ipconfig /flushdns` (Windows)

### Le site affiche une erreur 404

1. Vérifiez que GitHub Pages est bien activé
2. Vérifiez que la branche est `main` (ou `master`)
3. Vérifiez que le dossier source est `/ (root)`
4. Attendez quelques minutes après avoir poussé le fichier CNAME

### Erreur SSL/HTTPS

1. Attendez que le domaine soit vérifié (coche verte dans GitHub)
2. Cochez "Enforce HTTPS" seulement après vérification
3. Attendez 10-15 minutes après activation
4. Videz le cache du navigateur (Ctrl + F5)

### Le site fonctionne mais pas le formulaire

1. Vérifiez que l'URL Google Apps Script est correcte dans `js/contact.js`
2. Vérifiez que le script GAS est déployé avec accès "Tout le monde"
3. Ouvrez la console du navigateur (F12) pour voir les erreurs

## 📝 Checklist Finale

- [ ] Fichier CNAME créé et poussé sur GitHub
- [ ] Domaine configuré dans GitHub Pages Settings
- [ ] 4 enregistrements A créés chez IONOS
- [ ] 1 enregistrement CNAME créé chez IONOS (si www)
- [ ] Propagation DNS vérifiée (whatsmydns.net)
- [ ] Domaine vérifié dans GitHub (coche verte ✅)
- [ ] HTTPS activé dans GitHub Pages
- [ ] Site accessible sur le domaine personnalisé
- [ ] Toutes les pages fonctionnent
- [ ] Formulaire de contact fonctionne

## 📞 Support

Pour toute question :

- 📧 Email : ren.mob@gmail.com
- 💻 GitHub : https://github.com/Kevinb59
- 📚 Documentation GitHub Pages : [docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site)

---

**Votre site sera bientôt accessible sur votre domaine personnalisé ! 🎉**


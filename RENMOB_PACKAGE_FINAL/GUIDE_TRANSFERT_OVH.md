# 🚀 GUIDE DE TRANSFERT RENMOB SUR OVH

## 📦 Fichiers prêts pour le transfert

### Fichier principal à transférer :
- **RENMOB_SITE_PRODUCTION.tar.gz** (contient tout votre site optimisé)

## 📋 ÉTAPES DE TRANSFERT SUR OVH

### 1. 🔑 Connexion à votre hébergement OVH

**Accès FTP/SFTP que vous recevrez d'OVH :**
- **Serveur** : ftp.votre-domaine.fr (ou IP fournie par OVH)
- **Utilisateur** : votre-login-ovh
- **Mot de passe** : fourni par OVH
- **Port** : 21 (FTP) ou 22 (SFTP)

### 2. 📁 Dossier de destination sur OVH

Transférez le contenu dans le dossier :
- **www/** (dossier racine de votre site)
- Ou **public_html/** selon la configuration OVH

### 3. 🔄 Méthodes de transfert

#### Option A : Via FileZilla (Recommandé)
1. Téléchargez FileZilla (gratuit)
2. Connectez-vous avec vos accès OVH
3. Glissez-déposez tout le contenu de votre dossier `build/`

#### Option B : Via le gestionnaire de fichiers OVH
1. Connectez-vous à votre espace client OVH
2. Allez dans "Hébergements" → "Gestionnaire de fichiers"
3. Uploadez l'archive et décompressez

#### Option C : Via ligne de commande (pour experts)
```bash
# Décompresser l'archive sur le serveur OVH
tar -xzf RENMOB_SITE_PRODUCTION.tar.gz
```

## ⚙️ CONFIGURATION POST-TRANSFERT

### 1. Variables à ajuster après mise en ligne

**Dans votre panneau OVH, configurez :**
- **Nom de domaine** : Pointez vers votre hébergement
- **SSL** : Activez le certificat SSL gratuit
- **Version PHP** : 8.0 ou supérieure (pour contact.php)

### 2. Test de fonctionnement

Après transfert, vérifiez :
- [ ] Site accessible via votre domaine
- [ ] Toutes les pages s'affichent correctement
- [ ] Images chargent (vos photos de chantier)
- [ ] Menu mobile fonctionne
- [ ] Formulaire de contact (si PHP configuré)

## 📞 SUPPORT EN CAS DE PROBLÈME

### Problèmes courants et solutions :

**Site ne s'affiche pas :**
- Vérifiez que les fichiers sont dans le bon dossier (www/)
- Assurez-vous que index.html est à la racine

**Pages donnent erreur 404 :**
- Vérifiez que le fichier .htaccess est présent
- Contactez OVH pour activer mod_rewrite

**Images ne s'affichent pas :**
- Vérifiez les permissions des fichiers (755 pour dossiers, 644 pour fichiers)

## 🎯 APRÈS LA MISE EN LIGNE

### Étapes importantes :

1. **Tester toutes les fonctionnalités**
2. **Configurer Google Analytics** (optionnel)
3. **Soumettre à Google Search Console** pour le référencement
4. **Sauvegarder** : OVH propose des sauvegardes automatiques

## 📧 CONFIGURATION EMAIL (Optionnel)

Pour que le formulaire de contact fonctionne :
1. Créez une adresse email sur OVH (ex: contact@votre-domaine.fr)
2. Modifiez le fichier contact.php avec cette adresse
3. Testez l'envoi depuis le formulaire

## 💡 CONSEILS POUR LA SUITE

- **Sauvegardez** régulièrement votre code source
- **Documentez** vos modifications
- **Testez** toujours en local avant de transférer
- **Suivez** les performances avec des outils comme Google PageSpeed

---

## ✅ CHECKLIST FINALE

- [ ] Archive transférée sur OVH
- [ ] Domaine configuré et pointé
- [ ] SSL activé
- [ ] Site testé et fonctionnel
- [ ] Contact form configuré (si souhaité)
- [ ] Sauvegarde effectuée

**Votre site RENMOB est maintenant en ligne ! 🎉**
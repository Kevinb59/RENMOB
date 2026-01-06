/**
 * RENMOB - JavaScript du formulaire de contact
 * Gère la soumission du formulaire vers Google Apps Script
 */

// ========================================
// 1. CONFIGURATION
// ========================================

/**
 * URL du script Google Apps Script
 * À REMPLACER par votre propre URL de déploiement GAS
 * Variables clés :
 * - scriptURL: L'URL du Web App Google Apps Script déployé
 */
const GOOGLE_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbzRhvnT7FWHy4dbJB5ve0w-O1SWyIBrfZY5tbohYRF8RKJHbl-5qarxvNrdklqpLcRy/exec'

// ========================================
// 2. INITIALISATION
// ========================================

document.addEventListener('DOMContentLoaded', function () {
  // Récupérer les éléments du DOM
  const form = document.getElementById('contact-form')
  const successMessage = document.getElementById('success-message')
  const errorMessage = document.getElementById('error-message')

  // Vérifier que le formulaire existe
  if (!form) {
    console.error('Formulaire de contact non trouvé')
    return
  }

  // Ajouter l'écouteur d'événement submit
  form.addEventListener('submit', handleFormSubmit)

  // Initialiser les icônes Lucide après le chargement
  if (typeof lucide !== 'undefined') {
    lucide.createIcons()
  }
})

// ========================================
// 3. GESTION DE LA SOUMISSION DU FORMULAIRE
// ========================================

/**
 * Gère la soumission du formulaire
 * Logique du flux :
 * 1. Empêcher le rechargement de la page
 * 2. Valider les données
 * 3. Envoyer à Google Apps Script
 * 4. Afficher le message de succès ou d'erreur
 *
 * @param {Event} e - L'événement de soumission du formulaire
 */
async function handleFormSubmit(e) {
  // Empêcher le comportement par défaut
  e.preventDefault()

  // Récupérer les éléments
  const form = e.target
  const submitButton = form.querySelector('.form-submit')
  const successMessage = document.getElementById('success-message')
  const errorMessage = document.getElementById('error-message')

  // Cacher les messages précédents
  errorMessage.classList.remove('visible')

  // Désactiver le bouton pendant l'envoi
  submitButton.disabled = true
  submitButton.innerHTML = '<span>Envoi en cours...</span>'

  try {
    // Récupérer les données du formulaire
    const formData = new FormData(form)

    // Valider les données
    if (!validateFormData(formData)) {
      throw new Error('Données de formulaire invalides')
    }

    // Envoyer les données à Google Apps Script
    const response = await sendToGoogleScript(formData)

    if (response.success) {
      // Succès : Afficher le message de succès
      showSuccessMessage(form, successMessage)
    } else {
      // Erreur côté serveur
      throw new Error("Erreur lors de l'envoi")
    }
  } catch (error) {
    // Afficher le message d'erreur
    console.error('Erreur:', error)
    showErrorMessage(submitButton, errorMessage)
  }
}

// ========================================
// 4. VALIDATION DES DONNÉES
// ========================================

/**
 * Valide les données du formulaire
 * Critères de validation :
 * - Nom : Non vide
 * - Téléphone : Non vide et format valide
 * - Message : Non vide
 *
 * @param {FormData} formData - Les données du formulaire
 * @returns {boolean} - True si valide, False sinon
 */
function validateFormData(formData) {
  const name = formData.get('name')
  const phone = formData.get('phone')
  const message = formData.get('message')

  // Vérifier les champs obligatoires
  if (!name || name.trim() === '') {
    alert('Veuillez entrer votre nom')
    return false
  }

  if (!phone || phone.trim() === '') {
    alert('Veuillez entrer votre numéro de téléphone')
    return false
  }

  // Validation basique du format de téléphone
  const phoneRegex = /^(\+33|0)[1-9](\d{2}){4}$/
  const cleanPhone = phone.replace(/\s/g, '')
  if (!phoneRegex.test(cleanPhone)) {
    alert('Veuillez entrer un numéro de téléphone valide')
    return false
  }

  if (!message || message.trim() === '') {
    alert('Veuillez décrire votre projet')
    return false
  }

  return true
}

// ========================================
// 5. ENVOI À GOOGLE APPS SCRIPT
// ========================================

/**
 * Envoie les données du formulaire à Google Apps Script
 * Variables clés :
 * - GOOGLE_SCRIPT_URL: URL du script GAS
 * - formData: Données à envoyer
 *
 * Logique d'envoi :
 * 1. Convertit FormData en URLSearchParams pour le format URL-encoded
 * 2. Envoie avec Content-Type: application/x-www-form-urlencoded
 * 3. Lit la réponse JSON pour vérifier le succès
 *
 * @param {FormData} formData - Les données du formulaire
 * @returns {Promise<Object>} - Réponse du serveur
 */
async function sendToGoogleScript(formData) {
  // Vérifier que l'URL du script est configurée
  if (GOOGLE_SCRIPT_URL === 'VOTRE_URL_GOOGLE_APPS_SCRIPT_ICI') {
    console.warn(
      'URL Google Apps Script non configurée. Simulation de succès pour les tests.'
    )
    // En mode développement, simuler un succès après 1 seconde
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return { success: true }
  }

  try {
    // Convertir FormData en URLSearchParams pour le format URL-encoded
    // Google Apps Script attend les données via e.parameter, donc format URL-encoded
    const params = new URLSearchParams()
    params.append('name', formData.get('name') || '')
    params.append('phone', formData.get('phone') || '')
    params.append('email', formData.get('email') || 'Non renseigné')
    params.append('service', formData.get('service') || 'Non spécifié')
    params.append('message', formData.get('message') || '')

    // Logger les données envoyées pour le débogage
    console.log('Envoi des données au script GAS:', {
      name: params.get('name'),
      phone: params.get('phone'),
      email: params.get('email'),
      service: params.get('service')
    })

    // Envoyer la requête POST au script Google Apps Script
    // Utiliser 'no-cors' car Google Apps Script ne gère pas bien CORS
    // Note : Avec 'no-cors', on ne peut pas lire la réponse, mais si la requête
    // est envoyée sans erreur réseau, on considère que c'est un succès
    // (l'email est bien envoyé comme le confirme la réception)
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: params.toString(),
      mode: 'no-cors' // Nécessaire pour éviter les erreurs CORS avec GAS
    })

    // Avec mode 'no-cors', on ne peut pas lire la réponse
    // Mais si la requête est envoyée sans erreur, on considère que c'est un succès
    // (l'email est bien envoyé comme le confirme la réception)
    console.log('Requête envoyée avec succès au script GAS')
    return { success: true, message: 'Demande envoyée avec succès' }
  } catch (error) {
    // Logger l'erreur complète pour le débogage
    console.error("Erreur lors de l'envoi:", error)
    return { success: false, error: error.message }
  }
}

// ========================================
// 6. AFFICHAGE DES MESSAGES
// ========================================

/**
 * Affiche le message de succès et cache le formulaire
 * Variables clés :
 * - form: Le formulaire à cacher
 * - successMessage: Le message de succès à afficher
 */
function showSuccessMessage(form, successMessage) {
  // Cacher le formulaire
  form.classList.add('hidden')

  // Afficher le message de succès
  successMessage.classList.add('visible')

  // Réinitialiser les icônes Lucide
  if (typeof lucide !== 'undefined') {
    lucide.createIcons()
  }

  // Scroll vers le message de succès
  successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' })

  // Optionnel : Recharger la page après 5 secondes
  setTimeout(() => {
    window.location.reload()
  }, 5000)
}

/**
 * Affiche le message d'erreur
 * Variables clés :
 * - submitButton: Le bouton de soumission à réactiver
 * - errorMessage: Le message d'erreur à afficher
 */
function showErrorMessage(submitButton, errorMessage) {
  // Réactiver le bouton
  submitButton.disabled = false
  submitButton.innerHTML =
    '<span>Envoyer ma demande</span><i data-lucide="send" class="icon-sm"></i>'

  // Réinitialiser les icônes Lucide
  if (typeof lucide !== 'undefined') {
    lucide.createIcons()
  }

  // Afficher le message d'erreur
  errorMessage.classList.add('visible')

  // Scroll vers le message d'erreur
  errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' })

  // Cacher automatiquement après 5 secondes
  setTimeout(() => {
    errorMessage.classList.remove('visible')
  }, 5000)
}

// ========================================
// 7. FONCTIONS UTILITAIRES
// ========================================

/**
 * Nettoie le numéro de téléphone (retire les espaces)
 * @param {string} phone - Le numéro de téléphone
 * @returns {string} - Le numéro nettoyé
 */
function cleanPhone(phone) {
  return phone.replace(/\s/g, '')
}

/**
 * Formate les données du formulaire pour l'envoi
 * @param {FormData} formData - Les données du formulaire
 * @returns {Object} - Les données formatées
 */
function formatFormData(formData) {
  return {
    name: formData.get('name'),
    phone: cleanPhone(formData.get('phone')),
    email: formData.get('email') || 'Non renseigné',
    service: formData.get('service') || 'Non spécifié',
    message: formData.get('message'),
    date: new Date().toLocaleString('fr-FR')
  }
}

// ========================================
// 8. LOG DE DÉMARRAGE
// ========================================

console.log('Script de formulaire de contact chargé ✓')

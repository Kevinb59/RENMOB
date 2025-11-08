/**
 * RENMOB - JavaScript Principal
 * Gestion de la navigation, menu mobile et interactivité
 */

// ========================================
// 1. INITIALISATION AU CHARGEMENT DE LA PAGE
// ========================================

document.addEventListener('DOMContentLoaded', function () {
  // Initialiser les icônes Lucide
  if (typeof lucide !== 'undefined') {
    lucide.createIcons()
  }

  // Initialiser le menu mobile
  initMobileMenu()

  // Initialiser la gestion du scroll du header
  initHeaderScroll()

  // Initialiser la navigation active
  initActiveNavigation()

  // Initialiser le scroll smooth
  initSmoothScroll()
})

// ========================================
// 2. GESTION DU MENU MOBILE
// ========================================

/**
 * Initialise le menu mobile avec le bouton toggle et l'overlay
 * Variables clés :
 * - mobileMenuBtn: Bouton pour ouvrir/fermer le menu
 * - navMobile: Élément de navigation mobile
 * - overlay: Élément overlay avec effet blur
 * - isOpen: État du menu (ouvert/fermé)
 */
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn')
  const navMobile = document.getElementById('nav-mobile')

  if (!mobileMenuBtn || !navMobile) return

  // Créer l'élément overlay pour le menu mobile
  // Cet overlay couvre tout l'écran avec un effet blur
  let overlay = document.querySelector('.mobile-menu-overlay')
  if (!overlay) {
    overlay = document.createElement('div')
    overlay.className = 'mobile-menu-overlay'
    document.body.appendChild(overlay)
  }

  // État du menu (fermé par défaut)
  let isOpen = false

  /**
   * Fonction pour ouvrir le menu mobile
   * Active le menu et l'overlay avec effet blur
   */
  function openMenu() {
    isOpen = true
    navMobile.classList.add('active')
    overlay.classList.add('active')
    // Empêcher le scroll du body quand le menu est ouvert
    document.body.style.overflow = 'hidden'

    // Changer l'icône en X
    const icon = mobileMenuBtn.querySelector('i')
    if (icon) {
      icon.setAttribute('data-lucide', 'x')
      lucide.createIcons()
    }
  }

  /**
   * Fonction pour fermer le menu mobile
   * Désactive le menu et l'overlay
   */
  function closeMenu() {
    isOpen = false
    navMobile.classList.remove('active')
    overlay.classList.remove('active')
    // Réactiver le scroll du body
    document.body.style.overflow = ''

    // Changer l'icône en menu
    const icon = mobileMenuBtn.querySelector('i')
    if (icon) {
      icon.setAttribute('data-lucide', 'menu')
      lucide.createIcons()
    }
  }

  // Gérer le clic sur le bouton menu
  // Toggle entre ouvert et fermé
  mobileMenuBtn.addEventListener('click', function (e) {
    e.stopPropagation()
    if (isOpen) {
      closeMenu()
    } else {
      openMenu()
    }
  })

  // Fermer le menu lors du clic sur l'overlay
  // Permet de fermer en cliquant en dehors du menu
  overlay.addEventListener('click', function () {
    if (isOpen) {
      closeMenu()
    }
  })

  // Fermer le menu lors du clic sur un lien de navigation
  // Navigation automatique après sélection
  const navLinks = navMobile.querySelectorAll('.nav-link')
  navLinks.forEach((link) => {
    link.addEventListener('click', function () {
      closeMenu()
    })
  })

  // Fermer le menu avec la touche Échap
  // Amélioration de l'accessibilité
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen) {
      closeMenu()
    }
  })
}

// ========================================
// 3. GESTION DU SCROLL DU HEADER
// ========================================

/**
 * Ajoute un effet au header lors du scroll
 * Logique : Ajoute une ombre au header quand on scroll vers le bas
 */
function initHeaderScroll() {
  const header = document.getElementById('header')
  if (!header) return

  // Fonction pour gérer le scroll
  function handleScroll() {
    // Si on a scrollé de plus de 50px
    if (window.scrollY > 50) {
      header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.5)'
    } else {
      header.style.boxShadow = 'none'
    }
  }

  // Écouter l'événement de scroll
  window.addEventListener('scroll', handleScroll)

  // Appeler une fois au chargement
  handleScroll()
}

// ========================================
// 4. NAVIGATION ACTIVE
// ========================================

/**
 * Met en surbrillance le lien de navigation correspondant à la page actuelle
 * Variables clés :
 * - currentPath: Chemin de la page actuelle
 * - navLinks: Tous les liens de navigation
 */
function initActiveNavigation() {
  // Récupérer le chemin actuel (sans paramètres)
  const currentPath = window.location.pathname.split('/').pop() || 'index.html'

  // Sélectionner tous les liens de navigation
  const navLinks = document.querySelectorAll('.nav-link')

  // Parcourir tous les liens
  navLinks.forEach((link) => {
    // Récupérer le href du lien
    const linkPath = link.getAttribute('href')

    // Retirer la classe active de tous les liens
    link.classList.remove('active')

    // Ajouter la classe active au lien correspondant à la page actuelle
    if (
      linkPath === currentPath ||
      (currentPath === '' && linkPath === 'index.html')
    ) {
      link.classList.add('active')
    }
  })
}

// ========================================
// 5. SCROLL SMOOTH
// ========================================

/**
 * Active le défilement fluide pour les ancres
 * Logique : Intercepte les clics sur les liens #anchor et anime le scroll
 */
function initSmoothScroll() {
  // Sélectionner tous les liens commençant par #
  const anchorLinks = document.querySelectorAll('a[href^="#"]')

  anchorLinks.forEach((link) => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href')

      // Ignorer les liens # vides
      if (href === '#') return

      // Trouver l'élément cible
      const targetId = href.substring(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        // Empêcher le comportement par défaut
        e.preventDefault()

        // Scroll fluide vers l'élément
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    })
  })
}

// ========================================
// 6. UTILITAIRES
// ========================================

/**
 * Fonction utilitaire pour attendre un délai
 * @param {number} ms - Millisecondes à attendre
 * @returns {Promise} - Promise qui se résout après le délai
 */
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Fonction utilitaire pour vérifier si un élément est visible dans le viewport
 * @param {HTMLElement} element - L'élément à vérifier
 * @returns {boolean} - True si l'élément est visible
 */
function isElementInViewport(element) {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

/**
 * Fonction pour animer les éléments au scroll
 * Non utilisée par défaut mais disponible pour extensions futures
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('[data-animate]')

  function checkScroll() {
    animatedElements.forEach((element) => {
      if (isElementInViewport(element)) {
        element.classList.add('animated')
      }
    })
  }

  window.addEventListener('scroll', checkScroll)
  checkScroll() // Vérifier au chargement
}

// ========================================
// 7. GESTION DES ERREURS GLOBALES
// ========================================

/**
 * Gérer les erreurs globales pour éviter les crashs
 */
window.addEventListener('error', function (e) {
  console.error('Erreur JavaScript:', e.message)
  // Ne pas bloquer l'exécution du reste du code
  return false
})

/**
 * Log de démarrage pour confirmer que le script est chargé
 */
console.log('RENMOB - Site chargé avec succès ✓')

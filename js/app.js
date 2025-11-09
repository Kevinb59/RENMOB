/**
 * RENMOB - JavaScript Principal
 * Gestion de la navigation, menu mobile et interactivité
 */

// ========================================
// 1. INITIALISATION AU CHARGEMENT DE LA PAGE
// ========================================

document.addEventListener('DOMContentLoaded', async function () {
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

  // Initialiser le chargement dynamique des services
  const servicesPromise = initDynamicServices()

  // Initialiser le contenu Avant/Après depuis Google Sheets
  const beforeAfterPromise = initBeforeAfterContent()

  await Promise.all([servicesPromise, beforeAfterPromise])

  // Initialiser la normalisation des images Drive statiques
  initDriveImages()

  // Initialiser les visualiseurs Avant/Après
  initBeforeAfterSliders()
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
// 6. CHARGEMENT DYNAMIQUE DES SERVICES
// ========================================

/**
 * Charge et affiche les services à partir de la feuille Google Sheets
 * Objectif :
 * - Récupérer les données CSV publiques de Google Sheets et les injecter dans les pages
 * Variables clés :
 * - SERVICES_CSV_URL : URL du CSV publié depuis Google Sheets
 * - homeContainer : conteneur des cartes services sur la page d'accueil
 * - detailContainer : conteneur des cartes services détaillées
 * Logique :
 * 1. Détecter la présence des conteneurs
 * 2. Charger et parser le CSV en objets structurés
 * 3. Injecter les cartes correspondantes sur chaque page
 */
const SERVICES_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQcSMyt7lSS9HCGXkQYZB7CB-JCwmsLjHp_jmRlXO5JL5deDZ7ZPOhvTyrJBOuapNVjPQ88zXKjv7Su/pub?gid=0&single=true&output=csv'

const BEFORE_AFTER_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQcSMyt7lSS9HCGXkQYZB7CB-JCwmsLjHp_jmRlXO5JL5deDZ7ZPOhvTyrJBOuapNVjPQ88zXKjv7Su/pub?gid=2068400892&single=true&output=csv'

/**
 * URL du proxy Apps Script servant les images Drive
 * IMPORTANT : remplacer REPLACE_WITH_DEPLOYMENT_ID par l'identifiant du déploiement Web App.
 * Exemple : https://script.google.com/macros/s/AKfycbx.../exec
 */
const DRIVE_PROXY_URL =
  'https://script.google.com/macros/s/AKfycbwkaCj5N0ReZMyI_hDtv51yGevmIvb9Z7l1j9kEyMbfKcKVlgbz9Z793o3RNTt85wcD/exec'

const DRIVE_PROXY_ENABLED =
  typeof DRIVE_PROXY_URL === 'string' &&
  DRIVE_PROXY_URL.length > 0 &&
  !DRIVE_PROXY_URL.includes('REPLACE_WITH_DEPLOYMENT_ID')

async function initDynamicServices() {
  const homeContainer = document.querySelector('[data-services-target="home"]')
  const detailContainer = document.querySelector(
    '[data-services-target="services"]'
  )

  if (!homeContainer && !detailContainer) {
    return
  }

  try {
    const services = await fetchServicesData()

    if (homeContainer) {
      renderHomeServices(homeContainer, services)
    }

    if (detailContainer) {
      renderDetailServices(detailContainer, services)
    }

    if (typeof lucide !== 'undefined') {
      lucide.createIcons()
    }
  } catch (error) {
    console.error('Erreur lors du chargement des services:', error)
    displayServicesError(homeContainer)
    displayServicesError(detailContainer)
  }
}

/**
 * Récupère et convertit le CSV en objets JavaScript
 * Objectif :
 * - Télécharger le CSV public et produire un tableau d'objets métier
 * Variables clés :
 * - responseText : contenu brut du fichier CSV
 * - rows : tableau de lignes analysées
 * Logique :
 * 1. Télécharger le CSV
 * 2. Parser le contenu en lignes/colonnes robustes face aux guillemets
 * 3. Mapper chaque ligne vers un objet service normalisé
 */
async function fetchServicesData() {
  const response = await fetch(SERVICES_CSV_URL, {
    headers: {
      'Cache-Control': 'no-cache'
    }
  })

  if (!response.ok) {
    throw new Error(`Impossible de récupérer les services (${response.status})`)
  }

  const responseText = await response.text()
  const rows = parseCsv(responseText)

  if (!rows.length) {
    return []
  }

  const header = rows[0]
  const dataRows = rows.slice(1)

  return dataRows
    .map((rawRow) => buildServiceObject(header, rawRow))
    .filter((service) => service.name !== '')
}

/**
 * Construit un objet service typé à partir d'une ligne du CSV
 * Objectif :
 * - Associer les colonnes attendues à des clés explicites
 * Variables clés :
 * - header : tableau contenant les intitulés de colonnes
 * - row : contenu textuel de la ligne
 * Logique :
 * 1. Parcourir chaque colonne attendue
 * 2. Normaliser et nettoyer les valeurs
 * 3. Retourner un objet prêt à être rendu
 */
function buildServiceObject(header, row) {
  const getValue = (columnName) => {
    const index = header.findIndex(
      (column) =>
        column.trim().toLowerCase() === columnName.trim().toLowerCase()
    )

    if (index === -1) {
      return ''
    }

    return (row[index] || '').trim()
  }

  const longPartTwoRaw = getValue('Description longue partie 2(services)')

  const {
    url: imageUrl,
    fileId: imageFileId,
    directUrl: imageDirectUrl
  } = normalizeImageUrl(getValue('Lien image'))

  return {
    name: getValue('Nom'),
    shortDescription: getValue('Description courte (acceuil)'),
    longPartOne: getValue('Description longue partie 1(services)'),
    longPartTwo: longPartTwoRaw
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0),
    imageUrl,
    imageFileId,
    imageDirectUrl
  }
}

/**
 * Analyse un texte CSV brut en respectant les guillemets et retours chariot
 * Objectif :
 * - Obtenir un tableau de lignes où chaque ligne est un tableau de cellules
 * Variables clés :
 * - currentField : valeur en cours de construction
 * - currentRow : ligne courante
 * - inQuotes : état d'encapsulation entre guillemets
 * Logique :
 * 1. Parcourir caractère par caractère pour gérer les cas avec virgules et sauts de ligne
 * 2. Ajouter une cellule lorsqu'on rencontre une virgule hors guillemets
 * 3. Ajouter une nouvelle ligne lorsqu'on rencontre un saut de ligne hors guillemets
 */
function parseCsv(text) {
  const rows = []
  let currentField = ''
  let currentRow = []
  let inQuotes = false

  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    const nextChar = text[i + 1]

    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        currentField += '"'
        i += 1
      } else if (char === '"') {
        inQuotes = false
      } else {
        currentField += char
      }
    } else if (char === '"') {
      inQuotes = true
    } else if (char === ',') {
      currentRow.push(currentField)
      currentField = ''
    } else if (char === '\r') {
      continue
    } else if (char === '\n') {
      currentRow.push(currentField)
      rows.push(currentRow)
      currentField = ''
      currentRow = []
    } else {
      currentField += char
    }
  }

  if (currentField !== '' || currentRow.length > 0) {
    currentRow.push(currentField)
    rows.push(currentRow)
  }

  return rows
}

/**
 * Affiche les services sur la page d'accueil
 * Objectif :
 * - Créer les cartes horizontales à partir de la description courte
 * Variables clés :
 * - container : conteneur cible
 * - services : tableau d'objets services
 * Logique :
 * 1. Réinitialiser le conteneur
 * 2. Générer les cartes et injecter les données texte/images
 * 3. Ajouter l'appel à l'action vers la page détaillée
 */
function renderHomeServices(container, services) {
  if (!container) return

  container.innerHTML = ''

  services.forEach((service) => {
    const card = document.createElement('div')
    card.className = 'service-card-horizontal'

    const imageWrapper = document.createElement('div')
    imageWrapper.className = 'service-card-image'

    const image = document.createElement('img')
    image.src = service.imageUrl
    if (service.imageFileId) {
      image.dataset.driveId = service.imageFileId
    }
    if (service.imageDirectUrl) {
      image.dataset.directUrl = service.imageDirectUrl
    }
    image.dataset.sourceMode = DRIVE_PROXY_ENABLED ? 'proxy' : 'direct'
    image.onerror = handleServiceImageError
    image.alt = service.name
    image.loading = 'lazy'
    imageWrapper.appendChild(image)

    const content = document.createElement('div')
    content.className = 'service-card-content'

    const title = document.createElement('h3')
    title.className = 'heading-5'
    title.textContent = service.name

    const description = document.createElement('p')
    description.className = 'body-small'
    description.textContent = service.shortDescription

    content.appendChild(title)
    content.appendChild(description)

    const action = document.createElement('div')
    action.className = 'service-card-action'

    const link = document.createElement('a')
    link.href = 'services.html'
    link.className = 'service-link'

    const linkText = document.createElement('span')
    linkText.textContent = 'En savoir plus'

    const icon = document.createElement('i')
    icon.setAttribute('data-lucide', 'arrow-right')
    icon.className = 'icon-sm'

    link.appendChild(linkText)
    link.appendChild(icon)
    action.appendChild(link)

    card.appendChild(imageWrapper)
    card.appendChild(content)
    card.appendChild(action)
    container.appendChild(card)
  })
}

/**
 * Affiche les services détaillés sur la page dédiée
 * Objectif :
 * - Générer les cartes complètes avec descriptions longues et listes
 * Variables clés :
 * - container : conteneur cible pour la grille
 * - services : données issues de Google Sheets
 * Logique :
 * 1. Vider le conteneur
 * 2. Créer une carte pour chaque service avec paragr. + liste
 * 3. Ajouter les boutons d'appel à l'action
 */
function renderDetailServices(container, services) {
  if (!container) return

  container.innerHTML = ''

  services.forEach((service) => {
    const card = document.createElement('div')
    card.className = 'service-card'

    const imageWrapper = document.createElement('div')
    imageWrapper.className = 'service-card-image'

    const image = document.createElement('img')
    image.src = service.imageUrl
    if (service.imageFileId) {
      image.dataset.driveId = service.imageFileId
    }
    if (service.imageDirectUrl) {
      image.dataset.directUrl = service.imageDirectUrl
    }
    image.dataset.sourceMode = DRIVE_PROXY_ENABLED ? 'proxy' : 'direct'
    image.onerror = handleServiceImageError
    image.alt = service.name
    image.loading = 'lazy'
    imageWrapper.appendChild(image)

    const content = document.createElement('div')
    content.className = 'service-card-content'

    const title = document.createElement('h3')
    title.className = 'heading-5'
    title.textContent = service.name

    const intro = document.createElement('p')
    intro.className = 'body-small mb-6'
    intro.textContent = service.longPartOne || service.shortDescription

    const list = document.createElement('ul')
    list.className = 'info-list mb-6'

    if (service.longPartTwo.length === 0 && service.shortDescription) {
      const fallbackItem = document.createElement('li')
      fallbackItem.textContent = service.shortDescription
      list.appendChild(fallbackItem)
    } else {
      service.longPartTwo.forEach((line) => {
        const item = document.createElement('li')
        item.textContent = line
        list.appendChild(item)
      })
    }

    const cta = document.createElement('a')
    cta.href = 'contact.html'
    cta.className = 'btn-primary'

    const ctaText = document.createElement('span')
    ctaText.textContent = 'Demander un devis'

    const icon = document.createElement('i')
    icon.setAttribute('data-lucide', 'arrow-right')
    icon.className = 'icon-sm'

    cta.appendChild(ctaText)
    cta.appendChild(icon)

    content.appendChild(title)
    content.appendChild(intro)
    content.appendChild(list)
    content.appendChild(cta)

    card.appendChild(imageWrapper)
    card.appendChild(content)
    container.appendChild(card)
  })
}

/**
 * Affiche un message d'erreur si la récupération des données échoue
 * Objectif :
 * - Prévenir l'utilisateur que les services ne sont pas disponibles
 * Variables clés :
 * - container : conteneur cible où afficher l'erreur
 * Logique :
 * 1. Vérifier la présence du conteneur
 * 2. Injecter un message textuel de fallback
 */
function displayServicesError(container) {
  if (!container) return

  container.innerHTML =
    '<p class="body-small">Les services sont momentanément indisponibles. Veuillez réessayer plus tard.</p>'
}

/**
 * Charge toutes les entrées Avant/Après depuis Google Sheets et les distribue
 * Objectif :
 * - Centraliser la récupération du CSV pour alimenter à la fois la page d'accueil et la galerie
 * Variables clés :
 * - entries : tableau d'objets structurés (avant/après/description/titre) prêt à être consommé
 * Logique :
 * 1. Télécharger et parser le CSV
 * 2. Convertir chaque ligne en objet métier
 * 3. Alimenter la page d'accueil avec la première entrée et la galerie avec l'ensemble
 */
async function initBeforeAfterContent() {
  try {
    const entries = await loadBeforeAfterData()

    if (!entries.length) {
      return
    }

    populateHomeBeforeAfter(entries[0])
    renderBeforeAfterGallery(entries)
  } catch (error) {
    console.error('Erreur lors du chargement du contenu Avant/Après:', error)
  }
}

/**
 * Récupère et structure les entrées Avant/Après
 * Objectif :
 * - Retourner des objets exploitables (URLs normalisées, ID Drive, titre, description)
 * @returns {Promise<Array>} Liste d'entrées prêtes à être affichées
 */
async function loadBeforeAfterData() {
  const response = await fetch(BEFORE_AFTER_CSV_URL, {
    headers: {
      'Cache-Control': 'no-cache'
    }
  })

  if (!response.ok) {
    throw new Error(
      `Impossible de récupérer les données Avant/Après (${response.status})`
    )
  }

  const csvText = await response.text()
  const rows = parseCsv(csvText)

  if (rows.length < 2) {
    return []
  }

  const header = rows[0]
  const dataRows = rows
    .slice(1)
    .filter((row) => row.some((cell) => (cell || '').trim().length > 0))

  const getValueFromRow = (row, columnName) => {
    const index = header.findIndex(
      (column) =>
        column.trim().toLowerCase() === columnName.trim().toLowerCase()
    )

    if (index === -1) {
      return ''
    }

    return (row[index] || '').trim()
  }

  return dataRows
    .map((row, index) => {
      const beforeRaw = getValueFromRow(row, 'Avant')
      const afterRaw = getValueFromRow(row, 'Après')
      const description = getValueFromRow(row, 'Description')
      const title = getValueFromRow(row, 'Titre')

      const {
        url: beforeUrl,
        fileId: beforeId,
        directUrl: beforeDirectUrl
      } = normalizeImageUrl(beforeRaw)
      const {
        url: afterUrl,
        fileId: afterId,
        directUrl: afterDirectUrl
      } = normalizeImageUrl(afterRaw)

      return {
        id: `before-after-${index}`,
        beforeUrl,
        beforeId,
        afterUrl,
        afterId,
        beforeDirectUrl,
        afterDirectUrl,
        title,
        description
      }
    })
    .filter((entry) => entry.beforeUrl || entry.afterUrl)
}

/**
 * Met à jour le slider principal de la page d'accueil
 * Objectif :
 * - Appliquer la première entrée du CSV (image avant, image après, description)
 * @param {Object} entry - Entrée contenant URLs, IDs Drive, titre et description
 */
function populateHomeBeforeAfter(entry) {
  if (!entry) {
    return
  }

  const sliderElement = document.querySelector('[data-before-after-slider]')
  if (!sliderElement) {
    return
  }

  applyBeforeAfterEntry(sliderElement, entry)

  const beforeImage = sliderElement.querySelector('.before-after-image-base')
  const afterImage = sliderElement.querySelector('.before-after-image-overlay')

  if (beforeImage && entry.title) {
    beforeImage.alt = `Avant - ${entry.title}`
  }

  if (afterImage && entry.title) {
    afterImage.alt = `Après - ${entry.title}`
  }

  const descriptionElement = sliderElement.parentElement.querySelector(
    '[data-before-after-description]'
  )
  if (descriptionElement && entry.description) {
    descriptionElement.textContent = entry.description
  }

  swapBeforeAfterLabels(sliderElement)
}

/**
 * Rend la galerie des réalisations sur la page dédiée
 * Objectif :
 * - Créer dynamiquement un slider par entrée et l'ajouter au conteneur dédié
 * Variables clés :
 * - galleryContainer : section qui accueillera toutes les cartes
 * Logique :
 * 1. Vérifier la présence du conteneur (uniquement sur la page réalisations)
 * 2. Généner une carte pour chaque entrée et y injecter un slider interactif
 * 3. Ajouter le titre/description si disponibles
 */
function renderBeforeAfterGallery(entries) {
  const galleryContainer = document.querySelector('[data-before-after-gallery]')

  if (!galleryContainer) {
    return
  }

  galleryContainer.innerHTML = ''

  entries.forEach((entry) => {
    const card = document.createElement('article')
    card.className = 'before-after-card'

    if (entry.title) {
      const heading = document.createElement('h3')
      heading.className = 'heading-5 before-after-card-title'
      heading.textContent = entry.title
      card.appendChild(heading)
    }

    const sliderWrapper = document.createElement('div')
    sliderWrapper.className = 'before-after-slider'
    sliderWrapper.setAttribute('data-before-after-slider', '')

    const baseImage = document.createElement('img')
    baseImage.className = 'before-after-image before-after-image-base'
    if (entry.beforeId) {
      baseImage.dataset.driveId = entry.beforeId
    }
    if (entry.beforeDirectUrl) {
      baseImage.dataset.directUrl = entry.beforeDirectUrl
    }
    baseImage.alt = entry.title
      ? `Avant - ${entry.title}`
      : 'Avant intervention RENMOB'

    const overlay = document.createElement('div')
    overlay.className = 'before-after-overlay'
    overlay.setAttribute('data-before-after-overlay', '')

    const afterImage = document.createElement('img')
    afterImage.className = 'before-after-image before-after-image-overlay'
    if (entry.afterId) {
      afterImage.dataset.driveId = entry.afterId
    }
    if (entry.afterDirectUrl) {
      afterImage.dataset.directUrl = entry.afterDirectUrl
    }
    afterImage.alt = entry.title
      ? `Après - ${entry.title}`
      : 'Après intervention RENMOB'

    const beforeLabel = document.createElement('div')
    beforeLabel.className = 'before-after-label before-label'
    beforeLabel.setAttribute('data-before-label', '')
    beforeLabel.textContent = 'Avant'

    const afterLabel = document.createElement('div')
    afterLabel.className = 'before-after-label after-label'
    afterLabel.setAttribute('data-after-label', '')
    afterLabel.textContent = 'Après'

    const rangeInput = document.createElement('input')
    rangeInput.type = 'range'
    rangeInput.className = 'before-after-range'
    rangeInput.setAttribute('data-before-after-range', '')
    rangeInput.min = '0'
    rangeInput.max = '100'
    rangeInput.value = '50'
    rangeInput.setAttribute(
      'aria-label',
      `Comparer l'état avant et après pour ${
        entry.title || 'cette réalisation'
      }`
    )

    const handle = document.createElement('div')
    handle.className = 'before-after-handle'
    handle.setAttribute('data-before-after-handle', '')
    handle.style.left = '50%'

    const handleIcon = document.createElement('span')
    handleIcon.className = 'before-after-handle-icon'
    handleIcon.textContent = '⇆'

    handle.appendChild(handleIcon)
    overlay.appendChild(afterImage)

    sliderWrapper.appendChild(baseImage)
    sliderWrapper.appendChild(overlay)
    sliderWrapper.appendChild(beforeLabel)
    sliderWrapper.appendChild(afterLabel)
    sliderWrapper.appendChild(rangeInput)
    sliderWrapper.appendChild(handle)

    applyBeforeAfterEntry(sliderWrapper, entry)
    swapBeforeAfterLabels(sliderWrapper)

    card.appendChild(sliderWrapper)

    if (entry.description) {
      const descriptionParagraph = document.createElement('p')
      descriptionParagraph.className =
        'body-small before-after-card-description'
      descriptionParagraph.textContent = entry.description
      card.appendChild(descriptionParagraph)
    }

    galleryContainer.appendChild(card)
  })
}

/**
 * Applique les URLs et identifiants Drive sur un slider donné
 * Objectif :
 * - Factoriser la mise à jour des visuels avant/après pour la home et la galerie
 * @param {HTMLElement} sliderElement - conteneur du slider à alimenter
 * @param {Object} entry - données normalisées contenant URLs et IDs Drive
 */
function applyBeforeAfterEntry(sliderElement, entry) {
  const beforeImage = sliderElement.querySelector('.before-after-image-base')
  const afterImage = sliderElement.querySelector('.before-after-image-overlay')

  if (beforeImage && entry.beforeUrl) {
    beforeImage.src = entry.beforeUrl
    if (entry.beforeId) {
      beforeImage.dataset.driveId = entry.beforeId
    } else {
      delete beforeImage.dataset.driveId
    }
    if (entry.beforeDirectUrl) {
      beforeImage.dataset.directUrl = entry.beforeDirectUrl
    } else {
      delete beforeImage.dataset.directUrl
    }
    beforeImage.dataset.sourceMode = DRIVE_PROXY_ENABLED ? 'proxy' : 'direct'
    beforeImage.loading = beforeImage.loading || 'lazy'
    beforeImage.onerror = handleServiceImageError
  }

  if (afterImage && entry.afterUrl) {
    afterImage.src = entry.afterUrl
    if (entry.afterId) {
      afterImage.dataset.driveId = entry.afterId
    } else {
      delete afterImage.dataset.driveId
    }
    if (entry.afterDirectUrl) {
      afterImage.dataset.directUrl = entry.afterDirectUrl
    } else {
      delete afterImage.dataset.directUrl
    }
    afterImage.dataset.sourceMode = DRIVE_PROXY_ENABLED ? 'proxy' : 'direct'
    afterImage.loading = afterImage.loading || 'lazy'
    afterImage.onerror = handleServiceImageError
  }
}

/**
 * Force l'inversion des libellés Avant/Après pour correspondre au rendu souhaité
 * Objectif :
 * - Afficher "Après" sur la partie gauche et "Avant" sur la partie droite
 * @param {HTMLElement} sliderElement - conteneur du slider
 */
function swapBeforeAfterLabels(sliderElement) {
  const beforeLabel = sliderElement.querySelector('[data-before-label]')
  const afterLabel = sliderElement.querySelector('[data-after-label]')

  if (beforeLabel && afterLabel) {
    beforeLabel.textContent = 'Après'
    afterLabel.textContent = 'Avant'
  }
}

/**
 * Normalise toutes les balises <img> statiques référencées via data-drive-image-id
 * Objectif :
 * - Replacer automatiquement les sources d'images Google Drive pour bénéficier du même mécanisme de fallback
 * Variables clés :
 * - driveImages : NodeList des images marquées avec l'attribut data-drive-image-id
 * Logique :
 * 1. Parcourir chaque image et récupérer l'ID Drive
 * 2. Calculer l'URL normalisée et l'assigner
 * 3. Attacher l'handler d'erreur générique pour sécuriser l'affichage
 */
function initDriveImages() {
  const driveImages = document.querySelectorAll(
    '[data-drive-id], [data-drive-image-id]'
  )

  driveImages.forEach((img) => {
    const driveId =
      img.getAttribute('data-drive-id') ||
      img.getAttribute('data-drive-image-id')

    if (!driveId) {
      return
    }

    const { url, fileId, directUrl } = normalizeImageUrl(
      `https://drive.google.com/uc?export=view&id=${driveId}`
    )

    const resolvedId = fileId || driveId
    img.dataset.driveId = resolvedId
    img.setAttribute('data-drive-id', resolvedId)
    if (directUrl) {
      img.dataset.directUrl = directUrl
    }
    img.dataset.sourceMode = DRIVE_PROXY_ENABLED ? 'proxy' : 'direct'
    img.onerror = handleServiceImageError
    img.loading = img.loading || 'lazy'
    img.src = url
  })
}

/**
 * Active les visualiseurs Avant/Après interactifs
 * Objectif :
 * - Synchroniser la poignée, la largeur de l'overlay et la valeur du slider pour chaque bloc
 * Variables clés :
 * - sliderElement : conteneur principal identifié par data-before-after-slider
 * - rangeInput : curseur (input range) qui pilote la position
 * - overlay : calque supérieur révélant l'image "après"
 * - handle : poignée verticale centrale affichée visuellement
 * Logique :
 * 1. Initialiser la position à partir de la valeur actuelle du slider (50% par défaut)
 * 2. Mettre à jour la vue lors des événements input/change du slider
 * 3. Gérer le glisser en capturant les pointer events sur tout le conteneur pour une expérience fluide
 */
function initBeforeAfterSliders() {
  const sliders = document.querySelectorAll('[data-before-after-slider]')

  if (!sliders.length) {
    return
  }

  sliders.forEach((sliderElement) => {
    const rangeInput = sliderElement.querySelector('[data-before-after-range]')
    const overlay = sliderElement.querySelector('[data-before-after-overlay]')
    const handle = sliderElement.querySelector('[data-before-after-handle]')

    if (!rangeInput || !overlay || !handle) {
      return
    }

    let isDragging = false
    let activePointerId = null

    /**
     * Met à jour la position de l'overlay et du handle
     * @param {number|string} rawValue - valeur brute du slider (0-100)
     */
    function updatePosition(rawValue) {
      const numericValue =
        typeof rawValue === 'number' ? rawValue : parseFloat(rawValue)
      const clampedValue = Math.min(
        100,
        Math.max(0, isNaN(numericValue) ? 50 : numericValue)
      )
      sliderElement.style.setProperty('--slider-position', `${clampedValue}%`)
      handle.style.left = `${clampedValue}%`
      rangeInput.value = clampedValue
    }

    // Initialiser la position
    updatePosition(rangeInput.value || 50)

    // Synchroniser avec les événements natifs du slider
    const onRangeInput = (event) => {
      updatePosition(event.target.value)
    }

    rangeInput.addEventListener('input', onRangeInput)
    rangeInput.addEventListener('change', onRangeInput)

    // Gestion du drag tactile/souris
    const startDrag = (event) => {
      event.preventDefault()
      sliderElement.focus({ preventScroll: true })

      if (event.pointerType === 'touch') {
        document.body.style.touchAction = 'none'
      }

      isDragging = true
      activePointerId = event.pointerId
      sliderElement.dataset.dragActive = 'true'
      sliderElement.setPointerCapture(activePointerId)
      updateFromPointer(event)
    }

    const stopDrag = (event) => {
      if (
        !isDragging ||
        (activePointerId !== null && event.pointerId !== activePointerId)
      ) {
        return
      }

      isDragging = false
      sliderElement.dataset.dragActive = ''

      if (event.pointerType === 'touch') {
        document.body.style.touchAction = ''
      }

      if (sliderElement.hasPointerCapture(activePointerId)) {
        sliderElement.releasePointerCapture(activePointerId)
      }

      rangeInput.dispatchEvent(new Event('change'))
      activePointerId = null
    }

    const updateFromPointer = (event) => {
      if (!isDragging) {
        return
      }

      const rect = sliderElement.getBoundingClientRect()
      const percent = ((event.clientX - rect.left) / rect.width) * 100
      updatePosition(percent)
    }

    sliderElement.addEventListener('pointerdown', startDrag)
    sliderElement.addEventListener('pointermove', updateFromPointer)
    sliderElement.addEventListener('pointerup', stopDrag)
    sliderElement.addEventListener('pointercancel', stopDrag)
  })
}

/**
 * Normalise une URL d'image Google Drive en lien direct affichable
 * Objectif :
 * - Accepter différentes syntaxes de liens Drive (uc, open, file/d, download)
 * - Retourner systématiquement un lien de prévisualisation public utilisable dans une balise <img>
 * Variables clés :
 * - url : valeur brute saisie dans Google Sheets
 * - matchers : expressions régulières pour extraire l'ID Drive
 * Logique :
 * 1. Vérifier l'existence de l'URL
 * 2. Tester chaque pattern connu pour récupérer l'ID du fichier
 * 3. Reconstruire une URL canonique uc?export=view&id=ID ou renvoyer l'original si aucun pattern ne correspond
 */
function normalizeImageUrl(url) {
  if (!url) {
    return {
      url: '',
      fileId: '',
      directUrl: ''
    }
  }

  let fileId = ''

  const matchers = [
    /(?:id=)([a-zA-Z0-9_-]+)/,
    /\/d\/([a-zA-Z0-9_-]+)/,
    /file\/d\/([a-zA-Z0-9_-]+)/,
    /uc\?export=download&confirm=[^&]+&id=([a-zA-Z0-9_-]+)/,
    /download\?id=([a-zA-Z0-9_-]+)/
  ]

  for (const matcher of matchers) {
    const match = url.match(matcher)
    if (match && match[1]) {
      fileId = match[1]
      break
    }
  }

  if (!fileId) {
    return {
      url,
      fileId: '',
      directUrl: ''
    }
  }

  const directUrl = `https://drive.google.com/uc?export=view&id=${fileId}`
  const proxyUrl = DRIVE_PROXY_ENABLED
    ? `${DRIVE_PROXY_URL}?mode=drive-image&id=${encodeURIComponent(fileId)}`
    : directUrl

  return {
    url: proxyUrl,
    fileId,
    directUrl
  }
}

/**
 * Gère les erreurs de chargement d'image provenant de Google Drive
 * Objectif :
 * - Tenter un second format d'URL Drive en cas d'échec du premier
 * Variables clés :
 * - target : balise <img> déclenchant l'erreur
 * Logique :
 * 1. Si une tentative de secours n'a pas encore été faite, générer une URL alternative
 * 2. Si l'alternative échoue également, remplacer par un fond neutre
 */
function handleServiceImageError(event) {
  const image = event.target
  const driveId = image.dataset.driveId
  const directUrl =
    image.dataset.directUrl ||
    (driveId ? `https://drive.google.com/uc?export=view&id=${driveId}` : '')

  if (!driveId && !directUrl) {
    setFallbackServiceImage(image)
    return
  }

  if (
    DRIVE_PROXY_ENABLED &&
    image.dataset.sourceMode !== 'direct' &&
    directUrl
  ) {
    image.dataset.sourceMode = 'direct'
    image.src = directUrl
    return
  }

  if (!image.dataset.fallbackTried) {
    image.dataset.fallbackTried = 'true'
    if (driveId) {
      image.src = `https://lh3.googleusercontent.com/d/${driveId}=w1200-h800-iv1`
      return
    }
  }

  if (directUrl && image.dataset.sourceMode !== 'direct') {
    image.dataset.sourceMode = 'direct'
    image.src = directUrl
    return
  }

  setFallbackServiceImage(image)
}

/**
 * Affiche une image de secours lorsqu'il est impossible de charger l'image Drive
 * Objectif :
 * - Garder une présentation cohérente même en absence de ressource distante
 * Variables clés :
 * - image : balise concernée
 * Logique :
 * 1. Supprimer les handlers pour éviter des boucles
 * 2. Générer un SVG inline minimaliste
 * 3. Lier ce SVG en data URL comme source de l'image
 */
function setFallbackServiceImage(image) {
  image.onerror = null
  image.dataset.sourceMode = 'fallback'
  delete image.dataset.driveId
  delete image.dataset.directUrl
  const svgPlaceholder = `
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">
      <rect width="100%" height="100%" fill="#1f1f1f"/>
      <text x="50%" y="50%" fill="#555" font-size="32" font-family="Inter, Arial, sans-serif" text-anchor="middle" dominant-baseline="middle">
        Image indisponible
      </text>
    </svg>
  `.trim()

  image.src = `data:image/svg+xml;base64,${btoa(svgPlaceholder)}`
}

// ========================================
// 7. UTILITAIRES
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
// 8. GESTION DES ERREURS GLOBALES
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

/**
 * RENMOB - Script Google Apps Script (GAS)
 * Pour gérer les soumissions du formulaire de contact et envoyer des emails
 *
 * INSTRUCTIONS D'INSTALLATION :
 * 1. Allez sur https://script.google.com
 * 2. Créez un nouveau projet
 * 3. Copiez-collez tout ce code
 * 4. Configurez les paramètres EMAIL_DESTINATAIRE ci-dessous
 * 5. Déployez comme Web App :
 *    - Cliquez sur "Déployer" > "Nouveau déploiement"
 *    - Type : Application Web
 *    - Exécuter en tant que : Moi
 *    - Qui a accès : Tout le monde
 * 6. Copiez l'URL du déploiement
 * 7. Collez cette URL dans le fichier js/contact.js (variable GOOGLE_SCRIPT_URL)
 */

// ========================================
// CONFIGURATION
// ========================================

/**
 * Email qui recevra les demandes de contact
 * À MODIFIER avec votre adresse email
 */
const EMAIL_DESTINATAIRE = 'renmob.contact@gmail.com'

/**
 * Nom de l'entreprise pour les emails
 */
const NOM_ENTREPRISE = 'RENMOB'

// ========================================
// FONCTION PRINCIPALE - DOPOST
// ========================================

/**
 * Fonction appelée lors d'une requête POST (soumission du formulaire)
 * Variables clés :
 * - e.parameter : Contient les données du formulaire
 * - name, phone, email, service, message : Champs du formulaire
 *
 * @param {Object} e - L'événement contenant les paramètres de la requête
 * @returns {Object} - Réponse JSON
 */
function doPost(e) {
  try {
    // Récupérer les données du formulaire
    const name = e.parameter.name || ''
    const phone = e.parameter.phone || ''
    const email = e.parameter.email || 'Non renseigné'
    const service = e.parameter.service || 'Non spécifié'
    const message = e.parameter.message || ''

    // Date et heure de la demande
    const dateActuelle = new Date()
    const dateFormatee = Utilities.formatDate(
      dateActuelle,
      'Europe/Paris',
      'dd/MM/yyyy à HH:mm'
    )

    // Valider les données obligatoires
    if (!name || !phone || !message) {
      return ContentService.createTextOutput(
        JSON.stringify({
          success: false,
          message: 'Données manquantes'
        })
      )
        .setMimeType(ContentService.MimeType.JSON)
        .setHeaders({
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        })
    }

    // Envoyer l'email de notification
    envoyerEmailNotification(name, phone, email, service, message, dateFormatee)

    // Optionnel : Envoyer un email de confirmation au client
    if (email && email !== 'Non renseigné') {
      envoyerEmailConfirmation(email, name)
    }

    // Optionnel : Enregistrer dans une feuille Google Sheets
    // enregistrerDansSheets(name, phone, email, service, message, dateFormatee);

    // Retourner un succès avec headers CORS
    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        message: 'Demande envoyée avec succès'
      })
    )
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      })
  } catch (error) {
    // En cas d'erreur, logger et retourner une erreur
    Logger.log('Erreur: ' + error.toString())

    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
        message: "Erreur lors de l'envoi: " + error.toString()
      })
    )
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      })
  }
}

// ========================================
// FONCTION DOGET (pour tester le script)
// ========================================

/**
 * Fonction appelée lors d'une requête GET (pour tester que le script fonctionne)
 * @returns {Object} - Page HTML simple
 */
function doGet(e) {
  const mode = (e && e.parameter && e.parameter.mode) || 'status'

  if (mode === 'drive-image') {
    return servirImageDrive_(e && e.parameter && e.parameter.id)
  }

  return ContentService.createTextOutput(
    'Le script RENMOB fonctionne correctement ✓'
  )
}

/**
 * Sert un fichier Google Drive en tant qu'image optimisée pour le web
 * @param {string} fileId - Identifiant du fichier Drive
 * @returns {ContentService.BinaryOutput} - Flux binaire de l'image
 */
function servirImageDrive_(fileId) {
  if (!fileId) {
    return ContentService.createTextOutput('ID manquant')
      .setMimeType(ContentService.MimeType.TEXT)
      .setResponseCode(400)
  }

  try {
    const file = DriveApp.getFileById(fileId)
    const blob = file.getBlob()

    return ContentService.createBinaryOutput(blob.getBytes())
      .setMimeType(blob.getContentType())
      .setHeaders({
        'Cache-Control': 'public, max-age=86400',
        'Access-Control-Allow-Origin': '*'
      })
  } catch (error) {
    Logger.log(`Erreur lors de la récupération du fichier ${fileId}: ${error}`)

    return ContentService.createTextOutput('Image introuvable')
      .setMimeType(ContentService.MimeType.TEXT)
      .setResponseCode(404)
  }
}

// ========================================
// ENVOI DE L'EMAIL DE NOTIFICATION
// ========================================

/**
 * Envoie un email de notification à l'équipe RENMOB
 * Variables clés :
 * - sujet : Sujet de l'email
 * - corpsHtml : Corps de l'email au format HTML
 *
 * @param {string} name - Nom du client
 * @param {string} phone - Téléphone du client
 * @param {string} email - Email du client
 * @param {string} service - Service demandé
 * @param {string} message - Message du client
 * @param {string} dateFormatee - Date de la demande
 */
function envoyerEmailNotification(
  name,
  phone,
  email,
  service,
  message,
  dateFormatee
) {
  // Sujet de l'email
  const sujet = `🔔 Nouvelle demande de devis - ${name}`

  // Corps de l'email en HTML
  const corpsHtml = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #F4D03F 0%, #F7DC6F 100%);
                    color: #1a1a1a; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .header h1 { margin: 0; font-size: 24px; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .field { margin-bottom: 20px; padding: 15px; background: white; border-radius: 8px;
                   border-left: 4px solid #F4D03F; }
          .field-label { font-weight: bold; color: #666; font-size: 12px;
                         text-transform: uppercase; margin-bottom: 5px; }
          .field-value { font-size: 16px; color: #1a1a1a; }
          .message-box { background: white; padding: 20px; border-radius: 8px;
                         border: 1px solid #ddd; white-space: pre-wrap; }
          .footer { text-align: center; margin-top: 20px; padding: 20px;
                    color: #666; font-size: 12px; }
          .cta-button { display: inline-block; background: #F4D03F; color: #1a1a1a;
                        padding: 15px 30px; text-decoration: none; border-radius: 8px;
                        font-weight: bold; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📩 Nouvelle demande de devis</h1>
            <p style="margin: 10px 0 0 0;">Reçue le ${dateFormatee}</p>
          </div>

          <div class="content">
            <!-- Informations du client -->
            <div class="field">
              <div class="field-label">👤 Nom complet</div>
              <div class="field-value">${name}</div>
            </div>

            <div class="field">
              <div class="field-label">📞 Téléphone</div>
              <div class="field-value"><a href="tel:${phone}">${phone}</a></div>
            </div>

            <div class="field">
              <div class="field-label">📧 Email</div>
              <div class="field-value">${email}</div>
            </div>

            <div class="field">
              <div class="field-label">🔧 Service demandé</div>
              <div class="field-value">${formatServiceName(service)}</div>
            </div>

            <!-- Message du client -->
            <div class="field">
              <div class="field-label">💬 Message</div>
              <div class="message-box">${message}</div>
            </div>

            <!-- Bouton d'action -->
            <div style="text-align: center;">
              <a href="tel:${phone}" class="cta-button">☎️ Appeler ${name}</a>
            </div>
          </div>

          <div class="footer">
            <p><strong>${NOM_ENTREPRISE}</strong> - Débarras et Nettoyage</p>
            <p>9 Allée de la Plaquette - Avelin 59710</p>
            <p>Cet email a été généré automatiquement depuis le site web.</p>
          </div>
        </div>
      </body>
    </html>
  `

  // Envoyer l'email
  MailApp.sendEmail({
    to: EMAIL_DESTINATAIRE,
    subject: sujet,
    htmlBody: corpsHtml
  })

  Logger.log('Email de notification envoyé à ' + EMAIL_DESTINATAIRE)
}

// ========================================
// ENVOI DE L'EMAIL DE CONFIRMATION AU CLIENT
// ========================================

/**
 * Envoie un email de confirmation au client
 * @param {string} emailClient - Email du client
 * @param {string} nomClient - Nom du client
 */
function envoyerEmailConfirmation(emailClient, nomClient) {
  const sujet = `Votre demande de devis ${NOM_ENTREPRISE} a bien été reçue`

  const corpsHtml = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #F4D03F 0%, #F7DC6F 100%);
                    color: #1a1a1a; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .footer { text-align: center; margin-top: 20px; padding: 20px;
                    color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Demande bien reçue !</h1>
          </div>

          <div class="content">
            <p><strong>Bonjour ${nomClient},</strong></p>

            <p>Nous avons bien reçu votre demande de devis pour nos services de débarras et nettoyage.</p>

            <p><strong>Nous vous recontacterons sous 24h maximum</strong> pour discuter de votre projet et établir un devis personnalisé gratuit.</p>

            <p>Pour toute urgence, n'hésitez pas à nous appeler directement au :</p>
            <p style="text-align: center; font-size: 24px; font-weight: bold; color: #F4D03F;">
              📞 <a href="tel:0662896049" style="color: #1a1a1a; text-decoration: none;">06 62 89 60 49</a>
            </p>

            <p>À très bientôt,<br><strong>L'équipe ${NOM_ENTREPRISE}</strong></p>
          </div>

          <div class="footer">
            <p><strong>${NOM_ENTREPRISE}</strong> - Débarras et Nettoyage</p>
            <p>9 Allée de la Plaquette - Avelin 59710</p>
            <p>📧 renmob.contact@gmail.com | 📞 06 62 89 60 49</p>
          </div>
        </div>
      </body>
    </html>
  `

  MailApp.sendEmail({
    to: emailClient,
    subject: sujet,
    htmlBody: corpsHtml
  })

  Logger.log('Email de confirmation envoyé à ' + emailClient)
}

// ========================================
// FONCTION POUR FORMATER LE NOM DU SERVICE
// ========================================

/**
 * Convertit le code du service en nom lisible
 * @param {string} serviceCode - Code du service
 * @returns {string} - Nom formaté du service
 */
function formatServiceName(serviceCode) {
  const services = {
    'debarras-maison': 'Débarras maison/appartement',
    'debarras-cave': 'Débarras cave/grenier',
    'nettoyage-succession': 'Nettoyage après succession',
    'syndrome-diogene': 'Syndrome de Diogène',
    'entretien-exterieur': 'Entretien extérieur',
    autre: 'Autre service'
  }

  return services[serviceCode] || serviceCode || 'Non spécifié'
}

// ========================================
// OPTIONNEL : ENREGISTRER DANS GOOGLE SHEETS
// ========================================

/**
 * Enregistre les données dans une feuille Google Sheets
 * Pour activer cette fonction :
 * 1. Créez une feuille Google Sheets
 * 2. Copiez son ID depuis l'URL
 * 3. Remplacez 'VOTRE_ID_SHEET_ICI' par l'ID
 * 4. Décommentez l'appel dans la fonction doPost
 *
 * @param {string} name - Nom du client
 * @param {string} phone - Téléphone
 * @param {string} email - Email
 * @param {string} service - Service
 * @param {string} message - Message
 * @param {string} date - Date
 */
function enregistrerDansSheets(name, phone, email, service, message, date) {
  // ID de votre feuille Google Sheets
  const SHEET_ID = 'VOTRE_ID_SHEET_ICI'

  try {
    const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet()

    // Ajouter une ligne avec les données
    sheet.appendRow([
      date,
      name,
      phone,
      email,
      formatServiceName(service),
      message,
      'Nouvelle' // Statut
    ])

    Logger.log('Données enregistrées dans Google Sheets')
  } catch (error) {
    Logger.log("Erreur lors de l'enregistrement dans Sheets: " + error)
  }
}

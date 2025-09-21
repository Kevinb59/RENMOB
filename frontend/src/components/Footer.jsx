import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { contactInfo } from '../data/mock';

export const Footer = () => {
  return (
    <footer className="bg-[var(--bg-dark)] pt-16 pb-8">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info avec logo agrandi */}
          <div>
            <div className="mb-6">
              <img 
                src="https://customer-assets.emergentagent.com/job_multiservice-nord/artifacts/i8gb009j_WhatsApp%20Image%202025-09-21%20at%2015.33.27.jpeg" 
                alt="RENMOB Logo" 
                className="logo-footer mb-6"
              />
            </div>
            <p className="body-small text-[var(--text-secondary)] mb-6 leading-relaxed">
              Spécialistes du débarras, du nettoyage et des services multitravaux à Lille et dans tout le Nord.
            </p>
            <div className="flex items-center space-x-3 text-[var(--text-secondary)] text-sm">
              <Clock className="w-5 h-5 text-[var(--brand-primary)]" />
              <span className="font-medium">Disponible 7j/7</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="heading-6 text-[var(--text-primary)] mb-6 pb-2 border-b border-[var(--border-light)]">
              Nos Services
            </h3>
            <ul className="space-y-4">
              <li>
                <Link 
                  to="/services" 
                  className="body-small text-[var(--text-secondary)] hover:text-[var(--brand-primary)] transition-colors duration-300 flex items-center"
                >
                  <span className="w-2 h-2 bg-[var(--brand-primary)] rounded-full mr-3"></span>
                  Débarras maison
                </Link>
              </li>
              <li>
                <Link 
                  to="/services" 
                  className="body-small text-[var(--text-secondary)] hover:text-[var(--brand-primary)] transition-colors duration-300 flex items-center"
                >
                  <span className="w-2 h-2 bg-[var(--brand-primary)] rounded-full mr-3"></span>
                  Nettoyage après succession
                </Link>
              </li>
              <li>
                <Link 
                  to="/diogene" 
                  className="body-small text-[var(--text-secondary)] hover:text-[var(--brand-primary)] transition-colors duration-300 flex items-center"
                >
                  <span className="w-2 h-2 bg-[var(--brand-primary)] rounded-full mr-3"></span>
                  Syndrome de Diogène
                </Link>
              </li>
              <li>
                <Link 
                  to="/services" 
                  className="body-small text-[var(--text-secondary)] hover:text-[var(--brand-primary)] transition-colors duration-300 flex items-center"
                >
                  <span className="w-2 h-2 bg-[var(--brand-primary)] rounded-full mr-3"></span>
                  Entretien extérieur
                </Link>
              </li>
            </ul>
          </div>

          {/* Zones */}
          <div>
            <h3 className="heading-6 text-[var(--text-primary)] mb-6 pb-2 border-b border-[var(--border-light)]">
              Zones d'intervention
            </h3>
            <ul className="space-y-4">
              <li className="body-small text-[var(--text-secondary)] flex items-center">
                <span className="w-2 h-2 bg-[var(--brand-secondary)] rounded-full mr-3"></span>
                Lille et métropole
              </li>
              <li className="body-small text-[var(--text-secondary)] flex items-center">
                <span className="w-2 h-2 bg-[var(--brand-secondary)] rounded-full mr-3"></span>
                Seclin et Pévèle
              </li>
              <li className="body-small text-[var(--text-secondary)] flex items-center">
                <span className="w-2 h-2 bg-[var(--brand-secondary)] rounded-full mr-3"></span>
                Douai et Douaisis
              </li>
              <li className="body-small text-[var(--text-secondary)] flex items-center">
                <span className="w-2 h-2 bg-[var(--brand-secondary)] rounded-full mr-3"></span>
                Valenciennes, Arras
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="heading-6 text-[var(--text-primary)] mb-6 pb-2 border-b border-[var(--border-light)]">
              Contact
            </h3>
            <div className="space-y-5">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[var(--brand-primary)] mt-1 flex-shrink-0" />
                <span className="body-small text-[var(--text-secondary)] leading-relaxed">
                  {contactInfo.address}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[var(--brand-primary)]" />
                <a 
                  href={`tel:${contactInfo.phone}`} 
                  className="body-small text-[var(--text-secondary)] hover:text-[var(--brand-primary)] transition-colors duration-300 font-medium"
                >
                  {contactInfo.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[var(--brand-primary)]" />
                <a 
                  href={`mailto:${contactInfo.email}`} 
                  className="body-small text-[var(--text-secondary)] hover:text-[var(--brand-primary)] transition-colors duration-300 font-medium"
                >
                  {contactInfo.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--border-medium)] mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="caption text-[var(--text-muted)] mb-4 md:mb-0">
              © 2024 RENMOB. Tous droits réservés.
            </p>
            <div className="flex space-x-8">
              <Link 
                to="/mentions-legales" 
                className="caption text-[var(--text-muted)] hover:text-[var(--brand-primary)] transition-colors duration-300"
              >
                Mentions légales
              </Link>
              <Link 
                to="/politique-confidentialite" 
                className="caption text-[var(--text-muted)] hover:text-[var(--brand-primary)] transition-colors duration-300"
              >
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
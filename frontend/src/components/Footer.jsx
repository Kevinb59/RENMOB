import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { contactInfo } from '../data/mock';

export const Footer = () => {
  return (
    <footer className="bg-[var(--bg-dark)] text-[var(--text-inverse)] pt-16 pb-8">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="mb-6">
              <img 
                src="https://customer-assets.emergentagent.com/job_multiservice-nord/artifacts/i8gb009j_WhatsApp%20Image%202025-09-21%20at%2015.33.27.jpeg" 
                alt="RENMOB Logo" 
                className="h-10 w-auto mb-4"
                style={{
                  filter: 'brightness(1.3) contrast(1.2)',
                  maxWidth: '160px'
                }}
              />
            </div>
            <p className="body-small text-gray-300 mb-4">
              Spécialistes du débarras, du nettoyage et des services multitravaux à Lille et dans tout le Nord.
            </p>
            <div className="flex items-center space-x-2 text-gray-300 text-sm">
              <Clock className="w-4 h-4 text-[var(--brand-primary)]" />
              <span>Disponible 7j/7</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="heading-6 text-white mb-6">Nos Services</h3>
            <ul className="space-y-3">
              <li><Link to="/services" className="body-small text-gray-300 hover:text-[var(--brand-primary)] transition-colors">Débarras maison</Link></li>
              <li><Link to="/services" className="body-small text-gray-300 hover:text-[var(--brand-primary)] transition-colors">Nettoyage après succession</Link></li>
              <li><Link to="/diogene" className="body-small text-gray-300 hover:text-[var(--brand-primary)] transition-colors">Syndrome de Diogène</Link></li>
              <li><Link to="/services" className="body-small text-gray-300 hover:text-[var(--brand-primary)] transition-colors">Entretien extérieur</Link></li>
            </ul>
          </div>

          {/* Zones */}
          <div>
            <h3 className="heading-6 text-white mb-6">Zones d'intervention</h3>
            <ul className="space-y-3">
              <li className="body-small text-gray-300">Lille et métropole</li>
              <li className="body-small text-gray-300">Seclin et Pévèle</li>
              <li className="body-small text-gray-300">Douai et Douaisis</li>
              <li className="body-small text-gray-300">Valenciennes, Arras</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="heading-6 text-white mb-6">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[var(--brand-primary)] mt-0.5 flex-shrink-0" />
                <span className="body-small text-gray-300">{contactInfo.address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[var(--brand-primary)]" />
                <a href={`tel:${contactInfo.phone}`} className="body-small text-gray-300 hover:text-[var(--brand-primary)] transition-colors">
                  {contactInfo.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[var(--brand-primary)]" />
                <a href={`mailto:${contactInfo.email}`} className="body-small text-gray-300 hover:text-[var(--brand-primary)] transition-colors">
                  {contactInfo.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="caption text-gray-400">
              © 2024 RENMOB. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/mentions-legales" className="caption text-gray-400 hover:text-[var(--brand-primary)] transition-colors">
                Mentions légales
              </Link>
              <Link to="/politique-confidentialite" className="caption text-gray-400 hover:text-[var(--brand-primary)] transition-colors">
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
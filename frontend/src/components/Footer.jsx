import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { contactInfo } from '../data/mock';

export const Footer = () => {
  return (
    <footer className="bg-[var(--bg-card)] pt-16 pb-8">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-12 h-8 bg-gradient-to-r from-blue-500 via-yellow-400 to-red-500 rounded-sm flex items-center justify-center">
                <span className="text-white font-bold text-sm">REN</span>
              </div>
              <span className="font-bold text-xl text-[var(--text-primary)]">RENMOB</span>
            </div>
            <p className="text-[var(--text-secondary)] body-small mb-4">
              Spécialistes du débarras, du nettoyage et des services multitravaux à Lille et dans tout le Nord.
            </p>
            <div className="flex items-center space-x-2 text-[var(--text-secondary)] body-small">
              <Clock className="w-4 h-4" />
              <span>Disponible 7j/7</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="heading-5 text-[var(--text-primary)] mb-6">Nos Services</h3>
            <ul className="space-y-3">
              <li><Link to="/services" className="text-[var(--text-secondary)] body-small hover:text-[var(--brand-primary)] transition-colors">Débarras maison</Link></li>
              <li><Link to="/services" className="text-[var(--text-secondary)] body-small hover:text-[var(--brand-primary)] transition-colors">Nettoyage après succession</Link></li>
              <li><Link to="/diogene" className="text-[var(--text-secondary)] body-small hover:text-[var(--brand-primary)] transition-colors">Syndrome de Diogène</Link></li>
              <li><Link to="/services" className="text-[var(--text-secondary)] body-small hover:text-[var(--brand-primary)] transition-colors">Entretien extérieur</Link></li>
            </ul>
          </div>

          {/* Zones */}
          <div>
            <h3 className="heading-5 text-[var(--text-primary)] mb-6">Zones d'intervention</h3>
            <ul className="space-y-3">
              <li className="text-[var(--text-secondary)] body-small">Lille et métropole</li>
              <li className="text-[var(--text-secondary)] body-small">Seclin et Pévèle</li>
              <li className="text-[var(--text-secondary)] body-small">Douai et Douaisis</li>
              <li className="text-[var(--text-secondary)] body-small">Valenciennes, Arras</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="heading-5 text-[var(--text-primary)] mb-6">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[var(--brand-primary)] mt-0.5 flex-shrink-0" />
                <span className="text-[var(--text-secondary)] body-small">{contactInfo.address}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[var(--brand-primary)]" />
                <a href={`tel:${contactInfo.phone}`} className="text-[var(--text-secondary)] body-small hover:text-[var(--brand-primary)] transition-colors">
                  {contactInfo.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[var(--brand-primary)]" />
                <a href={`mailto:${contactInfo.email}`} className="text-[var(--text-secondary)] body-small hover:text-[var(--brand-primary)] transition-colors">
                  {contactInfo.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--border-light)] mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[var(--text-muted)] caption">
              © 2024 RENMOB. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="/mentions-legales" className="text-[var(--text-muted)] caption hover:text-[var(--brand-primary)] transition-colors">
                Mentions légales
              </Link>
              <Link to="/politique-confidentialite" className="text-[var(--text-muted)] caption hover:text-[var(--brand-primary)] transition-colors">
                Politique de confidentialité
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
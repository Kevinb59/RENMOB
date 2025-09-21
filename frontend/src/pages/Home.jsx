import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Phone, ArrowRight, Star, Users, Clock, Shield } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { services, beforeAfterImages, testimonials } from '../data/mock';

export const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <img 
            src="https://customer-assets.emergentagent.com/job_multiservice-nord/artifacts/wlm6bh00_RE%CC%81NOVATION%20SINISTRE%20EXTE%CC%80RIEURE%202.jpeg"
            alt="Chantier RENMOB - Rénovation sinistre"
            className="hero-image"
          />
          <div className="hero-overlay"></div>
        </div>
        
        <div className="container mx-auto px-4 lg:px-6 relative z-10">
          <div className="hero-content max-w-3xl">
            <h1 className="hero-title mb-6">
              Entreprise de débarras et nettoyage à Lille et dans le Nord
            </h1>
            <p className="body-large mb-8 text-gray-200 max-w-2xl">
              Bienvenue chez RENMOB, spécialistes du débarras, du nettoyage et des services multitravaux à Lille et dans tout le Nord. 
              Nous intervenons pour vider, nettoyer, désinfecter et remettre en état tout type de logement ou d'espace.
            </p>
            
            {/* Services List */}
            <ul className="space-y-4 mb-8 max-w-2xl">
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-[var(--brand-primary)] flex-shrink-0" />
                <span className="body-medium text-gray-200">Débarras maison, appartement, cave et grenier</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-[var(--brand-primary)] flex-shrink-0" />
                <span className="body-medium text-gray-200">Nettoyage après succession, sinistre ou chantier</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-[var(--brand-primary)] flex-shrink-0" />
                <span className="body-medium text-gray-200">Intervention spécialisée en syndrome de Diogène</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-[var(--brand-primary)] flex-shrink-0" />
                <span className="body-medium text-gray-200">Entretien extérieur et nettoyage de toitures</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-[var(--brand-primary)] flex-shrink-0" />
                <span className="body-medium text-gray-200">Devis gratuit et intervention rapide</span>
              </li>
            </ul>

            <p className="body-medium mb-8 text-gray-300 max-w-2xl">
              Basés dans la métropole lilloise, nous couvrons toute la région Nord et Hauts-de-France.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-primary" size="lg" asChild>
                <Link to="/contact">
                  Demandez votre devis gratuit
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button className="btn-secondary" size="lg" asChild>
                <a href="tel:0662896049">
                  <Phone className="mr-2 w-5 h-5" />
                  Appeler maintenant
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="section-padding bg-[var(--bg-card)]">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--brand-primary)] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-[var(--brand-primary)]" />
              </div>
              <h3 className="heading-6 mb-2">Intervention rapide</h3>
              <p className="caption">24H/48H</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--brand-primary)] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-[var(--brand-primary)]" />
              </div>
              <h3 className="heading-6 mb-2">Assuré & certifié</h3>
              <p className="caption">100% COUVERT</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--brand-primary)] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-[var(--brand-primary)]" />
              </div>
              <h3 className="heading-6 mb-2">Équipe experte</h3>
              <p className="caption">PROFESSIONNELS</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--brand-primary)] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-[var(--brand-primary)]" />
              </div>
              <h3 className="heading-6 mb-2">Satisfaction garantie</h3>
              <p className="caption">CLIENT SATISFAIT</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Aperçu */}
      <section className="section-padding bg-[var(--bg-page)]">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Nos Services</h2>
            <p className="body-large text-[var(--text-secondary)] max-w-2xl mx-auto">
              Des solutions complètes pour tous vos besoins de débarras, nettoyage et remise en état.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 6).map((service) => (
              <div key={service.id} className="service-card">
                <div className="service-card-image">
                  <img 
                    src={service.image} 
                    alt={service.title}
                  />
                </div>
                <div className="service-card-content">
                  <h3 className="heading-5 mb-3">{service.title}</h3>
                  <p className="body-small text-[var(--text-secondary)] mb-4">{service.description}</p>
                  <Link to="/services" className="inline-flex items-center text-[var(--brand-primary)] hover:text-[var(--brand-hover)] transition-colors font-medium">
                    En savoir plus
                    <ArrowRight className="ml-1 w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button className="btn-primary" size="lg" asChild>
              <Link to="/services">
                Voir tous nos services
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="section-padding bg-[var(--bg-card)]">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center mb-12">
            <h2 className="heading-2 mb-4">Avant / Après</h2>
            <p className="body-large text-[var(--text-secondary)] max-w-2xl mx-auto">
              Découvrez la transformation de nos interventions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {beforeAfterImages.map((item, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm border border-[var(--border-light)]">
                <div className="grid grid-cols-2">
                  <div className="relative">
                    <img src={item.before} alt="Avant" className="w-full h-64 object-cover" />
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Avant
                    </div>
                  </div>
                  <div className="relative">
                    <img src={item.after} alt="Après" className="w-full h-64 object-cover" />
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Après
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="heading-5">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-gray-800 to-gray-900 text-center">
        <div className="container mx-auto px-4 lg:px-6">
          <h2 className="heading-2 mb-4 text-white">
            Besoin d'un devis gratuit ?
          </h2>
          <p className="body-large mb-8 max-w-2xl mx-auto text-gray-200">
            Contactez-nous dès maintenant pour une évaluation gratuite et sans engagement de votre projet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-[var(--brand-primary)] text-black hover:bg-[var(--brand-hover)] border-0 font-bold" size="lg" asChild>
              <Link to="/contact">
                Demander un devis
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button className="bg-transparent border-2 border-[var(--brand-primary)] text-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-black font-semibold" size="lg" asChild>
              <a href="tel:0662896049">
                <Phone className="mr-2 w-5 h-5" />
                06 62 89 60 49
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
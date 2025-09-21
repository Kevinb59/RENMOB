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
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBjbGVhbmluZ3xlbnwwfHx8fDE3NTg0NjA5ODN8MA&ixlib=rb-4.1.0&q=85"
            alt="Professionnel RENMOB"
            className="hero-image"
          />
          <div className="hero-overlay"></div>
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="hero-content">
            <h1 className="hero-title mb-6">
              Entreprise de débarras et nettoyage à Lille et dans le Nord
            </h1>
            <p className="body-large mb-8 text-[var(--text-primary)] max-w-2xl">
              Bienvenue chez RENMOB, spécialistes du débarras, du nettoyage et des services multitravaux à Lille et dans tout le Nord. 
              Nous intervenons pour vider, nettoyer, désinfecter et remettre en état tout type de logement ou d'espace.
            </p>
            
            {/* Services List */}
            <ul className="space-y-3 mb-8 max-w-2xl">
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-[var(--brand-primary)] flex-shrink-0" />
                <span className="body-medium">Débarras maison, appartement, cave et grenier</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-[var(--brand-primary)] flex-shrink-0" />
                <span className="body-medium">Nettoyage après succession, sinistre ou chantier</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-[var(--brand-primary)] flex-shrink-0" />
                <span className="body-medium">Intervention spécialisée en syndrome de Diogène</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-[var(--brand-primary)] flex-shrink-0" />
                <span className="body-medium">Entretien extérieur et nettoyage de toitures</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-[var(--brand-primary)] flex-shrink-0" />
                <span className="body-medium">Devis gratuit et intervention rapide</span>
              </li>
            </ul>

            <p className="body-medium mb-8 text-[var(--text-secondary)] max-w-2xl">
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
      <section className="py-16 bg-[var(--bg-page)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--border-medium)] rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-[var(--brand-primary)]" />
              </div>
              <h3 className="heading-6 text-[var(--text-primary)] mb-2">Intervention rapide</h3>
              <p className="caption text-[var(--text-secondary)]">24H/48H</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--border-medium)] rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-[var(--brand-primary)]" />
              </div>
              <h3 className="heading-6 text-[var(--text-primary)] mb-2">Assuré & certifié</h3>
              <p className="caption text-[var(--text-secondary)]">100% COUVERT</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--border-medium)] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-[var(--brand-primary)]" />
              </div>
              <h3 className="heading-6 text-[var(--text-primary)] mb-2">Équipe experte</h3>
              <p className="caption text-[var(--text-secondary)]">PROFESSIONNELS</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--border-medium)] rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-[var(--brand-primary)]" />
              </div>
              <h3 className="heading-6 text-[var(--text-primary)] mb-2">Satisfaction garantie</h3>
              <p className="caption text-[var(--text-secondary)]">CLIENT SATISFAIT</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Aperçu */}
      <section className="py-16 bg-[var(--bg-card)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="heading-2 text-[var(--text-primary)] mb-4">Nos Services</h2>
            <p className="body-large text-[var(--text-secondary)] max-w-2xl mx-auto">
              Des solutions complètes pour tous vos besoins de débarras, nettoyage et remise en état.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(0, 6).map((service) => (
              <Card key={service.id} className="team-card bg-transparent border-[var(--border-medium)] hover:bg-[var(--border-medium)] transition-all duration-300">
                <div className="team-card-image overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardContent className="team-card-content p-6">
                  <h3 className="heading-5 text-[var(--text-primary)] mb-3">{service.title}</h3>
                  <p className="body-small text-[var(--text-secondary)] mb-4">{service.description}</p>
                  <Button variant="ghost" className="text-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-[var(--text-inverse)] p-0">
                    En savoir plus
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
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
      <section className="py-16 bg-[var(--bg-page)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="heading-2 text-[var(--text-primary)] mb-4">Avant / Après</h2>
            <p className="body-large text-[var(--text-secondary)] max-w-2xl mx-auto">
              Découvrez la transformation de nos interventions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {beforeAfterImages.map((item, index) => (
              <div key={index} className="bg-[var(--bg-card)] rounded-lg overflow-hidden">
                <div className="grid grid-cols-2">
                  <div className="relative">
                    <img src={item.before} alt="Avant" className="w-full h-64 object-cover" />
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Avant
                    </div>
                  </div>
                  <div className="relative">
                    <img src={item.after} alt="Après" className="w-full h-64 object-cover" />
                    <div className="absolute top-4 right-4 bg-[var(--brand-primary)] text-[var(--text-inverse)] px-3 py-1 rounded-full text-sm font-medium">
                      Après
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="heading-5 text-[var(--text-primary)]">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[var(--secondary-olive)] text-center">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="heading-2 text-[var(--text-primary)] mb-4">
            Besoin d'un devis gratuit ?
          </h2>
          <p className="body-large text-[var(--text-primary)] mb-8 max-w-2xl mx-auto">
            Contactez-nous dès maintenant pour une évaluation gratuite et sans engagement de votre projet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="btn-primary" size="lg" asChild>
              <Link to="/contact">
                Demander un devis
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button className="btn-secondary" size="lg" asChild>
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
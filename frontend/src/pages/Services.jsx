import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { services } from '../data/mock';

export const Services = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-[var(--bg-page)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="heading-1 text-[var(--text-primary)] mb-6">Nos Services</h1>
            <p className="body-large text-[var(--text-secondary)] max-w-3xl mx-auto">
              RENMOB vous accompagne dans tous vos projets de débarras, nettoyage et remise en état. 
              Des interventions professionnelles adaptées à vos besoins spécifiques.
            </p>
          </div>
        </div>
      </section>

      {/* Services détaillés */}
      <section className="py-16 bg-[var(--bg-card)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div key={service.id} className={`event-card ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className="event-card-content">
                  <div>
                    <h2 className="event-card-title text-2xl mb-6">{service.title}</h2>
                    <p className="body-medium text-[var(--text-primary)] mb-8">
                      {service.description}
                    </p>
                    
                    {/* Avantages spécifiques par service */}
                    <div className="space-y-4 mb-8">
                      {service.id === 1 && (
                        <>
                          <div className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-[var(--brand-primary)] mt-1 flex-shrink-0" />
                            <span className="body-small text-[var(--text-primary)]">Tri et valorisation des objets récupérables</span>
                          </div>
                          <div className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-[var(--brand-primary)] mt-1 flex-shrink-0" />
                            <span className="body-small text-[var(--text-primary)]">Nettoyage complet après débarras</span>
                          </div>
                          <div className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-[var(--brand-primary)] mt-1 flex-shrink-0" />
                            <span className="body-small text-[var(--text-primary)]">Logement prêt pour vente ou location</span>
                          </div>
                        </>
                      )}
                      
                      {service.id === 2 && (
                        <>
                          <div className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-[var(--brand-primary)] mt-1 flex-shrink-0" />
                            <span className="body-small text-[var(--text-primary)]">Accès difficile pris en charge</span>
                          </div>
                          <div className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-[var(--brand-primary)] mt-1 flex-shrink-0" />
                            <span className="body-small text-[var(--text-primary)]">Évacuation d'objets lourds et volumineux</span>
                          </div>
                          <div className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-[var(--brand-primary)] mt-1 flex-shrink-0" />
                            <span className="body-small text-[var(--text-primary)]">Respect de l'environnement et recyclage</span>
                          </div>
                        </>
                      )}
                      
                      {service.id === 3 && (
                        <>
                          <div className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-[var(--brand-primary)] mt-1 flex-shrink-0" />
                            <span className="body-small text-[var(--text-primary)]">Intervention rapide 24h/48h</span>
                          </div>
                          <div className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-[var(--brand-primary)] mt-1 flex-shrink-0" />
                            <span className="body-small text-[var(--text-primary)]">Désinfection complète des surfaces</span>
                          </div>
                          <div className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-[var(--brand-primary)] mt-1 flex-shrink-0" />
                            <span className="body-small text-[var(--text-primary)]">Prise en charge administrative</span>
                          </div>
                        </>
                      )}
                      
                      {service.id === 4 && (
                        <>
                          <div className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-[var(--brand-primary)] mt-1 flex-shrink-0" />
                            <span className="body-small text-[var(--text-primary)]">Équipe formée aux situations sensibles</span>
                          </div>
                          <div className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-[var(--brand-primary)] mt-1 flex-shrink-0" />
                            <span className="body-small text-[var(--text-primary)]">Discrétion et respect absolus</span>
                          </div>
                          <div className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-[var(--brand-primary)] mt-1 flex-shrink-0" />
                            <span className="body-small text-[var(--text-primary)]">Accompagnement personnalisé</span>
                          </div>
                        </>
                      )}
                      
                      {service.id === 5 && (
                        <>
                          <div className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-[var(--brand-primary)] mt-1 flex-shrink-0" />
                            <span className="body-small text-[var(--text-primary)]">Démoussage haute pression</span>
                          </div>
                          <div className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-[var(--brand-primary)] mt-1 flex-shrink-0" />
                            <span className="body-small text-[var(--text-primary)]">Traitement anti-mousse longue durée</span>
                          </div>
                          <div className="flex items-start space-x-3">
                            <CheckCircle className="w-5 h-5 text-[var(--brand-primary)] mt-1 flex-shrink-0" />
                            <span className="body-small text-[var(--text-primary)]">Entretien espaces verts</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button className="btn-primary" asChild>
                      <Link to="/contact">
                        Demander un devis
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                    {service.id === 4 && (
                      <Button className="btn-secondary" asChild>
                        <Link to="/diogene">En savoir plus</Link>
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="event-card-image">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[var(--bg-page)] text-center">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="heading-2 text-[var(--text-primary)] mb-4">
            Un projet spécifique ?
          </h2>
          <p className="body-large text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
            Chaque situation est unique. Contactez-nous pour discuter de votre projet et recevoir une solution personnalisée.
          </p>
          <Button className="btn-primary" size="lg" asChild>
            <Link to="/contact">
              Nous contacter
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};
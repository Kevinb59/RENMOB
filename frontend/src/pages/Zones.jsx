import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Clock, Phone } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { zones } from '../data/mock';

export const Zones = () => {
  const cities = [
    { name: "Lille", description: "Centre métropolitain" },
    { name: "Roubaix", description: "Ville d'art et d'histoire" },
    { name: "Tourcoing", description: "Cité du textile" },
    { name: "Seclin", description: "Porte de la Pévèle" },
    { name: "Douai", description: "Ville parlementaire" },
    { name: "Valenciennes", description: "Athènes du Nord" },
    { name: "Arras", description: "Capitale de l'Artois" },
    { name: "Lens", description: "Bassin minier" },
    { name: "Avelin", description: "Notre base d'intervention" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-[var(--bg-page)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="heading-1 text-[var(--text-primary)] mb-6">Zones d'intervention</h1>
            <p className="body-large text-[var(--text-secondary)] max-w-3xl mx-auto">
              RENMOB intervient dans toute la région Hauts-de-France pour vos projets de débarras, nettoyage et remise en état. 
              Découvrez notre couverture géographique complète.
            </p>
          </div>
        </div>
      </section>

      {/* Zones principales */}
      <section className="py-16 bg-[var(--bg-card)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="heading-2 text-[var(--text-primary)] mb-4">Nos zones d'intervention principales</h2>
            <p className="body-medium text-[var(--text-secondary)] max-w-2xl mx-auto">
              Intervention rapide dans un rayon de 50km autour d'Avelin
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {zones.map((zone, index) => (
              <Card key={index} className="team-card bg-transparent border-[var(--border-medium)] hover:bg-[var(--border-medium)] transition-all duration-300">
                <CardContent className="team-card-content p-8 text-center">
                  <MapPin className="w-12 h-12 text-[var(--brand-primary)] mx-auto mb-4" />
                  <h3 className="heading-5 text-[var(--text-primary)] mb-4">{zone}</h3>
                  <p className="body-small text-[var(--text-secondary)] mb-6">
                    Intervention sous 24h-48h dans cette zone
                  </p>
                  <Button className="btn-secondary" asChild>
                    <Link to="/contact">Demander un devis</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Villes détaillées */}
      <section className="py-16 bg-[var(--bg-page)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="heading-2 text-[var(--text-primary)] mb-4">Principales villes desservies</h2>
            <p className="body-medium text-[var(--text-secondary)] max-w-2xl mx-auto">
              Une présence forte dans les principales agglomérations du Nord-Pas-de-Calais
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {cities.map((city, index) => (
              <Card key={index} className="bg-[var(--bg-card)] border-[var(--border-medium)] hover:border-[var(--brand-primary)] transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <h3 className="heading-6 text-[var(--text-primary)] mb-2">{city.name}</h3>
                  <p className="caption text-[var(--text-secondary)]">{city.description}</p>
                  {city.name === "Avelin" && (
                    <div className="mt-3 px-3 py-1 bg-[var(--brand-primary)] text-[var(--text-inverse)] rounded-full text-xs font-medium">
                      Siège social
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Carte interactive */}
      <section className="py-16 bg-[var(--bg-card)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="heading-2 text-[var(--text-primary)] mb-4">Localisation</h2>
            <p className="body-medium text-[var(--text-secondary)] max-w-2xl mx-auto">
              Basés à Avelin, nous rayonnons dans tout le département du Nord
            </p>
          </div>

          {/* Placeholder pour Google Maps */}
          <div className="bg-[var(--border-medium)] rounded-lg h-96 flex items-center justify-center mb-8">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-[var(--brand-primary)] mx-auto mb-4" />
              <h3 className="heading-5 text-[var(--text-primary)] mb-2">Carte interactive</h3>
              <p className="body-small text-[var(--text-secondary)]">
                9 Allée de la Plaquette - Avelin 59710
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Temps d'intervention */}
      <section className="py-16 bg-[var(--bg-page)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="heading-2 text-[var(--text-primary)] mb-4">Délais d'intervention</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-[var(--bg-card)] border-[var(--brand-primary)] border-2">
              <CardContent className="p-8 text-center">
                <Clock className="w-12 h-12 text-[var(--brand-primary)] mx-auto mb-4" />
                <h3 className="heading-5 text-[var(--text-primary)] mb-2">Urgence</h3>
                <p className="body-large text-[var(--brand-primary)] font-semibold mb-2">Sous 24h</p>
                <p className="body-small text-[var(--text-secondary)]">Situations d'urgence et interventions prioritaires</p>
              </CardContent>
            </Card>

            <Card className="bg-[var(--bg-card)] border-[var(--border-medium)]">
              <CardContent className="p-8 text-center">
                <Clock className="w-12 h-12 text-[var(--secondary-olive)] mx-auto mb-4" />
                <h3 className="heading-5 text-[var(--text-primary)] mb-2">Standard</h3>
                <p className="body-large text-[var(--text-primary)] font-semibold mb-2">24h - 48h</p>
                <p className="body-small text-[var(--text-secondary)]">Interventions planifiées dans les délais habituels</p>
              </CardContent>
            </Card>

            <Card className="bg-[var(--bg-card)] border-[var(--border-medium)]">
              <CardContent className="p-8 text-center">
                <Clock className="w-12 h-12 text-[var(--text-secondary)] mx-auto mb-4" />
                <h3 className="heading-5 text-[var(--text-primary)] mb-2">Programmé</h3>
                <p className="body-large text-[var(--text-primary)] font-semibold mb-2">Sur rendez-vous</p>
                <p className="body-small text-[var(--text-secondary)]">Interventions planifiées selon vos disponibilités</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[var(--secondary-olive)] text-center">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="heading-2 text-[var(--text-primary)] mb-4">
            Besoin d'un débarras urgent ?
          </h2>
          <p className="body-large text-[var(--text-primary)] mb-8 max-w-2xl mx-auto">
            Contactez-nous pour un devis gratuit et rapide. Intervention dans toute notre zone de couverture.
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
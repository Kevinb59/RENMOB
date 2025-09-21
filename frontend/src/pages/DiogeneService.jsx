import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Shield, Clock, Users, CheckCircle, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { diogeneGallery } from '../data/mock';

export const DiogeneService = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % diogeneGallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + diogeneGallery.length) % diogeneGallery.length);
  };

  const processSteps = [
    {
      icon: Phone,
      title: "Premier contact",
      description: "Écoute bienveillante et évaluation discrète de la situation"
    },
    {
      icon: Users,
      title: "Équipe spécialisée",
      description: "Intervention d'une équipe formée aux situations sensibles"
    },
    {
      icon: Heart,
      title: "Tri respectueux",
      description: "Tri minutieux des effets personnels avec la famille"
    },
    {
      icon: Shield,
      title: "Nettoyage complet",
      description: "Désinfection et remise en état totale du logement"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <img 
            src="https://customer-assets.emergentagent.com/job_multiservice-nord/artifacts/0mufpne1_NETTOYAGE%20DIOGE%CC%80NE%203.jpeg"
            alt="Intervention syndrome de Diogène - RENMOB"
            className="hero-image"
          />
          <div className="hero-overlay"></div>
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="hero-content">
            <h1 className="hero-title mb-6">
              Nettoyage et débarras après syndrome de Diogène à Lille et dans le Nord
            </h1>
            <p className="body-large mb-8 text-[var(--text-primary)] max-w-2xl">
              Nous accompagnons familles, propriétaires et syndics dans des situations sensibles de syndrome de Diogène. 
              Nos équipes spécialisées interviennent rapidement, avec respect et discrétion.
            </p>
            <Button className="btn-primary" size="lg" asChild>
              <Link to="/contact">
                Demander une intervention
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services spécialisés */}
      <section className="py-16 bg-[var(--bg-card)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="heading-2 text-[var(--text-primary)] mb-4">Une approche respectueuse et professionnelle</h2>
            <p className="body-large text-[var(--text-secondary)] max-w-3xl mx-auto">
              Le syndrome de Diogène nécessite une intervention délicate et spécialisée. 
              Notre équipe est formée pour gérer ces situations avec tact et efficacité.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {processSteps.map((step, index) => (
              <Card key={index} className="team-card bg-transparent border-[var(--border-medium)] text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-[var(--brand-primary)] rounded-full flex items-center justify-center mx-auto mb-6">
                    <step.icon className="w-8 h-8 text-[var(--text-inverse)]" />
                  </div>
                  <h3 className="heading-5 text-[var(--text-primary)] mb-4">{step.title}</h3>
                  <p className="body-small text-[var(--text-secondary)]">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Services détaillés */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h3 className="heading-3 text-[var(--brand-primary)] mb-8">Nos interventions incluent</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-[var(--brand-primary)] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="heading-5 text-[var(--text-primary)] mb-2">Tri des effets personnels et désencombrement</h4>
                    <p className="body-small text-[var(--text-secondary)]">
                      Tri minutieux en présence de la famille ou des proches, sauvegarde des objets de valeur affective.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-[var(--brand-primary)] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="heading-5 text-[var(--text-primary)] mb-2">Évacuation des déchets et encombrants</h4>
                    <p className="body-small text-[var(--text-secondary)]">
                      Évacuation respectueuse et responsable vers les filières de recyclage appropriées.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-[var(--brand-primary)] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="heading-5 text-[var(--text-primary)] mb-2">Nettoyage approfondi et désinfection complète</h4>
                    <p className="body-small text-[var(--text-secondary)]">
                      Traitement antifongique, désodorisation et assainissement de toutes les surfaces.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <CheckCircle className="w-6 h-6 text-[var(--brand-primary)] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="heading-5 text-[var(--text-primary)] mb-2">Remise en état du logement</h4>
                    <p className="body-small text-[var(--text-secondary)]">
                      Logement rendu habitable et prêt pour une nouvelle occupation ou rénovation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <img 
                src="https://customer-assets.emergentagent.com/job_multiservice-nord/artifacts/rkhg623v_NETTOYAGE%20DIOGE%CC%80NE%202.jpeg" 
                alt="Nettoyage syndrome de Diogène - Résultat RENMOB"
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Galerie Avant/Après - Carrousel interactif */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="heading-2 text-[var(--text-primary)] mb-4">Nos Transformations Réelles</h3>
              <p className="body-large text-[var(--text-secondary)] max-w-2xl mx-auto">
                Découvrez nos interventions concrètes avec des transformations spectaculaires
              </p>
            </div>

            <div className="bg-[var(--bg-card)] rounded-2xl p-8 shadow-lg">
              {/* Carrousel Avant/Après */}
              <div className="relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                  {/* Image Avant */}
                  <div className="relative group">
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-red-600 text-white px-4 py-2 rounded-full font-semibold text-sm shadow-lg">
                        AVANT
                      </span>
                    </div>
                    <img 
                      src={diogeneGallery[currentImageIndex].before}
                      alt={`Avant - ${diogeneGallery[currentImageIndex].title}`}
                      className="w-full h-80 object-cover rounded-xl shadow-md transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Image Après */}
                  <div className="relative group">
                    <div className="absolute top-4 right-4 z-10">
                      <span className="bg-green-600 text-white px-4 py-2 rounded-full font-semibold text-sm shadow-lg">
                        APRÈS
                      </span>
                    </div>
                    <img 
                      src={diogeneGallery[currentImageIndex].after}
                      alt={`Après - ${diogeneGallery[currentImageIndex].title}`}
                      className="w-full h-80 object-cover rounded-xl shadow-md transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                </div>

                {/* Informations sur l'intervention */}
                <div className="text-center mb-6">
                  <h4 className="heading-4 text-[var(--text-primary)] mb-3">
                    {diogeneGallery[currentImageIndex].title}
                  </h4>
                  <p className="body-medium text-[var(--text-secondary)]">
                    {diogeneGallery[currentImageIndex].description}
                  </p>
                </div>

                {/* Navigation */}
                <div className="flex justify-center items-center space-x-6">
                  <button
                    onClick={prevImage}
                    className="bg-[var(--brand-primary)] hover:bg-[var(--brand-hover)] text-black p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
                    aria-label="Image précédente"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  {/* Indicateurs */}
                  <div className="flex space-x-2">
                    {diogeneGallery.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentImageIndex 
                            ? 'bg-[var(--brand-primary)] scale-125' 
                            : 'bg-[var(--border-medium)] hover:bg-[var(--brand-primary)] hover:opacity-70'
                        }`}
                        aria-label={`Aller à l'image ${index + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={nextImage}
                    className="bg-[var(--brand-primary)] hover:bg-[var(--brand-hover)] text-black p-3 rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
                    aria-label="Image suivante"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>

                {/* Compteur */}
                <div className="text-center mt-4">
                  <p className="caption text-[var(--text-muted)]">
                    {currentImageIndex + 1} / {diogeneGallery.length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Zones d'intervention */}
      <section className="py-16 bg-[var(--bg-page)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="heading-2 text-[var(--text-primary)] mb-4">Zones d'intervention</h2>
            <p className="body-large text-[var(--text-secondary)] max-w-2xl mx-auto">
              Nous couvrons Lille, Roubaix, Tourcoing, Seclin, Douai, Valenciennes, Arras et toute la métropole lilloise.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Lille et métropole lilloise",
              "Seclin et Pévèle", 
              "Douai et Douaisis",
              "Roubaix, Tourcoing et alentours",
              "Valenciennes, Arras et Lens"
            ].map((zone, index) => (
              <Card key={index} className="bg-[var(--bg-card)] border-[var(--border-medium)] p-6 text-center">
                <CardContent className="p-0">
                  <h3 className="heading-6 text-[var(--text-primary)]">{zone}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Urgence */}
      <section className="py-16 bg-[var(--secondary-olive)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-8 lg:mb-0">
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="w-8 h-8 text-[var(--brand-primary)]" />
                <h2 className="heading-2 text-[var(--text-primary)]">Intervention d'urgence</h2>
              </div>
              <p className="body-large text-[var(--text-primary)] mb-6">
                Situations d'urgence ? Nous intervenons rapidement pour sécuriser et assainir le logement.
              </p>
              <p className="body-medium text-[var(--text-primary)]">
                Disponibles 7j/7 • Devis gratuit • Intervention sous 24h
              </p>
            </div>
            
            <div className="lg:w-1/2 lg:pl-12">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="btn-primary" size="lg" asChild>
                  <Link to="/contact">
                    Demander une intervention
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
                <Button className="btn-secondary" size="lg" asChild>
                  <a href="tel:0662896049">
                    <Phone className="mr-2 w-5 h-5" />
                    Appel d'urgence
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { contactInfo } from '../data/mock';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: '',
        message: ''
      });
    }, 3000);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-[var(--bg-page)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="heading-1 text-[var(--text-primary)] mb-6">
              Contactez RENMOB pour votre débarras et nettoyage dans le Nord
            </h1>
            <p className="body-large text-[var(--text-secondary)] max-w-3xl mx-auto">
              Besoin d'un devis gratuit ou d'une intervention rapide ? Contactez-nous dès maintenant. 
              Nous répondons sous 24h et intervenons rapidement.
            </p>
          </div>
        </div>
      </section>

      {/* Contact rapide */}
      <section className="py-16 bg-[var(--bg-card)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-gradient-to-br from-gray-800 to-gray-900 text-white border border-[var(--brand-primary)] hover:scale-105 transition-transform duration-300">
              <CardContent className="p-8 text-center">
                <Phone className="w-12 h-12 mx-auto mb-4 text-[var(--brand-primary)]" />
                <h3 className="heading-5 mb-3 text-white">Téléphone</h3>
                <a href={`tel:${contactInfo.phone}`} className="body-medium hover:text-[var(--brand-primary)] text-gray-200 font-semibold">
                  {contactInfo.phone}
                </a>
                <p className="caption mt-2 text-gray-400">Disponible 7j/7</p>
              </CardContent>
            </Card>

            <Card className="bg-[var(--secondary-olive)] text-[var(--text-primary)] hover:scale-105 transition-transform duration-300">
              <CardContent className="p-8 text-center">
                <MessageCircle className="w-12 h-12 mx-auto mb-4" />
                <h3 className="heading-5 mb-3">WhatsApp</h3>
                <a href={`https://wa.me/33${contactInfo.whatsapp.substring(1)}`} className="body-medium hover:opacity-80">
                  {contactInfo.whatsapp}
                </a>
                <p className="caption mt-2 opacity-80">Réponse rapide</p>
              </CardContent>
            </Card>

            <Card className="bg-[var(--bg-page)] border-[var(--brand-primary)] border-2 hover:scale-105 transition-transform duration-300">
              <CardContent className="p-8 text-center">
                <Mail className="w-12 h-12 text-[var(--brand-primary)] mx-auto mb-4" />
                <h3 className="heading-5 text-[var(--text-primary)] mb-3">Email</h3>
                <a href={`mailto:${contactInfo.email}`} className="body-medium text-[var(--brand-primary)] hover:opacity-80">
                  {contactInfo.email}
                </a>
                <p className="caption text-[var(--text-secondary)] mt-2">Sous 24h</p>
              </CardContent>
            </Card>

            <Card className="bg-[var(--bg-page)] border-[var(--border-medium)] hover:scale-105 transition-transform duration-300">
              <CardContent className="p-8 text-center">
                <MapPin className="w-12 h-12 text-[var(--brand-primary)] mx-auto mb-4" />
                <h3 className="heading-5 text-[var(--text-primary)] mb-3">Adresse</h3>
                <p className="body-small text-[var(--text-secondary)]">{contactInfo.address}</p>
                <p className="caption text-[var(--text-secondary)] mt-2">Siège social</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Formulaire de contact */}
      <section className="py-16 bg-[var(--bg-page)]">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Formulaire */}
            <div>
              <h2 className="heading-2 text-[var(--text-primary)] mb-8">Demande de devis gratuit</h2>
              
              {isSubmitted ? (
                <Card className="bg-[var(--brand-primary)] text-[var(--text-inverse)] p-8">
                  <div className="text-center">
                    <CheckCircle className="w-16 h-16 mx-auto mb-4" />
                    <h3 className="heading-4 mb-4">Demande envoyée !</h3>
                    <p className="body-medium">Nous vous recontacterons sous 24h pour discuter de votre projet.</p>
                  </div>
                </Card>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-[var(--text-primary)]">Nom complet *</Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        required
                        className="mt-2 bg-[var(--bg-card)] border-[var(--border-medium)] text-[var(--text-primary)]"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-[var(--text-primary)]">Téléphone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        required
                        className="mt-2 bg-[var(--bg-card)] border-[var(--border-medium)] text-[var(--text-primary)]"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-[var(--text-primary)]">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      className="mt-2 bg-[var(--bg-card)] border-[var(--border-medium)] text-[var(--text-primary)]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="service" className="text-[var(--text-primary)]">Service souhaité</Label>
                    <Select onValueChange={(value) => handleChange('service', value)}>
                      <SelectTrigger className="mt-2 bg-[var(--bg-card)] border-[var(--border-medium)] text-[var(--text-primary)]">
                        <SelectValue placeholder="Sélectionnez un service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="debarras-maison">Débarras maison/appartement</SelectItem>
                        <SelectItem value="debarras-cave">Débarras cave/grenier</SelectItem>
                        <SelectItem value="nettoyage-succession">Nettoyage après succession</SelectItem>
                        <SelectItem value="syndrome-diogene">Syndrome de Diogène</SelectItem>
                        <SelectItem value="entretien-exterieur">Entretien extérieur</SelectItem>
                        <SelectItem value="autre">Autre service</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-[var(--text-primary)]">Décrivez votre projet *</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      placeholder="Décrivez votre situation, la surface à traiter, l'urgence, etc."
                      required
                      rows={5}
                      className="mt-2 bg-[var(--bg-card)] border-[var(--border-medium)] text-[var(--text-primary)]"
                    />
                  </div>

                  <Button type="submit" className="btn-primary w-full" size="lg">
                    Envoyer ma demande
                    <Send className="ml-2 w-5 h-5" />
                  </Button>

                  <p className="caption text-[var(--text-secondary)] text-center">
                    * Champs obligatoires. Réponse sous 24h garantie.
                  </p>
                </form>
              )}
            </div>

            {/* Informations pratiques */}
            <div>
              <h2 className="heading-2 text-[var(--text-primary)] mb-8">Informations pratiques</h2>
              
              <div className="space-y-8">
                <Card className="bg-[var(--bg-card)] border-[var(--border-medium)]">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Clock className="w-6 h-6 text-[var(--brand-primary)] mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="heading-5 text-[var(--text-primary)] mb-2">Horaires d'intervention</h3>
                        <p className="body-small text-[var(--text-secondary)] mb-2">
                          Lundi - Samedi : 8h - 18h<br />
                          Dimanche : Sur rendez-vous<br />
                          Urgences : 7j/7 - 24h/24
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[var(--bg-card)] border-[var(--border-medium)]">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <CheckCircle className="w-6 h-6 text-[var(--brand-primary)] mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="heading-5 text-[var(--text-primary)] mb-2">Nos engagements</h3>
                        <ul className="body-small text-[var(--text-secondary)] space-y-1">
                          <li>• Devis gratuit et sans engagement</li>
                          <li>• Intervention sous 24h-48h</li>
                          <li>• Équipe professionnelle et discrète</li>
                          <li>• Assurance responsabilité civile</li>
                          <li>• Respect de l'environnement</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[var(--secondary-olive)] text-[var(--text-primary)]">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <MessageCircle className="w-6 h-6 mt-1 flex-shrink-0" />
                      <div>
                        <h3 className="heading-5 mb-2">Urgence 24h/24</h3>
                        <p className="body-small mb-4">
                          Situations d'urgence ? Syndrome de Diogène ? Sinistre ?
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Button className="btn-primary" asChild>
                            <a href="tel:0662896049">
                              <Phone className="mr-2 w-4 h-4" />
                              Appeler maintenant
                            </a>
                          </Button>
                          <Button className="btn-secondary" asChild>
                            <a href={`https://wa.me/33${contactInfo.whatsapp.substring(1)}`}>
                              <MessageCircle className="mr-2 w-4 h-4" />
                              WhatsApp
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
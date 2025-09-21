import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { Button } from './ui/button';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Accueil', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'Syndrome de Diogène', href: '/diogene' },
    { name: 'Zones d\'intervention', href: '/zones' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <header className="bg-[var(--bg-page)] border-b border-[var(--border-light)] sticky top-0 z-50 backdrop-blur-md">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-8 bg-gradient-to-r from-blue-500 via-yellow-400 to-red-500 rounded-sm flex items-center justify-center">
                <span className="text-white font-bold text-sm">REN</span>
              </div>
              <span className="font-bold text-xl text-[var(--text-primary)]">RENMOB</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`nav-link ${
                  location.pathname === item.href
                    ? 'text-[var(--brand-primary)]'
                    : 'text-[var(--text-primary)]'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-[var(--text-secondary)] text-sm">
              <Phone className="w-4 h-4" />
              <span>06 62 89 60 49</span>
            </div>
            <Button className="btn-primary" asChild>
              <Link to="/contact">Devis gratuit</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-[var(--text-primary)]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-[var(--border-light)]">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`nav-link ${
                    location.pathname === item.href
                      ? 'text-[var(--brand-primary)]'
                      : 'text-[var(--text-primary)]'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-[var(--border-light)]">
                <div className="flex items-center space-x-2 text-[var(--text-secondary)] text-sm mb-4">
                  <Phone className="w-4 h-4" />
                  <span>06 62 89 60 49</span>
                </div>
                <Button className="btn-primary w-full" asChild>
                  <Link to="/contact">Devis gratuit</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
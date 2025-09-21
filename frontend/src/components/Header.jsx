import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
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
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-24">
          {/* Logo RENMOB officiel - Plus grand et bien visible */}
          <Link to="/" className="flex items-center">
            <img 
              src="https://customer-assets.emergentagent.com/job_multiservice-nord/artifacts/i8gb009j_WhatsApp%20Image%202025-09-21%20at%2015.33.27.jpeg" 
              alt="RENMOB Logo" 
              className="logo-header"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`nav-link transition-all duration-300 ${
                  location.pathname === item.href
                    ? 'active text-[var(--brand-primary)]'
                    : 'text-[var(--text-primary)] hover:text-[var(--brand-primary)]'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Contact Info & CTA */}
          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-[var(--text-secondary)] text-sm">
              <Phone className="w-4 h-4 text-[var(--brand-primary)]" />
              <a 
                href="tel:0662896049" 
                className="hover:text-[var(--brand-primary)] transition-colors font-medium"
              >
                06 62 89 60 49
              </a>
            </div>
            <Button className="btn-primary glow-on-hover" asChild>
              <Link to="/contact">Devis gratuit</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-[var(--text-primary)] p-2 hover:text-[var(--brand-primary)] transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-[var(--border-light)]">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`nav-link py-3 px-4 rounded-lg transition-all duration-300 ${
                    location.pathname === item.href
                      ? 'active text-[var(--brand-primary)] bg-[var(--bg-card)]'
                      : 'text-[var(--text-primary)] hover:text-[var(--brand-primary)] hover:bg-[var(--bg-card)]'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              
              <div className="pt-6 border-t border-[var(--border-light)]">
                <div className="flex items-center space-x-2 text-[var(--text-secondary)] text-sm mb-6">
                  <Phone className="w-4 h-4 text-[var(--brand-primary)]" />
                  <a 
                    href="tel:0662896049" 
                    className="hover:text-[var(--brand-primary)] transition-colors font-medium"
                  >
                    06 62 89 60 49
                  </a>
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
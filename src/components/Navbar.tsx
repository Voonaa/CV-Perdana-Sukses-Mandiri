import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronRight, HardHat } from 'lucide-react';

const NAV_LINKS = [
  { name: 'Beranda', path: '/' },
  { name: 'Produk', path: '/produk' },
  { name: 'Tentang', path: '/tentang' },
  { name: 'Kontak', path: '/kontak' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-industrial-black/80 backdrop-blur-lg border-b border-white/10 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 gold-gradient rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-[0_0_20px_rgba(212,175,55,0.3)]">
            <HardHat className="text-industrial-black w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-display font-bold tracking-tight text-white leading-tight">PERDANA SUKSES</span>
            <span className="text-[10px] text-brand-gold font-mono tracking-[0.2em] uppercase font-semibold">Mandiri Solutions</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium tracking-wide transition-colors relative py-1 ${
                location.pathname === link.path ? 'text-brand-gold' : 'text-gray-400 hover:text-white'
              }`}
            >
              {link.name}
              {location.pathname === link.path && (
                <motion.div 
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-brand-gold"
                />
              )}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white hover:text-brand-gold transition-colors"
        >
          {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-industrial-black border-t border-white/10 px-6 py-12 md:hidden min-h-screen z-50 flex flex-col gap-8"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`text-4xl font-display font-bold ${
                  location.pathname === link.path ? 'gold-text-gradient' : 'text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/kontak" 
              onClick={() => setIsOpen(false)}
              className="mt-8 px-8 py-4 bg-brand-gold text-industrial-black text-xl font-bold rounded flex items-center justify-between group"
            >
              KONSULTASI GRATIS
              <ChevronRight className="w-6 h-6" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

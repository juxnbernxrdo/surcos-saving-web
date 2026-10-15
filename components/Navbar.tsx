'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from '@/components/Logo';
import { useTheme } from '@/components/ThemeProvider';
import { Sun, Moon, Eye, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const { themeMode, resolvedTheme, toggleTheme, highContrast, toggleHighContrast } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('top');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['top', 'ahorro', 'calculadora', 'retos', 'emprendimiento', 'formacion', 'nosotros'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [activeSection]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Ahorro', href: '#ahorro', id: 'ahorro' },
    { label: 'Calculadora', href: '#calculadora', id: 'calculadora' },
    { label: 'Retos', href: '#retos', id: 'retos' },
    { label: 'Emprendimiento', href: '#emprendimiento', id: 'emprendimiento' },
    { label: 'Formación', href: '#formacion', id: 'formacion' },
    { label: 'Nosotros', href: '#nosotros', id: 'nosotros' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      setMobileMenuOpen(false);
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-[20px] backdrop-saturate-[180%] bg-[var(--nav-bg)] border-b border-[var(--border-light)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        <a
          href="#top"
          onClick={(e) => handleLinkClick(e, '#top')}
          className="flex-shrink-0 rounded-lg p-1 transition-transform active:scale-[0.98]"
          aria-label="Surcos Saving - Ir al inicio"
        >
          <span className="hidden sm:inline-block">
            <Logo variant="full" height={30} />
          </span>
          <span className="sm:hidden inline-block">
            <Logo variant="mark" height={30} />
          </span>
        </a>

        {/* Desktop Nav — patrón ContaMind: texto plano, sin pills */}
        <nav className="hidden md:flex items-center gap-6 text-[0.93rem] font-medium text-[var(--text-3)]" aria-label="Navegación principal">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={cn(
                  'relative py-1 transition-colors hover:text-[var(--text-1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-md',
                  isActive && 'text-[var(--text-1)] font-semibold'
                )}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-[var(--accent)] rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={toggleHighContrast}
            title={highContrast ? 'Desactivar alto contraste' : 'Activar alto contraste'}
            aria-label="Alternar modo de alto contraste"
            aria-pressed={highContrast}
            className={cn(
              'flex items-center justify-center h-10 w-10 rounded-full hover:bg-[var(--accent-soft)] transition-colors active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]',
              highContrast ? 'text-[var(--accent)]' : 'text-[var(--text-3)] hover:text-[var(--text-1)]'
            )}
          >
            <Eye size={18} />
          </button>
          <button
            type="button"
            onClick={toggleTheme}
            title={`Tema: ${resolvedTheme === 'dark' ? 'Oscuro' : 'Claro'}`}
            aria-label={`Cambiar a modo ${resolvedTheme === 'dark' ? 'claro' : 'oscuro'}`}
            className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-[var(--accent-soft)] transition-colors text-[var(--text-3)] hover:text-[var(--text-1)] active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={resolvedTheme}
                initial={{ scale: 0.75, opacity: 0, rotate: -25 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0.75, opacity: 0, rotate: 25 }}
                transition={{ duration: 0.16, ease: [0.23, 1, 0.32, 1] }}
                className="flex items-center justify-center"
              >
                {resolvedTheme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
              </motion.span>
            </AnimatePresence>
          </button>

          <div className="hidden md:flex items-center gap-3.5">
            <a
              href="#calculadora"
              onClick={(e) => handleLinkClick(e, '#calculadora')}
              className="bg-[var(--accent)] text-white text-[0.88rem] font-semibold px-4 py-2.5 rounded-[24px] hover:bg-[var(--accent-hover)] transition-all duration-200 active:scale-[0.97] shadow-sm hover:shadow-[0_2px_12px_rgba(0,113,227,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            >
              Comienza a ahorrar
            </a>
          </div>

          <button
            className="md:hidden flex items-center justify-center h-10 w-10 text-[var(--text-1)] active:scale-[0.96] rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu — patrón ContaMind: con transición fluida */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            className="md:hidden absolute top-14 sm:top-16 left-0 w-full bg-[var(--white)] z-40 border-b border-[var(--border-light)] shadow-xl"
          >
            <nav className="flex flex-col p-6 space-y-6 max-h-[80vh] overflow-y-auto" aria-label="Navegación móvil">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className={cn(
                      'text-xl font-medium transition-colors active:scale-[0.98]',
                      isActive ? 'text-[var(--accent)] font-semibold' : 'text-[var(--text-1)]'
                    )}
                  >
                    {link.label}
                  </a>
                );
              })}

              <div className="pt-4 border-t border-[var(--border-light)] flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-[var(--text-4)] uppercase tracking-[0.2em] mb-1">Tema y Contraste</p>
                  <span className="text-sm text-[var(--text-2)] font-medium">
                    Modo: {resolvedTheme === 'dark' ? 'Oscuro' : 'Claro'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={toggleHighContrast}
                    aria-label="Alternar modo de alto contraste"
                    aria-pressed={highContrast}
                    className={cn(
                      'p-2 rounded-full border border-[var(--border-light)] active:scale-95 transition-colors',
                      highContrast ? 'text-[var(--accent)] bg-[var(--accent-soft)]' : 'text-[var(--text-2)] hover:text-[var(--text-1)]'
                    )}
                  >
                    <Eye size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={toggleTheme}
                    aria-label={`Cambiar a modo ${resolvedTheme === 'dark' ? 'claro' : 'oscuro'}`}
                    className="p-2 rounded-full border border-[var(--border-light)] active:scale-95 text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors"
                  >
                    {resolvedTheme === 'dark' ? <Moon size={18} /> : <Sun size={18} />}
                  </button>
                </div>
              </div>

              <div className="pt-6 border-t border-[var(--border-light)] flex flex-col gap-3">
                <a
                  href="#calculadora"
                  onClick={(e) => handleLinkClick(e, '#calculadora')}
                  className="text-center bg-[var(--accent)] text-white font-semibold py-2.5 rounded-[20px] transition-all duration-150 active:scale-[0.97] hover:bg-[var(--accent-hover)]"
                >
                  Comienza a ahorrar
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

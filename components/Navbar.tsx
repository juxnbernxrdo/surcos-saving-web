'use client';

import React, { useState, useEffect } from 'react';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/components/ThemeProvider';
import {
  Sun,
  Moon,
  Laptop,
  Eye,
  Menu,
  X,
  PiggyBank,
  Briefcase,
  GraduationCap,
  Users,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const { themeMode, toggleTheme, highContrast, toggleHighContrast } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Ahorro', href: '#ahorro', icon: PiggyBank },
    { label: 'Emprendimiento', href: '#emprendimiento', icon: Briefcase },
    { label: 'Formación', href: '#formacion', icon: GraduationCap },
    { label: 'Nosotros', href: '#nosotros', icon: Users },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      setMobileMenuOpen(false);
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-[background-color,border-color,box-shadow] duration-200',
        'backdrop-blur-[20px] backdrop-saturate-[180%] bg-[var(--nav-bg)]',
        scrolled
          ? 'border-b border-[var(--border-light)] shadow-xs'
          : 'border-b border-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <a
          href="#top"
          className="flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-lg p-1 transition-transform active:scale-[0.98]"
          aria-label="Surcos Saving - Inicio"
        >
          <Logo height={32} priority />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 font-sans" aria-label="Navegación principal">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className={cn(
                'px-3.5 py-1.5 text-[13.5px] font-medium text-[var(--text-2)] hover:text-[var(--text-1)]',
                'rounded-full transition-colors duration-150 hover:bg-[var(--off-white)]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]'
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Controls & CTA */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* High Contrast Toggle */}
          <button
            type="button"
            onClick={toggleHighContrast}
            title={highContrast ? 'Desactivar alto contraste' : 'Activar alto contraste (WCAG AAA)'}
            aria-label="Alternar modo de alto contraste"
            className={cn(
              'h-9 w-9 rounded-full flex items-center justify-center border text-[var(--text-3)] hover:text-[var(--text-1)] transition-colors cursor-pointer',
              highContrast
                ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)] ring-1 ring-[var(--accent)]'
                : 'border-[var(--border-light)] hover:bg-[var(--off-white)]'
            )}
          >
            <Eye className="w-4 h-4 stroke-[2]" />
          </button>

          {/* Theme Mode Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            title={`Tema actual: ${themeMode === 'system' ? 'Automático (Sistema)' : themeMode === 'dark' ? 'Oscuro' : 'Claro'}. Clic para cambiar.`}
            aria-label="Alternar tema claro u oscuro"
            className="h-9 w-9 rounded-full flex items-center justify-center border border-[var(--border-light)] text-[var(--text-3)] hover:text-[var(--text-1)] hover:bg-[var(--off-white)] transition-colors cursor-pointer"
          >
            {themeMode === 'dark' ? (
              <Moon className="w-4 h-4 stroke-[2]" />
            ) : themeMode === 'light' ? (
              <Sun className="w-4 h-4 stroke-[2]" />
            ) : (
              <Laptop className="w-4 h-4 stroke-[2]" />
            )}
          </button>

          {/* Primary Action Button */}
          <Button
            size="sm"
            variant="primary"
            onClick={() => {
              const el = document.querySelector('#calculadora');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Comienza a ahorrar
          </Button>
        </div>

        {/* Mobile Hamburger & Controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Alternar tema"
            className="h-8.5 w-8.5 rounded-full flex items-center justify-center border border-[var(--border-light)] text-[var(--text-3)]"
          >
            {themeMode === 'dark' ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Abrir menú de navegación"
            className="h-9 w-9 rounded-full flex items-center justify-center border border-[var(--border-light)] text-[var(--text-1)] hover:bg-[var(--off-white)] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[var(--border-light)] bg-[var(--white)] px-4 pt-3 pb-6 shadow-lg animate-[dropdown-panel-in_180ms_cubic-bezier(0.23,1,0.32,1)]">
          <nav className="flex flex-col gap-1.5" aria-label="Navegación móvil">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[var(--text-1)] hover:bg-[var(--off-white)] transition-colors active:scale-[0.98]"
                >
                  <Icon className="w-4 h-4 text-[var(--accent)] stroke-[2]" />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </nav>

          <div className="mt-4 pt-4 border-t border-[var(--border-light)] flex flex-col gap-3">
            <div className="flex items-center justify-between px-2 text-xs text-[var(--text-3)]">
              <span>Accesibilidad (Alto Contraste)</span>
              <button
                type="button"
                onClick={toggleHighContrast}
                className={cn(
                  'px-3 py-1 rounded-full text-xs font-semibold border transition-colors',
                  highContrast
                    ? 'border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]'
                    : 'border-[var(--border)] text-[var(--text-2)]'
                )}
              >
                {highContrast ? 'Activo' : 'Inactivo'}
              </button>
            </div>

            <Button
              size="md"
              variant="primary"
              className="w-full mt-1"
              onClick={() => {
                setMobileMenuOpen(false);
                const el = document.querySelector('#calculadora');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Comienza a ahorrar
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

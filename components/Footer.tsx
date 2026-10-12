'use client';

import React from 'react';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Sparkles, Heart } from 'lucide-react';

export function Footer() {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[var(--white)] border-t border-[var(--border-light)] font-sans">
      {/* Pre-Footer Final CTA Block */}
      <div className="border-b border-[var(--border-light)] bg-[radial-gradient(ellipse_at_bottom,var(--accent-soft),var(--white))] py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--white)] border border-[var(--border)] text-xs font-semibold text-[var(--accent)] mb-6 shadow-2xs select-none">
            <Sparkles className="w-3.5 h-3.5" />
            <span>El momento de empezar es ahora</span>
          </div>

          <h2 className="font-serif text-[clamp(2.3rem,4.5vw,3.8rem)] text-[var(--text-1)] tracking-tight leading-[1.1] mb-6">
            Tu futuro no empieza cuando tienes mucho.{' '}
            <span className="italic font-normal text-[var(--accent)]">
              Empieza cuando decides construir algo.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[var(--text-2)] max-w-2xl mx-auto mb-9 leading-relaxed font-normal">
            Ahorro constante, ferias de emprendimiento estudiantil y aprendizaje de habilidades de alto valor para toda tu vida.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Button
              size="lg"
              variant="primary"
              onClick={() => scrollTo('#calculadora')}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              Empieza tu reto de ahorro
            </Button>

            <Button
              size="lg"
              variant="secondary"
              onClick={() => scrollTo('#emprendimiento')}
              className="w-full sm:w-auto"
            >
              Explora el emprendimiento
            </Button>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Information */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <a href="#top" className="inline-block" aria-label="Surcos Saving - Ir arriba">
              <Logo height={32} />
            </a>

            <p className="text-xs sm:text-sm text-[var(--text-3)] leading-relaxed max-w-sm">
              Iniciativa educativa y PYME estudiantil vinculada a la comunidad de la <strong>Unidad Educativa Surcos</strong>. Fomentamos el ahorro, impulsamos el emprendimiento en ferias presenciales y desarrollamos habilidades de alto valor.
            </p>

            <div className="text-xs text-[var(--text-4)] pt-2">
              Quito, Ecuador · Dólares de los Estados Unidos (USD)
            </div>
          </div>

          {/* Pillars Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-1)]">
              Pilares
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[var(--text-3)]">
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('#ahorro')}
                  className="hover:text-[var(--accent)] transition-colors cursor-pointer"
                >
                  Ahorro diario y retos
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('#calculadora')}
                  className="hover:text-[var(--accent)] transition-colors cursor-pointer"
                >
                  Calculadora de ahorro
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('#emprendimiento')}
                  className="hover:text-[var(--accent)] transition-colors cursor-pointer"
                >
                  Emprendimiento y ferias
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('#formacion')}
                  className="hover:text-[var(--accent)] transition-colors cursor-pointer"
                >
                  Formación y tecnología
                </button>
              </li>
            </ul>
          </div>

          {/* Community & Institutional Column */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-1)]">
              Comunidad e institucional
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[var(--text-3)]">
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('#nosotros')}
                  className="hover:text-[var(--accent)] transition-colors cursor-pointer"
                >
                  Sobre la iniciativa y CEO
                </button>
              </li>
              <li>
                <span className="text-[var(--text-2)]">
                  Vinculación: Unidad Educativa Surcos
                </span>
              </li>
              <li className="text-xs text-[var(--text-3)] leading-relaxed pt-1">
                Participación en ferias sujeta a calendarios académicos y reglamentos estudiantiles internos.
              </li>
            </ul>
          </div>
        </div>

        {/* Legal, Disclaimers & Copyright */}
        <div className="mt-12 pt-8 border-t border-[var(--border-light)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-4)]">
          <p>
            © {new Date().getFullYear()} Surcos Saving. PYME Estudiantil · Fines pedagógicos y formativos.
          </p>

          <p className="flex items-center gap-1 text-[var(--text-3)]">
            Hecho con dedicación para la comunidad estudiantil de Surcos
          </p>
        </div>
      </div>
    </footer>
  );
}

'use client';

import React from 'react';
import { Logo } from '@/components/Logo';
import { Cta } from '@/components/marketing/cta';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export function Footer() {
  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const pillars = [
    { label: 'Ahorro diario', href: '#ahorro' },
    { label: 'Calculadora', href: '#calculadora' },
    { label: 'Retos', href: '#retos' },
    { label: 'Historias', href: '#historias' },
  ];

  const community = [
    { label: 'Emprendimiento', href: '#emprendimiento' },
    { label: 'Formación', href: '#formacion' },
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Visión', href: '#vision' },
  ];

  return (
    <footer className="font-sans">
      {/* CTA final — bloque refinado con contraste accesible y animación sutil */}
      <section className="bg-[var(--off-white)] text-[var(--text-1)] border-t border-[var(--border-light)] relative overflow-hidden transition-colors duration-200">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(52%_64%_at_50%_0%,rgba(0,113,227,0.12),transparent_72%)]"
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.08] tracking-tight text-[#000000] dark:text-[#FFFFFF] transition-colors duration-200">
              Tu futuro no empieza cuando tienes mucho.{' '}
              <em className="italic font-normal text-[var(--accent)]">Empieza cuando decides.</em>
            </h2>
            <p className="text-[1.02rem] sm:text-[1.1rem] text-[var(--text-2)] max-w-xl mx-auto leading-relaxed mt-5 mb-10 transition-colors duration-200">
              Ahorro constante, ferias de emprendimiento y habilidades que te sirven toda la vida.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Cta href="#calculadora" variant="primary" size="lg" className="w-full sm:w-auto">
                <span>Empieza tu reto de ahorro</span>
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </Cta>
              <Cta href="#emprendimiento" variant="ghost" size="lg" className="w-full sm:w-auto">
                Explora el emprendimiento
              </Cta>
            </div>
            <div className="mt-10 pt-6 border-t border-[var(--border-light)] flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[0.8rem] text-[var(--text-3)]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-[var(--green)]" /> Sin cuentas ni depósitos
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-[var(--green)]" /> 100% pedagógico
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-[var(--accent)]" /> Unidad Educativa Surcos
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer — patrón ContaMind: grid editorial sobrio */}
      <div className="bg-[var(--white)] border-t border-[var(--border-light)] py-16 sm:py-[80px] px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 sm:gap-12">
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <a href="#top" onClick={(e) => scrollTo(e, '#top')} className="inline-block mb-6" aria-label="Surcos Saving - Ir arriba">
              <Logo variant="full" height={30} />
            </a>
            <p className="text-[0.95rem] text-[var(--text-3)] max-w-sm mb-6 leading-relaxed">
              <strong>Iniciativa educativa y PYME estudiantil.</strong><br /><br />
              Fomentamos el ahorro, impulsamos el emprendimiento en ferias presenciales
              y desarrollamos habilidades de alto valor en la Unidad Educativa Surcos.
            </p>
            <p className="text-[0.85rem] text-[var(--text-4)]">Quito, Ecuador · USD</p>
          </div>

          <div>
            <h4 className="font-bold text-[0.9rem] text-[var(--text-1)] uppercase tracking-wider mb-6">Aprende</h4>
            <ul className="space-y-4 text-[0.95rem] text-[var(--text-3)]">
              {pillars.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={(e) => scrollTo(e, l.href)} className="hover:text-[var(--text-1)] transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[0.9rem] text-[var(--text-1)] uppercase tracking-wider mb-6">Comunidad</h4>
            <ul className="space-y-4 text-[0.95rem] text-[var(--text-3)]">
              {community.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={(e) => scrollTo(e, l.href)} className="hover:text-[var(--text-1)] transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[0.9rem] text-[var(--text-1)] uppercase tracking-wider mb-6">Programa</h4>
            <ul className="space-y-4 text-[0.95rem] text-[var(--text-3)]">
              <li className="leading-relaxed">Talleres previos a cada feria escolar.</li>
              <li className="leading-relaxed">Participación sujeta al calendario académico.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-[0.9rem] text-[var(--text-1)] uppercase tracking-wider mb-6">Legal</h4>
            <ul className="space-y-4 text-[0.95rem] text-[var(--text-3)]">
              <li className="leading-relaxed">PYME estudiantil · Fines pedagógicos.</li>
              <li className="leading-relaxed">No es entidad financiera.</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-16 sm:mt-[80px] pt-8 border-t border-[var(--border-light)] flex flex-col md:flex-row justify-between items-center gap-6 text-[0.85rem] text-[var(--text-4)]">
          <p className="text-center md:text-left">© {new Date().getFullYear()} Surcos Saving. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

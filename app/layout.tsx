import type { Metadata, Viewport } from 'next';
import { Instrument_Serif } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from 'sonner';

const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-instrument',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Surcos Saving · Pequeñas monedas. Grandes posibilidades.',
  description:
    'Iniciativa educativa y PYME estudiantil vinculada a la Unidad Educativa Surcos para fomentar el ahorro constante, impulsar el emprendimiento real en ferias presenciales y formar habilidades financieras y tecnológicas de alto valor.',
  keywords: [
    'Surcos Saving',
    'Ahorro estudiantil',
    'Emprendimiento escolar',
    'Unidad Educativa Surcos',
    'Educación financiera',
    'Ferias estudiantiles',
    'Habilidades para el futuro',
  ],
  authors: [{ name: 'Surcos Saving' }],
  openGraph: {
    title: 'Surcos Saving · Pequeñas monedas. Grandes posibilidades.',
    description:
      'Aprende a ahorrar, convierte tus ideas en emprendimientos reales y desarrolla las habilidades que te ayudarán a construir tu futuro.',
    type: 'website',
    locale: 'es_EC',
    siteName: 'Surcos Saving',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${instrumentSerif.variable} ${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/Logo-Horizontal.svg" type="image/svg+xml" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const savedTheme = localStorage.getItem('surcos_theme');
                const isDark = savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches);
                if (isDark) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
                if (localStorage.getItem('surcos_high_contrast') === 'true') {
                  document.documentElement.classList.add('high-contrast');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="antialiased min-h-screen bg-[var(--white)] text-[var(--text-1)] selection:bg-[var(--accent-soft)] selection:text-[var(--accent)]" suppressHydrationWarning>
        <ThemeProvider>
          {children}
          <Toaster position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}

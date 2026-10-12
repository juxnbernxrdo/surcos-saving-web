# Design Guidelines de StarMind AI: Sistema de Diseño e Ingeniería Inversa de ContaMind AI

> **Estado del documento:** Oficial · Derivado de auditoría de código fuente e ingeniería inversa  
> **Versión del sistema:** 1.0.0 (Basado en ContaMind AI Frontend v0.1.0 / Next.js 16 + Tailwind CSS 4)  
> **Fecha de levantamiento:** Octubre 2026  
> **Ámbito de aplicación:** ContaMind AI y ecosistema de aplicaciones de StarMind AI  

---

## A. Propósito y alcance

### 1. Objetivo de las Design Guidelines
El propósito de este documento es definir, estandarizar y preservar el lenguaje de diseño visual, la arquitectura de interfaz y los patrones de interacción implementados en el frontend de **ContaMind AI** (`apps/frontend`). Este documento actúa como la **fuente de verdad técnica y visual** para que cualquier ingeniero de software, diseñador o agente de programación autónomo pueda replicar, adaptar y extender interfaces digitales coherentes dentro del ecosistema de productos de **StarMind AI**, la organización matriz de ContaMind AI.

### 2. Relación entre ContaMind AI y StarMind AI
* **StarMind AI** es la entidad corporativa y tecnológica matriz responsable de la concepción, infraestructura y despliegue de soluciones empresariales nativas de inteligencia artificial.
* **ContaMind AI** es el producto insignia de StarMind AI enfocado en la automatización contable, tributaria y financiera (NIIF / SRI).
* La interfaz de ContaMind AI representa la materialización inicial del sistema de diseño de StarMind AI: una estética inspirada en el diseño industrial y digital de Apple y la sobriedad suiza (tipografía editorial combinada con componentes geométricos "pill", microinteracciones sutiles bajo la filosofía de Emil Kowalski y elevaciones etéreas con desenfoque Gaussiano).

### 3. Lenguaje visual compartido vs. Dominio funcional
Para evitar acoplar componentes genéricos con la lógica contable, este sistema distingue claramente dos niveles:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   STARMINND AI DESIGN SYSTEM (CORE)                    │
│  · Tokens de color, tipografía dual (Serif/Sans), radios y sombras     │
│  · Sistema Pill de controles interactivos (SPEC-129)                   │
│  · Física de movimiento: cubic-bezier(0.23, 1, 0.32, 1), active scale  │
│  · Primitivas UI: Button, Input, Dropdown, Modal, Card, Switch, Avatar  │
│  · Notificaciones translúcidas Sonner, Scrollbars finas                │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Especialización de Dominio
┌───────────────────────────────────▼────────────────────────────────────┐
│                  CONTAMIND AI (DOMINIO ESPECÍFICO)                     │
│  · Validadores de RUC / Cédula ecuatoriana (`lib/tax-id.ts`)           │
│  · Catálogo de cuentas y asientos contables de doble partida           │
│  · Estados tributarios del SRI (RIMPE, Retenciones, Facturación)       │
│  · Drawers de inspección de Comprobantes de Diario y Facturas SRI      │
│  · Selector de empresas y tenencia multi-empresa (`WorkspaceSwitcher`) │
└────────────────────────────────────────────────────────────────────────┘
```

### 4. Cómo utilizar esta guía
* **Nuevos proyectos de StarMind AI:** Importar los tokens `@theme` de Tailwind CSS v4, replicar las primitivas del directorio `components/ui/`, configurar la carga dual de fuentes (`Instrument Serif` y `Geist Sans`), y aplicar el `ThemeProvider` con soporte para temas claro, oscuro y alto contraste.
* **Módulos existentes de ContaMind AI:** Consultar este catálogo antes de crear nuevas pantallas. Todo nuevo input o control interactivo debe respetar obligatoriamente el sistema de alturas y radios Pill (SPEC-129).

---

## B. Principios de diseño

Los principios de diseño documentados a continuación han sido extraídos directamente de la inspección del código fuente y los comentarios arquitectónicos del repositorio.

### 1. Principios explícitos (Confirmados en el código)

#### 1.1. Sistema Pill Unificado (SPEC-129)
* **Fuente:** [`apps/frontend/app/globals.css`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/app/globals.css#L45-L51), [`Input.tsx`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/components/ui/Input.tsx#L13-L16), [`Dropdown.tsx`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/components/ui/Dropdown.tsx#L41-L44), [`DatePicker.tsx`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/components/ui/DatePicker.tsx#L392).
* **Definición:** Fuente única de verdad geométrica para controles de entrada de datos (`Input`, `Dropdown`, `DatePicker`, `SearchInput`, filtros y botones).
* **Regla técnica:** Radio de borde completo (`--radius-full: 9999px` o `rounded-full`). Se prohíbe el uso de radios intermedios en campos de texto de una sola línea. La única excepción formal documentada es el `Textarea` multilínea, que adopta `rounded-3xl` para evitar deformaciones del óvalo.

#### 1.2. Filosofía de Movimiento y Animación de Emil Kowalski
* **Fuente:** [`apps/frontend/components/marketing/motion-tokens.ts`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/components/marketing/motion-tokens.ts#L1-L11).
* **Reglas obligatorias:**
  1. **Curva de aceleración:** Curva cúbica fuerte `cubic-bezier(0.23, 1, 0.32, 1)` para un retorno de respuesta inmediato.
  2. **Duración estricta:** Todas las transiciones de UI se mantienen por debajo o en los 300ms (típico `150ms` a `200ms`).
  3. **Entradas no disruptivas:** Las transiciones de aparición escalan desde `scale: 0.96` con `opacity: 0`. Queda terminantemente prohibido animar desde `scale: 0`.
  4. **Feedback táctil (Active Press):** `scale: 0.97` (o `0.98`) al hacer clic o pulsar botones y tarjetas interactivas.
  5. **Composición GPU pura:** Únicamente se animan propiedades aceleradas por hardware (`transform` y `opacity`). Nunca animar directamente `height` o `width` sin contenedor de grilla.

#### 1.3. Accesibilidad por Diseño (a11y & Motion Sensitivity)
* **Fuente:** [`globals.css`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/app/globals.css#L164-L187), [`ThemeProvider.tsx`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/components/ThemeProvider.tsx#L173-L217).
* **Regla técnica:** 
  * Con `prefers-reduced-motion: reduce`, todas las animaciones se colapsan a transiciones puramente de opacidad con duraciones mínimas (`0.01ms` en CSS global, `0.1s` - `0.15s` en Motion).
  * Soporte nativo para modo de alto contraste mediante la clase `html.high-contrast` que redefine bordes y ratios de contraste WCAG AAA.

### 2. Principios inferidos (Derivados de la estructura del producto)

#### 2.1. Tipografía Dual "Editorial-Tech"
* La interfaz contrasta la elegancia serifa tradicional de la contabilidad (`Instrument Serif`) en encabezados de alto impacto (`h1`, `h2`, títulos de modales) con una tipografía sans-serif neutral y legible (`Geist Sans`) para la información densa y los controles. Los números, montos y hashes criptográficos se presentan en tipografía monoespaciada (`font-mono`).

#### 2.2. Superficies Etéreas y Materiales Translúcidos (Glassmorphism de Apple)
* Las barras de navegación, encabezados modales y banners utilizan desenfoque de fondo (`backdrop-filter: blur(20px) saturate(180%)`) y opacidades variables (`rgba(255, 255, 255, 0.75)` en modo claro y `rgba(0, 0, 0, 0.8)` en modo oscuro), generando una sensación de profundidad espacial sin recurrir a sombras oscuras y densas.

#### 2.3. Jerarquía y Densidad Guiada por el Contexto
* Los formularios de marketing y onboarding utilizan tamaños amplios (`h-12` / 48px) para facilitar la lectura y la entrada táctil. En cambio, el dashboard operativo y las tablas contables condensan las filas a tamaños compactos (`h-9` a `h-10`, texto a `12px` - `12.5px`, paddings de `2.5` a `3.5`) para maximizar la densidad de información financiera visible.

---

## C. Design tokens

Los design tokens de ContaMind AI están implementados en el bloque `@theme` de Tailwind CSS v4 en conjunción con variables CSS en `:root` y `.dark` ([`apps/frontend/app/globals.css`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/app/globals.css#L7-L137)).

### 1. Colores y roles semánticos

| Nombre del Token | Variable CSS | Modo Claro | Modo Oscuro | Rol y Propósito | Ubicación en Código |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `color-white` | `--white` | `#ffffff` | `#000000` | Fondo base de aplicación y superficies primarias | `globals.css:63, 103` |
| `color-off-white` | `--off-white` | `#f5f5f7` | `#121212` | Fondo secundario, tarjetas y hovers de baja intensidad | `globals.css:64, 104` |
| `bg-surface` | `--bg-surface` | `#ffffff` | `#000000` | Superficies de contenedores y modales | `globals.css:65, 105` |
| `bg-surface-elevated` | `--bg-surface-elevated`| `#f5f5f7` | `#121212` | Superficies interiores elevadas (filas, headers de tabla)| `globals.css:66, 106` |
| `color-border` | `--border` | `#e0e0e5` | `#2c2c2e` | Bordes estructurales primarios y separadores | `globals.css:67, 107` |
| `color-border-light` | `--border-light` | `#ebebf0` | `#1c1c1e` | Bordes sutiles entre celdas, tarjetas y menús | `globals.css:68, 108` |
| `color-text-1` | `--text-1` | `#1d1d1f` | `#ffffff` | Títulos, encabezados y texto con máximo énfasis | `globals.css:70, 110` |
| `color-text-2` | `--text-2` | `#424245` | `#ebebeb` | Texto de cuerpo principal y etiquetas de controles | `globals.css:71, 111` |
| `color-text-3` | `--text-3` | `#6e6e73` | `#a1a1a6` | Texto secundario, subtítulos, placeholders y metadata | `globals.css:72, 112` |
| `color-text-4` | `--text-4` | `#aeaeb2` | `#6e6e73` | Texto inactivo, bordes tenues y notas al pie | `globals.css:73, 113` |
| `color-accent` | `--accent` | `#0071e3` | `#0a84ff` | Color primario de marca, acciones primarias y foco activo| `globals.css:75, 115` |
| `color-accent-hover` | `--accent-hover` | `#0077ed` | `#409fff` | Estado hover de botones y elementos interactivos | `globals.css:76, 116` |
| `color-accent-soft` | `--accent-soft` | `#e8f0fc` | `rgba(10, 132, 255, 0.15)` | Fondos de selección, badges y estados activos suaves | `globals.css:77, 117` |
| `color-green` | `--green` | `#30d158` | `#30d158` | Estado semántico de éxito, saldos positivos y online | `globals.css:79, 119` |
| `color-green-soft` | `--green-soft` | `#e6f9ed` | `rgba(48, 209, 88, 0.15)` | Fondo de badges de éxito y toasts positivos | `globals.css:80, 119` |
| `color-red` | `--red` | `#ff3b30` | `#ff3b30` | Estado semántico destructivo, errores e invalidación | `globals.css:81, 120` |
| `color-red-soft` | `--red-soft` | `#fff0f0` | `rgba(255, 59, 48, 0.15)` | Fondo de mensajes de error y validaciones | `globals.css:82, 120` |
| `color-amber` | `--amber` | `#ff9f0a` | `#ff9f0a` | Estado semántico de advertencia y atención preventiva | `globals.css:83, 121` |
| `color-amber-soft` | `--amber-soft` | `#fff8ec` | `rgba(255, 159, 10, 0.15)` | Fondo de badges de advertencia | `globals.css:84, 121` |
| `nav-bg` | `--nav-bg` | `rgba(255, 255, 255, 0.75)` | `rgba(0, 0, 0, 0.8)` | Fondo con backdrop-blur para barras de navegación | `globals.css:86, 123` |
| `cta-bg` | `--cta-bg` | `#1d1d1f` | `#ffffff` | Fondo de bloques CTA de alto contraste | `globals.css:88, 125` |
| `cta-text` | `--cta-text` | `#ffffff` | `#1d1d1f` | Texto sobre bloques CTA | `globals.css:89, 126` |
| `avatar-bg` | `--avatar-bg` | `#000000` | `#ffffff` | Fondo de iniciales en avatar de usuario | `globals.css:93, 130` |
| `avatar-text` | `--avatar-text` | `#ffffff` | `#000000` | Texto de iniciales en avatar de usuario | `globals.css:94, 131` |
| `bg-hover` | `--bg-hover` | `#f5f5f7` | `#1c1c1e` | Color de fondo unificado para estados `:hover` | `globals.css:96, 133` |

#### Modo de Alto Contraste (Tokens Accesibles WCAG AAA)
Definidos en [`apps/frontend/app/globals.css`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/app/globals.css#L164-L187):
* `html.high-contrast`: `--text-1: #000000`, `--text-2: #111111`, `--text-3: #222222`, `--text-4: #444444`, `--border: #000000`, `--border-light: #444444`, `--accent: #004080`, `--accent-soft: #d0e4ff`.
* `html.dark.high-contrast`: `--white: #000000`, `--off-white: #0a0a0a`, `--text-1: #ffffff`, `--text-2: #f0f0f0`, `--text-3: #dddddd`, `--text-4: #bbbbbb`, `--border: #ffffff`, `--border-light: #888888`, `--accent: #66b2ff`.

---

### 2. Tipografía y jerarquía

#### Familias Tipográficas
* **Serif:** `var(--font-serif)` → `var(--font-instrument), Georgia, serif` ([`Instrument_Serif`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/app/layout.tsx#L10-L14), peso 400).
* **Sans:** `var(--font-sans)` → `var(--font-geist-sans), -apple-system, sans-serif` ([`GeistSans`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/app/layout.tsx#L3)).
* **Monospace:** `font-mono` → Números de comprobantes, valores en USD, hashes SHA-256 e IPs de auditoría.

#### Escala y Jerarquía de Texto Observada en Código

| Rol Jerárquico | Clases / Familia | Tamaño (rem / px) | Altura de Línea | Peso | Uso Específico | Archivo Representativo |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Title** | `font-serif text-[clamp(2.6rem,5.5vw,5rem)]` | 41.6px – 80px | `leading-[1.06]` | Regular (400) | Título principal de landing page | `HeroSection.tsx:35` |
| **Section H1 / H2** | `font-serif text-3xl sm:text-4xl lg:text-5xl` | 30px – 48px | `leading-[1.15]` | Regular (400) | Títulos de sección y páginas públicas | `SectionHeading.tsx:28` |
| **Modal Header** | `font-serif text-lg sm:text-xl` | 18px – 20px | `tracking-tight` | Medium (500) | Títulos de ventanas modales | `Modal.tsx:184` |
| **Metric / KPI Value**| `font-sans / font-mono text-[22px] - text-[2.6rem]` | 22px – 41.6px | `leading-none` | Bold / Semibold | Cifras financieras y precios | `KPICard.tsx:71`, `PricingCard.tsx:75`|
| **Form Section Heading**| `font-sans text-xs uppercase tracking-wider` | 12px (0.75rem)| `leading-normal`| Semibold / Bold | Separadores de bloques en formularios | `CompanyFormModal.tsx:394` |
| **Body Primary** | `font-sans text-sm / text-[0.95rem]` | 14px – 15.2px | `leading-relaxed`| Normal (400) | Contenido de lectura, celdas de tabla | `MarketingLayout.tsx:275` |
| **UI Control Text**| `font-sans text-[12.5px] - text-sm` | 12.5px – 14px | `leading-none` | Medium / Semibold | Textos en botones, inputs y menús | `Button.tsx:46`, `NavButton.tsx:240` |
| **Micro Caption / Badge**| `font-sans text-[10px] - text-[11px]` | 10px – 11px | `leading-tight` | Medium / Bold | Badges de estado, etiquetas auxiliares | `Badge.tsx:27`, `Card.tsx:119` |

---

### 3. Radios y bordes

| Nombre del Token | Valor CSS | Equivalente Tailwind | Propósito y Aplicación | Ubicación en Código |
| :--- | :--- | :--- | :--- | :--- |
| `--radius-full` | `9999px` | `rounded-full` | Botones, inputs, selects, pills, badges y chips interactivos | `globals.css:43` |
| `--radius-lg` | `18px` | `rounded-2xl` (o `rounded-[18px]`) | Contenedores de modales, paneles flotantes, tarjetas y dropdowns | `globals.css:40` |
| `--radius-md` | `14px` | `rounded-xl` | Tarjetas internas, wrappers de iconos, Sonner toasts | `globals.css:41, 389` |
| `--radius-sm` | `10px` | `rounded-lg` | Botones de cierre (`CloseButton`), botones de herramientas | `globals.css:42`, `CloseButton.tsx:36` |
| *Excepción Multilínea* | `rounded-3xl` | `24px` | Textarea (evita distorsión en bloques multilínea) | `Textarea.tsx:58` |

---

### 4. Sombras y elevaciones

| Nombre del Token | Valor CSS Exacto | Comportamiento en Modo Oscuro | Propósito | Ubicación en Código |
| :--- | :--- | :--- | :--- | :--- |
| `--shadow-subtle` | `0 1px 4px rgba(0,0,0,0.05)` | Sutil absorción de luz en superficies oscuras | Tarjetas inactivas, inputs en reposo | `globals.css:52` |
| `--shadow-default` | `0 4px 20px rgba(0,0,0,0.07)` | `0 4px 20px rgba(0,0,0,0.4)` (clase `.shadow-premium`) | Tarjetas destacadas, menús desplegables | `globals.css:53, 373` |
| `--shadow-prominent`| `0 8px 40px rgba(0,0,0,0.10)` | Elevación profunda con dispersión | Menús de usuario, modales, drawers | `globals.css:54` |
| `Shadow Modal` | `shadow-2xl` | `0 25px 50px -12px rgba(0,0,0,0.5)` | Ventana flotante (`FloatingWindow`) y `Modal` | `FloatingWindow.tsx:56` |
| `Shadow Toast` | `0 10px 30px -10px rgba(0,0,0,0.08)`| `0 20px 50px -12px rgba(0,0,0,0.5)` | Notificaciones Sonner | `globals.css:390, 412` |

---

### 5. Dimensiones y restricciones de layout (Pill System SPEC-129)

| Variable / Dimensión | Valor Exacto | Equivalente Tailwind | Propósito | Ubicación en Código |
| :--- | :--- | :--- | :--- | :--- |
| `--input-height-form` | `3rem` (48px) | `h-12` | Inputs, Dropdowns y Selects en formularios principales y modales | `globals.css:48`, `Input.tsx:62` |
| `--input-height-toolbar`| `2.5rem` (40px) | `h-10` | Búsquedas en toolbars, tablas densas y selectores compactos | `globals.css:49`, `Input.tsx:62` |
| `--input-height-compact`| `2.25rem` (36px) | `h-9` | Botones secundarios compactos y dropdowns `size="xs"` | `globals.css:50`, `Dropdown.tsx:341` |
| `Button Size SM` | `2rem` (32px) | `h-8` | Botones de acción secundaria y botones de navegación rápida | `Button.tsx:45` |
| `Button Size MD` | `2.375rem` (38px)| `h-9.5` | Botón estándar en interfaces de control | `Button.tsx:46` |
| `Button Size LG` | `2.75rem` (44px) | `h-11` | Botones principales de acción y submit | `Button.tsx:47` |
| `Sidebar Collapsed` | `64px` | Fijo | Ancho del Sidebar retraído en escritorio | `use-sidebar-state.tsx:14` |
| `Sidebar Expanded` | `260px` | Fijo | Ancho del Sidebar desplegado | `use-sidebar-state.tsx:15` |
| `Container Max Width`| `1400px` | `max-w-[1400px]` | Contenedor principal de vistas del Dashboard | `app/dashboard/layout.tsx:115` |
| `Marketing Container`| `1280px` | `max-w-7xl` | Contenedor centrado para landing, precios y documentación | `MarketingLayout.tsx:130` |

---

### 6. Breakpoints de diseño

| Identificador | Punto de Quiebre | Comportamiento de Interfaz | Ubicación en Código |
| :--- | :--- | :--- | :--- |
| **Micro (320px)** | `max-width: 320px` | Reducción extrema de paddings a `0.5rem`, botones compactados | `globals.css:529` |
| **Mini (360px)** | `max-width: 360px` | Reducción de paddings horizontales a `0.75rem` | `globals.css:517` |
| **Ultra-Small (380px)**| `max-width: 380px` | Reducción dinámica de radios (`--radius-lg: 14px`, `md: 12px`, `sm: 8px`)| `globals.css:493` |
| **sm** | `min-width: 640px` | Transición de layout de tablas: de tarjetas móviles a tabla tradicional | `audit-log-table.tsx:247` |
| **md (Mobile Gate)** | `max-width: 767px` | Límite del Sidebar móvil. Se oculta el sidebar fijo y se activa el drawer lateral móvil con botón hamburguesa | `app/dashboard/layout.tsx:16` |
| **lg** | `min-width: 1024px` | Activación del layout de dos columnas en Auth (45% visual / 55% formulario) | `app/auth/layout.tsx:44` |
| **xl / 2xl** | `min-width: 1280px` | Grillas de 3 a 6 columnas en marketing y dashboards | `MarketingLayout.tsx:270` |

---

### 7. Transiciones, animaciones y motion tokens

Valores extraídos de [`apps/frontend/components/marketing/motion-tokens.ts`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/components/marketing/motion-tokens.ts) y [`globals.css`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/app/globals.css#L56-L58):

```typescript
// Curvas de Aceleración Canónicas
export const EASE_OUT = [0.23, 1, 0.32, 1] as const;      // Inmediata respuesta táctil
export const EASE_IN_OUT = [0.77, 0, 0.175, 1] as const;  // Transiciones de cambio de estado
export const EASE_DRAWER = [0.32, 0.72, 0, 1] as const;   // Apertura de paneles laterales

// Duraciones Temporales
export const DURATIONS = {
  instant: 0.10, // 100ms: Tooltips ya coordinados
  fast:    0.16, // 160ms: Menús contextuales, transiciones de badge
  normal:  0.25, // 250ms: Despliegue de paneles y modales
  smooth:  0.40, // 400ms: Animaciones de entrada en landing (fade-in-up)
  slow:    0.60, // 600ms: Transición suave de fondos y banners
};

// Escalas Táctiles
export const PRESS_SCALE = 0.97; // Escala al pulsar botones y tarjetas interactivas
```

#### Física de Resortes (Spring Physics) Observada
* **Sidebar:** `stiffness: 350`, `damping: 30`, `mass: 0.8` ([`use-sidebar-state.tsx:16`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/hooks/use-sidebar-state.tsx#L16-L21)).
* **Ventana de Configuración / Modales:** `stiffness: 380`, `damping: 30` ([`FloatingWindow.tsx:54`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/components/settings/FloatingWindow.tsx#L54), [`CompanyFormModal.tsx:355`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/components/dashboard/companies/CompanyFormModal.tsx#L355)).

---

### 8. Capas y Z-Index

| Nivel de Z-Index | Clase / Valor | Elementos Asignados | Ubicación en Código |
| :--- | :--- | :--- | :--- |
| **z-10** | `z-10` | Wrappers de iconos, contenido dentro de tarjetas | `Input.tsx:76` |
| **z-20** | `z-20` | Botón de cambio de tema en Auth, elementos superpuestos secundarios | `auth/layout.tsx:152` |
| **z-30** | `z-30` | Botón hamburguesa móvil del Dashboard | `dashboard/layout.tsx:105` |
| **z-40** | `z-40` | Barra inferior de navegación en Onboarding, menú móvil desplegado | `onboarding/layout.tsx:88` |
| **z-50** | `z-50` | Navbar fija de marketing, Dropdown listbox interno | `MarketingLayout.tsx:129`, `Dropdown.tsx:394` |
| **z-[75]** | `z-[75]` | Menú emergente de usuario (`UserMenu`) anclado al Sidebar | `UserMenu.tsx:131` |
| **z-[90]** | `z-[90]` | Ventana flotante (`FloatingWindow`), Modales estándar (`Modal`), Tooltip portal (`CollapsedTooltip`) | `Modal.tsx:62`, `FloatingWindow.tsx:29`, `NavButton.tsx:98` |
| **z-[95]** | `z-[95]` | Modales anidados secundarios (confirmaciones de eliminación/reversión) | `Modal.tsx:36` |
| **z-9999** | `z: 9999` (inline) | Portales emergentes de `DatePicker` y `Dropdown` sobre cualquier capa | `Dropdown.tsx:387`, `DatePicker.tsx:377` |

---

### 9. Iconografía

* **Biblioteca oficial:** `lucide-react` (v1.16.0).
* **Convención de trazos (`strokeWidth`):**
  * `1.8`: Estado inactivo / default en barras de navegación y tarjetas ([`NavButton.tsx:259`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/components/ui/NavButton.tsx#L259)).
  * `2.0`: Estándar para botones, alertas y chips.
  * `2.2`: Estado activo / seleccionado en elementos de navegación ([`NavButton.tsx:259`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/components/ui/NavButton.tsx#L259)).
  * `3.0`: Indicador de verificación `Check` en tarjetas seleccionables ([`Card.tsx:88, 151`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/components/ui/Card.tsx#L88)).
* **Tamaños estándar:**
  * `14px` (`w-3.5 h-3.5`): Iconos en botones pequeños, dropdown arrows y badges.
  * `16px` – `17px`: Iconos de elementos de navegación lateral (`NavButton`, `UserMenu`).
  * `20px` – `22px`: Iconos de cabecera en tarjetas KPI y modales.
  * `24px` – `28px`: Iconos principales decorativos.

---

## D. Reglas de layout

### 1. Composición de páginas de Marketing
* **Estructura:**
  1. Header pegajoso (`sticky top-0 z-50`) con altura `h-14` (móvil) a `h-16` (escritorio), `backdrop-blur-[20px] backdrop-saturate-[180%] bg-[var(--nav-bg)]`.
  2. Contenedor central acotado a `max-w-7xl mx-auto px-4 sm:px-6`.
  3. Hero Section con `padding-top` generoso (`pt-20 md:pt-28`) y ambient radial difuminado en la parte superior:  
     `bg-[radial-gradient(58%_52%_at_50%_0%,var(--accent-soft),transparent_72%)]`.
  4. Footer de 6 columnas en escritorio (`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 sm:gap-12`) con borde superior sutil.

### 2. Composición de consola y Dashboard
* **Estructura:**
  * **Sidebar Izquierdo:** Fijado a la izquierda. En escritorio conmuta entre `64px` (contraído) y `260px` (expandido). La transición utiliza el resorte coordinado `SIDEBAR_WIDTH_SPRING`.
  * **Contenedor Principal (`main`):** El `paddingLeft` del `main` en escritorio se sincroniza automáticamente con el ancho contraído (`64px`), permitiendo que el sidebar expandido vuele sobre el área de trabajo o desplace según el modo.
  * **Área de Trabajo:** `max-w-[1400px] mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-8`.
  * **Móvil (`< 768px`):** El sidebar fijo desaparece; se presenta un botón flotante con icono `Menu` en la esquina superior izquierda (`fixed top-3 left-3 z-30 h-9 w-9`) que activa un drawer deslizante.

```
+-------------------------------------------------------------------------------+
| [Menu] (Mobile Only)                                                          |
| +----------+ +--------------------------------------------------------------+ |
| | SIDEBAR  | | DASHBOARD WORKSPACE (max-w-[1400px])                         | |
| | 64px /   | | +----------------------------------------------------------+ | |
| | 260px    | | | Header: Title + Subtitle + Action Buttons                | | |
| |          | | +----------------------------------------------------------+ | |
| | Logo     | | | KPI Grid (grid-cols-1 sm:grid-cols-2 lg:grid-cols-4)    | | |
| | NavList  | | +----------------------------------------------------------+ | |
| | UserMenu | | | Data Table / Complex Panels (Cards on mobile)            | | |
| +----------+ +--------------------------------------------------------------+ |
+-------------------------------------------------------------------------------+
```

### 3. Composición de flujo de Onboarding
* **Estructura libre de distracciones (Chrome Minimalista):**
  * Sin barra de navegación tradicional.
  * Logotipo aislado ubicado en la esquina superior izquierda (`absolute top-5 left-5 z-50`).
  * Contenedor de contenido central centrado verticalmente: `max-w-2xl text-center px-4 pt-14 pb-36`.
  * Barra de navegación inferior fija (`fixed inset-x-0 bottom-0 z-40`): grilla de 3 columnas (`grid-cols-3`):
    * Columna izquierda: Botón secundario `Atrás` (Ghost).
    * Columna central: Indicador de progreso `ProgressDots`.
    * Columna derecha: Botón principal `Continuar` o `Finalizar` (Pill Accent).

### 4. Composición de pantallas de Autenticación
* **Diseño Split Screen (Escritorio `>= 1024px`):**
  * **Panel Izquierdo Visual (45% ancho):** Fondo oscuro permanente `#0f0f10` con `colorScheme: 'dark'`. Incluye el logotipo en versión dark, citas testimoniales con carrusel automático (`5000ms`), comillas estilizadas `#0a84ff` al 40% de opacidad y esferas de brillo difuminadas (`blur-[140px]`).
  * **Panel Derecho Interactivo (55% ancho):** Fondo reactivo a temas (`bg-[var(--white)]`), botón flotante de alternancia de tema en la esquina superior derecha, y formulario centrado con ancho restringido (`max-w-md mx-auto`).
  * **Móvil (`< 1024px`):** El panel visual de testimonios se oculta por completo; se renderiza únicamente el panel de formulario ocupando el 100% de la pantalla.

---

## E. Catálogo de componentes

A continuación se documentan las 20 primitivas y componentes visuales del sistema existentes en el repositorio:

### 1. `Button`
* **Archivo:** [`apps/frontend/components/ui/Button.tsx`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/components/ui/Button.tsx)
* **Responsabilidad:** Control de acción principal, secundaria y destructiva.
* **API / Props:**
  * `variant`: `'primary'` | `'secondary'` | `'outline'` | `'ghost'` | `'danger'` (default: `'primary'`)
  * `size`: `'sm'` | `'md'` | `'lg'` (default: `'md'`)
  * `isLoading`: boolean (muestra spinner `Loader2` animado de 14px)
  * `leftIcon` / `rightIcon`: ReactNode
  * Hereda atributos nativos de `HTMLButtonElement`
* **Estilos y Dimensiones:**
  * Geometría: `rounded-full` obligatoria en todos los tamaños.
  * `size="sm"`: `h-8 px-3.5 text-xs gap-1.5 font-medium`
  * `size="md"`: `h-9.5 px-4.5 text-[13px] gap-2 font-medium`
  * `size="lg"`: `h-11 px-6 text-sm gap-2.5 font-semibold`
* **Estados:**
  * Focus: `focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--accent)]`
  * Disabled: `disabled:opacity-45 disabled:pointer-events-none`
* **Ejemplo real:**
  ```tsx
  <Button variant="primary" size="md" isLoading={submitting}>
    Guardar Comprobante
  </Button>
  ```

---

### 2. `Input`
* **Archivo:** [`apps/frontend/components/ui/Input.tsx`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/components/ui/Input.tsx)
* **Responsabilidad:** Entrada de texto, números y valores individuales del sistema Pill.
* **API / Props:**
  * `size`: `'sm'` (40px / h-10) | `'md'` (48px / h-12) (default: `'md'`)
  * `label`: string opcional (se renderiza en `text-xs font-semibold uppercase tracking-wider text-[var(--text-3)]`)
  * `helperText` / `error`: string (control de accesibilidad `aria-invalid` y `aria-describedby`)
  * `requiredBadge`: boolean (agrega asterisco rojo accesible)
  * `leftIcon` / `rightIcon`: ReactNode (ajusta padding interno `pl-11` / `pr-11`)
* **Estilos:** `rounded-full border border-[var(--border)] bg-[var(--white)] shadow-xs transition-[background-color,border-color,color,box-shadow] duration-150`
* **Estados:** Focus activo genera anillo suave: `focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent-soft)]`. Error aplica `border-[var(--red)] focus:ring-[var(--red-soft)]`.
* **Ejemplo real:**
  ```tsx
  <Input
    label="Razón Social"
    placeholder="Ej. Soluciones S.A."
    requiredBadge
    value={name}
    onChange={(e) => setName(e.target.value)}
    error={errors.name}
  />
  ```

---

### 3. `Dropdown`
* **Archivo:** [`apps/frontend/components/ui/Dropdown.tsx`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/components/ui/Dropdown.tsx)
* **Responsabilidad:** Selección única o múltiple accesible (ARIA Combobox / Listbox) con teclado completo.
* **API / Props:**
  * `options`: `DropdownOption[]` (`{ value, label, description?, disabled? }`)
  * `value`: string | string[]
  * `onChange`: `(value: string | string[]) => void`
  * `size`: `'xs'` (36px) | `'sm'` (40px) | `'md'` (48px)
  * `pill`: boolean (default: `true`, activa `rounded-full`)
  * `portal`: boolean (teletransporta el panel al body con cálculo posicional)
* **Interacción observada:**
  * Inversión automática de orientación: si el espacio inferior es inferior a 288px, se despliega hacia arriba (`openUp`).
  * Typeahead: permite escribir caracteres para saltar directamente a la opción deseada.
  * Animación origin-aware: `animate-[dropdown-panel-in_180ms_cubic-bezier(0.23,1,0.32,1)]`.
* **Ejemplo real:**
  ```tsx
  <Dropdown
    label="Régimen Tributario"
    options={SRI_REGIME_OPTIONS}
    value={regime}
    onChange={(val) => setRegime(val as string)}
  />
  ```

---

### 4. `Modal`
* **Archivo:** [`apps/frontend/components/ui/Modal.tsx`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/components/ui/Modal.tsx)
* **Responsabilidad:** Diálogos emergentes con bloqueo de scroll corporal, backdrop blur y foco atrapado.
* **API / Props:**
  * `isOpen`: boolean
  * `onClose`: `() => void`
  * `title`: string
  * `description`?: string
  * `icon`?: ReactNode
  * `size`: `'sm'` | `'md'` | `'lg'` | `'xl'` | `'2xl'` (default: `'md'`)
  * `footer`?: ReactNode
  * `plainIcon`?: boolean (default: `true`, ícono azul directo sin caja de fondo)
* **Dimensiones por Variante:**
  * `sm`: `max-w-md`
  * `md`: `max-w-lg`
  * `lg`: `max-w-2xl`
  * `xl`: `max-w-3xl`
  * `2xl`: `max-w-4xl`
* **Estilos:** Backdrop `bg-black/35 backdrop-blur-md`. Ventana: en escritorio `rounded-2xl border border-[var(--border-light)] shadow-2xl bg-[var(--white)]`, en móvil pantalla completa (`w-full h-full`).
* **Ejemplo real:**
  ```tsx
  <Modal
    isOpen={isOpen}
    onClose={handleClose}
    title="Crear Cuenta Contable"
    size="lg"
    footer={<Button onClick={handleSave}>Guardar</Button>}
  >
    <div className="space-y-4">...</div>
  </Modal>
  ```

---

### 5. `CloseButton`
* **Archivo:** [`apps/frontend/components/ui/CloseButton.tsx`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/components/ui/CloseButton.tsx)
* **Responsabilidad:** Botón unificado de cierre para modales, drawers y ventanas de diálogo.
* **Estilos:** Tamaño compacto `h-7 w-7 rounded-lg`, borde `border border-[var(--border-light)]`, color `text-[var(--text-3)] hover:text-[var(--text-1)] hover:bg-[var(--white)] shadow-2xs`.
* **Ejemplo real:**
  ```tsx
  <CloseButton onClick={onClose} aria-label="Cerrar modal" />
  ```

---

### 6. `Card`
* **Archivo:** [`apps/frontend/components/ui/Card.tsx`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/components/ui/Card.tsx)
* **Responsabilidad:** Contenedores de selección (radio o checkbox) para flujos de onboarding y opciones.
* **API / Props:**
  * `selected`: boolean
  * `selectable`: boolean (default: `true`)
  * `compact`: boolean (diseño horizontal `min-h-[44px]` para listas densas)
  * `badgeText`: string
  * `icon`: ReactNode
  * `title`: string; `description`?: string
* **Estilos:** `rounded-2xl border p-5 transition-all duration-200`. Al seleccionarse: `border-[var(--accent)] bg-[var(--accent-soft)] ring-1 ring-[var(--accent)]`.
* **Ejemplo real:**
  ```tsx
  <Card
    title="Sociedad por Acciones Simplificada (S.A.S.)"
    description="Ideal para empresas medianas y startups"
    selected={selectedType === 'SAS'}
    onClick={() => setSelectedType('SAS')}
  />
  ```

---

### 7. `Badge`
* **Archivo:** [`apps/frontend/components/ui/Badge.tsx`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/components/ui/Badge.tsx)
* **Responsabilidad:** Etiquetas visuales de estado, conteos y novedades.
* **API / Props:**
  * `variant`: `'default'` | `'accent'` | `'success'` | `'warning'` | `'outline'`
  * `size`: `'sm'` (`px-2 py-0.5 text-[10px]`) | `'md'` (`px-3 py-1 text-xs`)
* **Estilos:** `rounded-full font-medium inline-flex items-center justify-center`.
  * `accent`: `bg-[var(--accent-soft)] text-[var(--accent)] border border-[var(--accent)]/20`
  * `success`: `bg-[var(--green-soft)] text-[var(--green)] border border-[var(--green)]/20`
* **Ejemplo real:**
  ```tsx
  <Badge variant="success" size="sm">Contabilizado</Badge>
  ```

---

### 8. `Switch`
* **Archivo:** [`apps/frontend/components/ui/Switch.tsx`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/components/ui/Switch.tsx)
* **Responsabilidad:** Interruptor de activación booleana accesible (`role="switch"`).
* **Dimensiones:** Riel de `h-6 w-11 rounded-full`, perilla deslizante de `h-5 w-5 rounded-full bg-white`.
* **Transición:** `transition-transform duration-200 ease-out`. Activo: `translate-x-5 bg-[var(--accent)]`, Inactivo: `translate-x-0 bg-[var(--border)]`.
* **Ejemplo real:**
  ```tsx
  <Switch
    label="Obligado a llevar contabilidad"
    description="Según resolución vigente del SRI"
    checked={forcedAccounting}
    onCheckedChange={setForcedAccounting}
  />
  ```

---

### 9. `DatePicker`
* **Archivo:** [`apps/frontend/components/ui/DatePicker.tsx`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/components/ui/DatePicker.tsx)
* **Responsabilidad:** Selector de fecha individual y rangos de fechas bajo la localización ecuatoriana (`es-EC`).
* **Estilos:** Trigger Pill con altura `h-12` (md) o `h-10` (sm) y `rounded-full`. Panel flotante de `304px` de ancho con `rounded-2xl border border-[var(--border-light)] bg-[var(--white)] shadow-xl p-3`.
* **Navegación:** Soporte roving focus en cuadrícula con teclas de flecha, PageUp/PageDown para meses y Home/End para semanas.
* **Ejemplo real:**
  ```tsx
  <DatePicker
    value={entryDate}
    onChange={setEntryDate}
    placeholder="Seleccionar fecha contable"
  />
  ```

---

### 10. `SearchInput`
* **Archivo:** [`apps/frontend/components/ui/SearchInput.tsx`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/components/ui/SearchInput.tsx)
* **Responsabilidad:** Entrada de búsqueda con botón de limpieza (`X`), estado `loading` y tecla Escape integrada.
* **Dimensiones:**
  * `size="sm"`: `h-7.5 text-xs rounded-full`
  * `size="md"`: `h-10 text-[12.5px] rounded-full`
  * `size="lg"`: `h-10 text-[13.5px] rounded-full`
* **Ejemplo real:**
  ```tsx
  <SearchInput
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    onClear={() => setQuery('')}
    placeholder="Buscar cuentas o comprobantes..."
  />
  ```

---

### 11. `Textarea`
* **Archivo:** [`apps/frontend/components/ui/Textarea.tsx`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/components/ui/Textarea.tsx)
* **Responsabilidad:** Entrada multilínea compatible con el sistema Pill (SPEC-129).
* **Geometría única:** Radio amplio `rounded-3xl` (24px) que preserva la coherencia visual con los inputs redondeados sin distorsionar la caja de texto. `min-h-[90px] max-h-[160px] resize-none`.
* **Ejemplo real:**
  ```tsx
  <Textarea
    label="Concepto / Glosa Contable"
    placeholder="Detalle de la transacción..."
    value={concept}
    onChange={(e) => setConcept(e.target.value)}
  />
  ```

---

### 12. `NavButton`
* **Archivo:** [`apps/frontend/components/ui/NavButton.tsx`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/components/ui/NavButton.tsx)
* **Responsabilidad:** Botón unificado de navegación para el Sidebar del Dashboard y las pestañas de Configuración.
* **Características especiales:**
  * Modo colapsado: Renderiza un tooltip mediante Portal flotante en `document.body` (`CollapsedTooltip`) coordinado globalmente (retraso inicial de 120ms; navegación adyacente instantánea).
  * Estado activo: `bg-[var(--white)] text-[var(--accent)] font-semibold shadow-xs border-[var(--border-light)]`.
  * Trazo de icono: Inactivo `strokeWidth={1.8}`, Activo `strokeWidth={2.2}`.
* **Ejemplo real:**
  ```tsx
  <NavButton
    href="/dashboard/accounting"
    icon={Receipt}
    label="Contabilidad"
    collapsed={isCollapsed}
  />
  ```

---

### 13. `Avatar`
* **Archivo:** [`apps/frontend/components/ui/Avatar.tsx`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/components/ui/Avatar.tsx)
* **Responsabilidad:** Representación visual de usuarios y empresas mediante imagen o iniciales tipográficas.
* **Escala de Tamaños:**
  * `xs`: 20px (`h-5 w-5 text-[10px]`)
  * `sm`: 28px (`h-7 w-7 text-[11px]`)
  * `md`: 32px (`h-8 w-8 text-[12px]`)
  * `lg`: 36px (`h-9 w-9 text-sm`)
  * `xl`: 64px (`h-16 w-16 text-xl`)
* **Detalles:** Soporta anillo exterior (`ring-2 ring-[var(--border-light)]`) y punto indicador de estado online (`bg-[var(--green)] border-2 border-[var(--white)]`).
* **Ejemplo real:**
  ```tsx
  <Avatar initials="JB" size="sm" showStatus status="online" />
  ```

---

### 14. `KPICard`
* **Archivo:** [`apps/frontend/components/dashboard/KPICard.tsx`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/components/dashboard/KPICard.tsx)
* **Responsabilidad:** Tarjeta de métrica clave en tableros ejecutivos.
* **Estilos:** `rounded-2xl border border-[var(--border-light)] bg-[var(--white)] p-5 shadow-[var(--shadow-subtle)] hover:shadow-[var(--shadow-default)]`.
* **Paleta de Variantes de Color del Ícono:**
  * `blue`: `bg-[var(--accent-soft)] text-[var(--accent)]`
  * `green`: `bg-[var(--green-soft)] text-[var(--green)]`
  * `amber`: `bg-[var(--amber-soft)] text-[var(--amber)]`
  * `default`: `bg-[var(--off-white)] text-[var(--text-3)]`
* **Ejemplo real:**
  ```tsx
  <KPICard
    label="Ingresos Facturados (Mes)"
    value="$14,250.00"
    icon={CircleDollarSign}
    color="green"
    description="+12.4% vs mes anterior"
  />
  ```

---

### 15. `OptionSelector`
* **Archivo:** [`apps/frontend/components/onboarding/OptionSelector.tsx`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/components/onboarding/OptionSelector.tsx)
* **Responsabilidad:** Lista vertical de opciones de selección única para asistentes paso a paso.
* **Estilos:** Botones apilados con `gap-2`, bordes sutiles `border-black/[0.08]` (modo claro), seleccionada aplica `border-[var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)] ring-1 ring-[var(--accent)] font-semibold`. Soporte para teclado ARIA radiogroup con flechas.

---

### 16. `ProgressDots`
* **Archivo:** [`apps/frontend/components/onboarding/ProgressDots.tsx`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/components/onboarding/ProgressDots.tsx)
* **Responsabilidad:** Indicador minimalista de pasos.
* **Estilos:** Puntos geométricos idénticos de `h-1.5 w-1.5 rounded-full`. El paso activo adquiere `bg-[var(--accent)]`, los inactivos permanecen en `bg-[var(--border-light)]`. Sin cambios de escala para evitar oscilaciones de diseño.

---

### 17. `Cta`
* **Archivo:** [`apps/frontend/components/marketing/cta.tsx`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/components/marketing/cta.tsx)
* **Responsabilidad:** Botón de llamada a la acción para interfaces de marketing y registro.
* **Variantes:**
  * `primary`: `bg-[var(--accent)] text-white shadow-[0_4px_24px_rgba(0,113,227,0.25)] hover:-translate-y-[1px]`
  * `ghost`: `border border-[var(--border-light)] text-[var(--text-2)] hover:bg-[var(--off-white)]`
  * `white`: `bg-[var(--cta-bg)] text-[var(--cta-text)]`
* **Dimensiones:** `rounded-full font-semibold`. `sm` (px-5 py-2.5), `md` (px-7 py-3), `lg` (px-8 py-3.5). Efecto táctil `active:scale-95`.

---

### 18. `Logo`
* **Archivo:** [`apps/frontend/components/Logo.tsx`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/components/Logo.tsx)
* **Responsabilidad:** Renderizado pixel-perfect de la identidad corporativa según el tema activo.
* **Lógica de assets:**
  * Si `showText: true`: `aspectRatio: '180 / 24'`. Dark mode carga `/branding/logo-light.svg`, Light mode carga `/branding/logo.svg`.
  * Si `showText: false`: `aspectRatio: '1 / 1'`. Dark mode carga `/branding/icon-light.svg`, Light mode carga `/branding/icon.svg`.
  * Renderizado nítido forzado: `imageRendering: 'crisp-edges'`.

---

### 19. `WorkspaceSwitcher`
* **Archivo:** [`apps/frontend/components/dashboard/companies/WorkspaceSwitcher.tsx`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/components/dashboard/companies/WorkspaceSwitcher.tsx)
* **Responsabilidad:** Selector desplegable de empresas activas en el Sidebar con soporte multi-tenancy.
* **Comportamiento:** En modo colapsado renderiza un avatar centrado con el tooltip flotante unificado. Al abrirse, despliega una lista filtrable de empresas con cálculo de altura dinámico (hasta 288px) y botón directo para invitar miembros o crear empresas.

---

### 20. `UserMenu`
* **Archivo:** [`apps/frontend/components/dashboard/UserMenu.tsx`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/components/dashboard/UserMenu.tsx)
* **Responsabilidad:** Menú de cuenta anclado en la parte inferior del Sidebar.
* **Estilos:** Gatillo con avatar y nombre. Al abrirse despliega una tarjeta flotante (`z-[75] rounded-2xl border border-[var(--border-light)] bg-[var(--white)] shadow-[var(--shadow-prominent)]`) con accesos directos al perfil, mejorar plan (`Sparkles`), empresas, ventana de configuración y cierre de sesión.

---

## F. Patrones de páginas y flujos

### 1. Páginas de Marketing & Precios
* **Patrón de Hero Section:** Título en Instrument Serif (`text-[clamp(2.6rem,5.5vw,5rem)]`) con un énfasis en cursiva acentuado (`<em className="italic font-normal text-[var(--accent)]">Sin digitación.</em>`), acompañado de un mockup interactivo en vivo (`AiChatMockup`) que demuestra el valor del producto sin requerir registro.
* **Patrón de Tabla de Precios:**
  * Toggle central de facturación Mensual / Anual con badge "2 meses gratis".
  * Tarjetas con `rounded-[24px]`. La opción recomendada (`Professional`) destaca con `border-2 border-[var(--accent)] shadow-[var(--shadow-default)]` y badge superior flotante "Más elegido".
  * Las transiciones de precios numéricos entre mensual y anual utilizan `AnimatePresence` con desplazamiento vertical (`y: 8 → y: 0`).

### 2. Tablas de Datos Financieros y Auditoría
* **Arquitectura Adaptativa Dual:**
  1. **Dispositivos Móviles (`< 640px`):** Se renderiza un listado de tarjetas compactas apiladas (`divide-y divide-[var(--border-light)]`) donde cada fila se desglosa en una vista legible de clave-valor. El estado de carga se representa mediante `SkeletonCard`.
  2. **Escritorio (`>= 640px`):** Tabla HTML canónica (`<table className="w-full border-collapse">`), con cabecera en `var(--off-white)`, texto en mayúsculas pequeñas `text-[11px] uppercase tracking-[0.08em] text-[var(--text-4)]`, y filas de altura compacta (`px-4 py-2.5`) con hover suave `hover:bg-[var(--off-white)]/60`.
* **Celdas Criptográficas:** Las cadenas de hashes y códigos fiscales muestran los primeros 8 caracteres seguidos de elipsis (`hash.slice(0, 8)…`) y cuentan con un botón microinteractivo de copia al portapapeles que conmuta el icono `Copy` por `Check` verde durante 1500ms.

### 3. Drawers de Detalle Lateral
* **Implementación:** [`JournalDetailDrawer.tsx`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/components/dashboard/accounting/JournalDetailDrawer.tsx) e [`InvoiceDetailDrawer.tsx`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/components/dashboard/invoicing/InvoiceDetailDrawer.tsx).
* **Física:** Entran desde la derecha con `x: '100%' → x: 0` mediante resorte `transition={{ type: 'spring', bounce: 0, duration: 0.35 }}`.
* **Dimensiones:** Ancho máximo unificado `max-w-xl` (576px), `border-l border-[var(--border-light)] shadow-2xl bg-[var(--white)]`.
* **Contenido:** Header fijo con tipografía monoespaciada para el número de comprobante, badge de estado, cuadrícula de metadatos fiscales a 2 columnas (`bg-[var(--off-white)]/60 rounded-2xl`), y tabla interna de débito/crédito con scroll interno aislado (`overscroll-contain`).

### 4. Ventana Flotante de Configuración (`FloatingWindow`)
* **Implementación:** [`FloatingWindow.tsx`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/components/settings/FloatingWindow.tsx).
* **Concepto:** Diálogo modal estilo macOS inspirado en las preferencias del sistema.
* **Layout Interno:** Barra superior fija de `h-12` con icono `Sliders` y `CloseButton`. El cuerpo se divide en un sidebar vertical izquierdo con `NavButtons` (`cuenta`, `general`, `seguridad`, `facturación`) y un área principal derecha scrollable (`max-w-2xl mx-auto`).

---

## G. Comportamiento e interacción

### 1. Sistema de Notificaciones (Toasts con Sonner)
ContaMind AI rediseña la biblioteca `sonner` mediante CSS puro en [`globals.css:377-491`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/app/globals.css#L377-L491):
* **Superficie:** `rgba(255, 255, 255, 0.85)` (oscuro: `rgba(18, 18, 20, 0.8)`), desenfoque `backdrop-filter: blur(20px) saturate(190%)`, radio de `14px`, borde `1px solid rgba(224, 224, 229, 0.6)`.
* **Micro-Lift:** Al pasar el ratón (`:hover`), la tarjeta se eleva sutilmente con `transform: translateY(-2px) scale(1.01)` y el borde se ilumina hacia el acento `rgba(0, 113, 227, 0.25)`.
* **Iconos Contextuales:** Contenedor cuadrado con esquinas redondeadas de `28x28px` con radio `9px`:
  * Éxito: fondo `var(--green-soft)` con ícono `var(--green)`.
  * Error: fondo `var(--red-soft)` con ícono `var(--red)`.
  * Advertencia: fondo `var(--amber-soft)` con ícono `var(--amber)`.
  * Info: fondo `var(--accent-soft)` con ícono `var(--accent)`.
* **Botón de Cierre:** Oculto expresamente (`display: none !important`) para un acabado minimalista.

### 2. Barras de Desplazamiento Personalizadas (`.custom-scrollbar`)
* **Anchura:** 5px tanto horizontal como verticalmente.
* **Pista (Track):** Transparente en todos los estados.
* **Control deslizante (Thumb):** `background: var(--border)`, radio completo `9999px`. En hover cambia a `var(--text-4)`.
* **Firefox:** Soportado mediante `scrollbar-width: thin` y `scrollbar-color: var(--border) transparent`.

### 3. Foco Visible y Navegación por Teclado
* Todo elemento interactivo posee la regla global `*:focus-visible { outline-offset: 2px; }`.
* Los inputs y botones aplican anillos de foco accesibles:  
  `focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--white)]`.
* Se implementa manejo de teclado completo en selectores y dropdowns: flechas arriba/abajo para navegar, Enter/Espacio para seleccionar, Escape para cerrar y Home/End para extremos.

---

## H. Convenciones de implementación

Para mantener la coherencia del repositorio, cualquier nuevo desarrollo debe cumplir las siguientes convenciones:

### 1. Composición de Clases con `cn()`
* Todo componente debe utilizar obligatoriamente la utilidad `cn(...)` definida en [`apps/frontend/lib/utils.ts`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/lib/utils.ts), que combina `clsx` y `tailwind-merge` para evitar conflictos de clases Tailwind.

### 2. Consumo de Tokens CSS vs. Valores Arbitrarios
* **Obligatorio:** Utilizar tokens de variables CSS definidos en `@theme`:  
  `bg-[var(--white)]`, `text-[var(--text-1)]`, `border-[var(--border)]`, `bg-[var(--accent)]`.
* **Prohibido:** Utilizar clases de color estándar de Tailwind desligadas del sistema de temas (como `bg-blue-600`, `text-gray-900` o `bg-zinc-800`), salvo en casos documentados de compatibilidad externa.

### 3. Contención de Desplazamiento (`overscroll-contain`)
* Todos los paneles modales, drawers y menús desplegables con scroll interno deben incluir la propiedad CSS `overscroll-contain` y la clase utilitaria `.custom-scrollbar`. Esto previene el rebote o scroll no deseado del documento padre de fondo (scroll chaining).

### 4. Regla de Renderizado Nítido (`crisp-edges`)
* Toda imagen SVG de marca, logo o avatar debe aplicar `imageRendering: 'crisp-edges'` y dimensiones enteras (Math.round) para evitar el desenfoque por subpíxeles en pantallas de alta densidad (Retina).

---

## I. Replicación en otras aplicaciones de StarMind AI

Para construir nuevos productos bajo la marca **StarMind AI**, se establece la siguiente arquitectura de componentes y decisiones:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. SHARED CORE (Reutilización Universal e Inmutable)                        │
│    · Archivo base de tokens: @theme en Tailwind CSS v4 + globals.css        │
│    · Fuentes: Instrument Serif (editorial) + Geist Sans (funcional)        │
│    · Primitivas UI: Button, Input, Dropdown, Modal, CloseButton, Switch,   │
│      Badge, DatePicker, SearchInput, Avatar                                 │
│    · Fórmulas de movimiento: motion-tokens.ts (EASE_OUT, DURATIONS, PRESS)  │
│    · Estilos de Toast Sonner y .custom-scrollbar                            │
│    · ThemeProvider con soporte Dark Mode y High Contrast                    │
├─────────────────────────────────────────────────────────────────────────────┤
│ 2. CONFIGURABLE (Parametrizable por Producto sin Romper Consistencia)       │
│    · Color de acento primario: --accent y --accent-soft                     │
│      (ContaMind = Azul #0071e3; otra app médica/legal = Verde o Púrpura)    │
│    · Logotipos y nombres de producto en Logo.tsx                            │
│    · Rutas del menú y secciones en nav-config.ts                            │
│    · Moneda, zona horaria e idioma base en ThemeProvider                    │
├─────────────────────────────────────────────────────────────────────────────┤
│ 3. PRODUCT-SPECIFIC (Exclusivo de ContaMind AI - No Replicar en Core)      │
│    · Validaciones de RUC / SRI ecuatoriano                                  │
│    · Catálogo contable NIIF, comprobantes de diario y asientos de retención │
│    · Mockups de chat financiero (`AiChatMockup`)                            │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Procedimiento para iniciar una nueva aplicación de StarMind AI:
1. **Configurar Tipografía:** Cargar `Instrument_Serif` desde `next/font/google` y `GeistSans` desde `geist/font/sans`.
2. **Copiar Base de Estilos:** Incorporar `globals.css` (eliminando únicamente las reglas específicas de SRI si no aplican).
3. **Instalar Dependencias de UI:** `motion` (v12+), `lucide-react`, `sonner`, `clsx`, `tailwind-merge`.
4. **Adoptar Primitivas:** Copiar la carpeta `components/ui/` íntegra para asegurar que los inputs cumplan el estándar Pill de forma nativa.
5. **Configurar el Shell:** Envolver la aplicación con `ThemeProvider` para garantizar la persistencia del tema y la accesibilidad.

---

## J. Checklist de implementación

Lista de verificación para validar una nueva pantalla o producto:

- [ ] **Identidad:** ¿El logotipo utiliza `Logo.tsx` con soporte para variantes de tema claro/oscuro y `crisp-edges`?
- [ ] **Tipografía:** ¿Los títulos principales (`h1`, `h2`) utilizan `font-serif` (`Instrument Serif`)? ¿El cuerpo y UI usan `font-sans` (`Geist Sans`)? ¿Los números y montos usan `font-mono`?
- [ ] **Tokens:** ¿Todos los colores de fondo, texto y bordes provienen de variables CSS `var(--...)`?
- [ ] **Sistema Pill:** ¿Los inputs, dropdowns, buscadores y botones tienen `rounded-full` (`--radius-full`) y alturas `h-12` o `h-10`?
- [ ] **Textareas:** ¿Los campos multilínea utilizan la excepción formal `rounded-3xl`?
- [ ] **Estados Activos:** ¿Los botones y tarjetas interactivas responden con `active:scale-[0.97]` o `active:scale-95`?
- [ ] **Foco:** ¿El foco por teclado es visible con `focus-visible:ring-2` y offset?
- [ ] **Animaciones:** ¿Todas las animaciones utilizan `cubic-bezier(0.23, 1, 0.32, 1)` y duran menos de 300ms?
- [ ] **Reduced Motion:** ¿Existe la condición `useReducedMotion()` para degradar el movimiento a opacidad pura cuando el usuario lo configure?
- [ ] **Tablas:** ¿La tabla se convierte en tarjetas apiladas en pantallas de menos de 640px?
- [ ] **Modales & Drawers:** ¿Cuentan con backdrop `bg-black/35 backdrop-blur-md`, bloqueo de scroll y tecla `Escape`?
- [ ] **Scroll Interno:** ¿Los contenedores desplazables usan `.custom-scrollbar` y `overscroll-contain`?
- [ ] **Alto Contraste:** ¿La interfaz sigue siendo legible al activar la clase `.high-contrast`?

---

## K. Deuda de diseño e inconsistencias observadas

Durante la auditoría del frontend se identificaron las siguientes inconsistencias y deudas técnicas que deben ser atendidas en futuros ciclos:

### 1. Tokens Huérfanos / No Definidos en `globals.css` (Severidad: Alta)
* **Hallazgo:** Múltiples componentes referencian variables CSS que no existen en `globals.css`:
  * `var(--bg-base)`: Utilizado en [`apps/frontend/app/dashboard/layout.tsx:78, 95`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/app/dashboard/layout.tsx#L78) para el fondo principal del Dashboard. Al no existir, el navegador recurre a fondo transparente. Debería reemplazarse por `var(--white)` o `var(--off-white)`.
  * `var(--error)` y `var(--error-bg)`: Utilizados en [`CompanyFormModal.tsx:385`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/components/dashboard/companies/CompanyFormModal.tsx#L385) y [`dashboard/companies/page.tsx:238`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/app/dashboard/companies/page.tsx#L238). En el sistema oficial, los tokens de error son `var(--red)` y `var(--red-soft)`.
  * `var(--amber-text)`: Utilizado en [`JournalDetailDrawer.tsx:155`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/components/dashboard/accounting/JournalDetailDrawer.tsx#L155). No existe en `globals.css`.

### 2. Duplicación de Lógica en Modales (Severidad: Media)
* **Hallazgo:** [`CompanyFormModal.tsx`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/components/dashboard/companies/CompanyFormModal.tsx) reimplementa de manera independiente la estructura de diálogo, backdrop, listeners de Escape y cálculo de scroll en lugar de componer sobre la primitiva compartida [`Modal.tsx`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/components/ui/Modal.tsx).

### 3. Valores Hardcodeados en Autenticación (Severidad: Baja)
* **Hallazgo:** [`apps/frontend/app/auth/layout.tsx`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/app/auth/layout.tsx#L46-L50) utiliza valores fijos en línea como `#0f0f10`, `#0a84ff` y `rgba(255,255,255,0.05)` en lugar de utilizar variables semánticas o extender el tema oscuro.

### 4. Variación en Radios de Tarjetas de Marketing (Severidad: Baja)
* **Hallazgo:** Mientras que los componentes de UI utilizan `rounded-2xl` (18px) o `rounded-full`, algunas secciones de marketing utilizan clases ad-hoc como `rounded-[24px]` y `rounded-[20px]`. Se recomienda estandarizar a `rounded-2xl` y `rounded-3xl`.

---

## L. Referencias al código

| Concepto / Componente | Archivo Fuente en el Repositorio |
| :--- | :--- |
| **Tokens CSS & Tema Tailwind 4** | [`apps/frontend/app/globals.css`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/app/globals.css) |
| **Configuración de Fuentes y Shell** | [`apps/frontend/app/layout.tsx`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/app/layout.tsx) |
| **Tokens de Movimiento & Animación** | [`apps/frontend/components/marketing/motion-tokens.ts`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/components/marketing/motion-tokens.ts) |
| **Proveedor de Temas y Accesibilidad**| [`apps/frontend/components/ThemeProvider.tsx`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/components/ThemeProvider.tsx) |
| **Primitiva de Botón** | [`apps/frontend/components/ui/Button.tsx`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/components/ui/Button.tsx) |
| **Primitiva de Input** | [`apps/frontend/components/ui/Input.tsx`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/components/ui/Input.tsx) |
| **Primitiva de Dropdown** | [`apps/frontend/components/ui/Dropdown.tsx`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/components/ui/Dropdown.tsx) |
| **Primitiva de Modal** | [`apps/frontend/components/ui/Modal.tsx`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/components/ui/Modal.tsx) |
| **Primitiva de DatePicker** | [`apps/frontend/components/ui/DatePicker.tsx`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/components/ui/DatePicker.tsx) |
| **Primitiva de NavButton** | [`apps/frontend/components/ui/NavButton.tsx`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/components/ui/NavButton.tsx) |
| **Primitiva de Avatar** | [`apps/frontend/components/ui/Avatar.tsx`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/components/ui/Avatar.tsx) |
| **Logotipo y Marca** | [`apps/frontend/components/Logo.tsx`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/components/Logo.tsx) y [`packages/branding/`](file:///home/juxnbernxrdo/Documentos/contamind/packages/branding/) |
| **Layout del Dashboard** | [`apps/frontend/app/dashboard/layout.tsx`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/app/dashboard/layout.tsx) |
| **Sidebar del Dashboard** | [`apps/frontend/components/dashboard/Sidebar.tsx`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/components/dashboard/Sidebar.tsx) |
| **Layout de Marketing** | [`apps/frontend/components/MarketingLayout.tsx`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/components/MarketingLayout.tsx) |
| **Layout de Autenticación** | [`apps/frontend/app/auth/layout.tsx`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/app/auth/layout.tsx) |
| **Layout de Onboarding** | [`apps/frontend/app/onboarding/layout.tsx`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/app/onboarding/layout.tsx) |
| **Ventana de Configuración** | [`apps/frontend/components/settings/FloatingWindow.tsx`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/components/settings/FloatingWindow.tsx) |
| **Drawer de Comprobantes** | [`apps/frontend/components/dashboard/accounting/JournalDetailDrawer.tsx`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/components/dashboard/accounting/JournalDetailDrawer.tsx) |
| **Tabla de Auditoría** | [`apps/frontend/components/auth-enterprise/audit/audit-log-table.tsx`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/components/auth-enterprise/audit/audit-log-table.tsx) |
| **Registro Canónico de Títulos** | [`apps/frontend/lib/page-titles.ts`](file:///home/juxnbernxrdo/Documentos/contamind/apps/frontend/lib/page-titles.ts) |

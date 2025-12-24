# Design Tokens - Capa Semántica (Layer 2)

Esta es la capa de tokens semánticos que define el **propósito** de cada color en la aplicación, independiente de los valores específicos que asigne el diseñador.

## 1. Background & Surface (Fondos)

Define los diferentes niveles de profundidad y jerarquía visual de fondos.

```css
--color-background-primary      /* Fondo principal de la aplicación */
--color-background-secondary    /* Fondos secundarios (cards, paneles) */
--color-background-tertiary     /* Fondos terciarios (áreas de menos énfasis) */
--color-surface-raised          /* Elementos elevados (modals, dropdowns, popovers) */
--color-surface-overlay         /* Overlay/backdrop para modals */
--color-surface-sunken          /* Áreas hundidas (inputs, wells) */
--color-surface-inverse         /* Fondos inversos (dark mode toggle) */
```

## 2. Text & Foreground (Textos)

Define la jerarquía y estados del texto.

```css
--color-text-primary            /* Texto principal, mayor contraste */
--color-text-secondary          /* Texto secundario, menor énfasis */
--color-text-tertiary           /* Texto terciario, mínimo énfasis */
--color-text-disabled           /* Texto deshabilitado */
--color-text-placeholder        /* Placeholders en inputs */
--color-text-inverse            /* Texto sobre fondos oscuros/brand */
--color-text-link               /* Enlaces de texto */
--color-text-link-hover         /* Enlaces en hover */
--color-text-link-visited       /* Enlaces visitados (opcional) */
```

## 3. Borders & Dividers (Bordes y Separadores)

Define los bordes y líneas de separación.

```css
--color-border-default          /* Bordes estándar */
--color-border-subtle           /* Bordes sutiles, bajo contraste */
--color-border-strong           /* Bordes con mayor contraste */
--color-border-interactive      /* Bordes de elementos interactivos */
--color-border-focus            /* Borde de focus/outline (a11y) */
--color-border-error            /* Bordes de error en validación */
--color-divider                 /* Líneas divisoras (hr, separadores) */
```

## 4. Interactive States (Estados Interactivos)

Define los estados de elementos interactivos (botones, links, inputs).

```css
--color-interactive-default     /* Estado normal/reposo */
--color-interactive-hover       /* Estado hover */
--color-interactive-active      /* Estado pressed/activo */
--color-interactive-focus       /* Estado focus (a11y) */
--color-interactive-disabled    /* Estado deshabilitado */
--color-interactive-visited     /* Estado visitado (links) */
```

## 5. Semantic Feedback (Retroalimentación Semántica)

Define colores para mensajes y estados del sistema.

```css
--color-success                 /* Operaciones exitosas */
--color-success-subtle          /* Fondo sutil para mensajes de éxito */
--color-success-emphasis        /* Texto/íconos de éxito */

--color-warning                 /* Advertencias */
--color-warning-subtle          /* Fondo sutil para advertencias */
--color-warning-emphasis        /* Texto/íconos de advertencia */

--color-error                   /* Errores, acciones destructivas */
--color-error-subtle            /* Fondo sutil para errores */
--color-error-emphasis          /* Texto/íconos de error */

--color-info                    /* Información neutral */
--color-info-subtle             /* Fondo sutil para información */
--color-info-emphasis           /* Texto/íconos informativos */
```

## 6. Brand & Accent (Marca y Acentos)

Define los colores de identidad de marca.

```css
--color-brand-primary           /* Color principal de marca */
--color-brand-primary-hover     /* Hover del color primario */
--color-brand-primary-active    /* Active del color primario */
--color-brand-secondary         /* Color secundario de marca */
--color-brand-tertiary          /* Color terciario (si aplica) */
--color-accent                  /* Color de acento/highlight */
--color-accent-subtle           /* Versión sutil del acento */
```

## 7. Shadows & Elevation (Sombras y Elevación)

Define los niveles de elevación visual (opcional pero recomendado).

```css
--color-shadow-small            /* Sombra para elevación mínima */
--color-shadow-medium           /* Sombra para elevación media */
--color-shadow-large            /* Sombra para elevación alta */
--color-shadow-overlay          /* Sombra para overlays/modals */
```

## 8. Data Visualization (Visualización de Datos)

Si tu aplicación incluye gráficos, charts o dashboards (opcional).

```css
--color-chart-1                 /* Primer color de gráficos */
--color-chart-2                 /* Segundo color de gráficos */
--color-chart-3                 /* Tercer color de gráficos */
--color-chart-4                 /* Cuarto color de gráficos */
--color-chart-5                 /* Quinto color de gráficos */
--color-chart-positive          /* Valores positivos (ej: ganancias) */
--color-chart-negative          /* Valores negativos (ej: pérdidas) */
--color-chart-neutral           /* Valores neutrales */
```

---

## Resumen de Cantidad de Tokens

- **Background & Surface**: 7 tokens
- **Text & Foreground**: 9 tokens
- **Borders & Dividers**: 7 tokens
- **Interactive States**: 6 tokens
- **Semantic Feedback**: 12 tokens (4 tipos × 3 variantes)
- **Brand & Accent**: 7 tokens
- **Shadows & Elevation**: 4 tokens (opcional)
- **Data Visualization**: 8 tokens (opcional)

**Total: 48-60 tokens semánticos** (dependiendo si incluyes sombras y visualización de datos)

---

## Notas Importantes

1. **No todos son obligatorios**: Empieza con los tokens que realmente necesitas en tu proyecto
2. **Expansible**: Puedes agregar más según las necesidades específicas de tu diseñador
3. **Independiente de valores**: Estos nombres son el "qué" (propósito), no el "cómo" (color específico)
4. **Mapeo flexible**: Un token primitivo puede mapear a múltiples tokens semánticos
5. **Dark mode**: Estos mismos tokens se reasignan a diferentes primitives en modo oscuro

---

## Ejemplo de Mapeo

```css
/* primitives.css - CAPA 1 */
--primitive-blue-900: 193 60% 19%;
--primitive-cyan-50: 192 48% 94%;
--primitive-gray-700: 220 9% 46%;

/* semantic.css - CAPA 2 */
--color-background-primary: var(--primitive-cyan-50);
--color-text-primary: var(--primitive-blue-900);
--color-brand-primary: var(--primitive-blue-900);
--color-border-default: var(--primitive-gray-700);

/* components.css - CAPA 3 */
--button-bg: var(--color-brand-primary);
--button-text: var(--color-text-inverse);
--card-border: var(--color-border-subtle);
```

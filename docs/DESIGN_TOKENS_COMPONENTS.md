# Design Tokens - Capa de Componentes (Layer 3)

Esta es la capa de tokens específicos de componentes que define los **estilos concretos** de cada elemento de la UI. 

Esta capa puede:
- ✅ Referenciar tokens de la Capa 2 (Semántica)
- ✅ Hacer bypass a la Capa 1 (Primitives) cuando el diseñador lo requiera
- ✅ Combinar múltiples tokens semánticos
- ✅ Agregar opacidad/transparencia

---

## 1. Button Tokens

Tokens para todas las variantes de botones.

### Button Primary (Principal)

```css
/* Background */
--button-primary-bg: var(--color-brand-primary);
--button-primary-bg-hover: var(--color-brand-primary-hover);
--button-primary-bg-active: var(--color-brand-primary-active);
--button-primary-bg-disabled: var(--color-interactive-disabled);

/* Text */
--button-primary-text: var(--color-text-inverse);
--button-primary-text-hover: var(--color-text-inverse);
--button-primary-text-disabled: var(--color-text-disabled);

/* Border */
--button-primary-border: var(--color-brand-primary);
--button-primary-border-hover: var(--color-brand-primary-hover);
--button-primary-border-focus: var(--color-border-focus);
--button-primary-border-disabled: transparent;

/* Shadow */
--button-primary-shadow: var(--color-shadow-small);
--button-primary-shadow-hover: var(--color-shadow-medium);
```

### Button Secondary (Secundario)

```css
/* Background */
--button-secondary-bg: transparent;
--button-secondary-bg-hover: var(--color-background-secondary);
--button-secondary-bg-active: var(--color-background-tertiary);
--button-secondary-bg-disabled: transparent;

/* Text */
--button-secondary-text: var(--color-brand-primary);
--button-secondary-text-hover: var(--color-brand-primary-hover);
--button-secondary-text-disabled: var(--color-text-disabled);

/* Border */
--button-secondary-border: var(--color-brand-primary);
--button-secondary-border-hover: var(--color-brand-primary-hover);
--button-secondary-border-focus: var(--color-border-focus);
--button-secondary-border-disabled: var(--color-border-subtle);
```

### Button Destructive (Destructivo)

```css
/* Background */
--button-destructive-bg: var(--color-error);
--button-destructive-bg-hover: var(--color-error); /* con opacity en uso */
--button-destructive-bg-active: var(--color-error);
--button-destructive-bg-disabled: var(--color-interactive-disabled);

/* Text */
--button-destructive-text: var(--color-text-inverse);
--button-destructive-text-hover: var(--color-text-inverse);
--button-destructive-text-disabled: var(--color-text-disabled);

/* Border */
--button-destructive-border: var(--color-error);
--button-destructive-border-hover: var(--color-error);
--button-destructive-border-focus: var(--color-border-focus);
--button-destructive-border-disabled: transparent;
```

### Button Ghost (Fantasma)

```css
/* Background */
--button-ghost-bg: transparent;
--button-ghost-bg-hover: var(--color-background-secondary);
--button-ghost-bg-active: var(--color-background-tertiary);
--button-ghost-bg-disabled: transparent;

/* Text */
--button-ghost-text: var(--color-text-primary);
--button-ghost-text-hover: var(--color-text-primary);
--button-ghost-text-disabled: var(--color-text-disabled);

/* Border */
--button-ghost-border: transparent;
--button-ghost-border-hover: transparent;
--button-ghost-border-focus: var(--color-border-focus);
```

### Button Link (Enlace)

```css
/* Background */
--button-link-bg: transparent;
--button-link-bg-hover: transparent;

/* Text */
--button-link-text: var(--color-text-link);
--button-link-text-hover: var(--color-text-link-hover);
--button-link-text-disabled: var(--color-text-disabled);

/* Border */
--button-link-border: transparent;
--button-link-border-focus: var(--color-border-focus);
```

---

## 2. Input Tokens

Tokens para campos de entrada (text, email, password, textarea, etc.).

```css
/* Background */
--input-bg: var(--color-surface-sunken);
--input-bg-hover: var(--color-surface-sunken);
--input-bg-focus: var(--color-background-primary);
--input-bg-disabled: var(--color-background-tertiary);
--input-bg-readonly: var(--color-background-secondary);
--input-bg-error: var(--color-error-subtle);

/* Text */
--input-text: var(--color-text-primary);
--input-text-disabled: var(--color-text-disabled);
--input-text-placeholder: var(--color-text-placeholder);
--input-text-error: var(--color-text-primary);

/* Border */
--input-border: var(--color-border-default);
--input-border-hover: var(--color-border-interactive);
--input-border-focus: var(--color-border-focus);
--input-border-error: var(--color-border-error);
--input-border-disabled: var(--color-border-subtle);

/* Label */
--input-label: var(--color-text-secondary);
--input-label-focus: var(--color-text-primary);
--input-label-disabled: var(--color-text-disabled);
--input-label-error: var(--color-error-emphasis);

/* Helper Text */
--input-helper-text: var(--color-text-tertiary);
--input-error-text: var(--color-error-emphasis);

/* Icons */
--input-icon: var(--color-text-secondary);
--input-icon-hover: var(--color-text-primary);
--input-icon-disabled: var(--color-text-disabled);
```

---

## 3. Select/Dropdown Tokens

```css
/* Background */
--select-bg: var(--color-surface-sunken);
--select-bg-hover: var(--color-surface-sunken);
--select-bg-focus: var(--color-background-primary);
--select-bg-disabled: var(--color-background-tertiary);

/* Text */
--select-text: var(--color-text-primary);
--select-text-disabled: var(--color-text-disabled);
--select-text-placeholder: var(--color-text-placeholder);

/* Border */
--select-border: var(--color-border-default);
--select-border-hover: var(--color-border-interactive);
--select-border-focus: var(--color-border-focus);
--select-border-disabled: var(--color-border-subtle);

/* Dropdown Menu */
--select-menu-bg: var(--color-surface-raised);
--select-menu-border: var(--color-border-default);
--select-menu-shadow: var(--color-shadow-medium);

/* Options */
--select-option-text: var(--color-text-primary);
--select-option-bg-hover: var(--color-background-secondary);
--select-option-bg-selected: var(--color-brand-primary);
--select-option-text-selected: var(--color-text-inverse);

/* Icon */
--select-icon: var(--color-text-secondary);
--select-icon-disabled: var(--color-text-disabled);
```

---

## 4. Checkbox & Radio Tokens

```css
/* Background */
--checkbox-bg: var(--color-background-primary);
--checkbox-bg-hover: var(--color-background-secondary);
--checkbox-bg-checked: var(--color-brand-primary);
--checkbox-bg-disabled: var(--color-background-tertiary);

/* Border */
--checkbox-border: var(--color-border-default);
--checkbox-border-hover: var(--color-border-interactive);
--checkbox-border-checked: var(--color-brand-primary);
--checkbox-border-focus: var(--color-border-focus);
--checkbox-border-disabled: var(--color-border-subtle);

/* Check/Radio Mark */
--checkbox-mark: var(--color-text-inverse);
--checkbox-mark-disabled: var(--color-text-disabled);

/* Label */
--checkbox-label: var(--color-text-primary);
--checkbox-label-disabled: var(--color-text-disabled);
```

---

## 5. Card Tokens

```css
/* Background */
--card-bg: var(--color-background-secondary);
--card-bg-hover: var(--color-background-secondary); /* con opacity si se necesita */

/* Border */
--card-border: var(--color-border-subtle);
--card-border-hover: var(--color-border-default);

/* Shadow */
--card-shadow: var(--color-shadow-small);
--card-shadow-hover: var(--color-shadow-medium);

/* Header */
--card-header-bg: var(--color-background-secondary);
--card-header-border: var(--color-border-subtle);
--card-header-text: var(--color-text-primary);

/* Footer */
--card-footer-bg: var(--color-background-tertiary);
--card-footer-border: var(--color-border-subtle);
--card-footer-text: var(--color-text-secondary);
```

---

## 6. Modal/Dialog Tokens

```css
/* Overlay/Backdrop */
--modal-overlay-bg: var(--color-surface-overlay);

/* Modal Container */
--modal-bg: var(--color-surface-raised);
--modal-border: var(--color-border-default);
--modal-shadow: var(--color-shadow-overlay);

/* Header */
--modal-header-bg: var(--color-background-primary);
--modal-header-border: var(--color-border-subtle);
--modal-header-text: var(--color-text-primary);

/* Body */
--modal-body-bg: var(--color-background-primary);
--modal-body-text: var(--color-text-primary);

/* Footer */
--modal-footer-bg: var(--color-background-secondary);
--modal-footer-border: var(--color-border-subtle);

/* Close Button */
--modal-close-text: var(--color-text-secondary);
--modal-close-text-hover: var(--color-text-primary);
--modal-close-bg-hover: var(--color-background-secondary);
```

---

## 7. Table Tokens

```css
/* Background */
--table-bg: var(--color-background-primary);
--table-row-bg-hover: var(--color-background-secondary);
--table-row-bg-selected: var(--color-background-tertiary);
--table-row-bg-striped: var(--color-background-secondary); /* para tablas zebra */

/* Border */
--table-border: var(--color-border-subtle);
--table-border-strong: var(--color-border-default);

/* Header */
--table-header-bg: var(--color-background-tertiary);
--table-header-text: var(--color-text-secondary);
--table-header-border: var(--color-border-default);

/* Cell */
--table-cell-text: var(--color-text-primary);
--table-cell-border: var(--color-border-subtle);

/* Footer */
--table-footer-bg: var(--color-background-tertiary);
--table-footer-text: var(--color-text-secondary);
```

---

## 8. Navigation Tokens

### Nav Main (Navegación Principal)

```css
/* Background */
--nav-bg: var(--color-background-primary);
--nav-border: var(--color-border-subtle);

/* Nav Items */
--nav-item-text: var(--color-text-primary);
--nav-item-text-hover: var(--color-text-primary);
--nav-item-text-active: var(--color-brand-primary);

--nav-item-bg: transparent;
--nav-item-bg-hover: var(--color-background-secondary);
--nav-item-bg-active: var(--color-background-tertiary);

--nav-item-border-active: var(--color-brand-primary);

/* Nav Icons */
--nav-icon: var(--color-text-secondary);
--nav-icon-hover: var(--color-text-primary);
--nav-icon-active: var(--color-brand-primary);
```

### Breadcrumb

```css
--breadcrumb-text: var(--color-text-secondary);
--breadcrumb-text-hover: var(--color-text-primary);
--breadcrumb-text-active: var(--color-text-primary);
--breadcrumb-separator: var(--color-text-tertiary);
```

### Pagination

```css
/* Background */
--pagination-item-bg: transparent;
--pagination-item-bg-hover: var(--color-background-secondary);
--pagination-item-bg-active: var(--color-brand-primary);
--pagination-item-bg-disabled: transparent;

/* Text */
--pagination-item-text: var(--color-text-primary);
--pagination-item-text-hover: var(--color-text-primary);
--pagination-item-text-active: var(--color-text-inverse);
--pagination-item-text-disabled: var(--color-text-disabled);

/* Border */
--pagination-item-border: var(--color-border-default);
--pagination-item-border-hover: var(--color-border-interactive);
--pagination-item-border-active: var(--color-brand-primary);
```

---

## 9. Sidebar Tokens

```css
/* Background */
--sidebar-bg: var(--color-background-primary);
--sidebar-border: var(--color-border-subtle);

/* Header */
--sidebar-header-bg: var(--color-background-primary);
--sidebar-header-border: var(--color-border-subtle);

/* Nav Items */
--sidebar-item-text: var(--color-text-primary);
--sidebar-item-text-hover: var(--color-text-primary);
--sidebar-item-text-active: var(--color-brand-primary);

--sidebar-item-bg: transparent;
--sidebar-item-bg-hover: var(--color-background-secondary);
--sidebar-item-bg-active: var(--color-background-tertiary);

/* Icons */
--sidebar-icon: var(--color-text-secondary);
--sidebar-icon-hover: var(--color-text-primary);
--sidebar-icon-active: var(--color-brand-primary);

/* Sections */
--sidebar-section-title: var(--color-text-tertiary);
--sidebar-section-border: var(--color-border-subtle);

/* Footer */
--sidebar-footer-bg: var(--color-background-secondary);
--sidebar-footer-border: var(--color-border-subtle);
```

---

## 10. Tabs Tokens

```css
/* Container */
--tabs-bg: var(--color-background-primary);
--tabs-border: var(--color-border-subtle);

/* Tab Items */
--tab-text: var(--color-text-secondary);
--tab-text-hover: var(--color-text-primary);
--tab-text-active: var(--color-brand-primary);
--tab-text-disabled: var(--color-text-disabled);

--tab-bg: transparent;
--tab-bg-hover: var(--color-background-secondary);
--tab-bg-active: var(--color-background-primary);

--tab-border-active: var(--color-brand-primary);
--tab-border-focus: var(--color-border-focus);

/* Tab Content */
--tab-content-bg: var(--color-background-primary);
--tab-content-text: var(--color-text-primary);
```

---

## 11. Badge/Tag Tokens

```css
/* Primary Badge */
--badge-primary-bg: var(--color-brand-primary);
--badge-primary-text: var(--color-text-inverse);
--badge-primary-border: var(--color-brand-primary);

/* Secondary Badge */
--badge-secondary-bg: var(--color-background-tertiary);
--badge-secondary-text: var(--color-text-primary);
--badge-secondary-border: var(--color-border-default);

/* Success Badge */
--badge-success-bg: var(--color-success-subtle);
--badge-success-text: var(--color-success-emphasis);
--badge-success-border: var(--color-success);

/* Warning Badge */
--badge-warning-bg: var(--color-warning-subtle);
--badge-warning-text: var(--color-warning-emphasis);
--badge-warning-border: var(--color-warning);

/* Error Badge */
--badge-error-bg: var(--color-error-subtle);
--badge-error-text: var(--color-error-emphasis);
--badge-error-border: var(--color-error);

/* Info Badge */
--badge-info-bg: var(--color-info-subtle);
--badge-info-text: var(--color-info-emphasis);
--badge-info-border: var(--color-info);
```

---

## 12. Alert/Toast Tokens

```css
/* Success Alert */
--alert-success-bg: var(--color-success-subtle);
--alert-success-text: var(--color-text-primary);
--alert-success-icon: var(--color-success-emphasis);
--alert-success-border: var(--color-success);

/* Warning Alert */
--alert-warning-bg: var(--color-warning-subtle);
--alert-warning-text: var(--color-text-primary);
--alert-warning-icon: var(--color-warning-emphasis);
--alert-warning-border: var(--color-warning);

/* Error Alert */
--alert-error-bg: var(--color-error-subtle);
--alert-error-text: var(--color-text-primary);
--alert-error-icon: var(--color-error-emphasis);
--alert-error-border: var(--color-error);

/* Info Alert */
--alert-info-bg: var(--color-info-subtle);
--alert-info-text: var(--color-text-primary);
--alert-info-icon: var(--color-info-emphasis);
--alert-info-border: var(--color-info);
```

---

## 13. Tooltip/Popover Tokens

```css
/* Background */
--tooltip-bg: var(--color-surface-inverse);
--tooltip-text: var(--color-text-inverse);
--tooltip-border: var(--color-border-default);
--tooltip-shadow: var(--color-shadow-medium);

/* Arrow */
--tooltip-arrow: var(--color-surface-inverse);
```

---

## 14. Progress/Loader Tokens

```css
/* Progress Bar */
--progress-bg: var(--color-background-tertiary);
--progress-fill: var(--color-brand-primary);
--progress-border: var(--color-border-subtle);

/* Spinner/Loader */
--loader-primary: var(--color-brand-primary);
--loader-secondary: var(--color-background-tertiary);
```

---

## 15. Accordion/Collapsible Tokens

```css
/* Header */
--accordion-header-bg: var(--color-background-secondary);
--accordion-header-bg-hover: var(--color-background-tertiary);
--accordion-header-text: var(--color-text-primary);
--accordion-header-border: var(--color-border-subtle);

/* Content */
--accordion-content-bg: var(--color-background-primary);
--accordion-content-text: var(--color-text-primary);
--accordion-content-border: var(--color-border-subtle);

/* Icon */
--accordion-icon: var(--color-text-secondary);
--accordion-icon-active: var(--color-text-primary);
```

---

## Reglas de la Capa 3

### ✅ Permitido:
- Referenciar tokens semánticos: `var(--color-text-primary)`
- Hacer bypass a primitives: `var(--primitive-blue-500)`
- Combinar con opacidad: `hsl(var(--color-brand-primary) / 0.1)`
- Crear tokens muy específicos del componente

### ❌ Evitar:
- Duplicar tokens semánticos innecesariamente
- Crear tokens demasiado genéricos (esos van en Capa 2)
- Hardcodear valores de color directamente
- Ignorar completamente las capas anteriores

### 🎯 Objetivo:
- Cada componente tiene sus propios tokens
- Los tokens describen el propósito dentro del componente
- Permiten personalización fácil del componente sin tocar el código
- Facilitan la creación de temas y variantes

---

## Ejemplo de Uso Real

```css
/* primitives.css - CAPA 1 */
--primitive-blue-900: 193 60% 19%;
--primitive-cyan-50: 192 48% 94%;
--primitive-gray-400: 220 9% 60%;

/* semantic.css - CAPA 2 */
--color-brand-primary: var(--primitive-blue-900);
--color-text-inverse: var(--primitive-cyan-50);
--color-text-disabled: var(--primitive-gray-400);

/* button-tokens.css - CAPA 3 */
--button-primary-bg: var(--color-brand-primary);
--button-primary-text: var(--color-text-inverse);
--button-primary-text-disabled: var(--primitive-gray-400); /* ⬅️ bypass cuando se necesita */

/* button.css - Implementación */
.button-primary {
  background: hsl(var(--button-primary-bg));
  color: hsl(var(--button-primary-text));
}

.button-primary:disabled {
  color: hsl(var(--button-primary-text-disabled));
}
```

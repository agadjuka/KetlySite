# Ketly / VYON — stylistic kit (portable)

This folder is a **drop-in style snapshot** of the Ketly site look (especially the `/vyon` page).

## What to copy into another project

- `ketly-theme.css`: tokens + core patterns/components (no Tailwind needed)
- `demo.html`: reference preview for quick visual check

## Brand tokens (source of truth)

From `src/app/globals.css` (`@theme`):

- **Background**: `#050505`
- **Text**: `#ffffff`
- **Neutral**
  - `--color-neutral-950`: `#0a0a0a`
  - `--color-neutral-900`: `#111111`
  - `--color-neutral-800`: `#222222`
  - `--color-neutral-100`: `#f5f5f5`
- **Accents**
  - **Amber**: `#d97706`
  - **Gold**: `#bfa15f`
  - **Alabaster** (warm off-white): `#f2f0e9`

## Typography

From `src/app/layout.tsx`:

- **Display**: Manrope (Google Fonts)
- **Body**: Inter (Google Fonts)
- **Serif (VYON headline)**: local `UNCAGE-VF.ttf` exposed as CSS var `--font-uncage`

Portable fallback (used in `ketly-theme.css`):

- `--ktly-font-display`: `"Manrope", ...`
- `--ktly-font-body`: `"Inter", ...`
- `--ktly-font-serif`: `var(--font-uncage, ui-serif), ...`

## Signature UI patterns

- **Dark luxury base**
  - Very dark background, warm off-whites for headlines, muted whites for body text.
- **Gold accents**
  - Used for key CTAs, thin borders, subtle glow.
- **Glass panels**
  - Translucent background + blur + thin amber/gold border.
  - Class: `.ktly-glass-panel`
- **Mesh + grid background**
  - Mesh radial gradients + faint grid lines.
  - Classes: `.ktly-mesh-bg`, `.ktly-grid-lines`
- **Dashed placeholder/dropzone**
  - SVG data-url background, muted gold dash.
  - Class: `.ktly-dashed-area`
- **CTA glow / pulse**
  - Attract attention without neon: soft gold glow, slow pulse.
  - Classes: `.ktly-cta-glow`, `.ktly-btn--gold-pulse`

## Quick integration checklist

1. Copy `stylekit/ketly-theme.css` into your new project.
2. Load fonts in `<head>`:
   - Manrope + Inter (Google Fonts) like in `demo.html`
   - (Optional) add your own serif font and expose it as `--font-uncage` if you want the same VYON headline flavor.
3. Wrap your page in:
   - `class="ktly-page ktly-grid-lines ktly-mesh-bg"`
4. Use:
   - `.ktly-container` for max-width layout
   - `.ktly-glass-panel` / `.ktly-substrate` / `.ktly-card` for blocks
   - `.ktly-btn ktly-btn--gold` and `.ktly-btn ktly-btn--ghost` for buttons


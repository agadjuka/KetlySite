# Vyon Try-On Instructions (module spec for AI / reuse)

Audience: LLM / tooling. Goal: describe responsibilities, wiring, and how to transplant this folder to another Next.js + React site.

## Purpose

Modal UI that explains photo rules before opening `<input type="file" />` for virtual try-on. Desktop: two columns (guidelines + match rules). Mobile: two-step flow + horizontal snap carousel. Renders via `createPortal(..., document.body)` to avoid `position:fixed` bugs under CSS `transform` ancestors.

## Stack assumptions (adapt if missing)

- React 18+, Next.js App Router (`'use client'` where used)
- `framer-motion` (`AnimatePresence`, `motion`)
- Tailwind CSS; project tokens used in classes: `accent-gold`, `alabaster`, `font-display`, `neutral-*`, `scrollbar-hide` (global)
- Google Material Symbols font/class `material-symbols-outlined` (close icon)
- Static images under **public** URLs (see `instructionsAssets.ts`)

## File map

| File | Role |
|------|------|
| `instructionsAssets.ts` | Public URL base `/images/vyon/try-on-instructions/{1..6}.jpg`, `VYON_TRY_ON_INSTRUCTIONS_ASSETS`, bullet copy `PHOTO_GUIDELINES_BULLETS`, `VYON_TRY_ON_INSTRUCTIONS_IMAGE_URLS` for prefetch |
| `matchRules.ts` | Typed array `VYON_MATCH_RULES` for split-image cards (length / sleeves); ties to asset keys |
| `vyonTryOnInstructionsSession.ts` | `sessionStorage` flag helpers: `hasSeenTryOnInstructionsThisSession`, `markTryOnInstructionsSeenThisSession` (key `vyon_try_on_instructions_seen_session`) |
| `useMediaQuery.ts` | Client hook; breakpoint `(max-width: 1023px)` toggles mobile vs desktop layout inside modal |
| `InstructionSplitImageCard.tsx` | Single composite image + vertical gold divider + floating target badge + bottom LONG/SHORT badges; prop `fillHeight` for mobile flex fill |
| `VyonTryOnInstructionsLeftPanel.tsx` | Desktop “Photo Guidelines”: DO/DON’T column images + bullets |
| `VyonTryOnInstructionsRightPanel.tsx` | Desktop “For a Flawless Result” intro + grid of `InstructionSplitImageCard` from `VYON_MATCH_RULES` |
| `VyonTryOnInstructionsMobileFlow.tsx` | Mobile-only: step 1 intro + guidelines + Next; step 2 title + close + carousel + Got it; receives `onDone`, `onClose` |
| `VyonTryOnInstructionsModal.tsx` | Root: portal, overlay, scroll lock on `<html>`, Framer animations, composes panels or `VyonTryOnInstructionsMobileFlow`; desktop header hidden on small screens |

## Parent integration contract

Host page (example: `VyonSimulationSandbox.tsx`) should:

1. State: `isTryOnInstructionsOpen: boolean`
2. On “upload photo” click: if `hasSeenTryOnInstructionsThisSession()` then trigger file input; else `setIsTryOnInstructionsOpen(true)`
3. Pass to modal: `isOpen`, `onClose` (mark session seen + close), `onDone` (mark session seen + close + `setTimeout` then `input.click()` so picker opens after exit animation ~240ms)
4. Optionally prefetch: spread `VYON_TRY_ON_INSTRUCTIONS_IMAGE_URLS` into a page-level preloader (`new Image().src = url` or hidden `<img>`)

Props of `VyonTryOnInstructionsModal`:

- `isOpen: boolean`
- `onClose: () => void` — user dismissed (X / overlay)
- `onDone: () => void` — user finished flow (desktop/mobile “Got it!” / mobile completion)

## Data / asset contract

- Six JPEGs: `public/images/vyon/try-on-instructions/1.jpg` … `6.jpg` (1–2 left DO/DON’T, 3–4 split rules, 5–6 target thumbnails)
- Changing paths: edit `BASE` in `instructionsAssets.ts` and mirror files on disk; update preloader list if separate

## Porting to another project (minimal checklist)

1. Copy entire `try-on-instructions/` directory + images into that app’s `public` (same relative paths or change `BASE`)
2. Install `framer-motion`; ensure Tailwind + same utility tokens **or** replace class strings with that design system
3. Replace `font-display` / `accent-gold` etc. if the target app uses different tokens
4. Mount `VyonTryOnInstructionsModal` in a **client** parent; keep portal (do not nest under `transform` without portal)
5. Wire session helpers from `vyonTryOnInstructionsSession.ts` to upload button as above
6. If Material Symbols missing: replace close button content with an SVG or icon component

## Dependency graph (import direction)

```
VyonTryOnInstructionsModal
  → LeftPanel, RightPanel, MobileFlow, useMediaQuery
MobileFlow → InstructionSplitImageCard, instructionsAssets, matchRules
RightPanel → InstructionSplitImageCard, matchRules
LeftPanel → instructionsAssets
matchRules → instructionsAssets
vyonTryOnInstructionsSession → (none, only window.sessionStorage)
```

## Notes

- Modal intentionally locks document scroll while open (`document.documentElement` overflow + scrollbar padding compensation).
- “Once per session” is **not** inside the modal; it lives in the parent + `vyonTryOnInstructionsSession.ts`.

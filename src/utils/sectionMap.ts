import type { AstroComponentFactory } from 'astro/runtime/server/index.js';

type AstroModule = { default: AstroComponentFactory };

// Map section "type" → lazy import of the .astro file
export const sectionMap: Record<string, () => Promise<AstroModule>> = {
  hero: () => import('../components/sections/Hero.astro'),
  features: () => import('../components/sections/Features.astro'),
  cta: () => import('../components/sections/CallToAction.astro'),
};
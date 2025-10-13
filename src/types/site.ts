export interface NavItem { label: string; href: string }

export interface SiteMeta {
  title: string;
  description?: string;
  logo?: string;
  brandColor?: string;
}

export interface Section<T = Record<string, unknown>> {
  type: "hero" | "features" | "cta" | (string & {});
  props?: T;
}

export interface Page {
  slug: string;          // "" for home
  title?: string;
  sections: Section[];
}

export interface FooterCfg {
  copyright?: string;
}

export interface SiteConfig {
  site: SiteMeta;
  nav?: NavItem[];
  pages: Page[];
  footer?: FooterCfg;
}
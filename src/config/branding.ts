// Central branding config. Swapping these values (and the two brand colors
// in globals.css) is the intended path to adapt this dashboard shell for a
// different B2B customer — this is not a full multi-tenant theming engine,
// just a single place to stop hardcoding one company's name across the UI.
export const branding = {
  productName: "DuruSer Panel",
  companyName: "DuruSer",
  companyFullName: "DuruSer Gıda",
  shortName: "D",
  tagline: "Sipariş Paneli",
  description: "B2B Sipariş Yönetim Sistemi",
  website: "durusergida.com",
} as const;

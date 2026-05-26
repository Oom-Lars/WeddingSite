// Centralized image references — local assets in /public/images.
//
// These files are populated by `scripts/download-images.mjs`. Run it once
// (from a network that allows images.unsplash.com — most corporate VPNs
// block the CDN) to fetch all assets:
//
//     node scripts/download-images.mjs
//
// To swap in the couple's real photos, drop them into /public/images/ with
// the same filenames (or change the references below).

const local = '/images'

export const images = {
  // 16:10 — original olive-grove estate at golden hour (the hero photo)
  heroEstate: `${local}/estate.jpg`,

  // 4:5 portrait — kept for backwards compatibility (not currently rendered)
  storyPortrait: `${local}/beach-bench.jpg`,

  // 16:9 — Robberg rocky shore, different angle from hero
  venue: `${local}/rocky-shore.jpg`,

  // Dress code mood swatch — earth-toned florals / wine-farm tones
  dressMood: `${local}/dress-mood.jpg`,

  // Photo gallery — 6 varied Plett / coastal compositions
  gallery: [
    `${local}/beach-bench.jpg`,
    `${local}/shore-walk.jpg`,
    `${local}/town-view.jpg`,
    `${local}/rocky-shore.jpg`,
    `${local}/grass.jpg`,
    `${local}/panoramic.jpg`,
  ],
} as const

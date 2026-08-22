// Centralized image references — local assets in /public/images.
//
// The gallery, dress-code boards and the two venue watercolours are the
// couple's own supplied files. Everything under `stock` below is a leftover
// Unsplash placeholder, none of it currently rendered, fetched by:
//
//     node scripts/download-images.mjs
//
// Run that from a network that allows images.unsplash.com — most corporate
// VPNs block the CDN. It only needs to run if those placeholder files are
// missing; it does not touch the couple's photos.

const local = '/images'

export const images = {
  // The hero cover: the couple's watercolour of the ceremony setting — benches
  // on the lawn facing a wooden deck, willows over the dam. Shown full-bleed.
  //
  // The painting only existed at 1053px, which is why the hero used to look
  // soft: filling a viewport meant enlarging it ~2x. It has since been
  // AI-upscaled 4x to 4212px, kept in art/ (outside public/, so it is not
  // deployed), and scripts/prepare-cover.py writes these display sizes from it.
  // Every one is a downscale of that master, which is what makes it sharp now.
  //
  // Replaced a stock olive-grove photo, still in `stock.estate` below.
  heroCover: {
    fallback: `${local}/venue-ceremony-illustration-1400.webp`,
    srcSet: [
      `${local}/venue-ceremony-illustration-1400.webp 1400w`,
      `${local}/venue-ceremony-illustration-2100.webp 2100w`,
    ].join(', '),
  },

  // Watercolour of the Bramon cellar — Cape Dutch gable, arched doors, barrels
  // and lavender. Mounted as a framed print in the venue section rather than
  // cropped into a background, for the same reason as above.
  venueCellar: `${local}/venue-cellar-illustration.jpeg`,

  // 4:5 portrait — kept for backwards compatibility (not currently rendered)
  storyPortrait: `${local}/beach-bench.jpg`,

  // Dress code illustration boards supplied by the couple. Watercolour looks
  // on a near-white ground, so they are mounted on a cream card (see
  // DressCodeSection.css) rather than cropped edge-to-edge.
  mensDressCode: `${local}/mens-dresscode.jpeg`,
  womensDressCode: `${local}/womens-dresscode.jpg`,

  // Photo gallery — the couple's real engagement / proposal photographs.
  //
  // ORDER IS SIGNIFICANT. The gallery is a fixed 6-tile editorial grid
  // (.gallery__tile--0 … --5) where each slot has its own aspect ratio, and
  // tiles crop with `object-fit: cover`. These are ordered so each photo lands
  // in the slot that crops it least:
  //
  //   0  tall-ish   ← portrait  (0.67)  ring-shoulder-bw
  //   1  wide       ← landscape (1.50)  proposal-beach
  //   2  tall-ish   ← landscape (1.33)  forehead-kiss-bw
  //   3  very tall  ← portrait  (0.67)  beach-kiss
  //   4  tall-ish   ← landscape (1.33)  ring-hands
  //   5  wide       ← landscape (1.33)  running-to-sea
  //
  // Reordering this array will re-crop the gallery — check it on desktop and
  // mobile if you do.
  gallery: [
    `${local}/ring-shoulder-bw.jpeg`,
    `${local}/proposal-beach.jpeg`,
    `${local}/forehead-kiss-bw.jpeg`,
    `${local}/beach-kiss.jpeg`,
    `${local}/ring-hands.jpeg`,
    `${local}/running-to-sea.jpeg`,
  ],

  // Previous stock placeholders. None are rendered any more — the hero, venue
  // and attire sections all moved onto the couple's own artwork. Kept on disk
  // and listed here in case a slot ever needs filling again.
  stock: {
    estate: `${local}/estate.jpg`,
    rockyShore: `${local}/rocky-shore.jpg`,
    dressMood: `${local}/dress-mood.jpg`,
    beachBench: `${local}/beach-bench.jpg`,
    shoreWalk: `${local}/shore-walk.jpg`,
    townView: `${local}/town-view.jpg`,
    grass: `${local}/grass.jpg`,
    panoramic: `${local}/panoramic.jpg`,
  },
} as const

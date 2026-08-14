// Centralized image references — local assets in /public/images.
//
// The gallery and dress-code boards are the couple's own supplied files. The
// remaining scenic shots (estate / rocky-shore / dress-mood, plus everything
// under `stock` below) are still Unsplash placeholders fetched by:
//
//     node scripts/download-images.mjs
//
// Run that from a network that allows images.unsplash.com — most corporate
// VPNs block the CDN. It only needs to run if those placeholder files are
// missing; it does not touch the couple's photos.

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

  // Previous stock placeholders. Still on disk and still used by heroEstate /
  // venue / dressMood above; kept here in case a slot needs filling again.
  stock: {
    beachBench: `${local}/beach-bench.jpg`,
    shoreWalk: `${local}/shore-walk.jpg`,
    townView: `${local}/town-view.jpg`,
    grass: `${local}/grass.jpg`,
    panoramic: `${local}/panoramic.jpg`,
  },
} as const

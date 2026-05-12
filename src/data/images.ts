// Centralized image URLs.
//
// All images are Unsplash placeholders chosen for an olive-green / Mediterranean
// estate aesthetic. To swap in the couple's real photos:
//   1. Replace any URL below with a local import (`import myPhoto from './my-photo.jpg'`)
//      or a CDN URL.
//   2. Keep the aspect ratios suggested in the comments — the layout depends on them.

const base = 'https://images.unsplash.com'

const params = (w: number, h?: number) =>
  `?auto=format&fit=crop&w=${w}${h ? `&h=${h}` : ''}&q=80`

export const images = {
  // 16:10 — wide cinematic estate at golden hour
  heroEstate:
    `${base}/photo-1519225421980-715cb0215aed${params(2400, 1500)}`,

  // 4:5 portrait — couple silhouette / candid for Our Story
  storyPortrait:
    `${base}/photo-1606800052052-a08af7148866${params(1200, 1500)}`,

  // 16:9 — venue feature, different angle from hero
  venue:
    `${base}/photo-1464366400600-7168b8af9bc3${params(2400, 1350)}`,

  // Dress code mood swatch — earth-toned florals / table styling
  dressMood:
    `${base}/photo-1469371670807-013ccf25f16a${params(1200, 1500)}`,

  // Photo gallery — 6 varied compositions, mixed aspect ratios
  gallery: [
    `${base}/photo-1519741497674-611481863552${params(1000, 1300)}`, // 4:5
    `${base}/photo-1465495976277-4387d4b0e4a6${params(1000, 700)}`,  // wide
    `${base}/photo-1583939003579-730e3918a45a${params(800, 1000)}`,  // 4:5
    `${base}/photo-1532712938310-34cb3982ef74${params(1000, 700)}`,  // wide
    `${base}/photo-1511795409834-ef04bbd61622${params(800, 1100)}`,  // tall
    `${base}/photo-1606216794074-735e91aa2c92${params(1000, 1000)}`, // square
  ],
} as const

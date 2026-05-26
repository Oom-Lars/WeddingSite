// One-shot script: downloads the Plettenberg Bay photos used on the wedding
// site from Unsplash into /public/images/.
//
// Run from the project root, on a network that allows images.unsplash.com:
//     node scripts/download-images.mjs
//
// Safe to re-run — files are overwritten in place.

import { mkdir, writeFile, stat } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '..', 'public', 'images')

// name → Unsplash CDN path + query (width tuned to each photo's role)
const downloads = [
  ['estate.jpg',      'photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=2400&q=80'],
  ['panoramic.jpg',   'photo-1736967462395-69c7183d1f3a?auto=format&fit=crop&w=2400&q=80'],
  ['rocky-shore.jpg', 'photo-1636682201230-d0d38128acd2?auto=format&fit=crop&w=2400&q=80'],
  ['beach-bench.jpg', 'photo-1636682195828-de83e1f1dc85?auto=format&fit=crop&w=1600&q=80'],
  ['shore-walk.jpg',  'photo-1564676604727-5cfcaca9b99e?auto=format&fit=crop&w=1600&q=80'],
  ['town-view.jpg',   'photo-1691398331722-c1900dba2fd3?auto=format&fit=crop&w=1600&q=80'],
  ['grass.jpg',       'photo-1588176319546-2adf850d70fb?auto=format&fit=crop&w=1600&q=80'],
  ['dress-mood.jpg',  'photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=80'],
]

await mkdir(outDir, { recursive: true })

let failed = 0
for (const [name, path] of downloads) {
  const dest = join(outDir, name)
  process.stdout.write(`-> ${name.padEnd(20)} `)

  // Idempotent: skip if a real JPEG is already on disk.
  try {
    const s = await stat(dest)
    if (s.size > 20_000) {
      console.log('skip (already present)')
      continue
    }
  } catch {
    // not present — fall through and download
  }

  const url = `https://images.unsplash.com/${path}`
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'WeddingSite-asset-fetch/1.0' },
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const buf = Buffer.from(await res.arrayBuffer())

    // Sanity check — block-page HTML responses are tiny and start with '<'.
    if (buf.length < 20_000 || buf[0] === 0x3c /* '<' */) {
      throw new Error(`looks like a block page (${buf.length} bytes)`)
    }

    await writeFile(dest, buf)
    console.log(`ok (${(buf.length / 1024).toFixed(0)} KB)`)
  } catch (err) {
    console.log(`FAIL — ${err.message}`)
    failed++
  }
}

if (failed > 0) {
  console.error(`\n${failed} download(s) failed.`)
  console.error('If you are on a corporate VPN, it is probably blocking the Unsplash CDN.')
  console.error('Try again from a personal network, then commit /public/images/.')
  process.exit(1)
}

console.log('\nAll images downloaded to public/images/.')

# Source artwork (not deployed)

Full-resolution masters live here, **outside `public/`**, so Vite does not copy
them into `dist/`. Only the downscaled display assets under
`public/images/` ship to the browser.

| File | What it is |
| --- | --- |
| `venue-ceremony-illustration-4k.webp` | 4212×4948 watercolour of the ceremony setting at Bramon. AI-upscaled 4× from the couple's original 1053px painting, which was too small to fill the hero. This is the master the hero's display sizes are generated from. |

Regenerate the display assets after changing anything here:

```
python scripts/prepare-cover.py
```

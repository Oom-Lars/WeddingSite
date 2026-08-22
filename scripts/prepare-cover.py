#!/usr/bin/env python3
"""Generate the hero cover's display sizes from the full-resolution master.

The hero shows this watercolour full-bleed, so it needs to cover viewports up to
retina-desktop width. The couple's original painting was only 1053px, which meant
enlarging it about 2x to fill the screen and it looked soft. It has since been
AI-upscaled 4x to 4212x4948 (kept in art/, which is not deployed), so every size
written here is a *downscale* of the master and stays crisp.

    python scripts/prepare-cover.py

Requires Pillow (`pip install Pillow`). Re-run if the master changes.
"""

import os

from PIL import Image, ImageEnhance, ImageFilter

MASTER = 'art/venue-ceremony-illustration-4k.webp'
OUT_DIR = 'public/images'
STEM = 'venue-ceremony-illustration'

# Ladder for a full-bleed hero, declared in the srcset in src/data/images.ts.
# Stops at 2100: a third size at 2800 cost another ~600KB above the fold to
# sharpen only large retina desktops, which is a bad trade for a hero.
WIDTHS = (1400, 2100)

# The AI upscale is very crisp — almost vectorised — and that detail is
# expensive to encode. Half a pixel of blur is imperceptible on a watercolour
# (it arguably suits one) and takes a meaningful bite out of the file size.
SOFTEN = 0.5

# The hero lays a cream veil over this so the type can sit on top, which lifts
# the painting's already high-key washes further. A little saturation keeps it
# from going pale under that. Modest — the master's colour is what the couple
# approved, and the veil is much thinner than it used to be.
# The AI upscale came back paler than the couple's original painting, on top of
# the veil, so these are firmer than they look — they land close to the original
# artwork's density rather than pushing past it.
SATURATION = 1.28
CONTRAST = 1.10


def main():
    master = Image.open(MASTER).convert('RGB')
    print(f'master {master.size[0]}x{master.size[1]}')

    for width in WIDTHS:
        if width > master.size[0]:
            print(f'skip   {width}w — wider than the master')
            continue
        height = round(width * master.size[1] / master.size[0])
        image = master.resize((width, height), Image.LANCZOS)
        image = ImageEnhance.Color(image).enhance(SATURATION)
        image = ImageEnhance.Contrast(image).enhance(CONTRAST)
        if SOFTEN:
            image = image.filter(ImageFilter.GaussianBlur(SOFTEN))
        out = os.path.join(OUT_DIR, f'{STEM}-{width}.webp')
        image.save(out, 'WEBP', quality=72, method=6)
        print(f'wrote  {out}  {width}x{height}  {os.path.getsize(out) // 1024} KB')


if __name__ == '__main__':
    main()

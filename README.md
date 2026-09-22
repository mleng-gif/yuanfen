# Yuánfèn — Afterimage

An interactive meditation by Michael Leng on affinity, agency, and the traces we carry after an encounter. A single static HTML file, with a WebGL rendition and a native Canvas fallback.

## The experience

Enter with sound or quietly. Hold a pointer or Space to draw the presences closer; release to give them space. Double-tap or press the down arrow to separate them. The work lasts approximately four and a half minutes of active time. Pause, opening About, and changing tabs suspend the score. A gentle-motion mode reduces movement; it follows the operating system preference on first load.

The presences retain their own color identities. Contact exchanges distinct particles without erasing earlier traces. Musical motifs also begin to borrow from one another after contact. An interval of quiet and separation follows each encounter. Time affects both presences equally, regardless of the visitor's choices. The ending offers a unique SVG constellation generated locally from that session. No analytics, account, or persistent visitor data is used.

## Run

Serve this directory with any static HTTP server, for example `python3 -m http.server 8080`. Vercel serves `index.html` directly. Three.js r128 is loaded from the existing CDN; if it or WebGL is unavailable, the Canvas rendition runs. Fonts are optional network resources with local fallbacks. Audio uses the browser's native Web Audio API and starts only after a visitor chooses sound.

## Checks

`node tests/encounter.test.cjs` verifies the encounter lifecycle, repeated encounters, pressure recovery, retained history, a single ending, and equal decay independent of interaction style.

Full GPU shader rendering and subjective listening should be reviewed on exhibition hardware before production release. Recommended manual checks: pointer and keyboard interaction; mobile touch and cancellation; sound off/on including after Pause and About; browser tab switching; the ending and SVG download; reduced motion; and a WebGL-disabled device.

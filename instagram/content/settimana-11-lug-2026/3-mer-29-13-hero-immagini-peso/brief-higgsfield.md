# Hero · 29 LUG · Le immagini sono il vero peso del web

Hero shot per il post "Le immagini sono il vero peso del web". Cinematic Higgsfield, movimento slow-motion.

## Higgsfield Prompt

```
Cinematic ultra-slow-motion close-up of a single heavy lead type letter falling from above and impacting a polished dark glass surface, captured at the exact moment of contact. Paper dust and tiny ink particles lifting silently around the impact point. Cool side light from camera-left grazing the metal surfaces, deep forest-green hint in the reflections on the glass. Background fading to pure black at the edges. Camera locked, no movement, the letter is the only motion. Mood: weight, materiality, the silent impact of mass. Shallow depth of field, museum-grade detail. Style: editorial documentary photography, restrained palette. Avoid: people, faces, modern devices, text overlays, neon, oversaturation.
```

## Pipeline
1. Genera con 1 token Higgsfield
2. Estrai frame ideale (PNG 1080×1350 portrait — preferibile il momento dell'impatto o subito dopo)
3. Salva in `assets/hero-raw.png`
4. `cd src && node render.cjs`

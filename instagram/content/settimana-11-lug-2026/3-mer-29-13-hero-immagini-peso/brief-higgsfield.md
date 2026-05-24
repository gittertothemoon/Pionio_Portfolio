# Hero · 29 LUG · Le immagini sono il vero peso del web

Hero shot per il post "Le immagini sono il vero peso del web". Cinematic Higgsfield.

## Higgsfield Prompt

```
Cinematic close-up shot of an old wooden printing press loaded with heavy lead type blocks, the metal type catching cool side light from camera-left, ink stains and paper dust on the press bed, dark background fading to pure black at the edges. Forest-green hint in the deep shadows from a small studio light. Slow camera dolly forward. Mood: weight, materiality, the physical mass of images and letters. Shallow depth of field, museum-grade detail. Style: editorial documentary photography, restrained palette. Avoid: people, faces, modern devices, text overlays, neon, oversaturation.
```

## Pipeline
1. Genera con 1 token Higgsfield
2. Estrai frame ideale (PNG 1080×1350 portrait)
3. Salva in `assets/hero-raw.png`
4. `cd src && node render.cjs`

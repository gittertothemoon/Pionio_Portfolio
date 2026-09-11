# Proofs

How the marks were checked before shipping, kept because the check is the interesting part.

- **`icone-ritaglio-android-ios.png`** — the two marks under the two crops that actually happen:
  Android's circle on the maskable icon, iOS's squircle on the 512. Both letters have to survive.
- **`icone-favicon-16-32.png`** — the favicons at 16 and 32 px, enlarged with nearest-neighbour so
  every pixel is visible. This is where a lockup or a photograph falls apart.

Redo them from the files in `../` and in `~/local/sintetico/brand/` whenever a mark changes. And
measure the result (bounding box of the non-plate pixels) instead of judging by eye: an enlarged
proof made the mark look cropped when it was in fact half the size it should have been.

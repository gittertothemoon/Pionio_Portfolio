#!/usr/bin/env python3
"""Rigenera tutte le slides.html dei post Saved (W1-W10) con layout 2-colonne:
contenuto a sinistra, asset (logo/cover) a destra SENZA card bianca.

Per loghi monocromi neri (Are.na, Linear simple-icons, Stripe simple-icons, Gov.uk crest)
applica `filter: brightness(0) invert(1)` per renderli bianchi su nero.

I libri (cover) sono mostrati come-sono, senza filtro.
"""
import re
from pathlib import Path

CONTENT = Path(__file__).parent

# Saved folders to process — (week_slug, folder_name, invert?, type)
# type: "logo" or "cover"
SAVED = [
    ("settimana-01-mag-2026", "6-sab-23-19-saved-arena",            True,  "logo"),
    ("settimana-02-mag-2026", "6-sab-30-19-saved-linear",           True,  "logo"),
    ("settimana-03-giu-2026", "6-sab-06-19-saved-stripe",           True,  "logo"),
    ("settimana-04-giu-2026", "6-sab-13-19-saved-plausible-live",   False, "logo"),
    ("settimana-05-giu-2026", "6-sab-20-19-saved-govuk",            True,  "logo"),
    ("settimana-06-giu-2026", "6-sab-27-19-saved-wayback",          False, "logo"),
    ("settimana-07-giu-2026", "6-sab-4-19-saved-company-of-one",    False, "cover"),
    ("settimana-08-lug-2026", "6-sab-11-19-saved-design-is-a-job",  False, "cover"),
    ("settimana-09-lug-2026", "6-sab-18-19-saved-mom-test",         False, "cover"),
    ("settimana-10-lug-2026", "6-sab-25-19-saved-refactoring-ui",   False, "cover"),
]

TEMPLATE = '''<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8" />
<title>Pionio · Saved</title>
<style>
  @font-face {{ font-family: "Geist"; src: url("../../../../../brand-assets/fonts/Geist-Regular.ttf") format("truetype"); font-weight: 400; }}
  @font-face {{ font-family: "Geist"; src: url("../../../../../brand-assets/fonts/Geist-Medium.ttf") format("truetype"); font-weight: 500; }}
  @font-face {{ font-family: "Geist"; src: url("../../../../../brand-assets/fonts/Geist-Bold.ttf") format("truetype"); font-weight: 700; }}
  @font-face {{ font-family: "Geist Mono"; src: url("../../../../../brand-assets/fonts/GeistMono-Regular.ttf") format("truetype"); font-weight: 400; }}
  :root {{ --bg: #09090b; --text: #fafafa; --muted: #d4d4d8; --muted-dim: #71717a; --accent: #62a481; }}
  * {{ box-sizing: border-box; margin: 0; padding: 0; }}
  html, body {{ background: var(--bg); margin: 0; padding: 0; overflow-x: hidden; }}
  body {{ font-family: "Geist", system-ui, sans-serif; color: var(--text); -webkit-font-smoothing: antialiased; text-rendering: geometricPrecision; }}
  .slide {{ width: 1080px; height: 1350px; background: var(--bg); position: relative; overflow: hidden; display: grid; grid-template-rows: 160px 1fr 120px; padding: 100px 110px; margin: 0 auto; }}
  .header {{ display: flex; align-items: center; justify-content: space-between; }}
  .logo {{ width: 64px; height: 64px; }}
  .logo img {{ width: 100%; height: 100%; object-fit: contain; }}
  .eyebrow {{ font-family: "Geist Mono", monospace; font-weight: 400; font-size: 22px; color: var(--accent); letter-spacing: 0.08em; text-transform: uppercase; }}

  .main {{ display: grid; grid-template-columns: 1fr 340px; gap: 60px; align-items: center; }}
  .main-text {{ display: flex; flex-direction: column; gap: 32px; }}
  .saved-kicker {{ font-family: "Geist Mono", monospace; font-size: 22px; color: var(--muted-dim); letter-spacing: 0.18em; text-transform: uppercase; }}
  .saved-title {{ font-family: "Geist", sans-serif; font-weight: 700; font-size: 64px; line-height: 1.04; letter-spacing: -0.035em; color: var(--text); }}
  .saved-title em {{ font-style: normal; color: var(--accent); }}
  .saved-source {{ display: flex; align-items: baseline; gap: 18px; font-family: "Geist Mono", monospace; font-size: 22px; letter-spacing: 0.06em; }}
  .saved-source .label {{ color: var(--muted-dim); text-transform: uppercase; letter-spacing: 0.16em; font-size: 18px; }}
  .saved-source .url {{ color: var(--accent); }}
  .saved-body {{ font-family: "Geist", sans-serif; font-weight: 400; font-size: 24px; line-height: 1.5; color: var(--muted); }}
  .saved-body em {{ font-style: italic; color: var(--text); font-weight: 500; }}

  .asset {{ width: 340px; height: 480px; display: flex; align-items: center; justify-content: center; }}
  .asset img {{ max-width: 100%; max-height: 100%; object-fit: contain; }}
  .asset.invert img {{ filter: brightness(0) invert(1); }}
  .asset.cover img {{ max-width: 100%; max-height: 100%; width: auto; height: 100%; object-fit: contain; border-radius: 2px; }}

  .footer {{ display: flex; align-items: flex-end; justify-content: space-between; }}
  .footer-url, .footer-tag {{ font-family: "Geist Mono", monospace; font-size: 22px; color: var(--muted-dim); letter-spacing: 0.06em; }}
</style>
</head>
<body data-gramm="false">
<section class="slide" id="s1">
  <div class="header">
    <div class="logo"><img src="../../../../../design-system/assets/pionio-p-mark.png" alt="P"></div>
    <div class="eyebrow">SAVED · SETTIMANA #{week_num}</div>
  </div>
  <div class="main">
    <div class="main-text">
      <div class="saved-kicker">QUESTA SETTIMANA HO SALVATO</div>
      <h1 class="saved-title">{title}</h1>
      <div class="saved-source">
        <span class="label">→</span>
        <span class="url">{url}</span>
      </div>
      <p class="saved-body">
        {body}
      </p>
    </div>
    <div class="asset{asset_class}">
      <img src="../assets/{asset_filename}" alt="">
    </div>
  </div>
  <div class="footer">
    <div class="footer-url">pionio.it</div>
    <div class="footer-tag">PIONIO · WEB DESIGN STUDIO</div>
  </div>
</section>
</body>
</html>
'''

for week_slug, folder, invert, kind in SAVED:
    post_dir = CONTENT / week_slug / folder
    src_html = (post_dir / "src" / "slides.html").read_text()

    title_m = re.search(r'<h1 class="saved-title">(.+?)</h1>', src_html, re.S)
    url_m = re.search(r'<span class="url">(.+?)</span>', src_html)
    body_m = re.search(r'<p class="saved-body">\s*(.+?)\s*</p>', src_html, re.S)
    week_m = re.search(r'SETTIMANA #(\d+)', src_html)

    title = title_m.group(1).strip()
    url = url_m.group(1).strip()
    body = body_m.group(1).strip()
    week_num = week_m.group(1)

    assets_dir = post_dir / "assets"
    asset_files = [f for f in assets_dir.iterdir() if f.name.endswith(("-asset.png", "-asset.jpg", "-asset.svg"))]
    if not asset_files:
        print(f"SKIP {folder}: no asset found")
        continue
    asset_filename = asset_files[0].name

    classes = []
    if kind == "cover":
        classes.append("cover")
    if invert:
        classes.append("invert")
    asset_class = (" " + " ".join(classes)) if classes else ""

    new_html = TEMPLATE.format(
        week_num=week_num,
        title=title,
        url=url,
        body=body,
        asset_class=asset_class,
        asset_filename=asset_filename,
    )
    (post_dir / "src" / "slides.html").write_text(new_html)
    print(f"OK {folder} (week {week_num}, asset {asset_filename}, kind={kind}, invert={invert})")

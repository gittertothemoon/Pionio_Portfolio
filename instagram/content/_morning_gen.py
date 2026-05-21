#!/usr/bin/env python3
"""
Generatore Morning 8:30 posts.
Crea slides.html + render.cjs + caption.txt per ogni post Morning.
Per le image: aggiunge anche brief-prompt.md.

Usa: python3 _morning-gen.py <settimana-folder>
Configurazione: edit MORNING_POSTS array in fondo.
"""

import os
import sys

POSTER_HTML_TEMPLATE = '''<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8" />
<title>Pionio · Morning Word · {date_label}</title>
<style>
  @font-face {{ font-family: "Geist"; src: url("../../../../../brand-assets/fonts/Geist-Regular.ttf") format("truetype"); font-weight: 400; }}
  @font-face {{ font-family: "Geist"; src: url("../../../../../brand-assets/fonts/Geist-Medium.ttf") format("truetype"); font-weight: 500; }}
  @font-face {{ font-family: "Geist"; src: url("../../../../../brand-assets/fonts/Geist-Bold.ttf") format("truetype"); font-weight: 700; }}
  @font-face {{ font-family: "Geist Mono"; src: url("../../../../../brand-assets/fonts/GeistMono-Regular.ttf") format("truetype"); font-weight: 400; }}
  :root {{ --bg: #09090b; --text: #fafafa; --muted: #d4d4d8; --muted-dim: #71717a; --accent: #62a481; }}
  * {{ box-sizing: border-box; margin: 0; padding: 0; }}
  html, body {{ background: var(--bg); margin: 0; padding: 0; }}
  body {{ font-family: "Geist", system-ui, sans-serif; color: var(--text); -webkit-font-smoothing: antialiased; text-rendering: geometricPrecision; }}
  .slide {{ width: 1080px; height: 1350px; background: var(--bg); position: relative; overflow: hidden; display: grid; grid-template-rows: 160px 1fr 120px; padding: 100px 110px; margin: 0 auto; }}
  .header {{ display: flex; align-items: center; justify-content: space-between; }}
  .logo {{ width: 64px; height: 64px; }}
  .logo img {{ width: 100%; height: 100%; object-fit: contain; }}
  .eyebrow {{ font-family: "Geist Mono", monospace; font-weight: 400; font-size: 22px; color: var(--accent); letter-spacing: 0.08em; text-transform: uppercase; }}
  .footer {{ display: flex; align-items: flex-end; justify-content: space-between; }}
  .footer-url, .footer-tag {{ font-family: "Geist Mono", monospace; font-size: 22px; color: var(--muted-dim); letter-spacing: 0.06em; }}
  .main {{ display: flex; flex-direction: column; justify-content: center; align-items: flex-start; gap: 40px; }}
  .word-kicker {{ font-family: "Geist Mono", monospace; font-size: 22px; color: var(--muted-dim); letter-spacing: 0.18em; text-transform: uppercase; }}
  .word-big {{ font-family: "Geist", sans-serif; font-weight: 700; font-size: {word_size}px; line-height: 0.92; letter-spacing: -0.06em; color: var(--accent); }}
  .word-sub {{ font-family: "Geist", sans-serif; font-weight: 400; font-size: 36px; line-height: 1.3; color: var(--muted); max-width: 820px; margin-top: 16px; }}
</style>
</head>
<body data-gramm="false">

<section class="slide" id="s1">
  <div class="header">
    <div class="logo"><img src="../../../../../design-system/assets/pionio-p-mark.png" alt="P"></div>
    <div class="eyebrow">MORNING · {date_label}</div>
  </div>

  <div class="main">
    <div class="word-kicker">PAROLA DEL MATTINO</div>
    <h1 class="word-big">{word_capitalized}.</h1>
    <p class="word-sub">{sub}</p>
  </div>

  <div class="footer">
    <div class="footer-url">pionio.it</div>
    <div class="footer-tag">PIONIO · WEB DESIGN STUDIO</div>
  </div>
</section>

</body>
</html>
'''

IMAGE_HTML_TEMPLATE = '''<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8" />
<title>Pionio · Morning Image · {date_label}</title>
<style>
  @font-face {{ font-family: "Geist"; src: url("../../../../../brand-assets/fonts/Geist-Regular.ttf") format("truetype"); font-weight: 400; }}
  @font-face {{ font-family: "Geist"; src: url("../../../../../brand-assets/fonts/Geist-Medium.ttf") format("truetype"); font-weight: 500; }}
  @font-face {{ font-family: "Geist"; src: url("../../../../../brand-assets/fonts/Geist-Bold.ttf") format("truetype"); font-weight: 700; }}
  @font-face {{ font-family: "Geist Mono"; src: url("../../../../../brand-assets/fonts/GeistMono-Regular.ttf") format("truetype"); font-weight: 400; }}
  :root {{ --bg: #09090b; --text: #fafafa; --muted: #d4d4d8; --muted-dim: #71717a; --accent: #62a481; }}
  * {{ box-sizing: border-box; margin: 0; padding: 0; }}
  html, body {{ background: var(--bg); margin: 0; padding: 0; overflow: hidden; }}
  .slide {{ width: 1080px; height: 1350px; background: var(--bg); position: relative; overflow: hidden; }}
  .morning-img {{ position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; object-position: center; display: block; opacity: 0.65; }}
  .morning-overlay {{ position: absolute; inset: 0; background: linear-gradient(180deg, rgba(9,9,11,0.55) 0%, rgba(9,9,11,0.4) 50%, rgba(9,9,11,0.85) 100%); }}
  .header {{ position: absolute; top: 100px; left: 110px; right: 110px; display: flex; align-items: center; justify-content: space-between; z-index: 3; }}
  .logo {{ width: 64px; height: 64px; }}
  .logo img {{ width: 100%; height: 100%; object-fit: contain; }}
  .eyebrow {{ font-family: "Geist Mono", monospace; font-weight: 400; font-size: 22px; color: var(--accent); letter-spacing: 0.08em; text-transform: uppercase; text-shadow: 0 2px 8px rgba(0,0,0,0.6); }}
  .main {{ position: absolute; left: 110px; right: 110px; top: 50%; transform: translateY(-50%); z-index: 3; display: flex; flex-direction: column; align-items: flex-start; gap: 32px; }}
  .word-kicker {{ font-family: "Geist Mono", monospace; font-size: 22px; color: var(--text); letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.78; text-shadow: 0 2px 8px rgba(0,0,0,0.6); }}
  .word-big {{ font-family: "Geist", sans-serif; font-weight: 700; font-size: {word_size}px; line-height: 0.92; letter-spacing: -0.05em; color: var(--text); text-shadow: 0 4px 20px rgba(0,0,0,0.7); }}
  .word-sub {{ font-family: "Geist", sans-serif; font-weight: 400; font-size: 32px; line-height: 1.3; color: var(--text); max-width: 760px; opacity: 0.88; text-shadow: 0 2px 12px rgba(0,0,0,0.7); }}
  .footer {{ position: absolute; left: 110px; right: 110px; bottom: 100px; display: flex; align-items: flex-end; justify-content: space-between; z-index: 3; }}
  .footer-url, .footer-tag {{ font-family: "Geist Mono", monospace; font-size: 22px; color: var(--muted); letter-spacing: 0.06em; text-shadow: 0 2px 8px rgba(0,0,0,0.6); }}
</style>
</head>
<body data-gramm="false">

<section class="slide" id="s1">
  <img class="morning-img" src="../assets/morning-raw.png" alt="" onerror="this.style.display='none'">
  <div class="morning-overlay"></div>

  <div class="header">
    <div class="logo"><img src="../../../../../design-system/assets/pionio-p-mark.png" alt="P"></div>
    <div class="eyebrow">MORNING · {date_label}</div>
  </div>

  <div class="main">
    <div class="word-kicker">PAROLA DEL MATTINO</div>
    <h1 class="word-big">{word_capitalized}.</h1>
    <p class="word-sub">{sub}</p>
  </div>

  <div class="footer">
    <div class="footer-url">pionio.it</div>
    <div class="footer-tag">PIONIO · WEB DESIGN STUDIO</div>
  </div>
</section>

</body>
</html>
'''

RENDER_CJS = '''const {{ chromium }} = require('playwright');
const path = require('path');
{asset_check}
(async () => {{
  const browser = await chromium.launch({{ args: ['--font-render-hinting=none'] }});
  const ctx = await browser.newContext({{ viewport: {{ width: 1080, height: 1350 }}, deviceScaleFactor: 2 }});
  const page = await ctx.newPage();
  await page.goto('file://' + path.resolve(__dirname, 'slides.html'), {{ waitUntil: 'networkidle' }});
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({{ path: path.join(__dirname, '..', 'out', 'morning.png'), clip: {{ x: 0, y: 0, width: 1080, height: 1350 }} }});
  console.log('OK morning.png');
  await browser.close();
}})();
'''

IMAGE_ASSET_CHECK = '''const fs = require('fs');
const ASSET = path.resolve(__dirname, '..', 'assets', 'morning-raw.png');
if (!fs.existsSync(ASSET)) {{
  console.warn('⚠️  Manca assets/morning-raw.png — vedi brief-prompt.md');
}}
'''


def word_size(word: str) -> int:
    """Font-size dinamico — molto conservativo per stare sempre nei 860px disponibili."""
    n = len(word)
    if n <= 4: return 240
    if n <= 6: return 200
    if n <= 8: return 160
    if n <= 11: return 135
    return 115


def generate_post(week_dir: str, post: dict):
    folder = post["folder"]
    fmt = post["fmt"]  # 'P' o 'I'
    word = post["word"]
    sub = post["sub"]
    date_label = post["date_label"]
    caption_body = post["caption"]

    base = os.path.join(week_dir, folder)
    src = os.path.join(base, "src")
    os.makedirs(src, exist_ok=True)
    os.makedirs(os.path.join(base, "out"), exist_ok=True)
    if fmt == "I":
        os.makedirs(os.path.join(base, "assets"), exist_ok=True)

    template = IMAGE_HTML_TEMPLATE if fmt == "I" else POSTER_HTML_TEMPLATE
    html = template.format(
        date_label=date_label,
        word_capitalized=word.capitalize(),
        sub=sub,
        word_size=word_size(word),
    )
    with open(os.path.join(src, "slides.html"), "w") as f:
        f.write(html)

    asset_check = IMAGE_ASSET_CHECK if fmt == "I" else ""
    with open(os.path.join(src, "render.cjs"), "w") as f:
        f.write(RENDER_CJS.format(asset_check=asset_check))

    with open(os.path.join(base, "caption.txt"), "w") as f:
        f.write(caption_body + "\n\npionio.it\n")

    if fmt == "I":
        prompt_path = post.get("ai_prompt", "TBD prompt")
        with open(os.path.join(base, "brief-prompt.md"), "w") as f:
            f.write(f"""# Morning Image · {date_label}

Foto editoriale con overlay parola "{word}".

## Prompt AI (ChatGPT / Nano Banana / DALL-E)

```
{prompt_path}
```

## Pipeline

1. Genera 3-4 varianti
2. Salva PNG in `assets/morning-raw.png`
3. `node src/render.cjs`
""")

    print(f"  ✓ {folder} ({fmt})")


if __name__ == "__main__":
    print("Use this module by importing generate_post(week_dir, post_dict)")

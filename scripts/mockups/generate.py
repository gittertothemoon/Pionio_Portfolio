"""Generate realistic device mockups (iPhone, MacBook, iPad) from project screenshots.

Renders at high supersampled resolution then downsamples with LANCZOS for clean
anti-aliased corners and bezels. Output: WebP with a soft drop shadow baked in.
"""
from __future__ import annotations

import os
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parents[2]
# Fresh per-device-aspect screenshots captured by screenshots.mjs.
SRC_DIR = ROOT / "public" / "mockups" / "src"
OUT_DIR = ROOT / "public" / "mockups"
OUT_DIR.mkdir(parents=True, exist_ok=True)


# ---------- helpers ----------

def vertical_gradient(size, top_color, bottom_color):
    w, h = size
    grad = Image.new("RGB", (1, h))
    px = grad.load()
    for y in range(h):
        t = y / max(h - 1, 1)
        px[0, y] = (
            int(top_color[0] * (1 - t) + bottom_color[0] * t),
            int(top_color[1] * (1 - t) + bottom_color[1] * t),
            int(top_color[2] * (1 - t) + bottom_color[2] * t),
        )
    return grad.resize(size, Image.BILINEAR)


def rounded_mask(size, radius):
    mask = Image.new("L", size, 0)
    ImageDraw.Draw(mask).rounded_rectangle(
        (0, 0, size[0] - 1, size[1] - 1), radius=radius, fill=255
    )
    return mask


def cover_fit(img: Image.Image, target_w: int, target_h: int) -> Image.Image:
    src_ratio = img.width / img.height
    target_ratio = target_w / target_h
    if src_ratio > target_ratio:
        new_w = int(img.height * target_ratio)
        x0 = (img.width - new_w) // 2
        img = img.crop((x0, 0, x0 + new_w, img.height))
    else:
        new_h = int(img.width / target_ratio)
        y0 = (img.height - new_h) // 2
        img = img.crop((0, y0, img.width, y0 + new_h))
    return img.resize((target_w, target_h), Image.LANCZOS)


def add_drop_shadow(rgba: Image.Image, *, offset=(0, 24), blur=42, alpha=130, pad=110):
    w, h = rgba.size
    cw, ch = w + pad * 2, h + pad * 2
    out = Image.new("RGBA", (cw, ch), (0, 0, 0, 0))
    a = rgba.split()[-1]
    shadow = Image.new("RGBA", (cw, ch), (0, 0, 0, 0))
    shadow_layer = Image.new("L", (cw, ch), 0)
    shadow_layer.paste(a, (pad + offset[0], pad + offset[1]))
    shadow_layer = shadow_layer.filter(ImageFilter.GaussianBlur(blur))
    shadow_rgba = Image.new("RGBA", (cw, ch), (0, 0, 0, 0))
    # apply alpha cap
    sa = shadow_layer.point(lambda v: int(v * alpha / 255))
    shadow_rgba.putalpha(sa)
    shadow_rgba = Image.composite(
        Image.new("RGBA", (cw, ch), (0, 0, 0, 255)), shadow_rgba, sa
    )
    out.alpha_composite(shadow_rgba)
    out.alpha_composite(rgba, (pad, pad))
    return out


# ---------- iPhone 15 Pro ----------

def make_iphone(shot_path: Path, out_path: Path, width: int = 600) -> None:
    ss = 3
    aspect = 19.5 / 9
    height = int(width * aspect)
    W, H = width * ss, height * ss

    bezel = int(14 * ss)
    outer_r = int(70 * ss)
    inner_r = outer_r - bezel

    # Titanium frame
    frame_grad = vertical_gradient(
        (W, H), top_color=(0x40, 0x40, 0x42), bottom_color=(0x16, 0x16, 0x18)
    ).convert("RGBA")
    frame = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    frame.paste(frame_grad, (0, 0), rounded_mask((W, H), outer_r))

    # Edge highlight (subtle white inner stroke at top)
    highlight = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    hd = ImageDraw.Draw(highlight)
    hd.rounded_rectangle(
        (0, 0, W - 1, H - 1), radius=outer_r, outline=(255, 255, 255, 28), width=int(2 * ss)
    )
    frame.alpha_composite(highlight)

    # Screen area
    iw, ih = W - 2 * bezel, H - 2 * bezel
    shot = Image.open(shot_path).convert("RGB")
    shot = cover_fit(shot, iw, ih).convert("RGBA")
    shot.putalpha(rounded_mask((iw, ih), inner_r))

    canvas = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    canvas.alpha_composite(frame)
    # Pure black inner first (so masked corners stay perfect black even if shot has alpha)
    inner_black = Image.new("RGBA", (iw, ih), (0, 0, 0, 0))
    inner_black.paste((0, 0, 0, 255), (0, 0), rounded_mask((iw, ih), inner_r))
    canvas.alpha_composite(inner_black, (bezel, bezel))
    canvas.alpha_composite(shot, (bezel, bezel))

    # Dynamic Island
    di_w, di_h = int(96 * ss), int(30 * ss)
    di_x = (W - di_w) // 2
    di_y = bezel + int(10 * ss)
    di = Image.new("RGBA", (di_w, di_h), (0, 0, 0, 0))
    ImageDraw.Draw(di).rounded_rectangle(
        (0, 0, di_w - 1, di_h - 1), radius=di_h // 2, fill=(6, 6, 8, 255)
    )
    canvas.alpha_composite(di, (di_x, di_y))

    # Subtle side buttons (titanium edge highlight)
    btn = (60, 60, 62, 255)
    btn_w = int(2 * ss)
    # left
    for top_pct, length in [(0.20, 30), (0.30, 50), (0.39, 50)]:
        b = Image.new("RGBA", (btn_w, int(length * ss)), btn)
        canvas.alpha_composite(b, (-btn_w // 2, int(top_pct * H)))
    # right (power)
    b = Image.new("RGBA", (btn_w, int(70 * ss)), btn)
    canvas.alpha_composite(b, (W - btn_w // 2, int(0.26 * H)))

    final = canvas.resize((width, height), Image.LANCZOS)
    final = add_drop_shadow(final, offset=(0, 30), blur=55, alpha=140, pad=110)
    final.save(out_path, "WEBP", quality=92, method=6)
    print(f"  ✔ {out_path.relative_to(ROOT)}  {final.size}")


# ---------- MacBook Pro (lid only, straight-on) ----------

def make_macbook(shot_path: Path, out_path: Path, width: int = 1400) -> None:
    ss = 2
    # Lid: 16:10 screen + thick uniform bezel
    bezel = int(28 * ss)
    base_h = int(34 * ss)  # visible chassis edge
    lid_radius = int(22 * ss)
    base_radius_top = int(6 * ss)
    base_radius_bottom = int(20 * ss)

    screen_w = width - 2 * (bezel // ss)
    screen_h = int(screen_w * 10 / 16)
    lid_h_logical = screen_h + 2 * (bezel // ss)
    base_h_logical = base_h // ss
    height = lid_h_logical + base_h_logical

    W, H = width * ss, height * ss
    LID_H = lid_h_logical * ss

    # Lid body
    lid_grad = vertical_gradient(
        (W, LID_H), top_color=(0x32, 0x32, 0x34), bottom_color=(0x14, 0x14, 0x16)
    ).convert("RGBA")
    lid = Image.new("RGBA", (W, LID_H), (0, 0, 0, 0))
    # Round only the top corners (bottom flush against base)
    lid_mask = Image.new("L", (W, LID_H), 0)
    ld = ImageDraw.Draw(lid_mask)
    ld.rounded_rectangle((0, 0, W - 1, LID_H - 1), radius=lid_radius, fill=255)
    # Square off bottom corners
    ld.rectangle((0, LID_H - lid_radius, W, LID_H), fill=255)
    lid.paste(lid_grad, (0, 0), lid_mask)

    # Subtle inner stroke
    stroke = Image.new("RGBA", (W, LID_H), (0, 0, 0, 0))
    ImageDraw.Draw(stroke).rounded_rectangle(
        (0, 0, W - 1, LID_H - 1), radius=lid_radius, outline=(255, 255, 255, 22), width=int(2 * ss)
    )
    lid.alpha_composite(stroke)

    # Screen
    sw_px = screen_w * ss
    sh_px = screen_h * ss
    shot = Image.open(shot_path).convert("RGB")
    shot = cover_fit(shot, sw_px, sh_px).convert("RGBA")
    screen_radius = int(4 * ss)
    shot.putalpha(rounded_mask((sw_px, sh_px), screen_radius))

    inner_black = Image.new("RGBA", (sw_px, sh_px), (0, 0, 0, 0))
    inner_black.paste((0, 0, 0, 255), (0, 0), rounded_mask((sw_px, sh_px), screen_radius))
    lid.alpha_composite(inner_black, (bezel, bezel))
    lid.alpha_composite(shot, (bezel, bezel))

    # Front camera (tiny)
    cam_d = int(5 * ss)
    cam = Image.new("RGBA", (cam_d, cam_d), (0, 0, 0, 0))
    ImageDraw.Draw(cam).ellipse((0, 0, cam_d - 1, cam_d - 1), fill=(6, 6, 8, 255))
    lid.alpha_composite(cam, ((W - cam_d) // 2, int(7 * ss)))

    # Compose canvas
    canvas = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    canvas.alpha_composite(lid, (0, 0))

    # Base / chassis edge — wider than the lid so it reads as the closed laptop body
    base_w_ext = int(W * 1.07)
    base_h_px = base_h
    base = Image.new("RGBA", (base_w_ext, base_h_px), (0, 0, 0, 0))
    base_grad = vertical_gradient(
        (base_w_ext, base_h_px),
        top_color=(0x32, 0x32, 0x34),
        bottom_color=(0x10, 0x10, 0x12),
    ).convert("RGBA")
    base_mask = Image.new("L", (base_w_ext, base_h_px), 0)
    bd = ImageDraw.Draw(base_mask)
    bd.rounded_rectangle(
        (0, 0, base_w_ext - 1, base_h_px - 1),
        radius=base_radius_bottom,
        fill=255,
    )
    # square off top corners (so the chassis sits flush against the lid)
    bd.rectangle((0, 0, base_w_ext, base_radius_top), fill=255)
    base.paste(base_grad, (0, 0), base_mask)

    # Inner stroke on the base for definition
    base_stroke = Image.new("RGBA", (base_w_ext, base_h_px), (0, 0, 0, 0))
    ImageDraw.Draw(base_stroke).rounded_rectangle(
        (0, 0, base_w_ext - 1, base_h_px - 1),
        radius=base_radius_bottom,
        outline=(255, 255, 255, 24),
        width=int(2 * ss),
    )
    base.alpha_composite(base_stroke)

    # Hinge cutout (the dark slot where the lid meets the body)
    hinge_w = int(W * 0.6)
    hinge_h = int(5 * ss)
    hinge = Image.new("RGBA", (hinge_w, hinge_h), (0, 0, 0, 0))
    ImageDraw.Draw(hinge).rounded_rectangle(
        (0, 0, hinge_w - 1, hinge_h - 1), radius=hinge_h // 2, fill=(0, 0, 0, 230)
    )
    base.alpha_composite(hinge, ((base_w_ext - hinge_w) // 2, 0))

    # Trackpad hint (dark slot near bottom-center)
    pad_w = int(W * 0.22)
    pad_h = int(3 * ss)
    pad = Image.new("RGBA", (pad_w, pad_h), (0, 0, 0, 0))
    ImageDraw.Draw(pad).rounded_rectangle(
        (0, 0, pad_w - 1, pad_h - 1), radius=pad_h // 2, fill=(0, 0, 0, 100)
    )
    base.alpha_composite(pad, ((base_w_ext - pad_w) // 2, base_h_px - pad_h - int(6 * ss)))

    base_x = (W - base_w_ext) // 2
    canvas.alpha_composite(base, (base_x, LID_H))

    final = canvas.resize((width, height), Image.LANCZOS)
    final = add_drop_shadow(final, offset=(0, 28), blur=55, alpha=130, pad=140)
    final.save(out_path, "WEBP", quality=92, method=6)
    print(f"  ✔ {out_path.relative_to(ROOT)}  {final.size}")


# ---------- iPad Pro (portrait) ----------

def make_ipad(shot_path: Path, out_path: Path, width: int = 800) -> None:
    ss = 2
    aspect = 4 / 3  # height / width
    height = int(width * aspect)
    W, H = width * ss, height * ss

    bezel = int(22 * ss)
    outer_r = int(36 * ss)
    inner_r = int(20 * ss)

    frame_grad = vertical_gradient(
        (W, H), top_color=(0x3a, 0x3a, 0x3c), bottom_color=(0x16, 0x16, 0x18)
    ).convert("RGBA")
    frame = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    frame.paste(frame_grad, (0, 0), rounded_mask((W, H), outer_r))

    stroke = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(stroke).rounded_rectangle(
        (0, 0, W - 1, H - 1), radius=outer_r, outline=(255, 255, 255, 24), width=int(2 * ss)
    )
    frame.alpha_composite(stroke)

    iw, ih = W - 2 * bezel, H - 2 * bezel
    shot = Image.open(shot_path).convert("RGB")
    shot = cover_fit(shot, iw, ih).convert("RGBA")
    shot.putalpha(rounded_mask((iw, ih), inner_r))

    inner_black = Image.new("RGBA", (iw, ih), (0, 0, 0, 0))
    inner_black.paste((0, 0, 0, 255), (0, 0), rounded_mask((iw, ih), inner_r))

    canvas = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    canvas.alpha_composite(frame)
    canvas.alpha_composite(inner_black, (bezel, bezel))
    canvas.alpha_composite(shot, (bezel, bezel))

    # Front camera (top center, portrait)
    cam_d = int(7 * ss)
    cam = Image.new("RGBA", (cam_d, cam_d), (0, 0, 0, 0))
    ImageDraw.Draw(cam).ellipse((0, 0, cam_d - 1, cam_d - 1), fill=(8, 8, 10, 255))
    canvas.alpha_composite(cam, ((W - cam_d) // 2, int(8 * ss)))

    final = canvas.resize((width, height), Image.LANCZOS)
    final = add_drop_shadow(final, offset=(0, 26), blur=50, alpha=130, pad=120)
    final.save(out_path, "WEBP", quality=92, method=6)
    print(f"  ✔ {out_path.relative_to(ROOT)}  {final.size}")


# ---------- main ----------

def main():
    print("Generating mockups...")
    make_iphone(SRC_DIR / "where2beach.png", OUT_DIR / "iphone-where2beach.webp", width=560)
    make_macbook(SRC_DIR / "flow.png",       OUT_DIR / "macbook-flow.webp",       width=1400)
    make_ipad(SRC_DIR / "smoky.png",         OUT_DIR / "ipad-smoky.webp",         width=780)
    make_iphone(SRC_DIR / "antonela.png",    OUT_DIR / "iphone-antonela.webp",    width=420)
    print("Done.")


if __name__ == "__main__":
    main()

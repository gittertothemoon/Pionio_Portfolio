#!/usr/bin/env python3
"""Build Publer bulk CSV for W6 (22-28 giu 2026).
Exclude 08:00 Morning slots (schedulati separatamente) e Reel Gio 25 (skip dedicato).
"""
import csv
import os
from pathlib import Path

COMMIT = "2491af60552429a0f4c5f8824d3c8177e57440f5"
REPO = "gittertothemoon/Pionio_Portfolio"
WEEK_DIR = Path(__file__).parent / "settimana-06-giu-2026"
OUT_CSV = WEEK_DIR / "settimana-06-publer-bulk.csv"

POSTS = [
    ("1-lun-22-13-educational-cinque-segnali", "2026-06-22", "13:00"),
    ("1-lun-22-19-manifesto-ricominciare",     "2026-06-22", "19:30"),
    ("2-mar-23-13-pillola-sito-che-serve",     "2026-06-23", "13:00"),
    ("2-mar-23-16-frame",                       "2026-06-23", "16:00"),
    ("2-mar-23-19-reactive-cambiare-vecchio",  "2026-06-23", "19:30"),
    ("3-mer-24-13-hero-invecchia-male",         "2026-06-24", "13:00"),
    ("3-mer-24-19-bts-audit-pre-rifacimento",   "2026-06-24", "19:30"),
    ("4-gio-25-19-metodo-togliere",             "2026-06-25", "19:30"),
    ("5-ven-26-13-caso-studio-rifacciamolo",    "2026-06-26", "13:00"),
    ("5-ven-26-16-frame",                       "2026-06-26", "16:00"),
    ("5-ven-26-19-riflessione-rifacciamolo",    "2026-06-26", "19:30"),
    ("6-sab-27-13-mark-rifare-in-tempo",        "2026-06-27", "13:00"),
    ("6-sab-27-19-saved-wayback",               "2026-06-27", "19:30"),
    ("7-dom-28-13-brief-settimana-7",           "2026-06-28", "13:00"),
    ("7-dom-28-19-question-eta-sito",           "2026-06-28", "19:30"),
]

HEADER = [
    "Date - Intl. format or prompt",
    "Text",
    "Link(s) - Separated by comma for FB carousels",
    "Media URL(s) - Separated by comma",
    "Title - For the video, pin, PDF ..",
    "Label(s) - Separated by comma",
    "Alt text(s) - Separated by ||",
    "Comment(s) - Separated by ||",
    "Pin board, FB album, or Google category",
    "Post subtype - I.e. story, reel, PDF ..",
    "CTA - For Facebook links or Google",
    "Reminder - For stories, reels, shorts, and TikToks",
]

def jsdelivr(folder, fname):
    return f"https://cdn.jsdelivr.net/gh/{REPO}@{COMMIT}/instagram/content/settimana-06-giu-2026/{folder}/out/{fname}"

rows = [HEADER]
for folder, date, time in POSTS:
    out_dir = WEEK_DIR / folder / "out"
    files = sorted(os.listdir(out_dir))
    media_urls = ",".join(jsdelivr(folder, f) for f in files)
    caption = (WEEK_DIR / folder / "caption.txt").read_text().strip()
    rows.append([
        f"{date} {time}",
        caption,
        "",
        media_urls,
        "", "", "", "", "", "", "", "",
    ])

with open(OUT_CSV, "w", newline="") as f:
    w = csv.writer(f, quoting=csv.QUOTE_ALL)
    w.writerows(rows)

print(f"Wrote {OUT_CSV} — {len(rows)-1} posts")
for r in rows[1:]:
    n_media = r[3].count(",") + 1 if r[3] else 0
    print(f"  {r[0]}  ({n_media} media)")

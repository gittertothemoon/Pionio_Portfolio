#!/usr/bin/env python3
"""Build Publer bulk CSV for W10 (20-26 lug 2026, 'Decisioni di design') — 22 post."""
import csv
import os
from pathlib import Path

COMMIT = "ecf8e441d7c728652a26c5316650c98f0b48922f"
REPO = "gittertothemoon/Pionio_Portfolio"
WEEK_SLUG = "settimana-10-lug-2026"
WEEK_DIR = Path(__file__).parent / WEEK_SLUG
OUT_CSV = WEEK_DIR / "settimana-10-publer-bulk.csv"

POSTS = [
    ("1-lun-20-08-morning-decidere",              "2026-07-20", "08:30"),
    ("1-lun-20-13-educational-cinque-decisioni",  "2026-07-20", "13:00"),
    ("1-lun-20-19-manifesto-sottrarre-costoso",   "2026-07-20", "19:30"),
    ("2-mar-21-08-morning-una",                   "2026-07-21", "08:30"),
    ("2-mar-21-13-pillola-una-per-sezione",       "2026-07-21", "13:00"),
    ("2-mar-21-16-frame",                         "2026-07-21", "16:00"),
    ("2-mar-21-19-reactive-design-completo",      "2026-07-21", "19:30"),
    ("3-mer-22-08-morning-togliere",              "2026-07-22", "08:30"),
    ("3-mer-22-13-hero-lista-da-togliere",        "2026-07-22", "13:00"),
    ("3-mer-22-19-bts-gerarchia-homepage",        "2026-07-22", "19:30"),
    ("4-gio-23-08-morning-scroll",                "2026-07-23", "08:30"),
    ("4-gio-23-19-metodo-primo-scroll",           "2026-07-23", "19:30"),
    ("5-ven-24-08-morning-tagliare",              "2026-07-24", "08:30"),
    ("5-ven-24-13-caso-studio-homepage-tolta",    "2026-07-24", "13:00"),
    ("5-ven-24-16-frame",                         "2026-07-24", "16:00"),
    ("5-ven-24-19-riflessione-decisioni-design",  "2026-07-24", "19:30"),
    ("6-sab-25-08-morning-invisibile",            "2026-07-25", "08:30"),
    ("6-sab-25-13-mark-sottrarre-non-si-vede",    "2026-07-25", "13:00"),
    ("6-sab-25-19-saved-refactoring-ui",          "2026-07-25", "19:30"),
    ("7-dom-26-08-morning-velocita",              "2026-07-26", "08:30"),
    ("7-dom-26-13-brief-settimana-11",            "2026-07-26", "13:00"),
    ("7-dom-26-19-question-cosa-tolto",           "2026-07-26", "19:30"),
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
    return f"https://cdn.jsdelivr.net/gh/{REPO}@{COMMIT}/instagram/content/{WEEK_SLUG}/{folder}/out/{fname}"

rows = [HEADER]
for folder, date, time in POSTS:
    out_dir = WEEK_DIR / folder / "out"
    files = sorted(os.listdir(out_dir))
    media_urls = ",".join(jsdelivr(folder, f) for f in files)
    caption = (WEEK_DIR / folder / "caption.txt").read_text().strip()
    rows.append([f"{date} {time}", caption, "", media_urls, "", "", "", "", "", "", "", ""])

with open(OUT_CSV, "w", newline="") as f:
    csv.writer(f, quoting=csv.QUOTE_ALL).writerows(rows)

print(f"Wrote {OUT_CSV} — {len(rows)-1} posts")

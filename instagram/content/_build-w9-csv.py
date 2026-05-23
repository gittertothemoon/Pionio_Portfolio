#!/usr/bin/env python3
"""Build Publer bulk CSV for W9 (13-19 lug 2026, 'Discovery') — 22 post incl. Morning."""
import csv
import os
from pathlib import Path

COMMIT = "67c23e86a13cf45d73d2d2506284f77a21077f2e"
REPO = "gittertothemoon/Pionio_Portfolio"
WEEK_SLUG = "settimana-09-lug-2026"
WEEK_DIR = Path(__file__).parent / WEEK_SLUG
OUT_CSV = WEEK_DIR / "settimana-09-publer-bulk.csv"

POSTS = [
    ("1-lun-13-08-morning-domande",                    "2026-07-13", "08:30"),
    ("1-lun-13-13-educational-cinque-domande-discovery","2026-07-13", "13:00"),
    ("1-lun-13-19-manifesto-disegnare-cieco",          "2026-07-13", "19:30"),
    ("2-mar-14-08-morning-meta",                       "2026-07-14", "08:30"),
    ("2-mar-14-13-pillola-discovery-meta-progetto",    "2026-07-14", "13:00"),
    ("2-mar-14-16-frame",                              "2026-07-14", "16:00"),
    ("2-mar-14-19-reactive-brief-autocompilato",       "2026-07-14", "19:30"),
    ("3-mer-15-08-morning-vertigine",                  "2026-07-15", "08:30"),
    ("3-mer-15-13-hero-non-si-chiede",                 "2026-07-15", "13:00"),
    ("3-mer-15-19-bts-documento-discovery",            "2026-07-15", "19:30"),
    ("4-gio-16-08-morning-tre-artefatti",              "2026-07-16", "08:30"),
    ("4-gio-16-19-metodo-tre-artefatti",               "2026-07-16", "19:30"),
    ("5-ven-17-08-morning-capire",                     "2026-07-17", "08:30"),
    ("5-ven-17-13-caso-studio-discovery-due-settimane","2026-07-17", "13:00"),
    ("5-ven-17-16-frame",                              "2026-07-17", "16:00"),
    ("5-ven-17-19-riflessione-sulla-discovery",        "2026-07-17", "19:30"),
    ("6-sab-18-08-morning-silenzio",                   "2026-07-18", "08:30"),
    ("6-sab-18-13-mark-capire-meta-disegnare",         "2026-07-18", "13:00"),
    ("6-sab-18-19-saved-mom-test",                     "2026-07-18", "19:30"),
    ("7-dom-19-08-morning-decidere",                   "2026-07-19", "08:30"),
    ("7-dom-19-13-brief-settimana-10",                 "2026-07-19", "13:00"),
    ("7-dom-19-19-question-quante-domande",            "2026-07-19", "19:30"),
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

#!/usr/bin/env python3
"""Build Publer bulk CSV for W11 (27 lug - 2 ago 2026, 'Velocità e SEO tecnico') — 22 post."""
import csv
import os
from pathlib import Path

COMMIT = "d3bacf1384fb49b96f2bc8b3652a7887884e69af"
REPO = "gittertothemoon/Pionio_Portfolio"
WEEK_SLUG = "settimana-11-lug-2026"
WEEK_DIR = Path(__file__).parent / WEEK_SLUG
OUT_CSV = WEEK_DIR / "settimana-11-publer-bulk.csv"

POSTS = [
    ("1-lun-27-08-morning-veloce",                   "2026-07-27", "08:30"),
    ("1-lun-27-13-educational-cinque-da-ottimizzare","2026-07-27", "13:00"),
    ("1-lun-27-19-manifesto-tre-secondi",            "2026-07-27", "19:30"),
    ("2-mar-28-08-morning-peso",                     "2026-07-28", "08:30"),
    ("2-mar-28-13-pillola-javascript-piombo",        "2026-07-28", "13:00"),
    ("2-mar-28-16-frame",                            "2026-07-28", "16:00"),
    ("2-mar-28-19-reactive-lighthouse-non-realta",   "2026-07-28", "19:30"),
    ("3-mer-29-08-morning-immagini",                 "2026-07-29", "08:30"),
    ("3-mer-29-13-hero-immagini-peso",               "2026-07-29", "13:00"),
    ("3-mer-29-19-bts-immagini-pionio",              "2026-07-29", "19:30"),
    ("4-gio-30-08-morning-test",                     "2026-07-30", "08:30"),
    ("4-gio-30-19-metodo-quattro-test",              "2026-07-30", "19:30"),
    ("5-ven-31-08-morning-lentezza",                 "2026-07-31", "08:30"),
    ("5-ven-31-13-caso-studio-otto-secondi",         "2026-07-31", "13:00"),
    ("5-ven-31-16-frame",                            "2026-07-31", "16:00"),
    ("5-ven-31-19-riflessione-cinque-giorni-velocita","2026-07-31", "19:30"),
    ("6-sab-1-08-morning-cura",                      "2026-08-01", "08:30"),
    ("6-sab-1-13-mark-velocita-cura",                "2026-08-01", "13:00"),
    ("6-sab-1-19-saved-squoosh",                     "2026-08-01", "19:30"),
    ("7-dom-2-08-morning-misurare",                  "2026-08-02", "08:30"),
    ("7-dom-2-13-brief-settimana-12",                "2026-08-02", "13:00"),
    ("7-dom-2-19-question-secondi-sito-lento",       "2026-08-02", "19:30"),
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
    files = sorted([f for f in os.listdir(out_dir) if f.endswith(".png") or f.endswith(".mp4")])
    if not files:
        print(f"SKIP {folder}: no rendered output yet")
        continue
    media_urls = ",".join(jsdelivr(folder, f) for f in files)
    caption = (WEEK_DIR / folder / "caption.txt").read_text().strip()
    rows.append([f"{date} {time}", caption, "", media_urls, "", "", "", "", "", "", "", ""])

with open(OUT_CSV, "w", newline="") as f:
    csv.writer(f, quoting=csv.QUOTE_ALL).writerows(rows)

print(f"Wrote {OUT_CSV} — {len(rows)-1} posts pronti")

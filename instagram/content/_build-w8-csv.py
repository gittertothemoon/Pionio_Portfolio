#!/usr/bin/env python3
"""Build Publer bulk CSV for W8 (6-12 lug 2026, 'Il primo contatto')."""
import csv
import os
from pathlib import Path

COMMIT = "1a3622c3b8f669e83ecf6b10f5623aa65f5283ce"
REPO = "gittertothemoon/Pionio_Portfolio"
WEEK_SLUG = "settimana-08-lug-2026"
WEEK_DIR = Path(__file__).parent / WEEK_SLUG
OUT_CSV = WEEK_DIR / "settimana-08-publer-bulk.csv"

POSTS = [
    ("1-lun-6-08-morning-mail",                   "2026-07-06", "08:30"),
    ("1-lun-6-13-educational-cinque-cose-mail",  "2026-07-06", "13:00"),
    ("1-lun-6-19-manifesto-mail-bella",          "2026-07-06", "19:30"),
    ("2-mar-7-08-morning-voce",                   "2026-07-07", "08:30"),
    ("2-mar-7-13-pillola-call-vale-piu",         "2026-07-07", "13:00"),
    ("2-mar-7-16-frame",                          "2026-07-07", "16:00"),
    ("2-mar-7-19-reactive-mail-morta",           "2026-07-07", "19:30"),
    ("3-mer-8-08-morning-settimana",              "2026-07-08", "08:30"),
    ("3-mer-8-13-hero-primi-sette-giorni",        "2026-07-08", "13:00"),
    ("3-mer-8-19-bts-mood-call",                  "2026-07-08", "19:30"),
    ("4-gio-9-08-morning-trascrizione",           "2026-07-09", "08:30"),
    ("4-gio-9-19-metodo-trascrizione",            "2026-07-09", "19:30"),
    ("5-ven-10-08-morning-inizio",                "2026-07-10", "08:30"),
    ("5-ven-10-13-caso-studio-mail-diventata-sito","2026-07-10", "13:00"),
    ("5-ven-10-16-frame",                         "2026-07-10", "16:00"),
    ("5-ven-10-19-riflessione-sette-giorni",      "2026-07-10", "19:30"),
    ("6-sab-11-08-morning-carta",                 "2026-07-11", "08:30"),
    ("6-sab-11-13-mark-primo-contatto-progetto",  "2026-07-11", "13:00"),
    ("6-sab-11-19-saved-design-is-a-job",         "2026-07-11", "19:30"),
    ("7-dom-12-08-morning-discovery",             "2026-07-12", "08:30"),
    ("7-dom-12-13-brief-settimana-9",             "2026-07-12", "13:00"),
    ("7-dom-12-19-question-tempo-primo-si",       "2026-07-12", "19:30"),
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
for r in rows[1:]:
    n_media = r[3].count(",") + 1 if r[3] else 0
    print(f"  {r[0]}  ({n_media} media)  caption[0:60]={r[1][:60]!r}")

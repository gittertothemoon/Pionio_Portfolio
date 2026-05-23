#!/usr/bin/env python3
"""Build Publer bulk CSV for W7 (29 giu - 5 lug 2026).
Exclude 08:00 Morning slots (schedulati separatamente) e Reel Gio (skip dedicato).
"""
import csv
import os
from pathlib import Path

COMMIT = "25261b8546531e025e226a73e47a9c5e8e43ca8d"
REPO = "gittertothemoon/Pionio_Portfolio"
WEEK_DIR = Path(__file__).parent / "settimana-07-giu-2026"
OUT_CSV = WEEK_DIR / "settimana-07-publer-bulk.csv"

# (folder, date, time)
POSTS = [
    ("1-lun-29-08-morning-no",                  "2026-06-29", "08:30"),
    ("1-lun-29-13-educational-cinque-tipi-no", "2026-06-29", "13:00"),
    ("1-lun-29-19-manifesto-nicchia-igiene",   "2026-06-29", "19:30"),
    ("2-mar-30-08-morning-identita",            "2026-06-30", "08:30"),
    ("2-mar-30-13-pillola-scegliere-non-sei",  "2026-06-30", "13:00"),
    ("2-mar-30-16-frame",                       "2026-06-30", "16:00"),
    ("2-mar-30-19-reactive-designer-fa-tutto", "2026-06-30", "19:30"),
    ("3-mer-1-08-morning-cornice",              "2026-07-01", "08:30"),
    ("3-mer-1-13-hero-non-faccio",              "2026-07-01", "13:00"),
    ("3-mer-1-19-bts-checklist-accetto",        "2026-07-01", "19:30"),
    ("4-gio-2-08-morning-tre",                  "2026-07-02", "08:30"),
    ("4-gio-2-19-metodo-tre-domande",           "2026-07-02", "19:30"),
    ("5-ven-3-08-morning-rifiuto",              "2026-07-03", "08:30"),
    ("5-ven-3-13-caso-studio-quando-ho-detto-no","2026-07-03", "13:00"),
    ("5-ven-3-16-frame",                        "2026-07-03", "16:00"),
    ("5-ven-3-19-riflessione-dicendo-no",       "2026-07-03", "19:30"),
    ("6-sab-4-08-morning-confini",              "2026-07-04", "08:30"),
    ("6-sab-4-13-mark-nicchia-ti-sceglie",      "2026-07-04", "13:00"),
    ("6-sab-4-19-saved-company-of-one",         "2026-07-04", "19:30"),
    ("7-dom-5-08-morning-contatto",             "2026-07-05", "08:30"),
    ("7-dom-5-13-brief-settimana-8",            "2026-07-05", "13:00"),
    ("7-dom-5-19-question-ultimo-no",           "2026-07-05", "19:30"),
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
    return f"https://cdn.jsdelivr.net/gh/{REPO}@{COMMIT}/instagram/content/settimana-07-giu-2026/{folder}/out/{fname}"

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

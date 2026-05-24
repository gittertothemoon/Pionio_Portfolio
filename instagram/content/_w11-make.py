#!/usr/bin/env python3
"""Generatore W11 — produce slides.html per ogni post a partire da template W10.
Per ogni post specifica i campi da sostituire (titolo, sub, eyebrow date, body etc).
"""
from pathlib import Path
import shutil

CONTENT = Path(__file__).parent
W11 = CONTENT / "settimana-11-lug-2026"
W10 = CONTENT / "settimana-10-lug-2026"

def copy_template_and_replace(src_post, dst_post, replacements):
    src_html = (W10 / src_post / "src" / "slides.html").read_text()
    for old, new in replacements:
        if old not in src_html:
            print(f"  WARN: '{old[:60]}...' not found in {src_post}")
        src_html = src_html.replace(old, new)
    (W11 / dst_post / "src" / "slides.html").write_text(src_html)
    print(f"  generated {dst_post}/src/slides.html")

# ─── MORNING P (typographic poster) ───
# Lun 27 — VELOCE
copy_template_and_replace(
    "1-lun-20-08-morning-decidere",
    "1-lun-27-08-morning-veloce",
    [
        ("· 20 LUG", "· 27 LUG"),
        ("Decidere.", "Veloce."),
        ("Cinque scelte, poi è esecuzione.", "Tre secondi prima che il visitatore decida."),
        ("<title>Pionio · Morning Word · 20 LUG</title>", "<title>Pionio · Morning Word · 27 LUG</title>"),
    ],
)
# Mar 28 — PESO
copy_template_and_replace(
    "1-lun-20-08-morning-decidere",
    "2-mar-28-08-morning-peso",
    [
        ("· 20 LUG", "· 28 LUG"),
        ("Decidere.", "Peso."),
        ("Cinque scelte, poi è esecuzione.", "Il JavaScript medio del web del 2026 pesa più di Doom intero."),
        ("<title>Pionio · Morning Word · 20 LUG</title>", "<title>Pionio · Morning Word · 28 LUG</title>"),
    ],
)
# Ven 31 — LENTEZZA
copy_template_and_replace(
    "1-lun-20-08-morning-decidere",
    "5-ven-31-08-morning-lentezza",
    [
        ("· 20 LUG", "· 31 LUG"),
        ("Decidere.", "Lentezza."),
        ("Cinque scelte, poi è esecuzione.", "Il sintomo non è il sito che si carica piano. È quello che apri e chiudi subito."),
        ("<title>Pionio · Morning Word · 20 LUG</title>", "<title>Pionio · Morning Word · 31 LUG</title>"),
    ],
)
# Dom 2 ago — MISURARE
copy_template_and_replace(
    "1-lun-20-08-morning-decidere",
    "7-dom-2-08-morning-misurare",
    [
        ("· 20 LUG", "· 2 AGO"),
        ("Decidere.", "Misurare."),
        ("Cinque scelte, poi è esecuzione.", "Quello che non misuri, non lo migliori."),
        ("<title>Pionio · Morning Word · 20 LUG</title>", "<title>Pionio · Morning Word · 2 AGO</title>"),
    ],
)

print("\nMorning P (Lun, Mar, Ven, Dom) generati.")

# ─── MANIFESTO Lun 27 ───
copy_template_and_replace(
    "1-lun-20-19-manifesto-sottrarre-costoso",
    "1-lun-27-19-manifesto-tre-secondi",
    [
        ("· Manifesto · Sottrarre", "· Manifesto · Tre secondi"),
        ("PIONIO · MANIFESTO", "PIONIO · MANIFESTO"),
        ("UN ALTRO MODO DI PENSARLO", "UN ALTRO MODO DI PENSARLO"),
        ("<em>Sottrarre</em> è la parte più scomoda.", "<em>Tre secondi</em>, poi non esiste."),
        ("Aggiungere lo fai in dieci minuti, sottrarre in un workshop di un'ora. Significa dire al cliente che la sezione che gli piaceva esce — è una scelta che pesa più di quanto sembra.", "Se il sito non si carica in tre secondi, per metà dei visitatori non esiste. Non lo vedono nemmeno aprirsi: vedono uno schermo bianco e tornano indietro."),
    ],
)

# ─── PILLOLA Mar 28 ───
copy_template_and_replace(
    "2-mar-21-13-pillola-una-per-sezione",
    "2-mar-28-13-pillola-javascript-piombo",
    [
        ("· Pillola · Una per sezione", "· Pillola · Javascript piombo"),
        ("Una cosa <em>per sezione</em>.", "Il <em>JavaScript</em> è il piombo del web."),
        ("Una sezione che chiede al visitatore di guardare un'immagine, leggere un testo, cliccare un pulsante e scaricare un PDF non sta facendo quattro cose. Ne sta facendo zero.", "Ogni libreria che aggiungi pesa decine di kilobyte che il browser deve scaricare, parsare, eseguire. Tre secondi di caricamento si fanno con tre megabyte di JS importati per fare quello che basterebbe in trenta righe."),
    ],
)

# ─── REACTIVE Mar 28 ───
copy_template_and_replace(
    "2-mar-21-19-reactive-design-completo",
    "2-mar-28-19-reactive-lighthouse-non-realta",
    [
        ("· Reactive · Design completo", "· Reactive · Lighthouse non realtà"),
        ("Il <em>completo</em> è il nemico del leggibile.", "Il punteggio <em>Lighthouse</em> non è la realtà."),
        ("Mi capita spesso, guardando siti italiani di studi creativi, di trovare lo stesso pattern: una homepage che vuole mostrare tutto. Servizi, casi studio, blog, team, partner, certificazioni, formulario, footer fitto. La pretesa di completezza diventa la prima causa di siti illeggibili.", "Lighthouse gira in un ambiente controllato — Chrome desktop, rete simulata, CPU rallentata. Un punteggio 95 lì non significa che il sito è veloce per il visitatore vero sull'iPhone della metro. Va letto come un termometro, non come un voto finale."),
    ],
)

# ─── BTS Mer 29 ───
copy_template_and_replace(
    "3-mer-22-19-bts-gerarchia-homepage",
    "3-mer-29-19-bts-immagini-pionio",
    [
        ("· BTS · Gerarchia homepage", "· BTS · Immagini Pionio"),
        ("<em>Come</em> decido la gerarchia di una homepage.", "<em>Come</em> tratto le immagini in un progetto."),
        ("Prima di Figma, un taccuino. Due ore con una lista di sezioni davanti, una matita, e una domanda sola: cosa entra negli occhi nel primo secondo? La gerarchia non si trova al colore, si trova ai blocchi.", "Il workflow è sempre lo stesso: Squoosh per la compressione AVIF/WebP (qualità 65–75, abbastanza per il web), srcset con tre dimensioni 480/960/1920, lazy loading sotto la piega, larghezza dichiarata per evitare layout shift. Non è glamour ma fa la differenza vera sulle prestazioni."),
    ],
)

# ─── METODO Gio 30 ───
copy_template_and_replace(
    "4-gio-23-19-metodo-primo-scroll",
    "4-gio-30-19-metodo-quattro-test",
    [
        ("· Metodo · Primo scroll", "· Metodo · Quattro test"),
        ("La regola del <em>primo scroll</em>.", "<em>Quattro test</em> prima di consegnare."),
        ("Sopra la piega — il primo viewport che il visitatore vede senza scorrere — devono diventare chiare tre cose in pochi secondi. Chi sei. Cosa fai. Perché contattarti. Non come tre cartelli paralleli, ma come tre risposte da una lettura veloce.", "PageSpeed Insights su mobile e desktop (target 90+). Search Console aperta in produzione per confermare indicizzazione. WebPageTest da rete reale (3G simulato) per vedere com'è davvero. Lighthouse in DevTools con throttling CPU 4x per il caso pessimistico. Solo allora il sito è pronto."),
    ],
)

# ─── RIFLESSIONE Ven 31 ───
copy_template_and_replace(
    "5-ven-24-19-riflessione-decisioni-design",
    "5-ven-31-19-riflessione-cinque-giorni-velocita",
    [
        ("· Riflessione · Decisioni design", "· Riflessione · Velocità"),
        ("CINQUE GIORNI, TRE COSE", "CINQUE GIORNI, TRE COSE"),
        ("Tre cose che <em>restano</em>.", "Tre cose che <em>restano</em>."),
        ("Prima: la gerarchia decide tutto, e la decidi prima del colore. Seconda: togliere costa fatica, e paga in chiarezza. Terza: la sezione che chiede due cose ne ottiene zero, sempre.", "Prima: tre secondi sono il limite vero, sotto cui un sito esiste. Seconda: le immagini sono il 70% del peso, e quasi sempre il primo intervento utile. Terza: Lighthouse è un test, non la realtà mobile — vai a guardare WebPageTest su rete vera."),
    ],
)

# ─── MARK Sab 1 ago ───
copy_template_and_replace(
    "6-sab-25-13-mark-sottrarre-non-si-vede",
    "6-sab-1-13-mark-velocita-cura",
    [
        ("· Mark · Sottrarre non si vede", "· Mark · Velocità cura"),
        ("SATURDAY MARK · 25 LUG", "SATURDAY MARK · 1 AGO"),
        ("RIFLESSIONE · SETTIMANA #10", "RIFLESSIONE · SETTIMANA #11"),
        ("<em>Sottrarre</em> non si vede. È la parte che produce di più.", "La <em>velocità</em> è una forma di cura."),
    ],
)

# ─── BRIEF Dom 2 ago ───
copy_template_and_replace(
    "7-dom-26-13-brief-settimana-11",
    "7-dom-2-13-brief-settimana-12",
    [
        ("· Brief · Settimana #11", "· Brief · Settimana #12"),
        ("· 26 LUG", "· 2 AGO"),
        ("SETTIMANA #11 · DA LUN 27", "SETTIMANA #12 · DA LUN 3"),
        ("Velocità e <em>SEO tecnico</em>.", "<em>Lanciare</em> bene."),
    ],
)

# ─── QUESTION Dom 2 ago ───
copy_template_and_replace(
    "7-dom-26-19-question-cosa-tolto",
    "7-dom-2-19-question-secondi-sito-lento",
    [
        ("· Question · Cosa tolto", "· Question · Secondi sito lento"),
        ("SUNDAY QUESTION · 26 LUG", "SUNDAY QUESTION · 2 AGO"),
        ("DOMANDA #9 · WEEKLY", "DOMANDA #10 · WEEKLY"),
        ("Qual è l'ultima cosa che hai <em>tolto</em> da un progetto?", "Dopo quanti <em>secondi</em> chiudi un sito lento?"),
        ("Una sezione, una funzione, una feature, una voce di menù. Una cosa pensata, costruita, e poi rimossa con cura. Quanto è stato difficile?", "Pensa all'ultima volta che hai aperto un link che non si caricava. Tre secondi? Cinque? Hai aspettato fino in fondo o hai chiuso prima?"),
    ],
)

print("\nSingle-slide posts (Manifesto, Pillola, Reactive, BTS, Metodo, Riflessione, Mark, Brief, Question) generati.")


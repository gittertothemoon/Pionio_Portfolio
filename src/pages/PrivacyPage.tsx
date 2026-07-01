import { Head } from 'vite-react-ssg';
import { m } from 'framer-motion';
import { PageHeader } from '../components/PageHeader';
import { Footer } from '../components/Footer';

const url = 'https://pionio.it/privacy';
const title = 'Privacy & Cookie Policy | PIONIO';
const description =
    'Informativa sul trattamento dei dati personali di pionio.it: chi tratta i dati, quali dati, perché, per quanto tempo e i tuoi diritti. Nessun cookie di profilazione.';

// Ultima revisione dell'informativa (aggiornare quando cambia il contenuto).
const lastUpdate = '27 maggio 2026';

export default function PrivacyPage() {
    return (
        <div className="w-full min-h-[100dvh] bg-zinc-950 text-zinc-50 font-sans selection:bg-forest-500/30 selection:text-forest-100 antialiased">
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <link rel="canonical" href={url} />
                <meta name="robots" content="index,follow" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={url} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
            </Head>

            <a
                href="#main"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-forest-600 focus:text-white focus:rounded-md"
            >
                Skip to content
            </a>

            <PageHeader />

            <main id="main" className="pt-40 md:pt-48 pb-24 px-6 md:px-12 lg:px-24">
                <m.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="max-w-3xl mx-auto flex flex-col gap-10"
                >
                    <header className="flex flex-col gap-6">
                        <div className="flex items-center gap-4">
                            <div className="h-[1px] w-12 bg-forest-500/50" />
                            <span className="text-forest-400 font-mono text-xs uppercase tracking-widest">
                                Privacy & Cookie
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-sans tracking-tight text-white leading-[1.05]">
                            Informativa privacy
                        </h1>
                        <p className="text-zinc-400 font-mono text-xs uppercase tracking-widest">
                            Ultimo aggiornamento: {lastUpdate}
                        </p>
                        <p className="text-zinc-300 text-lg leading-relaxed font-light">
                            Questa pagina spiega in modo chiaro come tratto i dati personali di chi visita pionio.it
                            o mi scrive tramite il sito. In sintesi: raccolgo solo i dati che mi mandi tu per
                            rispondere alle tue richieste e qualche statistica di traffico anonima. Niente cookie di
                            profilazione, niente vendita di dati a terzi.
                        </p>
                    </header>

                    <Section title="1. Chi tratta i tuoi dati (titolare)">
                        <p>
                            Il titolare del trattamento è <strong>Ivan Pantò</strong>, persona fisica che opera con
                            il marchio <strong>Pionio</strong>. Per qualsiasi questione relativa alla privacy puoi
                            scrivere a{' '}
                            <a className="text-forest-400 hover:text-forest-300 underline" href="mailto:pionio.dev@gmail.com">
                                pionio.dev@gmail.com
                            </a>
                            .
                        </p>
                    </Section>

                    <Section title="2. Quali dati raccolgo e perché">
                        <p>Tratto i tuoi dati personali in due soli casi:</p>
                        <ul className="flex flex-col gap-4 mt-2">
                            <li>
                                <strong className="text-white">Modulo di contatto.</strong> Quando mi scrivi dal form
                                del sito raccolgo i dati che inserisci: nome, email, messaggio e, se li compili, il
                                tipo di progetto, il budget indicativo e come mi hai trovato. Li uso solo per leggere
                                e rispondere alla tua richiesta. Base giuridica: il riscontro alla tua richiesta e
                                l'eventuale avvio di un rapporto su tua iniziativa (art. 6.1.b GDPR).
                            </li>
                            <li>
                                <strong className="text-white">Statistiche di traffico anonime.</strong> Uso Vercel
                                Analytics e Vercel Speed Insights per capire quante persone visitano il sito e quanto
                                è veloce. Sono strumenti <strong>senza cookie</strong>, che non ti identificano e non
                                ti seguono su altri siti: trattano dati in forma aggregata e anonima. Base giuridica:
                                il mio legittimo interesse a mantenere il sito funzionante e migliorarlo (art. 6.1.f
                                GDPR).
                            </li>
                        </ul>
                        <p className="mt-4">
                            Per ragioni tecniche e di sicurezza (protezione anti-spam del modulo) il sistema legge
                            temporaneamente il tuo indirizzo IP, senza conservarlo in modo stabile.
                        </p>
                    </Section>

                    <Section title="3. Cookie">
                        <p>
                            Il sito <strong>non usa cookie di profilazione né di marketing</strong> e non installa
                            tracciatori pubblicitari di terze parti. Per questo non vedi un banner di consenso: non c'è
                            nulla da consentire. L'unica memoria tecnica eventualmente usata serve a ricordare la
                            lingua che preferisci — è funzionale e non richiede consenso.
                        </p>
                    </Section>

                    <Section title="4. A chi comunico i dati">
                        <p>
                            Non vendo e non cedo i tuoi dati. Mi appoggio solo a fornitori che agiscono come
                            responsabili del trattamento per far funzionare il sito:
                        </p>
                        <ul className="flex flex-col gap-3 mt-2">
                            <li>
                                <strong className="text-white">Resend</strong> — recapita l'email del modulo di
                                contatto alla mia casella.
                            </li>
                            <li>
                                <strong className="text-white">Vercel</strong> — ospita il sito e fornisce le
                                statistiche anonime.
                            </li>
                        </ul>
                        <p className="mt-4">
                            Questi fornitori hanno sede negli Stati Uniti: l'eventuale trasferimento di dati fuori
                            dall'Unione Europea avviene sulla base delle garanzie previste dal GDPR (clausole
                            contrattuali standard e meccanismi equivalenti).
                        </p>
                    </Section>

                    <Section title="5. Per quanto tempo conservo i dati">
                        <p>
                            I messaggi che mi mandi restano nella mia casella di posta per il tempo necessario a
                            gestire la tua richiesta ed eventuali contatti successivi; non finiscono in alcun
                            database. Se vuoi che cancelli la nostra conversazione, basta chiedermelo. Le statistiche
                            di traffico sono anonime e aggregate, quindi non riferibili a te.
                        </p>
                    </Section>

                    <Section title="6. I tuoi diritti">
                        <p>
                            In ogni momento puoi chiedermi di <strong>accedere</strong> ai tuoi dati,{' '}
                            <strong>correggerli</strong>, <strong>cancellarli</strong>, limitarne il trattamento od
                            opporti, e ricevere una copia dei dati che mi hai fornito. Scrivimi a{' '}
                            <a className="text-forest-400 hover:text-forest-300 underline" href="mailto:pionio.dev@gmail.com">
                                pionio.dev@gmail.com
                            </a>{' '}
                            e ti rispondo. Se ritieni che il trattamento violi la normativa, hai diritto di proporre
                            reclamo al{' '}
                            <a
                                className="text-forest-400 hover:text-forest-300 underline"
                                href="https://www.garanteprivacy.it"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Garante per la protezione dei dati personali
                            </a>
                            .
                        </p>
                    </Section>

                    <Section title="7. Aggiornamenti">
                        <p>
                            Se cambierò gli strumenti o il modo in cui tratto i dati, aggiornerò questa pagina e la
                            data di revisione in alto. Ti invito a darci un'occhiata di tanto in tanto.
                        </p>
                    </Section>
                </m.div>
            </main>

            <Footer />
        </div>
    );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <section className="flex flex-col gap-3">
            <h2 className="text-xl md:text-2xl font-sans tracking-tight text-white">{title}</h2>
            <div className="text-zinc-300 text-base leading-relaxed font-light [&_ul]:list-disc [&_ul]:pl-5 [&_li]:text-zinc-300">
                {children}
            </div>
        </section>
    );
}

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PaperPlaneRight, CheckCircle, ArrowClockwise } from '@phosphor-icons/react';
import { useLanguage } from '../context/LanguageContext';

type Status = 'idle' | 'loading' | 'success' | 'error';

type FormState = {
    nome: string;
    email: string;
    tipo_progetto: string;
    budget: string;
    messaggio: string;
    come_trovato: string;
};

const EMPTY_FORM: FormState = {
    nome: '',
    email: '',
    tipo_progetto: '',
    budget: '',
    messaggio: '',
    come_trovato: '',
};

const inputBase =
    'w-full bg-zinc-900/60 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-zinc-600 font-sans outline-none transition-all focus:border-forest-500/60 focus:ring-2 focus:ring-forest-500/20 disabled:opacity-50';

const labelBase = 'text-zinc-400 font-mono text-xs uppercase tracking-widest';

export function ContactCTA() {
    const { t } = useLanguage();
    const [form, setForm] = useState<FormState>(EMPTY_FORM);
    const [status, setStatus] = useState<Status>('idle');
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const update = <K extends keyof FormState>(key: K, value: string) =>
        setForm((prev) => ({ ...prev, [key]: value }));

    const tipoOptions = [
        { value: t('contact_tipo_web'), label: t('contact_tipo_web') },
        { value: t('contact_tipo_ecommerce'), label: t('contact_tipo_ecommerce') },
        { value: t('contact_tipo_app'), label: t('contact_tipo_app') },
        { value: t('contact_tipo_branding'), label: t('contact_tipo_branding') },
        { value: t('contact_tipo_altro'), label: t('contact_tipo_altro') },
    ];

    const budgetOptions = [
        { value: t('contact_budget_low'), label: t('contact_budget_low') },
        { value: t('contact_budget_mid'), label: t('contact_budget_mid') },
        { value: t('contact_budget_high'), label: t('contact_budget_high') },
        { value: t('contact_budget_top'), label: t('contact_budget_top') },
        { value: t('contact_budget_tbd'), label: t('contact_budget_tbd') },
    ];

    const trovatoOptions = [
        { value: t('contact_trovato_instagram'), label: t('contact_trovato_instagram') },
        { value: t('contact_trovato_linkedin'), label: t('contact_trovato_linkedin') },
        { value: t('contact_trovato_portfolio'), label: t('contact_trovato_portfolio') },
        { value: t('contact_trovato_passaparola'), label: t('contact_trovato_passaparola') },
        { value: t('contact_trovato_google'), label: t('contact_trovato_google') },
        { value: t('contact_trovato_altro'), label: t('contact_trovato_altro') },
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.nome.trim() || !form.email.trim()) return;

        setStatus('loading');
        setErrorMsg(null);
        try {
            const resp = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nome: form.nome.trim(),
                    email: form.email.trim(),
                    tipo_progetto: form.tipo_progetto || null,
                    budget: form.budget || null,
                    messaggio: form.messaggio.trim() || null,
                    come_trovato: form.come_trovato || null,
                }),
            });
            if (!resp.ok) {
                const detail = await resp.json().catch(() => null);
                throw new Error(detail?.error || `HTTP ${resp.status}`);
            }
            setStatus('success');
            setForm(EMPTY_FORM);
        } catch (err) {
            setStatus('error');
            setErrorMsg(err instanceof Error ? err.message : 'Unknown error');
        }
    };

    const reset = () => {
        setStatus('idle');
        setErrorMsg(null);
    };

    return (
        <section
            id="contact"
            className="w-full py-32 px-6 md:px-12 lg:px-24 bg-zinc-950 relative overflow-hidden"
        >
            {/* Mesh Gradient Background */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
                <motion.div
                    animate={{ x: ['-5%', '5%', '-5%'], y: ['-5%', '5%', '-5%'] }}
                    transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
                    className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-forest-900/40 rounded-full blur-[120px] mix-blend-screen"
                />
                <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-forest-800/20 rounded-full blur-[100px] mix-blend-screen" />
            </div>

            <div className="max-w-3xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex justify-center items-center gap-4 mb-16"
                >
                    <div className="h-[1px] w-12 bg-forest-500/50" />
                    <span className="text-forest-500 font-mono text-sm tracking-widest">{t('section_num_contact')}</span>
                    <span className="text-forest-400 font-mono text-sm uppercase tracking-widest">
                        {t('contact_label')}
                    </span>
                    <div className="h-[1px] w-12 bg-forest-500/50" />
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-sans tracking-tighter text-white mb-12 leading-[1.1] max-w-4xl mx-auto text-center"
                >
                    {t('contact_headline')}
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ delay: 0.1 }}
                    className="text-zinc-400 text-center text-lg md:text-xl max-w-xl mx-auto mb-16 font-sans"
                >
                    {t('contact_description')}
                </motion.p>

                <AnimatePresence mode="wait">
                    {status === 'success' ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="max-w-xl mx-auto text-center bg-zinc-900/50 border border-forest-500/30 rounded-3xl p-12 backdrop-blur-md"
                        >
                            <CheckCircle
                                weight="duotone"
                                size={56}
                                className="mx-auto text-forest-400 mb-6"
                            />
                            <h3 className="text-2xl md:text-3xl font-sans tracking-tight text-white mb-3">
                                {t('contact_form_success_title')}
                            </h3>
                            <p className="text-zinc-400 mb-8">{t('contact_form_success_body')}</p>
                            <button
                                onClick={reset}
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-white/5 hover:bg-forest-500/20 hover:border-forest-500/30 text-white font-mono text-xs uppercase tracking-widest transition-colors duration-300"
                            >
                                <ArrowClockwise weight="bold" />
                                {t('contact_form_send_another')}
                            </button>
                        </motion.div>
                    ) : (
                        <motion.form
                            key="form"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{ delay: 0.2 }}
                            onSubmit={handleSubmit}
                            className="max-w-xl mx-auto flex flex-col gap-5"
                            noValidate
                        >
                            {/* Nome + Email row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="nome" className={labelBase}>
                                        {t('contact_field_nome')} *
                                    </label>
                                    <input
                                        id="nome"
                                        type="text"
                                        required
                                        value={form.nome}
                                        onChange={(e) => update('nome', e.target.value)}
                                        disabled={status === 'loading'}
                                        autoComplete="name"
                                        className={inputBase}
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="email" className={labelBase}>
                                        {t('contact_field_email')} *
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        value={form.email}
                                        onChange={(e) => update('email', e.target.value)}
                                        disabled={status === 'loading'}
                                        autoComplete="email"
                                        className={inputBase}
                                    />
                                </div>
                            </div>

                            {/* Tipo + Budget row */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="tipo_progetto" className={labelBase}>
                                        {t('contact_field_tipo')}
                                    </label>
                                    <select
                                        id="tipo_progetto"
                                        value={form.tipo_progetto}
                                        onChange={(e) => update('tipo_progetto', e.target.value)}
                                        disabled={status === 'loading'}
                                        className={`${inputBase} appearance-none cursor-pointer pr-10 bg-[length:14px] bg-no-repeat bg-[right_1.25rem_center] bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2371717a%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><polyline points=%226 9 12 15 18 9%22/></svg>')]`}
                                    >
                                        <option value="">{t('contact_select_placeholder')}</option>
                                        {tipoOptions.map((o) => (
                                            <option key={o.value} value={o.value}>
                                                {o.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="budget" className={labelBase}>
                                        {t('contact_field_budget')}
                                    </label>
                                    <select
                                        id="budget"
                                        value={form.budget}
                                        onChange={(e) => update('budget', e.target.value)}
                                        disabled={status === 'loading'}
                                        className={`${inputBase} appearance-none cursor-pointer pr-10 bg-[length:14px] bg-no-repeat bg-[right_1.25rem_center] bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2371717a%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><polyline points=%226 9 12 15 18 9%22/></svg>')]`}
                                    >
                                        <option value="">{t('contact_select_placeholder')}</option>
                                        {budgetOptions.map((o) => (
                                            <option key={o.value} value={o.value}>
                                                {o.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Messaggio */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="messaggio" className={labelBase}>
                                    {t('contact_field_messaggio')}
                                </label>
                                <textarea
                                    id="messaggio"
                                    rows={5}
                                    value={form.messaggio}
                                    onChange={(e) => update('messaggio', e.target.value)}
                                    disabled={status === 'loading'}
                                    placeholder={t('contact_field_messaggio_placeholder')}
                                    className={`${inputBase} resize-y min-h-[140px]`}
                                />
                            </div>

                            {/* Come trovato */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="come_trovato" className={labelBase}>
                                    {t('contact_field_trovato')}{' '}
                                    <span className="lowercase text-zinc-600 normal-case">
                                        ({t('contact_field_optional')})
                                    </span>
                                </label>
                                <select
                                    id="come_trovato"
                                    value={form.come_trovato}
                                    onChange={(e) => update('come_trovato', e.target.value)}
                                    disabled={status === 'loading'}
                                    className={`${inputBase} appearance-none cursor-pointer pr-10 bg-[length:14px] bg-no-repeat bg-[right_1.25rem_center] bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2371717a%22 stroke-width=%222%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><polyline points=%226 9 12 15 18 9%22/></svg>')]`}
                                >
                                    <option value="">{t('contact_select_placeholder')}</option>
                                    {trovatoOptions.map((o) => (
                                        <option key={o.value} value={o.value}>
                                            {o.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Footer: required hint + submit */}
                            <div className="flex flex-col gap-4 mt-2">
                                <div className="flex items-center justify-between flex-wrap gap-3">
                                    <span className="text-zinc-600 font-mono text-xs uppercase tracking-widest">
                                        {t('contact_field_required_hint')}
                                    </span>
                                    <motion.button
                                        type="submit"
                                        disabled={
                                            status === 'loading' ||
                                            !form.nome.trim() ||
                                            !form.email.trim()
                                        }
                                        whileHover={status === 'idle' ? { scale: 1.02 } : undefined}
                                        whileTap={status === 'idle' ? { scale: 0.98 } : undefined}
                                        className="inline-flex items-center gap-2 px-7 py-4 bg-white text-zinc-950 font-medium rounded-full hover:bg-forest-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {status === 'loading' ? (
                                            <>
                                                <motion.span
                                                    animate={{ rotate: 360 }}
                                                    transition={{
                                                        repeat: Infinity,
                                                        duration: 1,
                                                        ease: 'linear',
                                                    }}
                                                    className="w-4 h-4 border-2 border-zinc-950/30 border-t-zinc-950 rounded-full inline-block"
                                                />
                                                {t('contact_form_button_loading')}
                                            </>
                                        ) : (
                                            <>
                                                {t('contact_form_button_idle')}
                                                <PaperPlaneRight weight="bold" />
                                            </>
                                        )}
                                    </motion.button>
                                </div>

                                {status === 'error' && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        role="alert"
                                        className="text-rose-300 text-sm bg-rose-950/30 border border-rose-500/30 rounded-2xl px-5 py-3"
                                    >
                                        {t('contact_form_error')}
                                        {errorMsg ? (
                                            <span className="block text-rose-400/70 text-xs mt-1 font-mono">
                                                {errorMsg}
                                            </span>
                                        ) : null}
                                    </motion.p>
                                )}
                            </div>
                        </motion.form>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}

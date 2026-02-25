import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PaperPlaneRight } from '@phosphor-icons/react';
import { useLanguage } from '../context/LanguageContext'; // Added import

export function ContactCTA() {
    const { t } = useLanguage(); // Added useLanguage hook
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');
        // Simulate network request
        setTimeout(() => {
            setStatus('success');
            setEmail('');
            // Reset after 3 seconds
            setTimeout(() => setStatus('idle'), 3000);
        }, 1500);
    };

    return (
        <section id="contact" className="w-full py-32 px-6 md:px-12 lg:px-24 bg-zinc-950 relative overflow-hidden">
            {/* Mesh Gradient Background */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-40">
                <motion.div
                    animate={{
                        x: ['-5%', '5%', '-5%'],
                        y: ['-5%', '5%', '-5%']
                    }}
                    transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
                    className="absolute top-[20%] right-[-10%] w-[60%] h-[60%] bg-forest-900/40 rounded-full blur-[120px] mix-blend-screen"
                />
                <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-forest-800/20 rounded-full blur-[100px] mix-blend-screen" />
            </div>

            <div className="max-w-3xl mx-auto relative z-10">
                {/* Minimal Label */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex justify-center items-center gap-4 mb-12"
                >
                    <div className="h-[1px] w-12 bg-forest-500/50" />
                    <span className="text-forest-400 font-mono text-sm uppercase tracking-widest">{t('contact_label')}</span>
                    <div className="h-[1px] w-12 bg-forest-500/50" />
                </motion.div>

                {/* Massive Headline */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-sans tracking-tighter text-white mb-16 leading-[1.1] max-w-4xl mx-auto"
                >
                    {t('contact_headline')}
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 0.1 }}
                    className="text-zinc-400 text-center text-lg md:text-xl max-w-xl mx-auto mb-16 font-sans"
                >
                    {t('contact_description')} {/* Changed to t() call */}
                </motion.p>

                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 0.2 }}
                    onSubmit={handleSubmit}
                    className="relative max-w-md mx-auto"
                >
                    <div className="relative flex items-center bg-zinc-900/50 p-2 rounded-full border border-white/10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.4)] backdrop-blur-md focus-within:border-forest-500/50 focus-within:ring-1 focus-within:ring-forest-500/50 transition-all">
                        <input
                            type="email"
                            placeholder="hello@yourcompany.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={status !== 'idle'}
                            required
                            className="flex-1 bg-transparent px-6 py-4 outline-none text-white placeholder:text-zinc-600 font-sans disabled:opacity-50"
                        />

                        <div className="absolute right-2 top-2 bottom-2">
                            <AnimatePresence mode="wait">
                                {status === 'idle' && (
                                    <motion.button
                                        key="submit-btn"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        type="submit"
                                        className="h-full px-6 bg-white text-zinc-950 font-medium rounded-full flex items-center gap-2 hover:bg-forest-50 transition-colors"
                                    >
                                        {t('contact_form_button_idle')} {/* Changed to t() call */}
                                        <PaperPlaneRight weight="bold" />
                                    </motion.button>
                                )}
                                {status === 'loading' && (
                                    <motion.div
                                        key="loading-state"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="h-full px-8 bg-forest-900/50 text-forest-300 font-medium rounded-full flex items-center justify-center border border-forest-500/30"
                                    >
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                            className="w-4 h-4 border-2 border-forest-400 border-t-transparent rounded-full"
                                        />
                                    </motion.div>
                                )}
                                {status === 'success' && (
                                    <motion.div
                                        key="success-state"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        className="h-full px-6 bg-forest-600 text-white font-medium rounded-full flex items-center gap-2"
                                    >
                                        Ritorneremo!
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.form>
            </div>
        </section>
    );
}

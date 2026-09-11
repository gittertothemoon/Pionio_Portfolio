import { useLanguage } from '../context/LanguageContext';
import { useIsRestrictedWebView } from '../lib/ua';
import { Hero3D } from './Hero3D';
import { Pionio3DInfo } from './Pionio3DInfo';

// The 3D P used to own the hero. Now it has a room of its own further down: whoever wants to
// play with it finds it here, and the hero keeps the light. Each copy only downloads the viewer
// when it is on screen, so a phone never pays for the desktop model (and vice versa).
export function PMark() {
    const { t } = useLanguage();
    const restricted = useIsRestrictedWebView();
    // In-app browsers (Instagram, TikTok…) barely run model-viewer.
    if (restricted) return null;

    return (
        <section
            aria-labelledby="pmark-title"
            className="relative w-full overflow-hidden border-t border-white/5 bg-zinc-950 px-6 py-24 md:px-12 md:py-32"
        >
            <div className="mx-auto grid max-w-[1400px] items-center gap-6 md:grid-cols-12 md:gap-10">
                <div className="relative z-10 md:col-span-5">
                    <h2 id="pmark-title" className="text-4xl font-sans tracking-tight text-white leading-[1.02] md:text-6xl">
                        {t('pmark_title')}
                    </h2>
                    <p className="mt-6 max-w-md text-lg leading-relaxed text-zinc-400">{t('pmark_body')}</p>
                    <div className="mt-8">
                        <Pionio3DInfo variant="pill" />
                    </div>
                </div>

                <div className="relative md:col-span-7">
                    {/* Two models, two lights. The phone model is green and sits on a faint glow; the
                        desktop one is glossy black by design and only reads against light, the way it
                        used to stand in front of the aurora, so on desktop the green comes from behind. */}
                    <div aria-hidden className="pointer-events-none absolute inset-[20%] rounded-full bg-forest-400/15 blur-[80px] xl:hidden" />
                    <div aria-hidden className="pmark-light pointer-events-none absolute inset-0 hidden xl:block" />
                    <div className="relative mx-auto aspect-square w-full max-w-[560px]">
                        <Hero3D className="h-full w-full xl:hidden" interactive float src="/models/pionio-3d-mobile.gltf" />
                        <Hero3D className="hidden h-full w-full xl:block" interactive tilt float />
                    </div>
                </div>
            </div>
        </section>
    );
}

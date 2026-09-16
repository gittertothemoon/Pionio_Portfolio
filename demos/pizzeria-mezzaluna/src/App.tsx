import { useState } from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';
import Grana from './sistema/Grana';
import Cursore from './sistema/Cursore';
import { useScorrimentoFluido } from './sistema/scorrimento';
import Sipario from './sezioni/Sipario';
import NotaDemo from './sezioni/NotaDemo';
import Nav from './sezioni/Nav';
import Hero from './sezioni/Hero';
import Insegna from './sezioni/Insegna';
import Manifesto from './sezioni/Manifesto';
import MenuScorrevole from './sezioni/MenuScorrevole';
import Lievitazione from './sezioni/Lievitazione';
import Voci from './sezioni/Voci';
import Prenota from './sezioni/Prenota';
import Trovarci from './sezioni/Trovarci';
import Footer from './sezioni/Footer';

export default function App() {
    const [pronto, setPronto] = useState(false);
    useScorrimentoFluido();

    return (
        // Solo le funzionalità che il sito usa davvero: il resto del motore di
        // animazione non viene nemmeno scaricato.
        <LazyMotion features={domAnimation} strict>
            <Sipario onFine={() => setPronto(true)} />
            <Grana />
            <Cursore />
            {pronto && <NotaDemo />}

            <Nav />
            <main>
                <Hero />
                <Insegna />
                <Manifesto />
                <MenuScorrevole />
                <Lievitazione />
                <Voci />
                <Prenota />
                <Trovarci />
            </main>
            <Footer />
        </LazyMotion>
    );
}

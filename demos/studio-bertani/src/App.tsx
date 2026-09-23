import { useState } from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';
import Grana from './sistema/Grana';
import Cursore from './sistema/Cursore';
import { useScorrimentoFluido } from './sistema/scorrimento';
import Sipario from './sezioni/Sipario';
import NotaDemo from './sezioni/NotaDemo';
import Nav from './sezioni/Nav';
import Hero from './sezioni/Hero';
import Manifesto from './sezioni/Manifesto';
import Materie from './sezioni/Materie';
import Metodo from './sezioni/Metodo';
import Professionisti from './sezioni/Professionisti';
import Domande from './sezioni/Domande';
import Contatti from './sezioni/Contatti';
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
                <Manifesto />
                <Materie />
                <Metodo />
                <Professionisti />
                <Domande />
                <Contatti />
            </main>
            <Footer />
        </LazyMotion>
    );
}

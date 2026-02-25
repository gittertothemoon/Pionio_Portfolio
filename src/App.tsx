import { Preloader } from './components/Preloader';
import { Logo } from './components/Logo';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { WorksBento } from './components/WorksBento';
import { Experience } from './components/Experience';
import { TechStack } from './components/TechStack';
import { ContactCTA } from './components/ContactCTA';
import { Footer } from './components/Footer';
import { NavBar } from './components/NavBar';

function App() {
  return (
    <main className="w-full bg-zinc-950 text-zinc-50 font-sans selection:bg-forest-500/30 selection:text-forest-100 antialiased -webkit-font-smoothing-antialiased">
      <Preloader />
      <header className="absolute top-0 left-0 w-full p-6 md:px-12 md:py-8 z-50 flex justify-between items-center pointer-events-none">
        <a href="/" title="Go to Homepage" className="pointer-events-auto">
          <Logo className="h-40 md:h-56 lg:h-64 w-auto object-cover object-left-top -mt-10 md:-mt-16 opacity-100 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]" />
        </a>
      </header>

      <div id="hero">
        <Hero />
      </div>

      <div id="about">
        <About />
      </div>

      <div id="services">
        <Services />
      </div>

      <TechStack />

      <div id="works">
        <WorksBento />
      </div>

      <div id="experience">
        <Experience />
      </div>

      <div id="contact">
        <ContactCTA />
      </div>

      <Footer />
      <NavBar />
    </main>
  );
}

export default App;

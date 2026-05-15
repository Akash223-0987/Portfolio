import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Education from '../components/Education';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home({ onOpenAI, onOpenCLI }: { onOpenAI: () => void; onOpenCLI: () => void }) {
  return (
    <>
      <div className="relative z-20">
        <Navbar onOpenAI={onOpenAI} onOpenCLI={onOpenCLI} />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Education from '../components/Education';
import Contact from '../components/Contact';
import ChatWidget from '../components/ChatWidget';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <div className="relative z-20">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Education />
          <Contact />
        </main>
        <Footer />
        <ChatWidget />
      </div>
    </>
  );
}

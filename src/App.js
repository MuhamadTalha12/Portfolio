
import { BrowserRouter as Router } from 'react-router-dom';
import Hero from './components/Hero';
import Navbar from './components/NavBar';
import Education from './components/Education';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import BackToTop from './components/BackToTop';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <section id="home">
          <Hero />
        </section>
        <section id="education">
          <Education />
        </section>
        <section id="experience">
          <Experience />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="skills">
          <Skills />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </div>
      <BackToTop />
    </Router>
  );
}

export default App;

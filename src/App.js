import { ThemeProvider } from "./theme/ThemeContext";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import SocialLinks from "./components/SocialLinks";
import Experience from "./components/Experience";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Showcase from "./components/Showcase";
import Portfolio from "./components/Portfolio";
import Footer from "./components/Footer";
import WorkExperience from "./components/WorkExperience";

function App() {
  return (
    <ThemeProvider>
      <Navbar />
      <main>
        <Home />
        <About />
        <WorkExperience />
        <Showcase />
        <Portfolio />
        <Experience />
        <Certifications />
        <Contact />
      </main>
      <SocialLinks />
      <Footer />
    </ThemeProvider>
  );
}

export default App;

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import SocialLinks from "./components/SocialLinks";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Portfolio from "./components/Portfolio";
import Footer from "./components/Footer";
import WorkExperience from "./components/WorkExperience";

function App() {
  return (
    <div>
      <Navbar />
      <Home />
      <About />
      <WorkExperience />
      <Portfolio />
      <Experience />
      <Contact />
      <SocialLinks />
      <Footer />
    </div>
  );
}

export default App;

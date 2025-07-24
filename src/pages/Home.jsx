import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Blog from '../components/Blog';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Shop_homepage from '../components/shop/Shop_homepage';

const Home = () => {
  return (
    <>
   
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Shop_homepage/>
        <Blog />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default Home;
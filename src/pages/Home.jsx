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
    <iframe
  src="https://custom-gpt-backend-sigma.vercel.app/api/chatbot/68348001c057079e12a2031d/683307347fb0b329f0322ea5?domain=https%3A%2F%2Fanisdev.vercel.app"
  style={{
    width: '400px',
    height: '600px',
    border: 'none',
    position: 'fixed',
    bottom: '20px',
    right: '20px',
  }}
  allowTransparency="true"
/>
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
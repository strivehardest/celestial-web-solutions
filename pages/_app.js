import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CustomCursor from '../components/CustomCursor';
import MouseTrail from '../components/MouseTrail';
import ScrollToTop from '../components/ScrollToTop';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <CustomCursor />
      <MouseTrail />
      <ScrollToTop />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;

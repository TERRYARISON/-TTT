import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { SmoothScroll, useLenisInstance } from './components/SmoothScroll';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import PetalField from './components/PetalField';
import Home from './pages/Home';
import Studio from './pages/Studio';
import Career from './pages/Career';
import Works from './pages/Works';
import Books from './pages/Books';
import AppPage from './pages/AppPage';
import About from './pages/About';
import Contact from './pages/Contact';
import WorkDetail from './pages/WorkDetail';
import NotFound from './pages/NotFound';

function Shell() {
  const location = useLocation();
  const lenis = useLenisInstance();
  const isHome = location.pathname === '/';

  /* New route → back to top, instantly, without replaying the preloader. */
  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
  }, [location.pathname, lenis]);

  return (
    <div className="relative min-h-screen bg-void">
      <CustomCursor />
      <Navbar />

      {/* Ambient petals on inner pages (the hero runs its own field). */}
      {!isHome && (
        <div className="fixed inset-0 z-0 opacity-60 pointer-events-none" aria-hidden="true">
          <PetalField variant="ambient" />
        </div>
      )}

      <div className="relative z-10">
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/career" element={<Career />} />
          <Route path="/works" element={<Works />} />
          <Route path="/books" element={<Books />} />
          <Route path="/app" element={<AppPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/work/:slug" element={<WorkDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <SmoothScroll>
      <Shell />
    </SmoothScroll>
  );
}

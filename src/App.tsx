import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Menu } from './components/Menu';
import { Story } from './components/Story';
import { FeaturedDrinks } from './components/Featured';
import { Gallery } from './components/Gallery';
import { Reviews } from './components/Reviews';
import { Visit } from './components/Visit';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { useAnchorScroll } from './hooks/useAnchorScroll';
import { useReveal } from './hooks/useReveal';
import { I18nProvider, useI18n } from './i18n';

function Page() {
  const { t, lang } = useI18n();
  useReveal([lang]);
  useAnchorScroll();

  return (
    <>
      <a href="#main" className="skip-link">
        {t.skip}
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Menu />
        <Story />
        <FeaturedDrinks />
        <Gallery />
        <Reviews />
        <Visit />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <Page />
    </I18nProvider>
  );
}

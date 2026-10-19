import { useEffect, useState } from 'react';
import { useI18n } from '../i18n';

export function Footer() {
  const { t } = useI18n();
  const f = t.footer;
  const [subscribed, setSubscribed] = useState(false);
  const [year, setYear] = useState(2026);
  useEffect(() => setYear(new Date().getFullYear()), []);

  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <a href="#top" className="logo logo-light" aria-label={t.nav.home}>
            <span className="logo-mark" aria-hidden="true">CS</span>
            <span className="logo-text">Coffee Studio</span>
          </a>
          <p>{f.tagline}</p>
        </div>
        <nav aria-label={f.nav}>
          <h3>{f.explore}</h3>
          <ul>
            <li><a href="#menu">{t.nav.menu}</a></li>
            <li><a href="#story">{t.nav.story}</a></li>
            <li><a href="#featured">{t.nav.featured}</a></li>
            <li><a href="#gallery">{t.nav.gallery}</a></li>
          </ul>
        </nav>
        <div>
          <h3>{f.visit}</h3>
          <ul>
            <li><a href="#visit">{f.hours}</a></li>
            <li><a href="#reviews">{f.reviews}</a></li>
            <li><a href="#contact">{t.nav.contact}</a></li>
          </ul>
        </div>
        <div>
          <h3>{f.newsletter}</h3>
          <p className="footer-small">{f.newsletterText}</p>
          <form
            className="newsletter"
            onSubmit={(e) => {
              e.preventDefault();
              e.currentTarget.reset();
              setSubscribed(true);
            }}
          >
            <label htmlFor="newsletter-email" className="sr-only">{f.emailLabel}</label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder={f.emailPh}
              autoComplete="email"
              onInput={() => setSubscribed(false)}
            />
            <button type="submit" aria-label={f.subscribe}>→</button>
          </form>
          <p className="footer-small footer-status" role="status">
            {subscribed ? f.thanks : f.newsletterDemo}
          </p>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© {year} Coffee Studio. {f.rights}</p>
        <p>
          {f.photos} <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer">Unsplash</a>
        </p>
      </div>
    </footer>
  );
}

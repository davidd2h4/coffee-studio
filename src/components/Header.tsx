import { useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n';
import { LangSwitch } from './LangSwitch';

const sections = ['menu', 'story', 'featured', 'gallery', 'visit', 'contact'] as const;

export function Header() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('nav-open', open);
    // Поки мобільне меню відкрите, вміст сторінки недоступний для фокусу та скрінрідерів.
    const outside = [document.getElementById('main'), document.querySelector('.site-footer')];
    outside.forEach((el) => el?.toggleAttribute('inert', open));
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => window.innerWidth > 960 && setOpen(false);
    window.addEventListener('keydown', onKey);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onResize);
      outside.forEach((el) => el?.removeAttribute('inert'));
    };
  }, [open]);

  return (
    <header className={`site-header ${scrolled || open ? 'is-solid' : ''} ${open ? 'is-menu-open' : ''}`}>
      <div className="container header-inner">
        <a href="#top" className="logo" aria-label={t.nav.home} onClick={() => setOpen(false)}>
          <span className="logo-mark" aria-hidden="true">CS</span>
          <span className="logo-text">Coffee Studio</span>
        </a>

        <nav className="desktop-nav" aria-label={t.nav.primary}>
          <ul>
            {sections.map((id) => (
              <li key={id}>
                <a href={`#${id}`}>{t.nav[id]}</a>
              </li>
            ))}
          </ul>
        </nav>

        <LangSwitch />

        <a href="#visit" className="btn btn-small btn-copper header-cta">
          {t.nav.findUs}
        </a>

        <button
          ref={toggleRef}
          type="button"
          className={`nav-toggle ${open ? 'is-open' : ''}`}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? t.nav.close : t.nav.open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
        </button>
      </div>

      <nav id="mobile-nav" className={`mobile-nav ${open ? 'is-open' : ''}`} aria-label={t.nav.mobile}>
        <ul>
          {sections.map((id, i) => (
            <li key={id} style={{ transitionDelay: open ? `${80 + i * 50}ms` : '0ms' }}>
              <a href={`#${id}`} tabIndex={open ? undefined : -1} onClick={() => setOpen(false)}>
                <span className="mobile-nav-index">0{i + 1}</span>
                {t.nav[id]}
              </a>
            </li>
          ))}
        </ul>
        <p className="mobile-nav-foot">{t.nav.foot}</p>
      </nav>
    </header>
  );
}

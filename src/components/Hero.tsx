import { useEffect, useRef } from 'react';
import { heroPhoto } from '../data';
import { useI18n } from '../i18n';
import { SmartImage } from './SmartImage';

/** Намальований капучино — показуємо, якщо жодне фото не завантажилося. */
function CupIllustration({ label }: { label: string }) {
  return (
    <svg className="hero-cup-art" viewBox="0 0 400 500" role="img" aria-label={label} preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="cup-bg" cx="50%" cy="58%" r="70%">
          <stop offset="0" stopColor="#6b4129" />
          <stop offset="0.55" stopColor="#3b241a" />
          <stop offset="1" stopColor="#1d120c" />
        </radialGradient>
        <radialGradient id="cup-crema" cx="45%" cy="40%" r="65%">
          <stop offset="0" stopColor="#d9a676" />
          <stop offset="0.7" stopColor="#a8693a" />
          <stop offset="1" stopColor="#7a4523" />
        </radialGradient>
        <linearGradient id="cup-body" x1="0" x2="1">
          <stop offset="0" stopColor="#e9dccb" />
          <stop offset="0.5" stopColor="#f8f1e7" />
          <stop offset="1" stopColor="#cdbba5" />
        </linearGradient>
      </defs>
      <rect width="400" height="500" fill="url(#cup-bg)" />
      <ellipse cx="200" cy="372" rx="150" ry="34" fill="#140b07" opacity="0.55" />
      <ellipse cx="200" cy="356" rx="142" ry="34" fill="#e2d3c0" />
      <ellipse cx="200" cy="352" rx="110" ry="22" fill="#cdbba5" />
      <path d="M96 262c0 70 44 104 104 104s104-34 104-104z" fill="url(#cup-body)" />
      <path d="M300 280c34-6 48 30 18 46-10 6-22 6-30 4" fill="none" stroke="#e9dccb" strokeWidth="13" strokeLinecap="round" />
      <ellipse cx="200" cy="262" rx="104" ry="30" fill="#e9dccb" />
      <ellipse cx="200" cy="263" rx="94" ry="24" fill="url(#cup-crema)" />
      <path
        d="M200 244c-6 6-6 14 0 20 6-6 6-14 0-20zm-16 6c-8 2-10 10-6 16 7-1 10-9 6-16zm32 0c4 7 1 15-6 16-4-6-2-14 6-16zm-44 6c-7 4-7 12-1 16 6-3 7-11 1-16zm56 0c-6 5-5 13 1 16 6-4 6-12-1-16zM200 266c-10 0-18 6-20 12h40c-2-6-10-12-20-12z"
        fill="#f6ead9"
        opacity="0.92"
      />
      <g fill="none" stroke="#f6efe5" strokeWidth="3" strokeLinecap="round" opacity="0.35">
        <path className="steam" d="M178 214c-12-18 12-28 0-48s10-30 2-44" />
        <path className="steam steam-2" d="M214 210c-10-16 12-26 2-44s8-28 0-40" />
      </g>
    </svg>
  );
}

export function Hero() {
  const { t } = useI18n();
  const h = t.hero;
  const heroRef = useRef<HTMLElement>(null);

  // Легкий паралакс фото під час прокрутки та реакція на курсор (лише без «зменшення руху»).
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < window.innerHeight * 1.2) hero.style.setProperty('--scroll', String(y));
      });
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const r = hero.getBoundingClientRect();
      hero.style.setProperty('--mx', ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
      hero.style.setProperty('--my', ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
    };
    const onLeave = () => {
      hero.style.setProperty('--mx', '0');
      hero.style.setProperty('--my', '0');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    hero.addEventListener('pointermove', onMove);
    hero.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      hero.removeEventListener('pointermove', onMove);
      hero.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <section className="hero" id="top" aria-labelledby="hero-title" ref={heroRef}>
      <div className="hero-grain" aria-hidden="true" />

      <div className="container hero-inner">
        <div className="hero-copy">
          <p className="eyebrow hero-anim" style={{ animationDelay: '0.1s' }}>
            {h.eyebrow}
          </p>
          <h1 id="hero-title" className="hero-title">
            <span className="hero-anim" style={{ animationDelay: '0.2s' }}>{h.line1}</span>
            <span className="hero-anim" style={{ animationDelay: '0.35s' }}>
              {h.line2} <em>{h.line2em}</em>
            </span>
            <span className="hero-anim" style={{ animationDelay: '0.5s' }}>{h.line3}</span>
          </h1>
          <p className="hero-lead hero-anim" style={{ animationDelay: '0.65s' }}>
            {h.lead}
          </p>
          <div className="hero-actions hero-anim" style={{ animationDelay: '0.8s' }}>
            <a href="#menu" className="btn btn-copper">
              {h.ctaMenu}
            </a>
            <a href="#story" className="btn btn-ghost-light">
              {h.ctaStory}
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-glow" aria-hidden="true" />
          <div className="hero-depth">
            <div className="hero-outline" aria-hidden="true" />
            <div className="hero-frame">
              <div className="hero-photo">
                <SmartImage
                  src={heroPhoto.src}
                  srcSet={heroPhoto.srcSet}
                  sizes="(max-width: 960px) 90vw, 520px"
                  fallbacks={heroPhoto.fallbacks}
                  fallback={<CupIllustration label={h.photoAlt} />}
                  alt={h.photoAlt}
                  loading="eager"
                  width={1200}
                  height={1500}
                />
              </div>
            </div>
          </div>

          <div className="hero-badge hero-anim" style={{ animationDelay: '1.2s' }} aria-hidden="true">
            <svg viewBox="0 0 120 120">
              <defs>
                <path id="hero-badge-circle" d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" />
              </defs>
              <text>
                <textPath href="#hero-badge-circle">{h.badge}</textPath>
              </text>
            </svg>
            <span className="hero-badge-bean" />
          </div>

          <article className="hero-feature hero-anim" style={{ animationDelay: '1s' }} aria-labelledby="hero-feature-name">
            <div className="hero-feature-inner">
              <p className="hero-feature-label">
                <span className="hero-feature-dot" aria-hidden="true" />
                {h.cardLabel}
              </p>
              <p className="hero-feature-name" id="hero-feature-name">
                {h.cardName}
              </p>
              <p className="hero-feature-note">{h.cardNote}</p>
              <div className="hero-feature-foot">
                <span className="hero-feature-price">90 ₴</span>
                <a href="#menu" className="hero-feature-link">
                  {h.cardLink}
                  <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>

      <dl className="container hero-stats hero-anim" style={{ animationDelay: '1.1s' }}>
        {h.stats.map((s) => (
          <div key={s.dt}>
            <dt>{s.dt}</dt>
            <dd>{s.dd}</dd>
          </div>
        ))}
      </dl>

      <a href="#menu" className="scroll-cue" aria-label={h.scroll}>
        <span />
      </a>
    </section>
  );
}

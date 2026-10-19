import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { gallery } from '../data';
import { useI18n } from '../i18n';
import { SmartImage } from './SmartImage';

export function Gallery() {
  const { t, l } = useI18n();
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const touchX = useRef<number | null>(null);
  const isOpen = index !== null;

  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (dir: number) => setIndex((i) => (i === null ? i : (i + dir + gallery.length) % gallery.length)),
    [],
  );

  useEffect(() => {
    if (!isOpen) return;
    const trigger = triggerRef.current;
    document.body.classList.add('nav-open');
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
      else if (e.key === 'Tab') {
        // утримуємо фокус усередині діалогу
        const nodes = dialogRef.current?.querySelectorAll<HTMLElement>('button');
        if (!nodes?.length) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.classList.remove('nav-open');
      trigger?.focus({ preventScroll: true });
    };
  }, [isOpen, close, step]);

  const current = isOpen ? gallery[index] : null;

  return (
    <section className="section gallery" id="gallery" aria-labelledby="gallery-title">
      <div className="container">
        <header className="section-head reveal">
          <p className="eyebrow">{t.gallery.eyebrow}</p>
          <h2 id="gallery-title" className="section-title">
            {t.gallery.title} <em>{t.gallery.titleEm}</em>
          </h2>
          <p className="section-lead">{t.gallery.lead}</p>
        </header>

        <ul className="gallery-grid">
          {gallery.map((g, i) => (
            <li
              key={g.large}
              className={`gallery-item reveal ${g.span ? `is-${g.span}` : ''}`}
              style={{ transitionDelay: `${(i % 4) * 80}ms` }}
            >
              <button
                type="button"
                className="gallery-btn"
                aria-label={t.gallery.enlarge(l(g.alt))}
                aria-haspopup="dialog"
                onClick={(e) => {
                  triggerRef.current = e.currentTarget;
                  setIndex(i);
                }}
              >
                <SmartImage
                  src={g.image.src}
                  srcSet={g.image.srcSet}
                  sizes={g.span === 'wide' ? '(max-width: 960px) 92vw, 600px' : '(max-width: 960px) 46vw, 300px'}
                  alt=""
                />
                <span className="gallery-zoom" aria-hidden="true">+</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {current &&
        createPortal(
          <div
            ref={dialogRef}
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={t.gallery.position(index! + 1, gallery.length)}
            onClick={close}
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX.current === null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              touchX.current = null;
              if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
            }}
          >
            <figure onClick={(e) => e.stopPropagation()}>
              <SmartImage key={current.large} src={current.large} alt={l(current.alt)} loading="eager" />
              <figcaption>
                <span>{l(current.alt)}</span>
                <span aria-hidden="true">
                  {index! + 1} / {gallery.length}
                </span>
              </figcaption>
            </figure>
            <button
              ref={closeRef}
              type="button"
              className="lightbox-btn lightbox-close"
              aria-label={t.gallery.close}
              onClick={(e) => {
                e.stopPropagation();
                close();
              }}
            >
              ×
            </button>
            <button
              type="button"
              className="lightbox-btn lightbox-prev"
              aria-label={t.gallery.prev}
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
            >
              ‹
            </button>
            <button
              type="button"
              className="lightbox-btn lightbox-next"
              aria-label={t.gallery.next}
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
            >
              ›
            </button>
          </div>,
          document.body,
        )}
    </section>
  );
}

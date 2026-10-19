import { reviewDetail, reviews } from '../data';
import { useI18n } from '../i18n';

function Stars({ rating }: { rating: number }) {
  const { t } = useI18n();
  return (
    <span className="stars" role="img" aria-label={t.reviews.stars(rating)}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" aria-hidden="true" className={i < rating ? 'on' : ''}>
          <path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L10 14.8l-5.2 2.8 1-5.8L1.5 7.7l5.9-.8z" />
        </svg>
      ))}
    </span>
  );
}

export function Reviews() {
  const { t, l } = useI18n();

  return (
    <section className="section reviews" id="reviews" aria-labelledby="reviews-title">
      <div className="container">
        <header className="section-head reveal">
          <p className="eyebrow eyebrow-light">{t.reviews.eyebrow}</p>
          <h2 id="reviews-title" className="section-title">
            {t.reviews.title} <em>{t.reviews.titleEm}</em>
          </h2>
          <p className="demo-note">
            <span className="demo-pill">{t.reviews.pill}</span>
            {t.reviews.note}
          </p>
        </header>

        <ul className="reviews-grid">
          {reviews.map((r, i) => (
            <li key={i} className="review-card reveal" style={{ transitionDelay: `${i * 110}ms` }}>
              <figure>
                <Stars rating={r.rating} />
                <blockquote>
                  <p>“{l(r.quote)}”</p>
                </blockquote>
                <figcaption>
                  <span className="review-avatar" aria-hidden="true">
                    {l(r.name).slice(-1)}
                  </span>
                  <span>
                    <strong>{l(r.name)}</strong>
                    <small>{l(reviewDetail)}</small>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

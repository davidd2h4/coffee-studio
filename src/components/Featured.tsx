import { featured, formatUAH } from '../data';
import { useI18n } from '../i18n';
import { SmartImage } from './SmartImage';

export function FeaturedDrinks() {
  const { t, l } = useI18n();

  return (
    <section className="section featured" id="featured" aria-labelledby="featured-title">
      <div className="container">
        <header className="section-head section-head-split reveal">
          <div>
            <p className="eyebrow">{t.featured.eyebrow}</p>
            <h2 id="featured-title" className="section-title">
              {t.featured.title} <em>{t.featured.titleEm}</em>
            </h2>
          </div>
          <p className="section-lead">{t.featured.lead}</p>
        </header>

        <ul className="featured-grid">
          {featured.map((d, i) => (
            <li key={d.image.src} className="reveal" style={{ transitionDelay: `${i * 100}ms` }}>
              <article className="featured-card">
                <div className="featured-img">
                  <SmartImage
                    src={d.image.src}
                    srcSet={d.image.srcSet}
                    sizes="(max-width: 560px) 92vw, (max-width: 1100px) 46vw, 290px"
                    alt={l(d.name)}
                  />
                  <span className="featured-price">{formatUAH(d.price)}</span>
                </div>
                <div className="featured-body">
                  <span className="featured-n" aria-hidden="true">0{i + 1}</span>
                  <h3>{l(d.name)}</h3>
                  <p>{l(d.note)}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

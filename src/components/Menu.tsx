import { useId, useMemo, useState } from 'react';
import { categories, formatUAH, menu, type Category } from '../data';
import { useI18n } from '../i18n';
import { SmartImage } from './SmartImage';

export function Menu() {
  const { t, l } = useI18n();
  const [active, setActive] = useState<Category | 'all'>('all');
  const panelId = useId();
  const items = useMemo(() => (active === 'all' ? menu : menu.filter((m) => m.category === active)), [active]);

  return (
    <section className="section menu" id="menu" aria-labelledby="menu-title">
      <div className="container">
        <header className="section-head reveal">
          <p className="eyebrow">{t.menu.eyebrow}</p>
          <h2 id="menu-title" className="section-title">
            {t.menu.title} <em>{t.menu.titleEm}</em>
          </h2>
          <p className="section-lead">{t.menu.lead}</p>
        </header>

        <div className="filters reveal" role="group" aria-label={t.menu.filterLabel}>
          {categories.map((c) => {
            const count = c.id === 'all' ? menu.length : menu.filter((m) => m.category === c.id).length;
            return (
              <button
                key={c.id}
                type="button"
                className={`filter ${active === c.id ? 'is-active' : ''}`}
                aria-pressed={active === c.id}
                aria-controls={panelId}
                onClick={() => setActive(c.id)}
              >
                {l(c.label)}
                <span className="filter-count" aria-hidden="true">{count}</span>
              </button>
            );
          })}
        </div>

        <p className="sr-only" aria-live="polite">
          {t.menu.showing(items.length)}
        </p>

        <ul id={panelId} className="menu-grid" key={active}>
          {items.map((item, i) => (
            <li key={item.id} className="menu-card" style={{ animationDelay: `${Math.min(i, 8) * 50}ms` }}>
              <article>
                <div className="menu-card-img">
                  <SmartImage
                    src={item.image.src}
                    srcSet={item.image.srcSet}
                    sizes="(max-width: 600px) 132px, (max-width: 1100px) 46vw, 380px"
                    alt={l(item.name)}
                  />
                  {item.tag && <span className="menu-card-tag">{l(item.tag)}</span>}
                </div>
                <div className="menu-card-body">
                  <div className="menu-card-head">
                    <h3>{l(item.name)}</h3>
                    <span className="menu-card-price">{formatUAH(item.price)}</span>
                  </div>
                  <p className="menu-card-desc">{l(item.description)}</p>
                  <p className="menu-card-meta">
                    <span>{item.unit === 'ml' ? t.menu.volume : t.menu.weight}</span>
                    {item.amount} {t.menu[item.unit]}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

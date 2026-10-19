import { useEffect, useState } from 'react';
import { hours } from '../data';
import { useI18n } from '../i18n';

// Зіставляємо день тижня з рядком таблиці годин роботи.
const rowForDay = (jsDay: number) => (jsDay === 0 ? 2 : jsDay === 6 ? 1 : 0);

export function Visit() {
  const { t, l } = useI18n();
  const v = t.visit;
  // «Сьогодні» залежить від годинника відвідувача, тож визначаємо його лише в браузері.
  const [today, setToday] = useState<number | null>(null);
  useEffect(() => setToday(rowForDay(new Date().getDay())), []);

  return (
    <section className="section visit" id="visit" aria-labelledby="visit-title">
      <div className="container visit-grid">
        <div className="visit-copy">
          <p className="eyebrow reveal">{v.eyebrow}</p>
          <h2 id="visit-title" className="section-title reveal">
            {v.title} <em>{v.titleEm}</em>
          </h2>

          <div className="visit-block reveal">
            <h3>{v.address}</h3>
            <p className="demo-note demo-note-inline">
              <span className="demo-pill">{v.pill}</span>
            </p>
            <address>
              {v.line1}
              <br />
              {v.line2}
            </address>
            <p className="muted">{v.note}</p>
          </div>

          <div className="visit-block reveal">
            <h3>{v.hours}</h3>
            <table className="hours">
              <caption className="sr-only">{v.hours}</caption>
              <tbody>
                {hours.map((h, i) => (
                  <tr key={h.time} className={i === today ? 'is-today' : ''}>
                    <th scope="row">
                      {l(h.days)}
                      {i === today && <span className="today-pill">{v.today}</span>}
                    </th>
                    <td>{h.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="map-card reveal" role="img" aria-label={v.mapAria}>
          <svg viewBox="0 0 600 520" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <rect width="600" height="520" className="map-bg" />
            <path className="map-park" d="M360 40h190v150H380z" />
            <path className="map-water" d="M0 420c90-30 160 10 250-10s170-60 350-30v140H0z" />
            <g className="map-roads">
              <path d="M-20 140L620 90" />
              <path d="M-20 300L620 260" />
              <path d="M140 -20L190 540" />
              <path d="M420 -20L380 540" />
            </g>
            <g className="map-streets">
              <path d="M-20 220L620 175" />
              <path d="M280 -20L290 540" />
              <path d="M40 -20L80 540" />
              <path d="M520 -20L500 540" />
            </g>
            <g className="map-blocks">
              <rect x="200" y="110" width="66" height="50" rx="4" />
              <rect x="300" y="190" width="70" height="56" rx="4" />
              <rect x="200" y="190" width="70" height="56" rx="4" />
              <rect x="430" y="200" width="60" height="44" rx="4" />
              <rect x="90" y="160" width="40" height="44" rx="4" />
              <rect x="200" y="300" width="70" height="60" rx="4" />
              <rect x="300" y="300" width="66" height="60" rx="4" />
            </g>
          </svg>
          <div className="map-pin">
            <span className="map-pulse" />
            <span className="map-dot" />
          </div>
          <div className="map-label">
            <strong>Coffee Studio</strong>
            <span>{v.mapLabel}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

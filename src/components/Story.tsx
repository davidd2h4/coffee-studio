import { images } from '../data';
import { useI18n } from '../i18n';
import { SmartImage } from './SmartImage';

export function Story() {
  const { t } = useI18n();
  const s = t.story;

  return (
    <section className="section story" id="story" aria-labelledby="story-title">
      <div className="container story-grid">
        <div className="story-media reveal">
          <div className="story-img-main">
            <SmartImage
              src={images.storyMain.src}
              srcSet={images.storyMain.srcSet}
              sizes="(max-width: 960px) 90vw, 560px"
              alt={s.mainAlt}
            />
          </div>
          <div className="story-img-detail">
            <SmartImage src={images.storyDetail.src} srcSet={images.storyDetail.srcSet} sizes="(max-width: 960px) 45vw, 280px" alt={s.detailAlt} />
          </div>
          <p className="story-badge" aria-hidden="true">
            <span>{s.since}</span>2026
          </p>
        </div>

        <div className="story-copy">
          <p className="eyebrow reveal">{s.eyebrow}</p>
          <h2 id="story-title" className="section-title reveal">
            {s.title} <em>{s.titleEm}</em>
          </h2>
          <p className="reveal">{s.p1}</p>
          <p className="reveal">{s.p2}</p>

          <ol className="pillars">
            {s.pillars.map((p, i) => (
              <li key={i} className="reveal" style={{ transitionDelay: `${i * 90}ms` }}>
                <span className="pillar-n" aria-hidden="true">0{i + 1}</span>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

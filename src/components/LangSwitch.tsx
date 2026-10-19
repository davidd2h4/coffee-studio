import { useI18n, type Lang } from '../i18n';

const options: { id: Lang; label: string; full: string }[] = [
  { id: 'uk', label: 'UA', full: 'Українська' },
  { id: 'en', label: 'EN', full: 'English' },
];

export function LangSwitch({ className = '' }: { className?: string }) {
  const { lang, setLang, t } = useI18n();

  return (
    <div className={`lang-switch ${className}`} role="group" aria-label={t.nav.language}>
      <span className="lang-switch-thumb" data-active={lang} aria-hidden="true" />
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          lang={o.id}
          className={lang === o.id ? 'is-active' : ''}
          aria-pressed={lang === o.id}
          aria-label={`${o.label} — ${o.full}`}
          onClick={() => setLang(o.id)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

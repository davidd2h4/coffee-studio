import { useState, type FormEvent, type ReactNode } from 'react';
import { useI18n, type Dict } from '../i18n';

type Fields = { name: string; email: string; topic: number; message: string };
type Errors = Partial<Record<'name' | 'email' | 'message', string>>;

const initial: Fields = { name: '', email: '', topic: 0, message: '' };

function validate(f: Fields, c: Dict['contact']): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = c.errName;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = c.errEmail;
  if (f.message.trim().length < 10) e.message = c.errMessage;
  return e;
}

export function Contact() {
  const { t } = useI18n();
  const c = t.contact;
  const [fields, setFields] = useState<Fields>(initial);
  const [touched, setTouched] = useState(false);
  const [done, setDone] = useState(false);

  // Помилки обчислюємо з поточних даних, тож вони одразу перекладаються при зміні мови.
  const errors: Errors = touched ? validate(fields, c) : {};
  const hasErrors = Object.keys(errors).length > 0;

  const update = (key: 'name' | 'email' | 'message') => (e: { target: { value: string } }) =>
    setFields((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched(true);
    const found = validate(fields, c);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }
    setDone(true);
    setTouched(false);
    setFields(initial);
  };

  const aria = (key: keyof Errors) => ({
    'aria-invalid': errors[key] ? true : undefined,
    'aria-describedby': errors[key] ? `contact-${key}-error` : undefined,
    required: true,
  });

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="container contact-grid">
        <div className="contact-copy">
          <p className="eyebrow reveal">{c.eyebrow}</p>
          <h2 id="contact-title" className="section-title reveal">
            {c.title} <em>{c.titleEm}</em>
          </h2>
          <p className="reveal">{c.lead}</p>
          <ul className="contact-list reveal">
            <li>
              <span>{c.email}</span>
              <a href="mailto:hello@example.com">hello@example.com</a>
            </li>
            <li>
              <span>{c.phone}</span>
              <span>+380 00 000 00 00</span>
            </li>
            <li>
              <span>{c.social}</span>
              <span>@coffeestudio.demo</span>
            </li>
          </ul>
          <p className="muted reveal">{c.placeholderNote}</p>
        </div>

        <div className="contact-card reveal">
          {done ? (
            <div className="form-success" role="status">
              <span className="success-icon" aria-hidden="true">✓</span>
              <span className="demo-pill">{c.demoPill}</span>
              <h3>{c.successTitle}</h3>
              <p>{c.successText}</p>
              <button type="button" className="btn btn-dark" onClick={() => setDone(false)}>
                {c.again}
              </button>
            </div>
          ) : (
            <form noValidate onSubmit={onSubmit} aria-describedby="contact-demo-intro">
              <p className="form-demo" id="contact-demo-intro">
                <span className="demo-pill">{c.demoPill}</span>
                {c.demoIntro}
              </p>
              <div className="field-row">
                <Field id="name" label={c.name} error={errors.name}>
                  <input id="contact-name" autoComplete="name" placeholder={c.namePh} value={fields.name} onChange={update('name')} {...aria('name')} />
                </Field>
                <Field id="email" label={c.email} error={errors.email}>
                  <input
                    id="contact-email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder={c.emailPh}
                    value={fields.email}
                    onChange={update('email')}
                    {...aria('email')}
                  />
                </Field>
              </div>
              <Field id="topic" label={c.topic}>
                <select id="contact-topic" value={fields.topic} onChange={(e) => setFields((f) => ({ ...f, topic: Number(e.target.value) }))}>
                  {c.topics.map((topic, i) => (
                    <option key={i} value={i}>
                      {topic}
                    </option>
                  ))}
                </select>
              </Field>
              <Field id="message" label={c.message} error={errors.message}>
                <textarea id="contact-message" rows={5} placeholder={c.messagePh} value={fields.message} onChange={update('message')} {...aria('message')} />
              </Field>
              {hasErrors && (
                <p className="form-summary" role="alert">
                  {c.errSummary}
                </p>
              )}
              <button type="submit" className="btn btn-copper btn-block">
                {c.submit}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div className={`field ${error ? 'has-error' : ''}`}>
      <label htmlFor={`contact-${id}`}>{label}</label>
      {children}
      {error && (
        <p className="field-error" id={`contact-${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}

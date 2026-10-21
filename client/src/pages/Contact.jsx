import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { useSeo } from '../hooks/useSeo.js';
import PageHero from '../components/PageHero.jsx';
import { Paragraphs } from '../components/Cards.jsx';

const EMPTY = { fullName: '', company: '', email: '', phone: '', country: '', category: '', message: '', consent: false, website: '' };

// Mirrors server/validate.js so visitors see problems before submitting.
function validate(v, categories) {
  const errors = {};
  if (v.fullName.trim().length < 2) errors.fullName = 'required';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) errors.email = v.email.trim() ? 'invalid' : 'required';
  if (v.phone.trim() && !/^[+()\d\s-]{6,25}$/.test(v.phone.trim())) errors.phone = 'invalid';
  if (!v.country.trim()) errors.country = 'required';
  if (!categories.includes(v.category)) errors.category = 'required';
  if (v.message.trim().length < 10) errors.message = v.message.trim() ? 'too_short' : 'required';
  if (!v.consent) errors.consent = 'required';
  return errors;
}

export default function Contact() {
  const { t, lang } = useLanguage();
  const c = t.contact;
  const f = c.form;
  const categories = Object.keys(f.categories);
  const [params] = useSearchParams();
  const preset = categories.includes(params.get('category')) ? params.get('category') : '';
  const [values, setValues] = useState({ ...EMPTY, category: preset });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [serverError, setServerError] = useState('');
  useSeo('contact');

  const update = (e) => {
    const { name, type, checked, value } = e.target;
    setValues((v) => ({ ...v, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(({ [name]: _, ...rest }) => rest);
  };

  const submit = async (e) => {
    e.preventDefault();
    const found = validate(values, categories);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(`f-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    setStatus('sending');
    setServerError('');
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, language: lang }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setStatus('sent');
        setValues({ ...EMPTY });
      } else {
        if (data.fields) setErrors(data.fields);
        setServerError(data.error === 'validation' ? '' : data.error || 'server');
        setStatus('error');
      }
    } catch {
      setServerError('server');
      setStatus('error');
    }
  };

  const field = (name, { type = 'text', optional = false, autoComplete } = {}) => (
    <div className={`field ${errors[name] ? 'has-error' : ''}`}>
      <label htmlFor={`f-${name}`}>
        {f.fields[name]} {optional && <span className="muted">{f.optional}</span>}
      </label>
      <input
        id={`f-${name}`}
        name={name}
        type={type}
        value={values[name]}
        onChange={update}
        autoComplete={autoComplete}
        aria-invalid={!!errors[name]}
        aria-describedby={errors[name] ? `e-${name}` : undefined}
        dir={type === 'email' || type === 'tel' ? 'ltr' : undefined}
      />
      {errors[name] && (
        <p className="field__error" id={`e-${name}`}>
          {f.errors[errors[name]] || f.errors.invalid}
        </p>
      )}
    </div>
  );

  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.title}>
        <div className="page-hero__lead">
          <Paragraphs items={c.paragraphs} />
        </div>
      </PageHero>

      <section className="section">
        <div className="container contact-grid">
          <aside className="contact-info">
            <div>
              <h2>{c.office.title}</h2>
              {c.office.lines.map((l) => (
                <p key={l}>{l}</p>
              ))}
            </div>
            <div>
              <h2>{c.general.title}</h2>
              <p>{c.general.text}</p>
            </div>
            <p className="muted">{c.thanks}</p>
          </aside>

          <div className="form-card">
            <h2>{f.title}</h2>
            <p className="muted">{f.intro}</p>

            {status === 'sent' ? (
              <p className="notice notice--success" role="status">
                {f.success}
              </p>
            ) : (
              <form onSubmit={submit} noValidate>
                <div className="form-grid">
                  {field('fullName', { autoComplete: 'name' })}
                  {field('company', { optional: true, autoComplete: 'organization' })}
                  {field('email', { type: 'email', autoComplete: 'email' })}
                  {field('phone', { type: 'tel', optional: true, autoComplete: 'tel' })}
                  {field('country', { autoComplete: 'country-name' })}
                  <div className={`field ${errors.category ? 'has-error' : ''}`}>
                    <label htmlFor="f-category">{f.fields.category}</label>
                    <select
                      id="f-category"
                      name="category"
                      value={values.category}
                      onChange={update}
                      aria-invalid={!!errors.category}
                      aria-describedby={errors.category ? 'e-category' : undefined}
                    >
                      <option value="">{f.choose}</option>
                      {categories.map((k) => (
                        <option key={k} value={k}>
                          {f.categories[k]}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="field__error" id="e-category">
                        {f.errors.required}
                      </p>
                    )}
                  </div>
                </div>

                <div className={`field ${errors.message ? 'has-error' : ''}`}>
                  <label htmlFor="f-message">{f.fields.message}</label>
                  <textarea
                    id="f-message"
                    name="message"
                    rows={6}
                    maxLength={5000}
                    value={values.message}
                    onChange={update}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'e-message' : undefined}
                  />
                  {errors.message && (
                    <p className="field__error" id="e-message">
                      {f.errors[errors.message] || f.errors.invalid}
                    </p>
                  )}
                </div>

                {/* Honeypot for bots; hidden from people and assistive tech. */}
                <div className="hp" aria-hidden="true">
                  <label htmlFor="f-website">Website</label>
                  <input id="f-website" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={update} />
                </div>

                <div className={`field field--check ${errors.consent ? 'has-error' : ''}`}>
                  <input
                    id="f-consent"
                    name="consent"
                    type="checkbox"
                    checked={values.consent}
                    onChange={update}
                    aria-invalid={!!errors.consent}
                    aria-describedby={errors.consent ? 'e-consent' : undefined}
                  />
                  <label htmlFor="f-consent">
                    {f.consent} <Link to="/privacy-policy">{f.privacyLink}</Link>
                  </label>
                  {errors.consent && (
                    <p className="field__error" id="e-consent">
                      {f.errors.required}
                    </p>
                  )}
                </div>

                {serverError && (
                  <p className="notice notice--error" role="alert">
                    {f.errors[serverError] || f.errors.server}
                  </p>
                )}

                <button className="btn" type="submit" disabled={status === 'sending'}>
                  {status === 'sending' ? f.sending : f.submit}
                </button>
                <p className="muted small">{f.disclaimer}</p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

import { useEffect, useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { useSeo } from '../hooks/useSeo.js';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import { Paragraphs } from '../components/Cards.jsx';
import CtaBand from '../components/CtaBand.jsx';

export default function Portfolio() {
  const { t, lang } = useLanguage();
  const p = t.portfolio;
  const [entries, setEntries] = useState(null);
  useSeo('portfolio');

  useEffect(() => {
    fetch('/api/portfolio')
      .then((r) => (r.ok ? r.json() : []))
      .then(setEntries)
      .catch(() => setEntries([]));
  }, []);

  // Entries carry { en, ar } text; fall back to English if a translation is missing.
  const tr = (field) => (field ? field[lang] || field.en : '');

  return (
    <>
      <PageHero eyebrow={p.eyebrow} title={p.title} />
      <section className="section">
        <Reveal className="container narrow prose lead-first">
          <Paragraphs items={p.paragraphs} />
        </Reveal>
      </section>
      <section className="section section--tint">
        <div className="container">
          <h2 className="section-title">{p.explore.title}</h2>
          <p className="section-intro">{p.explore.text}</p>
          {entries === null && <p className="muted">{p.loading}</p>}
          {entries?.length === 0 && (
            <div className="empty-state">
              <p>{p.empty}</p>
              <p className="muted">{p.explore.note}</p>
            </div>
          )}
          {entries?.length > 0 && (
            <div className="card-grid">
              {entries.map((e) => (
                <Reveal key={e.id} as="article" className="card portfolio-card">
                  {e.image && <img src={e.image} alt="" loading="lazy" />}
                  <h3>{tr(e.name)}</h3>
                  {e.location && <p className="muted">{tr(e.location)}</p>}
                  <p>{tr(e.description)}</p>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
      <CtaBand title={p.learnMore.title} text={p.learnMore.text} button={p.learnMore.button} />
    </>
  );
}

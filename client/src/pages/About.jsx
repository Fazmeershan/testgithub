import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { useSeo } from '../hooks/useSeo.js';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import { CardGrid, Paragraphs } from '../components/Cards.jsx';
import CtaBand from '../components/CtaBand.jsx';

export default function About() {
  const { t } = useLanguage();
  const a = t.about;
  useSeo('about');

  return (
    <>
      <PageHero eyebrow={a.eyebrow} title={a.title} />
      <section className="section">
        <Reveal className="container narrow prose lead-first">
          <Paragraphs items={a.paragraphs} />
        </Reveal>
      </section>
      <section className="section section--tint">
        <div className="container vm-grid">
          {[a.vision, a.mission].map((b) => (
            <Reveal key={b.title} className="vm-card">
              <h2>{b.title}</h2>
              <p>{b.text}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="container split">
          <Reveal>
            <h2 className="section-title">{a.philosophy.title}</h2>
          </Reveal>
          <Reveal className="prose">
            <Paragraphs items={a.philosophy.paragraphs} />
          </Reveal>
        </div>
      </section>
      <section className="section section--tint">
        <div className="container">
          <p className="eyebrow">{a.values.eyebrow}</p>
          <h2 className="section-title">{a.values.title}</h2>
          <CardGrid items={a.values.items} />
          <div className="btn-row btn-row--center">
            <Link className="btn btn--outline" to="/approach">
              {a.links.approach}
            </Link>
            <Link className="btn btn--outline" to="/leadership">
              {a.links.leadership}
            </Link>
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  );
}

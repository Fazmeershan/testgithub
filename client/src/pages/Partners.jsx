import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { useSeo } from '../hooks/useSeo.js';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import { Paragraphs } from '../components/Cards.jsx';

export default function Partners() {
  const { t } = useLanguage();
  const p = t.partners;
  useSeo('partners');

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
          <h2 className="section-title">{p.opportunities.title}</h2>
          <div className="card-grid card-grid--3">
            {p.opportunities.items.map((o) => (
              <Reveal key={o.title} className="card">
                <span className="card__mark" aria-hidden="true" />
                <h3>{o.title}</h3>
                <p>{o.text}</p>
                <Link className="card__link" to={`/contact?category=${o.category}`}>
                  {t.nav.contact} <span aria-hidden="true" className="arrow">→</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <Reveal className="container narrow center">
          <h2 className="section-title">{p.conversation.title}</h2>
          <div className="prose">
            <Paragraphs items={p.conversation.paragraphs} />
          </div>
          <p className="principle">{p.conversation.closing}</p>
          <Link className="btn" to="/contact?category=investment">
            {p.conversation.button}
          </Link>
        </Reveal>
      </section>
    </>
  );
}

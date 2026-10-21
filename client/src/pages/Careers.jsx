import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { useSeo } from '../hooks/useSeo.js';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import { Paragraphs } from '../components/Cards.jsx';

export default function Careers() {
  const { t } = useLanguage();
  const c = t.careers;
  useSeo('careers');

  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.title} />
      <section className="section">
        <Reveal className="container narrow prose lead-first">
          <Paragraphs items={c.paragraphs} />
        </Reveal>
      </section>
      <section className="section section--tint">
        <div className="container split">
          <Reveal>
            <h2 className="section-title">{c.talent.title}</h2>
            <p className="principle">{c.talent.closing}</p>
          </Reveal>
          <Reveal className="prose">
            <Paragraphs items={c.talent.paragraphs} />
            <Link className="btn" to="/contact?category=careers">
              {c.button}
            </Link>
          </Reveal>
        </div>
      </section>
      {/* Publish vacancies only after the department has approved the role,
          requirements, application process and deadline. */}
      <section className="section">
        <div className="container narrow">
          <h2 className="section-title">{c.vacancies.title}</h2>
          <div className="empty-state">
            <p>{c.vacancies.empty}</p>
          </div>
        </div>
      </section>
    </>
  );
}

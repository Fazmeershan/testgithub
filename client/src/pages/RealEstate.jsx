import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { useSeo } from '../hooks/useSeo.js';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import { CardGrid, Paragraphs } from '../components/Cards.jsx';
import CtaBand from '../components/CtaBand.jsx';

export default function RealEstate() {
  const { t } = useLanguage();
  const r = t.realEstate;
  useSeo('realEstate');

  return (
    <>
      <PageHero eyebrow={r.eyebrow} title={r.title}>
        <div className="btn-row">
          <Link className="btn btn--light" to="/real-estate#focus">
            {r.buttons.explore}
          </Link>
          <Link className="btn btn--ghost" to="/contact?category=real-estate">
            {r.buttons.contact}
          </Link>
        </div>
      </PageHero>
      <section className="section">
        <Reveal className="container narrow prose lead-first">
          <Paragraphs items={r.paragraphs} />
        </Reveal>
      </section>
      <section className="section section--tint" id="focus">
        <div className="container">
          <h2 className="section-title">{r.focus.title}</h2>
          <CardGrid items={r.focus.items} numbered />
        </div>
      </section>
      <section className="section">
        <div className="container split">
          <Reveal>
            <h2 className="section-title">{r.approach.title}</h2>
            <p className="principle">{r.approach.principle}</p>
          </Reveal>
          <Reveal className="prose">
            <Paragraphs items={r.approach.paragraphs} />
          </Reveal>
        </div>
      </section>
      <CtaBand button={r.buttons.contact} to="/contact?category=real-estate" />
    </>
  );
}

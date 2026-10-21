import { useLanguage } from '../i18n/LanguageContext.jsx';
import { useSeo } from '../hooks/useSeo.js';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import { CardGrid, Paragraphs } from '../components/Cards.jsx';
import CtaBand from '../components/CtaBand.jsx';

export default function Investments() {
  const { t } = useLanguage();
  const v = t.investments;
  useSeo('investments');

  return (
    <>
      <PageHero eyebrow={v.eyebrow} title={v.title} />
      <section className="section">
        <Reveal className="container narrow prose lead-first">
          <Paragraphs items={v.paragraphs} />
        </Reveal>
      </section>
      <section className="section section--tint">
        <div className="container">
          <h2 className="section-title">{v.priorities.title}</h2>
          <CardGrid items={v.priorities.items} numbered />
        </div>
      </section>
      <section className="section">
        <div className="container split">
          <Reveal>
            <h2 className="section-title">{v.beyond.title}</h2>
          </Reveal>
          <Reveal className="prose">
            <Paragraphs items={v.beyond.paragraphs} />
          </Reveal>
        </div>
      </section>
      <CtaBand button={v.button} to="/contact?category=investment" />
    </>
  );
}

import { useLanguage } from '../i18n/LanguageContext.jsx';
import { useSeo } from '../hooks/useSeo.js';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import { Paragraphs } from '../components/Cards.jsx';
import CtaBand from '../components/CtaBand.jsx';

export default function Governance() {
  const { t } = useLanguage();
  const g = t.governance;
  useSeo('governance');

  return (
    <>
      <PageHero eyebrow={g.eyebrow} title={g.title} />
      <section className="section">
        <Reveal className="container narrow prose lead-first">
          <Paragraphs items={g.paragraphs} />
        </Reveal>
      </section>
      <section className="section section--tint">
        <div className="container split">
          <Reveal>
            <h2 className="section-title">{g.responsible.title}</h2>
          </Reveal>
          <Reveal className="prose">
            <Paragraphs items={g.responsible.paragraphs} />
          </Reveal>
        </div>
      </section>
      <section className="section">
        <Reveal className="container narrow center">
          <h2 className="section-title">{g.commitment.title}</h2>
          <p className="lead">{g.commitment.text}</p>
        </Reveal>
      </section>
      <CtaBand />
    </>
  );
}

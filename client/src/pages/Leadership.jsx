import { useLanguage } from '../i18n/LanguageContext.jsx';
import { useSeo } from '../hooks/useSeo.js';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import { Paragraphs } from '../components/Cards.jsx';
import CtaBand from '../components/CtaBand.jsx';

export default function Leadership() {
  const { t } = useLanguage();
  const l = t.leadership;
  useSeo('leadership');

  return (
    <>
      <PageHero eyebrow={l.eyebrow} title={l.title} />
      <section className="section">
        <Reveal className="container narrow prose lead-first">
          <Paragraphs items={l.paragraphs} />
          <blockquote className="quote">{l.principle}</blockquote>
        </Reveal>
      </section>
      <CtaBand />
    </>
  );
}

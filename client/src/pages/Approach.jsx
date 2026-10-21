import { useLanguage } from '../i18n/LanguageContext.jsx';
import { useSeo } from '../hooks/useSeo.js';
import PageHero from '../components/PageHero.jsx';
import Reveal from '../components/Reveal.jsx';
import CtaBand from '../components/CtaBand.jsx';

export default function Approach() {
  const { t } = useLanguage();
  const a = t.approach;
  useSeo('approach');

  return (
    <>
      <PageHero eyebrow={a.eyebrow} title={a.title}>
        <p className="page-hero__lead">{a.intro}</p>
      </PageHero>
      <section className="section">
        <ol className="container steps">
          {a.steps.map((s, i) => (
            <Reveal as="li" key={s.title} className="step">
              <span className="step__num">
                {a.stepLabel} {i + 1}
              </span>
              <h2>{s.title}</h2>
              <p>{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </section>
      <section className="section section--dark">
        <Reveal className="container narrow center">
          <h2 className="section-title">{a.commitment.title}</h2>
          <p className="lead">{a.commitment.text}</p>
        </Reveal>
      </section>
      <CtaBand />
    </>
  );
}

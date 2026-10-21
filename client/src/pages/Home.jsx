import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { useSeo } from '../hooks/useSeo.js';
import Skyline from '../components/Skyline.jsx';
import Reveal from '../components/Reveal.jsx';
import { CardGrid, Paragraphs } from '../components/Cards.jsx';
import CtaBand from '../components/CtaBand.jsx';

export default function Home() {
  const { t } = useLanguage();
  const h = t.home;
  useSeo('home');

  return (
    <>
      <section className="hero">
        <div className="container hero__inner">
          <img className="hero__logo" src="/logo.png" alt={t.brand.name} width="112" height="112" />
          <p className="eyebrow eyebrow--light">{h.hero.eyebrow}</p>
          <h1>{h.hero.title}</h1>
          <p className="hero__subtitle">{h.hero.subtitle}</p>
          <p className="hero__intro">{h.hero.intro}</p>
          <div className="btn-row">
            <Link className="btn btn--light" to="/#our-business">
              {h.hero.buttons.explore}
            </Link>
            <Link className="btn btn--ghost" to="/about">
              {h.hero.buttons.discover}
            </Link>
            <Link className="btn btn--ghost" to="/contact">
              {h.hero.buttons.contact}
            </Link>
          </div>
        </div>
        <Skyline />
      </section>

      <section className="section">
        <div className="container split">
          <Reveal>
            <h2 className="section-title">{h.legacy.title}</h2>
            <p className="principle">{h.legacy.principle}</p>
          </Reveal>
          <Reveal className="prose">
            <Paragraphs items={h.legacy.paragraphs} />
            <Paragraphs items={h.rooted} />
          </Reveal>
        </div>
      </section>

      <section className="section section--tint" id="our-business">
        <div className="container">
          <p className="eyebrow">{h.business.eyebrow}</p>
          <h2 className="section-title">{h.business.title}</h2>
          <CardGrid items={h.business.items} more={h.business.more} />
        </div>
      </section>

      <section className="section">
        <div className="container vm-grid">
          {[h.vision, h.mission].map((b) => (
            <Reveal key={b.title} className="vm-card">
              <h2>{b.title}</h2>
              <p>{b.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section section--dark">
        <div className="container split">
          <Reveal>
            <h2 className="section-title">{h.why.title}</h2>
          </Reveal>
          <Reveal as="ul" className="check-list">
            {h.why.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section">
        <Reveal className="container narrow center">
          <h2 className="section-title">{h.lasting.title}</h2>
          <div className="prose">
            <Paragraphs items={h.lasting.paragraphs} />
          </div>
          <Link className="btn" to="/approach">
            {h.lasting.button}
          </Link>
        </Reveal>
      </section>

      <CtaBand />
    </>
  );
}

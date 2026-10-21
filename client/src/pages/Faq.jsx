import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { useSeo } from '../hooks/useSeo.js';
import PageHero from '../components/PageHero.jsx';

export default function Faq() {
  const { t } = useLanguage();
  const f = t.faq;
  useSeo('faq');

  return (
    <>
      <PageHero eyebrow={f.eyebrow} title={f.title} />
      <section className="section">
        <div className="container narrow faq">
          {f.items.map((item) => (
            <details key={item.q}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
          <div className="btn-row btn-row--center">
            <Link className="btn" to="/contact">
              {t.nav.contact}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { useSeo } from '../hooks/useSeo.js';
import PageHero from '../components/PageHero.jsx';

// Placeholder for legal pages until their text has been legally reviewed.
export default function Legal({ page }) {
  const { t } = useLanguage();
  const title = t.legal.pages[page];
  useSeo('legal', title);

  return (
    <>
      <PageHero title={title} />
      <section className="section">
        <div className="container narrow prose">
          <p>{t.legal.pending}</p>
          <p className="muted">{t.footer.disclaimer}</p>
          <Link className="btn" to="/contact">
            {t.nav.contact}
          </Link>
        </div>
      </section>
    </>
  );
}

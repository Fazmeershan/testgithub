import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { useSeo } from '../hooks/useSeo.js';
import PageHero from '../components/PageHero.jsx';

export default function NotFound() {
  const { t } = useLanguage();
  useSeo('notFound');
  return (
    <PageHero eyebrow="404" title={t.notFound.title}>
      <p className="page-hero__lead">{t.notFound.text}</p>
      <div className="btn-row">
        <Link className="btn btn--light" to="/">
          {t.notFound.button}
        </Link>
      </div>
    </PageHero>
  );
}

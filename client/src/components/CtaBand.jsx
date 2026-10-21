import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext.jsx';

export default function CtaBand({ title, text, button, to = '/contact' }) {
  const { t } = useLanguage();
  return (
    <section className="cta-band">
      <div className="container cta-band__inner">
        <div>
          <h2>{title || t.cta.title}</h2>
          <p>{text || t.cta.text}</p>
        </div>
        <Link className="btn btn--light" to={to}>
          {button || t.cta.button}
        </Link>
      </div>
    </section>
  );
}

import { Link } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext.jsx';
import { PRIMARY_NAV } from './Header.jsx';

const COMPANY = [
  ['approach', '/approach'],
  ['leadership', '/leadership'],
  ['partners', '/partners'],
  ['faq', '/faq'],
];

const LEGAL = [
  ['privacy', '/privacy-policy'],
  ['terms', '/terms-of-use'],
  ['cookies', '/cookie-policy'],
  ['accessibility', '/accessibility'],
];

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <img src="/logo.png" alt="" width="64" height="64" />
          <p className="site-footer__name">{t.brand.name}</p>
          <p className="site-footer__tagline">{t.brand.tagline}</p>
          <p>{t.footer.blurb}</p>
        </div>
        <FooterList title={t.footer.explore} items={PRIMARY_NAV.map(([k, to]) => [t.nav[k], to])} />
        <FooterList title={t.footer.company} items={COMPANY.map(([k, to]) => [t.nav[k], to])} />
        <div>
          <FooterList title={t.footer.corporate} items={LEGAL.map(([k, to]) => [t.legal.pages[k], to])} />
          <h2 className="site-footer__heading site-footer__heading--spaced">{t.footer.location}</h2>
          <p>{t.brand.location}</p>
        </div>
      </div>
      <div className="container site-footer__bottom">
        <p className="site-footer__disclaimer">{t.footer.disclaimer}</p>
        <p>{t.footer.copyright.replace('{year}', new Date().getFullYear())}</p>
      </div>
    </footer>
  );
}

function FooterList({ title, items }) {
  return (
    <div>
      <h2 className="site-footer__heading">{title}</h2>
      <ul className="site-footer__list">
        {items.map(([label, to]) => (
          <li key={to}>
            <Link to={to}>{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

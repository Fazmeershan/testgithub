import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useLanguage } from '../i18n/LanguageContext.jsx';

export const PRIMARY_NAV = [
  ['home', '/'],
  ['about', '/about'],
  ['realEstate', '/real-estate'],
  ['investments', '/investments'],
  ['portfolio', '/portfolio'],
  ['governance', '/governance'],
  ['careers', '/careers'],
  ['contact', '/contact'],
];

export default function Header() {
  const { t, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
  }, [open]);

  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <a className="skip-link" href="#main">
        {t.nav.skip}
      </a>
      <div className="container site-header__inner">
        <Link to="/" className="brand" aria-label={t.brand.name}>
          <img src="/logo.png" alt="" width="44" height="44" />
          <span className="brand__text">
            <span className="brand__name">{t.lang === 'ar' ? t.brand.name : 'DAWODIA'}</span>
            {t.lang !== 'ar' && <span className="brand__sub">HOLDING</span>}
          </span>
        </Link>

        <nav id="primary-nav" className={`primary-nav ${open ? 'is-open' : ''}`} aria-label="Primary">
          <ul>
            {PRIMARY_NAV.map(([key, to]) => (
              <li key={key}>
                <NavLink to={to} end={to === '/'}>
                  {t.nav[key]}
                </NavLink>
              </li>
            ))}
          </ul>
          <button type="button" className="lang-switch lang-switch--mobile" onClick={() => setLang(t.switchLang)} lang={t.switchLang}>
            {t.switchLabel}
          </button>
        </nav>

        <div className="site-header__actions">
          <button type="button" className="lang-switch" onClick={() => setLang(t.switchLang)} lang={t.switchLang}>
            {t.switchLabel}
          </button>
          <Link to="/contact" className="btn btn--small header-cta">
            {t.nav.contact}
          </Link>
          <button
            type="button"
            className={`menu-toggle ${open ? 'is-open' : ''}`}
            aria-expanded={open}
            aria-controls="primary-nav"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}

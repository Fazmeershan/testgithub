import { useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext.jsx';

// Sets the document title and meta description from content.seo[key].
// `page` fills the {page} placeholder used by the legal pages.
export function useSeo(key, page = '') {
  const { t } = useLanguage();
  useEffect(() => {
    const seo = t.seo[key];
    document.title = seo.title.replace('{page}', page);
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = seo.description.replace('{page}', page);
  }, [t, key, page]);
}

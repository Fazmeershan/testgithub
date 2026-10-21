import { Link } from 'react-router-dom';
import Reveal from './Reveal.jsx';

export function CardGrid({ items, numbered = false, more }) {
  return (
    <div className="card-grid">
      {items.map((item, i) => (
        <Reveal key={item.title} className="card">
          {numbered ? <span className="card__num">{String(i + 1).padStart(2, '0')}</span> : <span className="card__mark" aria-hidden="true" />}
          <h3>{item.title}</h3>
          <p>{item.text}</p>
          {more && item.to && (
            <Link className="card__link" to={item.to}>
              {more} <span aria-hidden="true" className="arrow">→</span>
            </Link>
          )}
        </Reveal>
      ))}
    </div>
  );
}

export function Paragraphs({ items }) {
  return items.map((p) => <p key={p}>{p}</p>);
}

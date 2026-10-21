import Skyline from './Skyline.jsx';

export default function PageHero({ eyebrow, title, children }) {
  return (
    <section className="page-hero">
      <div className="container page-hero__inner">
        {eyebrow && <p className="eyebrow eyebrow--light">{eyebrow}</p>}
        <h1>{title}</h1>
        {children}
      </div>
      <Skyline />
    </section>
  );
}

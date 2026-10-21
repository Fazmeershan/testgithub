import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import RealEstate from './pages/RealEstate.jsx';
import Investments from './pages/Investments.jsx';
import Approach from './pages/Approach.jsx';
import Leadership from './pages/Leadership.jsx';
import Governance from './pages/Governance.jsx';
import Portfolio from './pages/Portfolio.jsx';
import Partners from './pages/Partners.jsx';
import Careers from './pages/Careers.jsx';
import Contact from './pages/Contact.jsx';
import Faq from './pages/Faq.jsx';
import Legal from './pages/Legal.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="real-estate" element={<RealEstate />} />
        <Route path="investments" element={<Investments />} />
        <Route path="approach" element={<Approach />} />
        <Route path="leadership" element={<Leadership />} />
        <Route path="governance" element={<Governance />} />
        <Route path="portfolio" element={<Portfolio />} />
        <Route path="partners" element={<Partners />} />
        <Route path="careers" element={<Careers />} />
        <Route path="contact" element={<Contact />} />
        <Route path="faq" element={<Faq />} />
        <Route path="privacy-policy" element={<Legal page="privacy" />} />
        <Route path="terms-of-use" element={<Legal page="terms" />} />
        <Route path="cookie-policy" element={<Legal page="cookies" />} />
        <Route path="accessibility" element={<Legal page="accessibility" />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

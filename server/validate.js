export const CATEGORIES = ['general', 'real-estate', 'investment', 'partnership', 'careers', 'other'];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[+()\d\s-]{6,25}$/;

const clean = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export function validateEnquiry(body) {
  const data = {
    fullName: clean(body.fullName, 120),
    company: clean(body.company, 160),
    email: clean(body.email, 160),
    phone: clean(body.phone, 25),
    country: clean(body.country, 80),
    category: clean(body.category, 30),
    message: clean(body.message, 5000),
    consent: body.consent === true,
    language: body.language === 'ar' ? 'ar' : 'en',
  };

  const errors = {};
  if (data.fullName.length < 2) errors.fullName = 'required';
  if (!EMAIL_RE.test(data.email)) errors.email = 'invalid';
  if (data.phone && !PHONE_RE.test(data.phone)) errors.phone = 'invalid';
  if (!data.country) errors.country = 'required';
  if (!CATEGORIES.includes(data.category)) errors.category = 'invalid';
  if (data.message.length < 10) errors.message = 'too_short';
  if (!data.consent) errors.consent = 'required';

  return Object.keys(errors).length ? { errors } : { data };
}

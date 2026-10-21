# Dawodia Holding — Corporate Website

**Building Value. Shaping Tomorrow.**

The Dawodia Holding website has two parts:

- **Frontend:** React 18 and Vite, in `client/`
- **Backend:** Node.js and Express, in `server/`

It supports English and Arabic. Arabic switches the whole layout to right-to-left.

## Requirements

- Node.js 18 or newer (`node -v`)
- VS Code, or any editor

## Getting started (VS Code terminal)

```bash
# 1. Install all dependencies (root, client and server)
npm run install:all

# 2. Optional: configure email notifications
cp server/.env.example server/.env    # then edit server/.env

# 3. Run frontend and backend together in development
npm run dev
```

- Website: http://localhost:5173
- API: http://localhost:5000. Vite forwards `/api/*` requests to it.

### Production

```bash
npm run build     # builds the React app into client/dist
npm start         # Express serves the API and the built site on PORT (default 5000)
```

## Project structure

```
client/
  public/logo.png            Official logo
  src/content/en.js          All English website text
  src/content/ar.js          All Arabic website text (draft, see below)
  src/i18n/                  Language switcher, sets <html lang/dir>
  src/components/            Header, Footer, PageHero, cards, CTA band…
  src/pages/                 One file per page
  src/styles.css             Brand colours, layout, responsive and RTL styles
server/
  index.js                   Express app: security headers, API, static hosting
  validate.js                Server-side validation of enquiries
  mailer.js                  Email notifications (nodemailer, optional)
  data/portfolio.json        Portfolio entries shown on /portfolio
  data/enquiries.jsonl       Received enquiries, created at runtime and not committed
```

## Pages

| Route | Page |
|---|---|
| `/` | Home |
| `/about` | About Us |
| `/real-estate` | Real Estate |
| `/investments` | Strategic Investments |
| `/approach` | Our Approach |
| `/leadership` | Leadership and Heritage |
| `/governance` | Corporate Governance and Responsibility |
| `/portfolio` | Our Portfolio |
| `/partners` | Investors and Business Partners |
| `/careers` | Careers |
| `/contact` | Contact Us (enquiry form) |
| `/faq` | Frequently Asked Questions |
| `/privacy-policy`, `/terms-of-use`, `/cookie-policy`, `/accessibility` | Legal placeholders |

Each page sets its own SEO title and meta description from `seo` in the content files.

A link such as `/contact?category=investment` opens the form with that category already selected. The categories are `general`, `real-estate`, `investment`, `partnership`, `careers` and `other`.

## API

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/health` | Health check |
| GET | `/api/portfolio` | Portfolio entries from `server/data/portfolio.json` |
| POST | `/api/enquiries` | Contact form submission |

How enquiries are handled:

- The server validates every field.
- Each address can submit 5 times per 15 minutes.
- A hidden field catches spam bots.
- Valid enquiries are added to `server/data/enquiries.jsonl`.
- If SMTP is configured in `server/.env`, each enquiry is also emailed to `MAIL_TO`.

## Updating content

- **Text:** edit `client/src/content/en.js` and `ar.js`. Both files use the same keys.
- **Portfolio:** add only verified, management-approved entries to `server/data/portfolio.json`:

  ```json
  [
    {
      "id": "example-tower",
      "name": { "en": "Example Tower", "ar": "برج مثال" },
      "location": { "en": "Doha, Qatar", "ar": "الدوحة، قطر" },
      "description": { "en": "Approved description…", "ar": "وصف معتمد…" },
      "image": "/portfolio/example-tower.jpg"
    }
  ]
  ```

  Put images in `client/public/portfolio/`. Do not publish asset values, property counts or financial figures that have not been confirmed.
- **Careers:** list a vacancy on `client/src/pages/Careers.jsx` only after the department has approved the role.

## Before launch

The items below come from the pre-launch checklist and still need input from management:

- [ ] Confirm the official legal entity name and the **Arabic spelling of "Dawodia Holding"**. The draft uses داوودية القابضة.
- [ ] Have a qualified translator review all of `ar.js`.
- [ ] Add the approved ownership wording and the leadership names, titles, biographies and photos to `/leadership`.
- [ ] Add the verified office address, telephone, email and map to `/contact`.
- [ ] Add the verified portfolio entries and photos you hold usage rights for.
- [ ] Replace the abstract skyline artwork with licensed Doha photography.
- [ ] Replace the legal placeholders with legally reviewed Privacy, Terms, Cookie and Accessibility text.
- [ ] Configure SMTP and the address that receives enquiries.
- [ ] Set up the domain, HTTPS, hosting, backups, analytics and Search Console.
- [ ] Run accessibility, cross-browser and security testing.

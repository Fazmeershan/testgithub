// Builds the Dawodia Holding company values deck.
// Usage: node build_deck.js  ->  Dawodia_Holding_Our_Values.pptx
// Logo: assets/logo.png (round badge on a transparent background). Colours are
// taken from the logo: deep burgundy, crimson and silver.
const path = require("path");
const fs = require("fs");
const pptxgen = require("pptxgenjs");
const sharp = require("sharp");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const fa = require("react-icons/fa6");

const C = {
  navy: "4A0F26", // deep burgundy: dark panels and headings
  gold: "B8315A", // logo crimson: accent on light backgrounds
  silver: "D6D9DE", // logo ring: accent on dark backgrounds
  rose: "F2A7BD", // highlight text on dark backgrounds
  goldSoft: "F9E8EE",
  ink: "221A1D",
  muted: "6B6166",
  light: "F6F4F5",
  white: "FFFFFF",
};
const HEAD = "Arial";
const BODY = "Calibri";
const SERIF = "Cambria";

const ASSETS = path.join(__dirname, "assets");
const LOGO = path.join(ASSETS, "logo.png");

async function icon(Comp, color, px = 256) {
  const svg = ReactDOMServer.renderToStaticMarkup(
    React.createElement(Comp, { color: "#" + color, size: px })
  );
  const buf = await sharp(Buffer.from(svg)).resize(px, px).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

async function darkBackground() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#2E0715"/><stop offset="1" stop-color="#6B1533"/>
      </linearGradient>
      <radialGradient id="r" cx="0.85" cy="0.2" r="0.6">
        <stop offset="0" stop-color="#D6D9DE" stop-opacity="0.14"/>
        <stop offset="1" stop-color="#D6D9DE" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="1920" height="1080" fill="url(#g)"/>
    <rect width="1920" height="1080" fill="url(#r)"/>
    <g fill="none" stroke="#D6D9DE" stroke-opacity="0.14" stroke-width="2">
      <circle cx="1700" cy="880" r="420"/>
      <circle cx="1700" cy="880" r="300"/>
    </g>
  </svg>`;
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

(async () => {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9"; // 10 x 5.625
  pres.author = "Dawodia Holding";
  pres.company = "Dawodia Holding";
  pres.title = "Our Values & Direction";

  const bg = await darkBackground();

  // ---------- shared pieces ----------
  const addLogo = (slide) => {
    const d = 0.62;
    slide.addImage({ path: LOGO, x: 10 - 0.4 - d, y: 0.2, w: d, h: d, altText: "Dawodia Holding logo" });
  };

  const addChrome = (slide, num, label, onDark) => {
    addLogo(slide);
    slide.addText(`${String(num).padStart(2, "0")}   ${label}`, {
      x: 0.5, y: 0.3, w: 5, h: 0.3, margin: 0, isTextBox: true,
      fontFace: HEAD, fontSize: 10, bold: true, charSpacing: 4,
      color: onDark ? C.silver : C.gold,
    });
    slide.addText("DAWODIA HOLDING  ·  OUR VALUES", {
      x: 0.5, y: 5.2, w: 4, h: 0.25, margin: 0, isTextBox: true,
      fontFace: HEAD, fontSize: 8, charSpacing: 3,
      color: onDark ? "D2B3BF" : "9A8C92",
    });
    slide.addText(String(num + 1).padStart(2, "0"), {
      x: 9.0, y: 5.2, w: 0.5, h: 0.25, margin: 0, isTextBox: true, align: "right",
      fontFace: HEAD, fontSize: 8, color: onDark ? "D2B3BF" : "9A8C92",
    });
  };

  const iconBadge = async (slide, Comp, x, y, d, fill, fg) => {
    slide.addShape(pres.shapes.OVAL, { x, y, w: d, h: d, fill: { color: fill }, line: { color: fill } });
    const pad = d * 0.27;
    slide.addImage({ data: await icon(Comp, fg), x: x + pad, y: y + pad, w: d - 2 * pad, h: d - 2 * pad });
  };

  const shadow = () => ({ type: "outer", color: "4A0F26", blur: 12, offset: 3, angle: 90, opacity: 0.12 });

  const quote = await icon(fa.FaQuoteLeft, C.gold);
  const quoteDark = await icon(fa.FaQuoteLeft, C.silver);

  // =============== 1. COVER ===============
  {
    const s = pres.addSlide();
    s.background = { data: bg };
    s.addImage({ path: LOGO, x: 0.6, y: 0.5, w: 1.0, h: 1.0, altText: "Dawodia Holding logo" });
    s.addText([
      { text: "DAWODIA", options: { fontSize: 20, bold: true, color: C.white, charSpacing: 6, breakLine: true } },
      { text: "HOLDING", options: { fontSize: 11, color: C.silver, charSpacing: 10 } },
    ], { x: 1.8, y: 0.62, w: 4, h: 0.76, margin: 0, isTextBox: true, valign: "middle", fontFace: HEAD });
    s.addText("COMPANY VALUES  ·  2026", {
      x: 0.6, y: 1.9, w: 6, h: 0.3, margin: 0, isTextBox: true,
      fontFace: HEAD, fontSize: 11, bold: true, charSpacing: 5, color: C.silver,
    });
    s.addText("Our Values,\nOur Direction", {
      x: 0.6, y: 2.25, w: 7, h: 1.6, margin: 0, isTextBox: true, valign: "top",
      fontFace: HEAD, fontSize: 44, bold: true, color: C.white, paraSpaceAfter: 0,
    });
    s.addText("One Organization. One Vision. One Direction.", {
      x: 0.6, y: 3.9, w: 7, h: 0.4, margin: 0, isTextBox: true,
      fontFace: SERIF, fontSize: 18, italic: true, color: "F1E1E7",
    });
    s.addText("Purpose   ·   People   ·   Excellence   ·   One Team   ·   Innovation   ·   Ownership   ·   Future", {
      x: 0.6, y: 4.85, w: 8.5, h: 0.3, margin: 0, isTextBox: true,
      fontFace: HEAD, fontSize: 10, charSpacing: 1, color: "D2B3BF",
    });
    s.addNotes("Welcome. Today we walk through the values that unite Dawodia Holding: our purpose, our people, how we execute, how we work as one team, how we innovate, how we take ownership, and the future we are building together.");
  }

  // =============== 2. OUR PURPOSE ===============
  {
    const s = pres.addSlide();
    s.background = { color: C.white };
    // half-bleed dark panel
    s.addImage({ data: bg, x: 0, y: 0, w: 4, h: 5.625, sizing: { type: "cover", w: 4, h: 5.625 } });
    s.addText("01", {
      x: 0.5, y: 0.7, w: 2, h: 1.0, margin: 0, isTextBox: true,
      fontFace: HEAD, fontSize: 60, bold: true, color: C.silver,
    });
    s.addText("OUR PURPOSE", {
      x: 0.5, y: 1.8, w: 3, h: 0.3, margin: 0, isTextBox: true,
      fontFace: HEAD, fontSize: 11, bold: true, charSpacing: 5, color: "F1E1E7",
    });
    s.addText("One Organization.\nOne Vision.\nOne Direction.", {
      x: 0.5, y: 2.2, w: 3.2, h: 1.7, margin: 0, isTextBox: true, valign: "top",
      fontFace: HEAD, fontSize: 26, bold: true, color: C.white,
    });
    s.addText("DAWODIA HOLDING  ·  OUR VALUES", {
      x: 0.5, y: 5.2, w: 3.4, h: 0.25, margin: 0, isTextBox: true,
      fontFace: HEAD, fontSize: 8, charSpacing: 2, color: "D2B3BF",
    });
    s.addText("02", {
      x: 9.0, y: 5.2, w: 0.5, h: 0.25, margin: 0, isTextBox: true, align: "right",
      fontFace: HEAD, fontSize: 8, color: "9A8C92",
    });
    addLogo(s);

    const rows = [
      [fa.FaSitemap, "We are more than individual departments—we are one organization."],
      [fa.FaPuzzlePiece, "Every department contributes to the success of Dawodia Holding."],
      [fa.FaCompass, "Our daily decisions should support the company’s long-term vision."],
      [fa.FaArrowTrendUp, "When we move in one direction, our collective impact becomes stronger."],
    ];
    let y = 1.05;
    for (const [I, t] of rows) {
      await iconBadge(s, I, 4.5, y, 0.55, C.goldSoft, C.gold);
      s.addText(t, {
        x: 5.25, y, w: 4.25, h: 0.55, margin: 0, isTextBox: true, valign: "middle",
        fontFace: BODY, fontSize: 15, color: C.ink,
      });
      y += 0.78;
    }
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 4.5, y: 4.2, w: 5.0, h: 0.75, rectRadius: 0.1, fill: { color: C.navy }, line: { color: C.navy },
    });
    s.addImage({ data: quoteDark, x: 4.75, y: 4.43, w: 0.3, h: 0.3 });
    s.addText("Together, we turn our vision into reality.", {
      x: 5.2, y: 4.2, w: 4.2, h: 0.75, margin: 0, isTextBox: true, valign: "middle",
      fontFace: SERIF, fontSize: 17, italic: true, color: C.white,
    });
    s.addNotes("We are one organization. Every department plays a role, and our daily decisions should support Dawodia Holding's long-term vision. Key message: Together, we turn our vision into reality.");
  }

  // =============== 3. OUR PEOPLE ===============
  {
    const s = pres.addSlide();
    s.background = { color: C.light };
    addChrome(s, 1 + 1, "OUR PEOPLE", false);
    s.addText("People Are Our Greatest Strength", {
      x: 0.5, y: 0.7, w: 7.5, h: 0.7, margin: 0, isTextBox: true,
      fontFace: HEAD, fontSize: 30, bold: true, color: C.navy,
    });
    const cards = [
      [fa.FaUserCheck, "Ownership", "Empower people to take ownership of their responsibilities."],
      [fa.FaGraduationCap, "Growth", "Encourage learning, development, and knowledge sharing."],
      [fa.FaHandshake, "Respect", "Respect every role and recognize every contribution."],
      [fa.FaSeedling, "Opportunity", "Build an environment where employees can grow and succeed."],
    ];
    const cw = 2.85, ch = 1.6, gx = 0.3, gy = 0.3, x0 = 0.5, y0 = 1.65;
    for (let i = 0; i < 4; i++) {
      const [I, h, t] = cards[i];
      const x = x0 + (i % 2) * (cw + gx), y = y0 + Math.floor(i / 2) * (ch + gy);
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x, y, w: cw, h: ch, rectRadius: 0.12, fill: { color: C.white }, line: { color: "E3E8EF" }, shadow: shadow(),
      });
      await iconBadge(s, I, x + 0.25, y + 0.25, 0.5, C.navy, C.white);
      s.addText(h, {
        x: x + 0.9, y: y + 0.25, w: cw - 1.1, h: 0.5, margin: 0, isTextBox: true, valign: "middle",
        fontFace: HEAD, fontSize: 14, bold: true, color: C.navy,
      });
      s.addText(t, {
        x: x + 0.25, y: y + 0.85, w: cw - 0.45, h: 0.6, margin: 0, isTextBox: true, valign: "top",
        fontFace: BODY, fontSize: 13, color: C.muted,
      });
    }
    // key message panel
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 6.75, y: 1.65, w: 2.75, h: 3.5, rectRadius: 0.12, fill: { color: C.navy }, line: { color: C.navy }, shadow: shadow(),
    });
    s.addImage({ data: quoteDark, x: 7.05, y: 1.95, w: 0.45, h: 0.45 });
    s.addText("Strong people build strong organizations.", {
      x: 7.05, y: 2.6, w: 2.2, h: 1.8, margin: 0, isTextBox: true, valign: "top",
      fontFace: SERIF, fontSize: 22, italic: true, color: C.white,
    });
    s.addText("KEY MESSAGE", {
      x: 7.05, y: 4.6, w: 2.2, h: 0.3, margin: 0, isTextBox: true,
      fontFace: HEAD, fontSize: 9, bold: true, charSpacing: 4, color: C.silver,
    });
    s.addNotes("Our people are our greatest strength. We empower ownership, encourage learning, respect every role, and build an environment where everyone can grow. Key message: Strong people build strong organizations.");
  }

  // =============== 4. EXCELLENCE IN EXECUTION ===============
  {
    const s = pres.addSlide();
    s.background = { color: C.white };
    addChrome(s, 3, "EXCELLENCE IN EXECUTION", false);
    s.addText([
      { text: "Do It Right. ", options: { color: C.navy } },
      { text: "Do It Better. ", options: { color: C.navy } },
      { text: "Do It Consistently.", options: { color: C.gold } },
    ], {
      x: 0.5, y: 0.7, w: 9, h: 0.7, margin: 0, isTextBox: true,
      fontFace: HEAD, fontSize: 28, bold: true,
    });

    const steps = [
      [fa.FaBullseye, "Clear Targets", "Set clear objectives and measurable targets."],
      [fa.FaGaugeHigh, "Quality & Speed", "Focus on quality, efficiency, and timely delivery."],
      [fa.FaScissors, "Remove Waste", "Reduce unnecessary processes, delays, and rework."],
      [fa.FaArrowsRotate, "Keep Improving", "Continuously improve the way we work."],
    ];
    const colW = 2.1, gap = 0.2, x0 = 0.5, cy = 1.95, d = 0.8;
    // connector line through badge centres
    s.addShape(pres.shapes.LINE, {
      x: x0 + colW / 2, y: cy + d / 2, w: 3 * (colW + gap), h: 0,
      line: { color: "E3A5B8", width: 1.5, dashType: "dash" },
    });
    for (let i = 0; i < 4; i++) {
      const [I, h, t] = steps[i];
      const x = x0 + i * (colW + gap);
      await iconBadge(s, I, x + (colW - d) / 2, cy, d, C.navy, C.white);
      s.addText(`STEP ${i + 1}`, {
        x, y: cy + d + 0.15, w: colW, h: 0.25, margin: 0, isTextBox: true, align: "center",
        fontFace: HEAD, fontSize: 9, bold: true, charSpacing: 3, color: C.gold,
      });
      s.addText(h, {
        x, y: cy + d + 0.4, w: colW, h: 0.35, margin: 0, isTextBox: true, align: "center",
        fontFace: HEAD, fontSize: 15, bold: true, color: C.navy,
      });
      s.addText(t, {
        x: x + 0.1, y: cy + d + 0.75, w: colW - 0.2, h: 0.65, margin: 0, isTextBox: true, align: "center", valign: "top",
        fontFace: BODY, fontSize: 13, color: C.muted,
      });
    }
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.5, y: 4.3, w: 9, h: 0.7, rectRadius: 0.1, fill: { color: C.goldSoft }, line: { color: C.goldSoft },
    });
    s.addImage({ data: quote, x: 0.8, y: 4.5, w: 0.3, h: 0.3 });
    s.addText("Excellence is not one achievement—it is a daily habit.", {
      x: 1.3, y: 4.3, w: 8, h: 0.7, margin: 0, isTextBox: true, valign: "middle",
      fontFace: SERIF, fontSize: 18, italic: true, color: C.navy,
    });
    s.addNotes("Excellence in execution: set clear, measurable targets; focus on quality, efficiency and timely delivery; remove unnecessary processes, delays and rework; and continuously improve. Key message: Excellence is not one achievement—it is a daily habit.");
  }

  // =============== 5. ONE TEAM (dark) ===============
  {
    const s = pres.addSlide();
    s.background = { data: bg };
    addChrome(s, 4, "ONE TEAM", true);
    s.addText("Collaboration Creates Results", {
      x: 0.5, y: 0.7, w: 7.5, h: 0.7, margin: 0, isTextBox: true,
      fontFace: HEAD, fontSize: 30, bold: true, color: C.white,
    });
    const items = [
      [fa.FaLayerGroup, "Break departmental silos."],
      [fa.FaShareNodes, "Share information and knowledge across the organization."],
      [fa.FaPeopleGroup, "Solve problems together instead of working in isolation."],
      [fa.FaComments, "Communicate openly, professionally, and respectfully."],
      [fa.FaHandHoldingHeart, "Support colleagues when challenges arise."],
    ];
    // 3 + 2 grid of cards; the two cards in the lower row are centred
    const gap = 0.25, w = (9 - gap * 2) / 3, h = 1.1;
    for (let i = 0; i < items.length; i++) {
      const [I, t] = items[i];
      const row = i < 3 ? 0 : 1;
      const col = row === 0 ? i : i - 3;
      const x = (row === 0 ? 0.5 : 0.5 + (w + gap) / 2) + col * (w + gap);
      const y = 1.6 + row * (h + gap);
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x, y, w, h, rectRadius: 0.12, fill: { color: C.white, transparency: 92 }, line: { color: "9C5670", width: 0.75 },
      });
      await iconBadge(s, I, x + 0.2, y + 0.25, 0.6, C.silver, C.navy);
      s.addText(t, {
        x: x + 1.0, y: y + 0.1, w: w - 1.15, h: h - 0.2, margin: 0, isTextBox: true, valign: "middle",
        fontFace: BODY, fontSize: 14, color: C.white,
      });
    }
    s.addImage({ data: quoteDark, x: 0.5, y: 4.4, w: 0.35, h: 0.35 });
    s.addText("Individual effort starts the journey; teamwork completes it.", {
      x: 1.05, y: 4.3, w: 8.4, h: 0.55, margin: 0, isTextBox: true, valign: "middle",
      fontFace: SERIF, fontSize: 20, italic: true, color: C.rose,
    });
    s.addNotes("One team: break silos, share knowledge, solve problems together, communicate openly and respectfully, and support colleagues through challenges. Key message: Individual effort starts the journey; teamwork completes it.");
  }

  // =============== 6. INNOVATION & CHANGE ===============
  {
    const s = pres.addSlide();
    s.background = { color: C.white };
    addChrome(s, 5, "INNOVATION & CHANGE", false);
    s.addText("Think Forward.\nWork Smarter.", {
      x: 0.5, y: 0.75, w: 3.6, h: 1.5, margin: 0, isTextBox: true, valign: "top",
      fontFace: HEAD, fontSize: 32, bold: true, color: C.navy,
    });
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.5, y: 2.65, w: 3.5, h: 2.3, rectRadius: 0.12, fill: { color: C.navy }, line: { color: C.navy }, shadow: shadow(),
    });
    s.addImage({ data: await icon(fa.FaLightbulb, C.silver), x: 0.8, y: 2.9, w: 0.45, h: 0.45 });
    s.addText("The future belongs to organizations that are willing to evolve.", {
      x: 0.8, y: 3.5, w: 2.95, h: 1.3, margin: 0, isTextBox: true, valign: "top",
      fontFace: SERIF, fontSize: 18, italic: true, color: C.white,
    });

    const rows = [
      [fa.FaMicrochip, "Embrace technology and digital transformation."],
      [fa.FaRoute, "Look for smarter and more efficient ways of working."],
      [fa.FaCodeBranch, "Challenge outdated processes constructively."],
      [fa.FaChartLine, "Use data to make better decisions."],
      [fa.FaRotate, "Be open to change and continuous improvement."],
    ];
    let y = 1.0;
    for (let i = 0; i < rows.length; i++) {
      const [I, t] = rows[i];
      await iconBadge(s, I, 4.5, y, 0.52, C.goldSoft, C.gold);
      s.addText(t, {
        x: 5.2, y, w: 4.3, h: 0.52, margin: 0, isTextBox: true, valign: "middle",
        fontFace: BODY, fontSize: 15, color: C.ink,
      });
      if (i < rows.length - 1) {
        s.addShape(pres.shapes.LINE, { x: 5.2, y: y + 0.65, w: 4.3, h: 0, line: { color: "E6EAF0", width: 0.75 } });
      }
      y += 0.8;
    }
    s.addNotes("Innovation and change: embrace technology and digital transformation, look for smarter ways of working, challenge outdated processes constructively, use data for better decisions, and stay open to change. Key message: The future belongs to organizations that are willing to evolve.");
  }

  // =============== 7. OWNERSHIP & ACCOUNTABILITY ===============
  {
    const s = pres.addSlide();
    s.background = { color: C.light };
    // right half-bleed dark panel
    s.addImage({ data: bg, x: 6.4, y: 0, w: 3.6, h: 5.625, sizing: { type: "cover", w: 3.6, h: 5.625 } });
    addLogo(s);
    s.addText("06   OWNERSHIP & ACCOUNTABILITY", {
      x: 0.5, y: 0.3, w: 5.5, h: 0.3, margin: 0, isTextBox: true,
      fontFace: HEAD, fontSize: 10, bold: true, charSpacing: 4, color: C.gold,
    });
    s.addText("DAWODIA HOLDING  ·  OUR VALUES", {
      x: 0.5, y: 5.2, w: 4, h: 0.25, margin: 0, isTextBox: true,
      fontFace: HEAD, fontSize: 8, charSpacing: 3, color: "9A8C92",
    });
    s.addText("07", {
      x: 9.0, y: 5.2, w: 0.5, h: 0.25, margin: 0, isTextBox: true, align: "right",
      fontFace: HEAD, fontSize: 8, color: "D2B3BF",
    });
    s.addText("Take Ownership.\nDeliver Results.", {
      x: 0.5, y: 0.7, w: 5.6, h: 1.2, margin: 0, isTextBox: true, valign: "top",
      fontFace: HEAD, fontSize: 28, bold: true, color: C.navy,
    });
    const items = [
      "Take responsibility for commitments and deadlines.",
      "Identify problems early and communicate them clearly.",
      "Don’t wait for problems to become crises.",
      "Focus on solutions, not only problems.",
      "Measure results and learn from every experience.",
    ];
    let y = 2.0;
    items.forEach((t, i) => {
      s.addText(String(i + 1).padStart(2, "0"), {
        x: 0.5, y, w: 0.55, h: 0.5, margin: 0, isTextBox: true, valign: "middle",
        fontFace: HEAD, fontSize: 18, bold: true, color: C.gold,
      });
      s.addText(t, {
        x: 1.1, y, w: 5.0, h: 0.5, margin: 0, isTextBox: true, valign: "middle",
        fontFace: BODY, fontSize: 15, color: C.ink,
      });
      y += 0.6;
    });
    await iconBadge(s, fa.FaFlagCheckered, 6.9, 1.6, 0.75, C.silver, C.navy);
    s.addText("Ownership turns responsibility into results.", {
      x: 6.9, y: 2.6, w: 2.6, h: 1.6, margin: 0, isTextBox: true, valign: "top",
      fontFace: SERIF, fontSize: 22, italic: true, color: C.white,
    });
    s.addText("KEY MESSAGE", {
      x: 6.9, y: 4.4, w: 2.6, h: 0.3, margin: 0, isTextBox: true,
      fontFace: HEAD, fontSize: 9, bold: true, charSpacing: 4, color: C.silver,
    });
    s.addNotes("Ownership and accountability: own commitments and deadlines, raise problems early and clearly, don't let issues become crises, focus on solutions, and learn from every result. Key message: Ownership turns responsibility into results.");
  }

  // =============== 8. OUR FUTURE ===============
  {
    const s = pres.addSlide();
    s.background = { color: C.white };
    addChrome(s, 7, "OUR FUTURE", false);
    s.addText("Building Tomorrow, Together", {
      x: 0.5, y: 0.7, w: 7.5, h: 0.7, margin: 0, isTextBox: true,
      fontFace: HEAD, fontSize: 30, bold: true, color: C.navy,
    });
    const steps = [
      [fa.FaGears, "Strengthen our organization through people, processes, and technology."],
      [fa.FaShieldHalved, "Build a culture of trust, accountability, and innovation."],
      [fa.FaChessKnight, "Transform challenges into opportunities."],
      [fa.FaChartColumn, "Create sustainable growth for Dawodia Holding."],
      [fa.FaTree, "Leave a stronger organization for the next generation."],
    ];
    // rising staircase of cards
    const n = 5, gap = 0.15, w = (9 - gap * (n - 1)) / n, base = 5.0;
    for (let i = 0; i < n; i++) {
      const [I, t] = steps[i];
      const h = 2.4 + i * 0.25;
      const x = 0.5 + i * (w + gap), y = base - h;
      const dark = i === n - 1;
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
        x, y, w, h, rectRadius: 0.1,
        fill: { color: dark ? C.navy : C.light }, line: { color: dark ? C.navy : "E3E8EF" },
      });
      await iconBadge(s, I, x + 0.2, y + 0.22, 0.55, dark ? C.silver : C.navy, dark ? C.navy : C.white);
      s.addText(t, {
        x: x + 0.2, y: y + 0.9, w: w - 0.3, h: h - 1.05, margin: 0, isTextBox: true, valign: "top",
        fontFace: BODY, fontSize: 13, color: dark ? C.white : C.ink,
      });
    }
    s.addNotes("Our future: strengthen the organization through people, processes and technology; build a culture of trust, accountability and innovation; turn challenges into opportunities; create sustainable growth; and leave a stronger organization for the next generation.");
  }

  // =============== 9. CLOSING ===============
  {
    const s = pres.addSlide();
    s.background = { data: bg };
    addLogo(s);
    s.addImage({ data: quoteDark, x: 0.6, y: 1.2, w: 0.6, h: 0.6 });
    s.addText([
      { text: "Our future is not something we wait for.", options: { color: "F1E1E7", breakLine: true } },
      { text: "Our future is something we build—", options: { color: C.white, bold: true } },
      { text: "together.", options: { color: C.rose, bold: true } },
    ], {
      x: 0.6, y: 2.0, w: 8.6, h: 1.8, margin: 0, isTextBox: true, valign: "top",
      fontFace: SERIF, fontSize: 30, paraSpaceAfter: 8,
    });
    s.addText("THANK YOU", {
      x: 0.6, y: 4.5, w: 4, h: 0.3, margin: 0, isTextBox: true,
      fontFace: HEAD, fontSize: 11, bold: true, charSpacing: 6, color: C.silver,
    });
    s.addText("Dawodia Holding  ·  One Organization. One Vision. One Direction.", {
      x: 0.6, y: 4.85, w: 8, h: 0.3, margin: 0, isTextBox: true,
      fontFace: HEAD, fontSize: 10, color: "D2B3BF",
    });
    s.addNotes("Closing: Our future is not something we wait for. Our future is something we build—together. Thank you.");
  }

  const out = path.join(__dirname, "Dawodia_Holding_Our_Values.pptx");
  await pres.writeFile({ fileName: out });
  console.log("wrote", out);
})();

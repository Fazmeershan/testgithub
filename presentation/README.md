# Dawodia Holding — Our Values deck

`Dawodia_Holding_Our_Values.pptx` is a 9-slide, 16:9 deck: a cover, the seven value slides and a closing slide. Each slide has speaker notes.

## Replacing the logo

The files in `assets/` are placeholder logos. To use the official logo:

1. Save the logo for light backgrounds as `assets/logo-dark.png`.
2. Save the logo for dark backgrounds (white or light version) as `assets/logo-light.png`.
3. Rebuild the deck:

```bash
npm install pptxgenjs react react-dom react-icons sharp
node build_deck.js
```

The logo is scaled to a 3.2:1 box. If your logo has a different shape, update `LOGO_RATIO` in `build_deck.js`.

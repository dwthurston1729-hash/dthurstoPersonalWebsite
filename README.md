# Personal Website

A clean, responsive single-page portfolio site. Plain HTML/CSS/JS — no build step.

## Files
- `index.html` — all the content (edit the text here)
- `styles.css` — colors, fonts, layout (theme colors live at the top under `:root`)
- `script.js` — dark-mode toggle + footer year

## Preview locally
Just double-click `index.html`, or from this folder run a tiny local server:

```
python -m http.server 8000
```
Then open http://localhost:8000

## Deploy to GitHub Pages (free, public)
1. Create a GitHub account (if you don't have one) at https://github.com.
2. Create a new **public** repository. To get a `username.github.io` URL,
   name the repo exactly `your-username.github.io`.
3. Upload these files (via the web "Add file → Upload files", or with git).
4. Go to the repo's **Settings → Pages**, set Source to `main` branch / root.
5. Wait ~1 minute — your site is live at `https://your-username.github.io`.

## Alternative: Netlify (drag-and-drop)
1. Sign up at https://netlify.com.
2. Drag this whole folder onto the Netlify dashboard.
3. It's live instantly with a random URL you can rename.

## What to customize first
- Your intro text and tagline in `index.html` (the hero section)
- The About paragraphs and skills list
- The three project cards (duplicate a `<article class="card">` block for more)
- Your email in the Contact link (`mailto:you@example.com`)
- Accent color: change `--accent` in `styles.css`

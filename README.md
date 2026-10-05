# Sujal Kumar Kanu — Personal Portfolio

Modern, high-performance static portfolio website engineered with **Next.js 16 (Turbopack)**, **React 19**, **Tailwind CSS v4**, and **Lenis Smooth Scroll**. Deployed statically on **GitHub Pages**.

## Live Website

🔗 **[https://sujalkanu-stack.github.io/portfolio/](https://sujalkanu-stack.github.io/portfolio/)**

---

## Environment Variables

Copy `.env.example` to `.env.local` for local development:

| Variable | Description | Default |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for metadata, sitemap, and Open Graph | `https://sujalkanu-stack.github.io/portfolio` |
| `NEXT_PUBLIC_FORM_ENDPOINT` | Formspree or Web3Forms form ID / URL for contact form submissions | (Empty / Prompt direct email) |
| `NEXT_PUBLIC_BASE_PATH` | Base path for GitHub Pages deployment | `/portfolio` |

### Setting up the Contact Form on GitHub Pages
Because GitHub Pages is a static host without a Node server runtime:
1. Create a free form at [Formspree](https://formspree.io) or [Web3Forms](https://web3forms.com).
2. Set the form ID / endpoint in your GitHub Repository:
   - Go to **Settings > Secrets and variables > Actions > Variables**.
   - Add `NEXT_PUBLIC_FORM_ENDPOINT` with your Formspree ID (e.g. `xyzaopqr`) or URL.
3. If no endpoint is configured, visitors will receive a friendly notification and can use the direct `mailto:` fallback link.

---

## Static Assets & Build-Time Checks

To keep the portfolio authentic and prevent 404s, the build script uses static build-time checks:
- **Resume PDF**: Place your resume at `public/Sujal_Kumar_Kanu_Resume_2026.pdf`. When present at build time, the "Download resume" button becomes active.
- **Profile Photo**: Place your portrait photo at `public/profile.jpg`. When present at build time, it replaces the animated avatar monogram.
- **Project Screenshot**: Place project screenshots at `public/projects/agrichain.png`. When present, it replaces the clean SVG architecture diagram.

> **Note**: Because this is a statically exported site (`output: "export"`), adding or replacing files in `public/` requires running `npm run build` and pushing to GitHub to trigger deployment.

---

## Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Run static production build
npm run build

# Run lint checks
npm run lint

# Run layout and link validation scripts
npm run check
```

---

## Deployment

Deployments are automated through **GitHub Actions** (`.github/workflows/deploy.yml`):
1. Pushes to `main` automatically run the static export build.
2. The generated `out/` folder is uploaded and deployed to GitHub Pages.
3. In your repository settings, ensure:
   - **Settings > Pages > Build and deployment > Source**: `GitHub Actions`.

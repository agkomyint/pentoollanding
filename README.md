# Pentool website

The public landing page and documentation site for [Pentool](https://github.com/agkomyint/pentoolgg), built with Next.js and ready for Vercel.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Content

Checked-in files under `content/` keep builds deterministic. `npm run content:sync` refreshes the format, protocol, performance, and release notes from the main Pentool GitHub repository. The changelog also reads published GitHub Releases with hourly revalidation and falls back to the checked-in notes.

## Deploy to Vercel

1. Push this repository to GitHub.
2. Import the repository in Vercel.
3. Keep the detected Next.js defaults; no environment variables are required.
4. Add `pentool.space` in **Project → Settings → Domains** and update the domain DNS records as Vercel instructs.

The build command is `npm run build`. It attempts a content refresh and safely keeps checked-in content if GitHub is temporarily unavailable.

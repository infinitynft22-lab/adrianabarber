# Prototype Instructions

The approved public brand name is **ADRIANA BARBER**. Use it consistently in navigation, page metadata, forms, footer, and future content. Do not use the previous surname-based name.

Use licensed stock photos sourced from the internet for service models and gallery inspiration, as requested by the user. Keep source and author records in `src/data/stock-photos.json`. Do not present stock models as clients or completed work of ADRIANA BARBER. Do not reuse photographs from the video reference business.

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

For this project, use only the browser session where `infinitynft22-lab` GitHub and the `adrianabarber` Vercel team are signed in when uploading or publishing to those services. The approved destinations are `https://github.com/infinitynft22-lab/adrianabarber` and `https://vercel.com/adrianabarber`.

The user wants the ADRIANA BARBER logo visually larger and the mobile experience to feel modern and app-like. Favor a prominent logo, comfortable touch targets, and thumb-friendly mobile navigation while preserving the established dark blue barber identity.

The primary slogan is: "Nos caracteriza esos pequeños detalle que nos llevan a la perfección del corte y lucir una excelente imagen.!" Reservations must open a prefilled WhatsApp conversation with Adriana at +1 (829) 291-6897 after the form is saved. Keep a floating WhatsApp contact button on the landing page.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

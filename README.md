# Darcy Solarte M. — Professional Portfolio

This repository contains the source code for my professional portfolio, built with a modern React stack and a custom-built, enterprise-grade design system.

## 🏗 Architecture & Tech Stack

This project is built using a highly modular and scalable architecture:

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/) for server-side rendering, static site generation, and optimized routing.
- **Language:** TypeScript for end-to-end type safety.
- **Design System:** [`@darcysm/bastet-ui`](https://www.npmjs.com/package/@darcysm/bastet-ui), **my own custom React component library designed and engineered entirely from scratch**. It utilizes CSS Modules and Ant Design tokens to support multi-theme switching (Glassmorphism, Hacker, Black Metal, etc.) and strict accessibility standards.
- **Internationalization (i18n):** `next-intl` for seamless bilingual support (English / Spanish) via dynamic routing (`/[locale]`).
- **Forms & Validation:** `react-hook-form` paired with `zod` for robust, type-safe client-side validation.
- **Package Manager:** `bun` for lightning-fast dependency resolution and script execution.

## 🚀 Getting Started

To run this project locally, ensure you have [Bun](https://bun.sh/) installed, then follow these steps:

1. Clone the repository and install dependencies:
   ```bash
   bun install
   ```

2. Start the development server:
   ```bash
   bun run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Deployment

The application is fully optimized for Vercel. Continuous Integration and Deployment (CI/CD) triggers automatically upon pushing to the `main` branch.

```bash
bun run build
# The build output is statically optimized for edge environments.
```

## 🎨 Bastet UI Integration

This portfolio serves as the flagship consumer of the `bastet-ui` design system. All visual components (Navbars, Cards, Typography, Themes) are imported directly from the library, ensuring a strict separation between business logic and UI presentation.

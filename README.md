# Loquitor.ai - Astro

Enterprise AI solutions platform built with Astro and React Islands architecture.

## Features

- 🎨 **5 Content Vibes** - Customizable content themes (Professional, Data Science, Global Commerce, Security First, Innovation Lab)
- 🌓 **Dark/Light Theme** - Persistent theme switching with localStorage
- 🔐 **Google OAuth** - Secure authentication with Gmail integration
- 📧 **AI-Powered Inbox** - Gmail integration with AI reply generation
- ⚡ **High Performance** - Astro's partial hydration for optimal loading
- 📱 **Fully Responsive** - Mobile-first Tailwind CSS design

## Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment** (see Setup section below)

3. **Start development server**:
   ```bash
   npm run dev
   ```

Visit `http://localhost:4321`

## Setup

### Environment Variables

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Required variables:
- `PUBLIC_BACKEND_URL` - Your backend API URL
- `PUBLIC_GOOGLE_OAUTH_CLIENT_ID` - Google OAuth Client ID

### Google OAuth Setup

1. Create a project in [Google Cloud Console](https://console.cloud.google.com)
2. Enable Google+ API
3. Create OAuth 2.0 credentials
4. Add authorized redirect URIs
5. Copy Client ID to `.env`

## Project Structure

```
src/
├── auth/              # Authentication context
├── components/        # React components (islands)
├── config/            # Configuration files
├── context/           # React context providers
├── layouts/           # Astro layouts
├── legal/             # Legal content (terms, privacy)
├── pages/             # Astro pages (routes)
└── styles/            # Global styles
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

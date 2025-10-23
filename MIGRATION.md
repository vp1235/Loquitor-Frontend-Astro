# Loquitor React to Astro Migration

## Overview

This document describes the complete migration of Loquitor.ai from React (Create React App) to Astro with React Islands architecture.

## Migration Summary

### What Was Migrated

All features from the original React application have been successfully migrated:

1. **Pages**:
   - Landing page (/) with full vibe system
   - Login page (/login) with Google OAuth
   - Inbox page (/inbox) with Gmail integration
   - Terms of Service (/terms)
   - Privacy Policy (/privacy)

2. **Features**:
   - 5 content "vibes" (Professional, Data Science, Global Commerce, Security First, Innovation Lab)
   - Dark/light theme switching
   - Google OAuth authentication
   - Protected routes for authenticated content
   - Gmail inbox integration with AI reply generation
   - Fully responsive design

3. **Styling**:
   - Tailwind CSS with dark mode
   - Typography plugin
   - All custom utilities and performance optimizations

## Architecture

### Hybrid Astro + React Architecture

The migration uses Astro's "Islands" architecture:

- **Astro** handles static page generation and routing
- **React** components with `client:load` directive handle interactivity
- Context providers (Theme, Vibe, Auth) work as React islands

### Key Technical Decisions

1. **React Islands for Interactivity**: Components requiring state management or user interaction use `client:load` directive:
   - Navigation (theme toggle, vibe selector)
   - Landing page (animated feature showcase)
   - Login/Inbox pages (full React for OAuth flows)
   - Context providers

2. **Static Generation**: Legal pages (terms, privacy) use Astro components with React-rendered markdown content

3. **Environment Variables**: Migrated from `process.env.REACT_APP_*` to `import.meta.env.PUBLIC_*`

4. **Navigation**: Replaced React Router with standard Astro routing and `window.location` for client-side redirects

## Project Structure

```
astro-template/
├── public/
│   ├── logo_perfect.svg        # Main logo
│   ├── favicon.ico             # Favicon
│   └── robots.txt              # SEO configuration
├── src/
│   ├── auth/
│   │   └── AuthContext.jsx     # Authentication context provider
│   ├── components/
│   │   ├── AuthWrapper.jsx     # Google OAuth provider wrapper
│   │   ├── LandingPage.jsx     # Main landing page component
│   │   ├── LoginPage.jsx       # Login page with OAuth
│   │   ├── InboxPage.jsx       # Gmail inbox interface
│   │   ├── Navigation.jsx      # Main navigation bar
│   │   ├── Providers.jsx       # Combined context providers
│   │   ├── VibeDropdown.jsx    # Vibe selector dropdown
│   │   ├── MarkdownContent.jsx # Markdown renderer for legal pages
│   │   ├── LoadingSpinner.jsx  # Loading state component
│   │   └── ProtectedRoute.jsx  # Route protection wrapper
│   ├── config/
│   │   └── vibeContent.js      # Content for all 5 vibes
│   ├── context/
│   │   ├── ThemeContext.jsx    # Dark/light theme management
│   │   └── VibeContext.jsx     # Vibe selection management
│   ├── layouts/
│   │   └── BaseLayout.astro    # Base page layout with nav/footer
│   ├── legal/
│   │   ├── terms.js            # Terms of Service content
│   │   └── privacy.js          # Privacy Policy content
│   ├── pages/
│   │   ├── index.astro         # Home page
│   │   ├── login.astro         # Login page
│   │   ├── inbox.astro         # Inbox page
│   │   ├── terms.astro         # Terms page
│   │   └── privacy.astro       # Privacy page
│   └── styles/
│       └── global.css          # Global styles & Tailwind
├── astro.config.mjs            # Astro configuration
├── tailwind.config.mjs         # Tailwind configuration
├── package.json                # Dependencies
└── .env.example                # Environment variable template
```

## Setup Instructions

### Prerequisites

- Node.js >= 18.20.8 (recommended) or >= 18.20.5 (minimum)
- npm >= 9.6.5

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and set:
   ```env
   PUBLIC_BACKEND_URL=your_backend_api_url
   PUBLIC_GOOGLE_OAUTH_CLIENT_ID=your_google_oauth_client_id
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

   The site will be available at `http://localhost:4321`

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview production build**:
   ```bash
   npm run preview
   ```

## Key Differences from React Version

### 1. Routing

**React (React Router)**:
```jsx
<Route path="/inbox" element={<InboxPage />} />
```

**Astro (File-based)**:
```
src/pages/inbox.astro → /inbox
```

### 2. Navigation

**React**:
```jsx
import { useNavigate } from 'react-router-dom';
const navigate = useNavigate();
navigate('/inbox');
```

**Astro**:
```jsx
window.location.href = '/inbox';
// or use <a href="/inbox">
```

### 3. Environment Variables

**React**:
```jsx
process.env.REACT_APP_BACKEND_URL
```

**Astro**:
```jsx
import.meta.env.PUBLIC_BACKEND_URL
```

### 4. Component Integration

**React Components in Astro**:
```astro
---
import LandingPage from '../components/LandingPage';
---

<LandingPage client:load />
```

The `client:load` directive tells Astro to hydrate this component with JavaScript on page load.

## Performance Improvements

Astro's architecture provides several performance benefits:

1. **Zero JS by Default**: Static pages ship with no JavaScript unless explicitly needed
2. **Partial Hydration**: Only interactive components load JavaScript
3. **Static Site Generation**: Pages are pre-rendered at build time
4. **Automatic Code Splitting**: Each island is independently loaded

## Dependencies

### Core Framework
- `astro@^5.14.4` - Astro framework
- `@astrojs/react@^4.0.0` - React integration
- `@astrojs/tailwind@^6.0.0` - Tailwind integration

### React & Styling
- `react@^19.1.0` - React library
- `react-dom@^19.1.0` - React DOM
- `tailwindcss@^3.4.17` - Utility-first CSS
- `@tailwindcss/typography@^0.5.19` - Typography plugin

### Authentication & OAuth
- `@react-oauth/google@^0.12.1` - Google OAuth
- `jwt-decode@^4.0.0` - JWT decoding

### UI & Icons
- `lucide-react@^0.542.0` - Icon library
- `react-markdown@^10.1.0` - Markdown rendering

## Known Limitations

1. **Node Version**: Astro 5.14.4 requires Node.js >= 18.20.8. If using an older version, you may see warnings but the app should still function.

2. **SSR**: Currently configured for static site generation. To enable server-side rendering (needed for advanced auth flows), update `astro.config.mjs`:
   ```js
   export default defineConfig({
     output: "server", // or "hybrid"
     // ...
   });
   ```

3. **React Router**: Removed in favor of Astro's file-based routing. Protected routes now handled via `useEffect` redirects in components.

## Troubleshooting

### "Module not found" errors
Ensure all dependencies are installed:
```bash
npm install
```

### Google OAuth not working
1. Check `.env` file has `PUBLIC_GOOGLE_OAUTH_CLIENT_ID` set
2. Ensure OAuth redirect URIs include your development URL in Google Cloud Console
3. Verify the backend is running and reachable

### Styles not loading
1. Ensure Tailwind is properly configured in `astro.config.mjs`
2. Check that `global.css` is imported in `BaseLayout.astro`
3. Clear `.astro` build cache: `rm -rf .astro`

### Theme/Vibe not persisting
Check browser localStorage is enabled and not being cleared

## Future Enhancements

Potential improvements for future iterations:

1. **View Transitions**: Use Astro's View Transitions API for smooth page transitions
2. **Image Optimization**: Add `@astrojs/image` for optimized image delivery
3. **SSR Mode**: Enable hybrid rendering for dynamic content
4. **Edge Deployment**: Deploy to Vercel Edge, Cloudflare Workers, or Deno Deploy
5. **Component Library**: Extract common components into a shared library
6. **Testing**: Add Vitest for component testing
7. **Accessibility**: Enhanced ARIA labels and keyboard navigation

## Resources

- [Astro Documentation](https://docs.astro.build)
- [Astro with React](https://docs.astro.build/en/guides/integrations-guide/react/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2)

## Support

For questions or issues with the migration:
- Review this document
- Check Astro documentation
- Inspect browser console for errors
- Verify environment variables are set correctly

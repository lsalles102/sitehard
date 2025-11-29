# Hardzera - Gaming Cheats & Hacks Forum

## Overview

Hardzera is a full-stack web application for a gaming cheats and hacks forum. It serves as a content management platform where administrators can manage and publish news, downloads, and tutorials related to gaming tools and cheats. The application features a modern, cyberpunk-themed UI with a dark aesthetic and neon accents.

The platform allows public browsing of content while restricting administrative functions to authenticated users. Content is organized into three main types: news items (featured in a carousel), downloadable tools, and tutorials (which can include video or text content).

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React with TypeScript for the UI framework
- Vite as the build tool and development server
- Wouter for client-side routing (lightweight alternative to React Router)
- TanStack Query (React Query) for server state management and caching
- Tailwind CSS v4 for styling with custom design tokens
- Shadcn UI components (Radix UI primitives) for the component library

**Design System:**
The application uses a custom dark cyberpunk theme with:
- Custom CSS variables for colors following HSL color space
- Two custom font families: "Oxanium" for display text and "Space Grotesk" for body text
- Neon glow effects and futuristic styling throughout
- Responsive design supporting mobile and desktop viewports

**State Management:**
- Global content state managed through React Context (`ContentProvider`)
- Authentication state managed through React Context (`AuthProvider`)
- Server state cached and synchronized via TanStack Query
- Local storage used for persisting authentication status

**Routing Structure:**
- `/` - Home page with featured news carousel and recent additions
- `/downloads` - Browse and search downloadable tools
- `/tutorials` - View tutorial content (video and text)
- `/admin` - Administrative dashboard (protected route)
- `/login` - Authentication page
- `/terms` - Terms of use
- `/privacy` - Privacy policy

### Backend Architecture

**Technology Stack:**
- Node.js with Express.js for the HTTP server
- TypeScript for type safety
- Drizzle ORM for database operations
- PostgreSQL as the database (configured for Neon/Supabase serverless)
- ESBuild for server-side bundling in production

**API Design:**
RESTful API with the following endpoints:
- `POST /api/auth/login` - Hardcoded password authentication
- `GET /api/items` - Retrieve all content items
- `GET /api/items/:id` - Retrieve specific item
- `POST /api/items` - Create new item (admin)
- `PATCH /api/items/:id` - Update item (admin)
- `DELETE /api/items/:id` - Delete item (admin)
- `GET /api/settings` - Retrieve site settings
- `PATCH /api/settings` - Update site settings (admin)

**Authentication:**
Simple password-based authentication using a hardcoded password ("C@pitulo4v3"). The authentication state is stored in localStorage on the client side. This is a basic implementation without sessions or JWT tokens.

**Database Schema:**
Three main tables defined using Drizzle ORM:
1. `users` - User accounts (username, password)
2. `items` - Content items with fields for type, title, description, content, media URLs, and featured status
3. `settings` - Site-wide configuration (shop URL, Discord URL, footer text)

**Storage Layer:**
Abstracted through an `IStorage` interface implemented by `DatabaseStorage` class, allowing for potential future storage backend changes.

### Build and Deployment Strategy

**Development Mode:**
- Vite dev server for hot module replacement
- Concurrent client and server development
- Replit-specific plugins for runtime error overlay and development tools

**Production Build:**
- Client: Vite builds React app to `dist/public`
- Server: ESBuild bundles server code to `dist/index.cjs`
- Selected dependencies are bundled to reduce cold start times
- Static files served from the bundled output directory

**Deployment Target:**
The application is designed for deployment on Render.com with Supabase as the database provider, as documented in DEPLOY.md.

## External Dependencies

### Database Service
- **Supabase PostgreSQL** - Serverless PostgreSQL database with connection pooling
- Uses `@neondatabase/serverless` package for database connectivity
- Requires `DATABASE_URL` environment variable for connection string

### Third-Party UI Libraries
- **Radix UI** - Comprehensive set of accessible, unstyled component primitives
- **Embla Carousel** - Carousel/slider functionality for hero section
- **Lucide React** - Icon library
- **cmdk** - Command menu component
- **Tailwind CSS** - Utility-first CSS framework
- **tw-animate-css** - Animation utilities for Tailwind

### Development Tools
- **Replit Vite Plugins** - Development banner, cartographer, and runtime error modal for Replit environment
- **Drizzle Kit** - Database migration and schema management tool

### Form and Validation
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **@hookform/resolvers** - Integrates Zod with React Hook Form
- **drizzle-zod** - Generates Zod schemas from Drizzle tables

### Authentication
- **bcryptjs** - Password hashing (imported but not currently used in authentication logic)

### Build Dependencies
- **TypeScript** - Type checking and compilation
- **tsx** - TypeScript execution for development
- **Vite** - Build tool and dev server
- **ESBuild** - Fast bundler for production server build
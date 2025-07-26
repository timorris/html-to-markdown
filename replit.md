# HTML ↔ Markdown Converter

## Overview

This is a full-stack web application that provides real-time bidirectional conversion between HTML and Markdown. The application features a modern dark theme UI with dual-panel layout for seamless content conversion, built using React with TypeScript on the frontend and Express.js on the backend.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom dark theme variables
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **State Management**: React hooks with local component state
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ESM modules
- **Development**: tsx for TypeScript execution in development
- **Production**: esbuild for bundling and optimization

### Database Layer
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Database**: PostgreSQL (via Neon serverless)
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Current Storage**: In-memory storage implementation with interface for future database integration

## Key Components

### Core Conversion Logic
- **HTML to Markdown**: TurndownService library with enhanced custom rules for tables, links, and images
- **Markdown to HTML**: Marked library with GitHub Flavored Markdown support for parsing Markdown to HTML
- **Real-time Conversion**: Debounced input handling for smooth user experience
- **Bidirectional Sync**: Automatic conversion based on last edited panel
- **Enhanced Features**: Proper table conversion, link handling (HTTPS, mailto, tel), and image support

### UI Components
- **Dual Panel Layout**: Side-by-side HTML and Markdown editors using textarea elements
- **File Operations**: Upload HTML files, download converted content
- **Copy Functionality**: One-click copying of converted content
- **Status Indicators**: Real-time conversion feedback and statistics
- **Responsive Design**: Mobile-friendly layout with proper breakpoints
- **Support System**: Comprehensive support infrastructure with multiple specialized pages
- **Legal Pages**: Standard Terms of Service and Privacy Policy pages

### Support & Community Features
- **Support Contact Form**: Email-based contact form using Resend API with verified delivery
- **Email Support Page**: Detailed response times, troubleshooting tips, and support guidelines
- **Feedback Page**: User feedback collection with development roadmap and popular feature requests
- **Community Page**: GitHub integration showing real repository activity and contribution guidelines
- **GitHub API Integration**: Live community activity feed from timorris/html-to-markdown repository

### Development Tools
- **Hot Reload**: Vite HMR for instant development feedback
- **Error Handling**: Runtime error overlay for development
- **TypeScript**: Full type safety across frontend and backend
- **Path Aliases**: Clean import paths using TypeScript path mapping

## Data Flow

1. **User Input**: User types in either HTML or Markdown panel
2. **Debounced Processing**: Input changes trigger debounced conversion after 300ms
3. **Library Processing**: Content is processed by appropriate conversion library
4. **State Update**: Converted content updates the opposite panel
5. **Statistics Update**: Conversion count and direction indicators update
6. **Error Handling**: Invalid content shows user-friendly error messages

## External Dependencies

### Frontend Libraries
- **@radix-ui/***: Accessible UI primitives for components
- **@tanstack/react-query**: Server state management (configured but not actively used)
- **class-variance-authority**: Type-safe CSS class variants
- **clsx + tailwind-merge**: Conditional CSS class handling
- **date-fns**: Date manipulation utilities
- **lucide-react**: Modern icon library

### Backend Libraries
- **@neondatabase/serverless**: PostgreSQL connection for serverless environments
- **drizzle-orm + drizzle-zod**: Type-safe ORM with schema validation
- **connect-pg-simple**: Session store for PostgreSQL (configured but not used)
- **@sendgrid/mail + resend**: Email service providers for contact form functionality

### Conversion Libraries
- **marked**: Markdown to HTML conversion with GitHub Flavored Markdown support
- **turndown**: HTML to Markdown conversion (loaded via CDN) with enhanced custom rules for tables, links, and images

## Deployment Strategy

### Development
- **Command**: `npm run dev`
- **Process**: tsx runs TypeScript server directly with hot reload
- **Frontend**: Vite dev server with HMR
- **Database**: Development mode uses in-memory storage

### Production Build
- **Frontend Build**: `vite build` compiles React app to static assets
- **Backend Build**: `esbuild` bundles server code for Node.js execution
- **Output**: Static files in `dist/public`, server bundle in `dist/index.js`
- **Execution**: `node dist/index.js` runs production server

### Environment Configuration
- **Database URL**: Required environment variable for PostgreSQL connection
- **Email Services**: RESEND_API_KEY for contact form email delivery
- **GitHub Integration**: GITHUB_PUBLIC_TOKEN for community activity feed
- **Replit Integration**: Special handling for Replit environment with cartographer plugin
- **Static Serving**: Express serves built frontend assets in production

### Database Migration
- **Schema**: Defined in `shared/schema.ts` with users table
- **Migrations**: `npm run db:push` applies schema changes
- **Current State**: Basic user schema exists but application uses memory storage
- **Future**: Ready for PostgreSQL integration when user authentication is needed

## Recent Changes (July 26, 2025)

### Support Infrastructure Enhancement
- **Created Email Support Page** (`/email-support`): Response time information, troubleshooting guidelines, and support best practices
- **Created Feedback Page** (`/feedback`): Development roadmap, feature request tracking, and user feedback guidelines
- **Created Community Page** (`/community`): GitHub repository integration, contribution guidelines, and community activity feed
- **Enhanced Support Page**: Made support cards clickable with smooth hover effects linking to dedicated pages

### GitHub API Integration
- **Live Activity Feed**: Integrated GitHub API to display real repository activity from timorris/html-to-markdown
- **Authentication**: Configured with GitHub Personal Access Token for public repository access
- **Real-time Data**: Shows actual commits, pull requests, issues, and releases with proper timestamps
- **Error Handling**: Graceful fallback to empty state when GitHub API is unavailable

### Email System Configuration
- **Resend Integration**: All contact form submissions route to verified Gmail address (bethatway@gmail.com)
- **Production Ready**: Email delivery works in both development and production environments
- **Reply-to Functionality**: Maintains sender's email for easy response workflow
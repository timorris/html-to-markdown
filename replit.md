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
- **Emoji & Icon Picker**: Searchable picker with organized categories for easy Markdown enhancement
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

## Recent Changes (July 26-27, 2025)

### Syntax Highlighting Implementation (July 27, 2025)
- **PrismJS Integration**: Added comprehensive syntax highlighting using PrismJS library via CDN
- **Multi-Language Support**: JavaScript, TypeScript, CSS, Python, Java, SQL, Bash, and more languages supported
- **Enhanced Preview Panel**: Replaced basic preview with syntax-highlighted rendering component
- **Theme-Aware Highlighting**: Comprehensive color schemes for both light and dark themes
- **SyntaxHighlighter Component**: Reusable component that automatically detects and highlights code blocks
- **Improved User Experience**: Code blocks now display with proper syntax coloring and dark gray backgrounds in dark mode

### Keyboard Shortcut System Implementation (July 27, 2025)
- **Comprehensive Keyboard Shortcuts**: Global shortcuts for all major actions (copy, clear, upload, theme toggle)
- **Keyboard Shortcut Overlay**: Professional reference dialog with categorized shortcuts and visual key styling
- **Enhanced Tooltips**: Updated all tooltips to display their corresponding keyboard shortcuts
- **Quick Access**: Ctrl+Shift+K or Ctrl+Shift+? opens the shortcuts reference overlay
- **Theme Toggle Fix**: Resolved tooltip wrapper interference by using native HTML title attribute for hover hints
- **Event Handling**: Proper click event handling with stopPropagation for reliable theme switching
- **Light Mode Polish**: Complete light mode styling for modal background, text contrast, key badges, and subtle focus rings

### Interactive Tooltip System Implementation (July 27, 2025)
- **Custom Tooltip Component**: Created reusable TooltipHint component with configurable positioning, delay, and content
- **Comprehensive UI Hints**: Added helpful tooltips to all interactive elements throughout the application
- **Header Navigation Tooltips**: Theme toggle and GitHub repository button with descriptive hints
- **Action Button Tooltips**: Copy buttons, upload functionality, and clear actions with keyboard shortcuts
- **Smart Feature Tooltips**: Context-aware tooltips for emoji picker and share functionality
- **User Experience Enhancement**: Improved discoverability and usability with non-intrusive hover hints
- **React Ref Warnings**: Development-time warnings from Radix UI PopoverTrigger components are safe to ignore

## Previous Updates (July 26-27, 2025)

### Theme System Implementation (July 27, 2025)
- **Global Theme Provider**: Created centralized theme management using React Context
- **Theme Persistence**: Theme preference now persists across all pages and browser sessions
- **Enhanced Light Mode**: Comprehensive styling improvements for better text readability and contrast
- **Theme Toggle Component**: Animated sun/moon icon toggle with smooth transitions
- **CSS Architecture**: Refactored from `:not(.dark)` to `.light` class targeting for better specificity

### Social Media Sharing Features (July 27, 2025)
- **Custom Share Buttons**: Twitter and Facebook sharing with generated preview content
- **Preview Image Generator**: Dynamic 1200x630px social media preview images with gradients
- **Shareable URLs**: Generate links with embedded HTML/Markdown content via URL parameters
- **Copy Functionality**: One-click copying of shareable links for easy distribution
- **Auto-loading Shared Content**: Automatically loads shared content from URL parameters on page load
- **Smart Button State**: Share button intelligently disabled when no content is present

### UI/UX Enhancements (July 27, 2025)
- **Complete Light Mode Overhaul**: Comprehensive text contrast optimization across all UI elements
- **Interactive Element Styling**: White text/icons on purple buttons, emoji picker, character counts, share buttons
- **Form Consistency**: All form inputs (email, subject, textarea) now have consistent white backgrounds and styling
- **Footer Enhancement**: Dark text with orange hover effects for navigation links, proper badge styling
- **Quick Tips Section**: Fixed all text visibility issues with proper dark text in light mode
- **Privacy Notice Styling**: Dark background with white text for optimal contrast in light theme
- **Button State Management**: Clear visual distinction between enabled/disabled states across all components
- **Cross-Page Consistency**: Unified styling approach across converter, support, feedback, and community pages
- **Header Button Consistency**: GitHub and emoji buttons now have matching white backgrounds with gray borders and icons in light theme

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

### User Interface Components
- **Tooltip System**: Comprehensive interactive hints for all UI elements with smart content awareness
- **Theme Toggle**: Animated sun/moon icon transitions with tooltip guidance

### Emoji & Icon Picker Implementation (July 26, 2025)
- **Comprehensive Emoji Collection**: Organized into 5 categories (Smileys, Nature, Food, Objects, Symbols) with 300+ emojis
- **Professional Icon Library**: Lucide React icons organized by use case (UI, Files, Communication, Media, Tools)
- **Smart Search Functionality**: Real-time filtering across both emojis and icons with instant results
- **Cursor Position Insertion**: Maintains exact typing position when inserting emojis or icons
- **Tabbed Interface**: Clean separation between emoji and icon selection with optimized grid layouts
- **Markdown Integration**: Icons inserted as standard notation (:iconname:) for compatibility
# Premium Coffee Machine E-Commerce Platform

## Overview

This is a premium coffee machine e-commerce platform built with React, TypeScript, and Vite. The application focuses on providing a luxury shopping experience for high-end coffee machines, featuring a modern design inspired by premium retailers like Apple Store and Bang & Olufsen. The platform includes product browsing, detailed product views with zoom functionality, cart management, and a responsive design optimized for both desktop and mobile experiences.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development practices
- **Build Tool**: Vite for fast development and optimized production builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Styling**: Tailwind CSS with custom design system following luxury e-commerce patterns
- **UI Components**: Radix UI primitives with custom shadcn/ui components for consistent, accessible design

### Design System
- **Color Palette**: Deep charcoal, pure white, and warm copper accent colors for premium aesthetics
- **Typography**: Inter font for body text, Playfair Display for luxury product names
- **Layout**: Responsive grid system with generous spacing following luxury design principles
- **Components**: Comprehensive component library including product cards, hero sections, navigation, and specialized zoom functionality

### Data Management
- **Mock Data Layer**: Local data service using localStorage for development, simulating backend API calls
- **Schema Validation**: Zod schemas for type-safe data validation
- **State Caching**: React Query for intelligent caching and background updates
- **Product Management**: Structured product data with features, specifications, pricing, and inventory tracking

### User Interface Features
- **Product Zoom**: Advanced image zoom functionality with hover detection for detailed product viewing
- **Theme System**: Light/dark mode toggle with persistent user preferences
- **Responsive Design**: Mobile-first approach with breakpoint-specific layouts
- **Interactive Elements**: Smooth animations, hover effects, and loading states for premium feel

### Development Infrastructure
- **Configuration**: TypeScript strict mode with path aliases for clean imports
- **Asset Management**: Vite-based asset handling with optimized image loading
- **Code Organization**: Feature-based directory structure with shared utilities and components
- **Development Server**: Hot module replacement and fast refresh for efficient development

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React DOM, React Router (Wouter)
- **Build Tools**: Vite with TypeScript support and hot reload capabilities
- **State Management**: TanStack React Query for server state and caching

### UI and Styling
- **Design System**: Radix UI primitives for accessible, unstyled components
- **Styling**: Tailwind CSS with PostCSS for utility-first styling approach
- **Icons**: Lucide React for consistent, scalable icon system
- **Animations**: Class Variance Authority (CVA) for component variant management

### Data and Validation
- **Schema Validation**: Zod for runtime type checking and data validation
- **Data Utilities**: Date-fns for date manipulation and formatting
- **Database Integration**: Drizzle ORM configured for PostgreSQL (Neon Database)

### Development Tools
- **TypeScript**: Full type safety with strict configuration
- **ESBuild**: Fast bundling for production builds
- **Development Server**: Custom start script with Vite dev server configuration

### Payment Processing
- **Stripe Integration**: Stripe.js and React Stripe.js for secure payment processing

### Form Management
- **React Hook Form**: Efficient form handling with validation
- **Hookform Resolvers**: Integration between React Hook Form and Zod validation

The application is designed to be easily extensible with real backend integration while maintaining a premium user experience throughout the development and production lifecycle.
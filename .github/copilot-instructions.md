# Balance Real Estate - AI Coding Agent Instructions

## Project Architecture

This is a **bilingual React TypeScript real estate application** built with Vite, supporting Arabic (RTL) and English (LTR) with comprehensive i18n.

### Key Architectural Patterns

- **CSS Modules**: All components use scoped CSS modules (`Component.module.css`)
- **Context-based State**: Language and Theme contexts provide global state
- **Hook Pattern**: Custom hooks (`useLanguage`, `useTheme`) wrap context usage
- **Bilingual Content**: Components contain inline content objects for both languages
- **Component Structure**: UI components in `src/components/ui/`, pages in `src/pages/`

### Critical Developer Workflows

```bash
# Development
npm run dev          # Start Vite dev server
npm run build        # TypeScript compile + Vite build
npm run lint         # ESLint check
```

### Project-Specific Conventions

#### Internationalization Pattern
```typescript
const content = {
  en: { title: 'Home', subtitle: 'Welcome' },
  ar: { title: 'الرئيسية', subtitle: 'مرحباً' }
};
const t = isArabic ? content.ar : content.en;
```

#### Component Structure
- Always check `currentLanguage.code === 'ar'` for Arabic detection
- Apply `dir={isArabic ? 'rtl' : 'ltr'}` to main component containers
- Use conditional rendering: `{isArabic ? nameAr : name}`

#### CSS Module Patterns
- BEM-like naming: `.component__element`, `.component__element_modifier`
- RTL support: `[dir="rtl"] .selector { /* RTL-specific styles */ }`
- Responsive breakpoints: 768px (tablet), 480px (mobile)
- Animation delays: `:nth-child(n) { animation-delay: 0.Ns; }`

#### File Organization
- Components: `src/components/ui/category/ComponentName.tsx`
- Styles: `src/styles/components/category/ComponentName.module.css`
- Types: Shared interfaces in `src/types/index.ts`
- Pages: `src/pages/public/` and `src/pages/dashboard/`

### Integration Points

#### Context Usage
```typescript
import { useLanguage } from '../../../contexts/useLanguage';
const { currentLanguage, changeLanguage, isRTL } = useLanguage();
```

#### Router Integration
- Uses React Router v6 with `<Link to="/path">` navigation
- Breadcrumb components expect router context

#### External Dependencies
- **Lucide React**: Icon system (`import { IconName } from 'lucide-react'`)
- **React i18next**: Locale loading from `public/locales/{lang}/translation.json`
- **CSS Variables**: Custom properties for theming and dynamic colors

### Cross-Component Communication

- **Project Details**: Complex component system with shared data interfaces
- **Property Types**: Standardized interfaces in `index.ts` exports
- **Event Handling**: Parent components pass callbacks (`onFavoriteToggle`, `onPropertyClick`)

### Development Notes

- **TypeScript**: Strict mode enabled, prefer interfaces over types
- **CSS**: Mobile-first responsive design, extensive use of CSS Grid/Flexbox
- **Performance**: Lazy loading patterns, animation delays for staggered effects
- **Accessibility**: Proper ARIA labels, keyboard navigation support

Always maintain bilingual support and RTL layout compatibility when adding new features.
- `src/pages/dashboard/` - Admin dashboard pages
- `src/layouts/` - Layout components
- `src/contexts/` - React contexts for state management
- `src/i18n/` - Internationalization setup
- `src/types/` - TypeScript type definitions

## Design System
- Colors: Amber/Brown theme with yellow accents
- Typography: Cairo font for Arabic support
- Framework: Tailwind CSS
- Icons: Lucide React

## Development Guidelines
1. Use TypeScript for all components
2. Follow Arabic RTL support patterns
3. Use Tailwind CSS classes for styling
4. Implement responsive design (mobile-first)
5. Use React Router for navigation
6. Implement i18next for translations
7. Follow the existing color scheme (amber-950, yellow-400, etc.)
8. Use proper semantic HTML
9. Ensure accessibility compliance
10. Follow React best practices

## Arabic Language Support
- Use `useLanguage` hook for language switching
- Apply RTL classes conditionally
- Use `rtl:space-x-reverse` for proper spacing
- Test both Arabic and English layouts

## Component Patterns
- Use functional components with hooks
- Implement proper TypeScript interfaces
- Use proper prop validation
- Follow the established naming conventions
- Ensure components are reusable and maintainable

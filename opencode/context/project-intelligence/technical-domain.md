<!-- Context: project-intelligence/technical | Priority: critical | Version: 1.2 | Updated: 2026-04-21 -->

# Technical Domain

**Purpose**: Tech stack, architecture, and coding patterns for ed2go-shopper-modern.
**Last Updated**: 2026-04-21

## Quick Reference

**Update Triggers**: Tech stack changes | New patterns | Architecture decisions
**Audience**: Developers, AI agents

## Primary Stack

| Layer              | Technology               | Version | Rationale                     |
| ------------------ | ------------------------ | ------- | ----------------------------- |
| Framework          | Next.js                  | 14+     | App Router, server components |
| Language           | TypeScript               | 5.x     | Strict mode, full type safety |
| Package Manager    | Nx                       | 20+     | Monorepo orchestration        |
| Styling            | Tailwind CSS             | v4      | Utility-first, CSS variables  |
| UI Components      | shadCN/ui                | latest  | Radix primitives, accessible  |
| Component Variants | class-variance-authority | latest  | Variant management            |
| State Management   | React hooks              | 18+     | Functional patterns           |
| Testing (UI)       | Vitest                   | latest  | UI package tests              |
| Testing (App)      | Jest                     | latest  | Main app tests                |
| API Validation     | Zod                      | latest  | Schema validation             |

## Code Patterns

### API Endpoint Pattern (Next.js Route Handler)

```typescript
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = schema.parse(body);
    // Handle logic
    return Response.json({ success: true, data: validated });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}
```

### Component Pattern (Functional with Typed Props)

```typescript
interface ComponentNameProps {
  title: string;
  variant?: 'default' | 'secondary';
  onAction?: () => void;
}

export function ComponentName({ title, variant = 'default', onAction }: ComponentNameProps) {
  return (
    <div className={cn('base-class', variantClasses[variant])}>
      <h2>{title}</h2>
      <button onClick={onAction}>{title}</button>
    </div>
  );
}
```

### UI Package Component Structure

```
packages/ui/src/
├── atoms/           # Basic components (Button, Input, Badge)
├── molecules/      # Component combinations (CourseActivitiesBox, LessonAccordion)
├── organisms/      # Complex UI sections (SyllabusDrawer, BrandNavbar)
└── lib/           # Utilities and helpers

Each component folder:
├── index.ts
├── component-name.tsx
├── component-name.test.tsx
├── component-name.stories.tsx
└── types.ts (optional)
```

## Naming Conventions

| Type             | Convention | Example                                   |
| ---------------- | ---------- | ----------------------------------------- |
| Files            | kebab-case | `user-profile.tsx`, `syllabus-drawer.tsx` |
| Components       | PascalCase | `UserProfile`, `SyllabusDrawer`           |
| Folders          | PascalCase | `UserProfile/`, `SyllabusDrawer/`         |
| Functions        | camelCase  | `getUserProfile`, `fetchCourseData`       |
| TypeScript Types | PascalCase | `UserProfileProps`, `CourseData`          |
| CSS Variables    | kebab-case | `--color-primary`, `--spacing-md`         |
| Database Tables  | snake_case | `user_profiles`, `course_enrollments`     |

## Code Standards

- **TypeScript Strict Mode**: Enabled with no unused locals/parameters
- **Functional Components Only**: No class components
- **Typed Props**: All components must have TypeScript interfaces
- **Modern JSX Transform**: No React imports needed
- **Import Organization**: React → third-party → internal (absolute `@ui/*`, `@/*`)
- **Testing**: Arrange-Act-Assert pattern with Vitest/Jest
- **Formatting**: Prettier (single quotes, 2-space indent, 100 char width)
- **Atomic Design**: atoms → molecules → organisms → pages
- **Error Handling**: Try-catch for async, descriptive error messages
- **Commit Format**: `type(scope): E2G-XXXX description`

### Design & Architecture Rules

1. **Atomic Design + Open-Closed Principle**: Build small, reusable atoms that are open for extension, closed for modification. Components should compose cleanly.

   ```typescript
   // ✅ Good: Small, composable Button atom
   interface ButtonProps {
     children: React.ReactNode;
     variant?: "default" | "outline" | "ghost";
     size?: "sm" | "md" | "lg";
     disabled?: boolean;
     onClick?: () => void;
   }
   ```

2. **Design Tokens (HIGH PRIORITY)**: Always use Tailwind CSS tokens from global.css for colors, spacing, typography, and other design elements. **Custom tokens take priority** over default Tailwind tokens for consistency and maintainability.

   ```typescript
   // ✅ Highest Priority: Custom tokens from global.css
   className = "bg-primary text-secondary p-4 m-2";
   className = "text-muted-foreground bg-muted";
   className = "gap-4 space-y-2";

   // ✅ Medium Priority: Tailwind semantic tokens
   className = "bg-primary text-primary-foreground";
   className = "hover:bg-primary/90";

   // ❌ Lowest Priority: Hardcoded values (avoid)
   className = "bg-[#454545]";
   className = "text-[#666666]";
   ```

3. **Utility Classes from Tailwind CSS**: Use utility classes for spacing, sizing, and layout.

   ```typescript
   // ✅ Good: Utility classes
   className="mt-4 mb-2 px-3 py-2 gap-2"
   className="flex items-center justify-between"

   // ❌ Bad: Inline styles
   style={{ marginTop: '1rem', padding: '8px' }}
   ```

4. **UI Component Library First**: Always check if component exists in `@ui/*` before creating new. If needed, create using ShadCN as base foundation.

   ```typescript
   // Check first: packages/ui/src/atoms/, molecules/, organisms/
   // If exists: import { ComponentName } from '@ui/atoms'
   // If not exists: Create using shadcn/ui primitives
   ```

5. **Context7 MCP for Documentation**: Always use Context7 MCP tools (`resolve-library-id`, `query-docs`) for library/API docs, code generation, or config steps. Never rely solely on training data for frequently updated frameworks (Next.js, React, Supabase).

6. **Accessibility First**: Always check WCAG guidelines and best practices when designing and implementing UI components. Ensure keyboard navigation, screen reader support, color contrast, and focus management.

## Build Commands

```bash
# Build
npm run nx build ui              # Build UI library (tsup + Tailwind)
npm run nx build ed2go          # Build main app (Next.js)
npm run nx run-many --target=build --parallel  # Build all

# Test
npm run nx test ui              # Vitest UI tests
npm run nx test ed2go           # Jest app tests
npm run nx test ui --ui         # Vitest UI browser

# Quality
npm run nx typecheck ui         # TypeScript check UI
npm run nx lint ui              # ESLint UI
npm run nx format:write          # Prettier format

# Development
npm run nx dev ui               # Vite dev server UI
npm run nx dev ed2go           # Next.js dev server
npm run nx run ui:storybook     # Storybook
```

## Security Requirements

- **Input Validation**: Validate all user input with Zod schemas
- **Type Safety**: TypeScript strict mode prevents type errors
- **Parameterized Queries**: Use Drizzle ORM for safe DB queries
- **No Hardcoded Secrets**: Use environment variables
- **Sanitize Output**: Escape data before rendering

## 📂 Codebase References

**Implementation**:

- UI package: `packages/ui/src/` - Shared component library
- Main app: `apps/ed2go/` - Next.js application
- Bolt package: `packages/bolt/` - Redis Streams messaging

**Configuration**:

- `nx.json` - Nx workspace configuration
- `packages/ui/package.json` - UI package deps
- `apps/ed2go/tsconfig.json` - TypeScript config
- `packages/ui/tailwind.config.ts` - Tailwind v4 config

## Related Files

- Project docs: `.opencode/context/` - Additional context files
- AGENTS.md - Agent guidelines and command reference

# Web UI Architecture & Design Notes

Design tokens, component architecture, state management, and Web Worker offloading for the `token-diff` Web Playground. This document outlines layout structure, theme styling, accessibility standards, and client-side performance isolation.

---

## 1. Frontend Technology Stack

The web interface is located in the `web/` directory and built with modern React standards (source: `web/package.json`):

- **Framework**: Next.js 16 (App Router with React 19)
- **Styling**: Tailwind CSS v4 (`@import "tailwindcss"`)
- **Component Primitives**: `shadcn/ui` (built on `@base-ui/react` and Radix foundations)
- **Icons**: `lucide-react`
- **Fonts**: Geist Sans & Geist Mono (`next/font/google`)

---

## 2. Visual Theme & Design Tokens

The application defaults to an engineer-focused **Dark Mode** terminal aesthetic matching the CLI output (source: `web/src/app/globals.css`, `web/src/app/layout.tsx`):

```css
/* Core Dark Palette Design Tokens */
--background: oklch(0.145 0 0);      /* Deep zinc black */
--foreground: oklch(0.985 0 0);      /* Crisp off-white */
--card: oklch(0.18 0 0);            /* Elevated container card */
--border: oklch(0.269 0 0);          /* Subtle partition line */
--primary: oklch(0.985 0 0);         /* High-contrast call-to-action */
--accent: oklch(0.269 0 0);          /* Interactive hover highlight */
```

### Color Semantics
- **Emerald Green (`text-emerald-500` / ANSI Green)**: Signifies net token savings and reductions (negative delta).
- **Crimson Red (`text-rose-500` / ANSI Red)**: Signifies context expansion or token increases (positive delta).
- **Cyan (`text-cyan-400` / ANSI Cyan)**: Highlights active models, section banners, and key headers.

---

## 3. Web Worker Offloading Architecture

To maintain 60 FPS UI responsiveness and prevent browser freezes when tokenizing 100K+ token payloads, tokenization is isolated to a Web Worker (source: `web/src/lib/tokenizer/worker.ts`, `web/src/lib/tokenizer/client.ts`).

```mermaid
graph LR
    subgraph Main_Thread["Browser Main Thread"]
        TextArea["User Text Input"] --> Hook["useTokenDiff Hook (200ms debounce)"]
        Hook --> Client["Worker Client (client.ts)"]
        UI["Stats Cards / Result Tabs"] <-- Hook
    end

    subgraph Worker_Thread["Background Web Worker (worker.ts)"]
        Client -- postMessage --> Dispatcher["Worker Message Handler"]
        Dispatcher --> LazyRank["ranks.ts (Dynamic Import)"]
        LazyRank --> Tiktoken["Tiktoken Lite Instance"]
        Tiktoken --> ComputeDiff["web/src/lib/diff.ts"]
        ComputeDiff -- postMessage --> Client
    end
```

---

## 4. Accessibility & Mobile Responsiveness

The web application meets WCAG 2.1 AA accessibility guidelines (source: `web/src/components/`, commit `8509bba`):
- **Contrast**: Text contrast ratios meet or exceed 4.5:1 against card and background surfaces.
- **Keyboard Navigation**: Full focus trap and tab navigation support across buttons, selects, tabs, and textareas with visible focus rings.
- **Responsive Viewports**: Tested and verified across viewports from 360px (mobile) to 1440px+ (desktop) with zero horizontal overflow.
- **Language Sync**: Automatic synchronization of the `html lang` attribute (`en` vs `vi`) when switching languages.

---

## 5. Component Layout Blueprint (`web/src/app/page.tsx`)

```
┌────────────────────────────────────────────────────────────────────────┐
│  Navbar: Brand Logo, NPM Badge, Live Status, Language Switcher (EN/VI) │
├────────────────────────────────────────────────────────────────────────┤
│  Hero Section: Headline, quick copy install tabs (npx, npm -g, npm -D) │
├────────────────────────────────────────────────────────────────────────┤
│  Interactive Playground:                                               │
│  Model Selector: [ gpt-4o (o200k_base) v ]   [Load Example] [Swap]     │
│  ┌──────────────────────────────────┬────────────────────────────────┐ │
│  │ Before Prompt (Textarea)         │ After Prompt (Textarea)        │ │
│  │ 1,240 tokens · 4,820 chars       │ 892 tokens · 3,410 chars       │ │
│  └──────────────────────────────────┴────────────────────────────────┘ │
│  Live Stats Bar:                                                       │
│  [ Tokens: -348 (-28.06%) ] [ Chars: -1,410 ] [ Lines: -33 ]          │
│  Result Tabs: [ Summary View ] [ JSON ApiEnvelope ] [ CLI Generator ]  │
├────────────────────────────────────────────────────────────────────────┤
│  Features: 100% Local · Pure JS · Agent Ready · POSIX Exit Codes       │
├────────────────────────────────────────────────────────────────────────┤
│  CLI Interactive Terminal Demo: Animated command execution showcase    │
├────────────────────────────────────────────────────────────────────────┤
│  Use Cases: Prompt Optimization, CI Budget Gates, Agent Tool Call Guard│
├────────────────────────────────────────────────────────────────────────┤
│  Footer: MIT License · Documentation Link · GitHub Repo Link           │
└────────────────────────────────────────────────────────────────────────┘
```

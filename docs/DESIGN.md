---
name: Clarity & Trajectory
colors:
  surface: '#f8f9ff'
  surface-dim: '#ccdbf3'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e6eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d5e3fc'
  on-surface: '#0d1c2e'
  on-surface-variant: '#464553'
  inverse-surface: '#233144'
  inverse-on-surface: '#eaf1ff'
  outline: '#777584'
  outline-variant: '#c8c4d5'
  surface-tint: '#544fc0'
  primary: '#1f108e'
  on-primary: '#ffffff'
  primary-container: '#3730a3'
  on-primary-container: '#a9a7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#006c4a'
  on-secondary: '#ffffff'
  secondary-container: '#82f5c1'
  on-secondary-container: '#00714e'
  tertiary: '#482300'
  on-tertiary: '#ffffff'
  tertiary-container: '#683600'
  on-tertiary-container: '#ff9631'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3b35a7'
  secondary-fixed: '#85f8c4'
  secondary-fixed-dim: '#68dba9'
  on-secondary-fixed: '#002114'
  on-secondary-fixed-variant: '#005137'
  tertiary-fixed: '#ffdcc3'
  tertiary-fixed-dim: '#ffb77d'
  on-tertiary-fixed: '#2f1500'
  on-tertiary-fixed-variant: '#6e3900'
  background: '#f8f9ff'
  on-background: '#0d1c2e'
  surface-variant: '#d5e3fc'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 30px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-sm: 1rem
  gutter-lg: 2rem
  margin: 2rem
  margin-mobile: 1rem
  margin-desktop: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system serves high school students navigating the multi-year trajectory toward higher education. The audience is academically driven yet prone to overwhelm; the emotional baseline must be calm competence, strategic foresight, and quiet self-assurance rather than gamified panic or clinical bureaucracy.

The visual style blends **Contemporary Editorial Structure** with **Elevated Modern SaaS**. It explicitly rejects the chat-bubble paradigm and noisy, metric-stuffed dashboards. Instead, it frames the university admissions path as a curated, progressive dossier: deliberate whitespace, expansive reading lanes, refined micro-elevation, and purposeful accent placement that directs cognitive focus strictly toward milestones, readiness assessments, and qualitative exploration.

## Colors

The palette establishes an intellectual, grounded foundation punctuated by diagnostic feedback colors.

- **Primary (`#3730A3` - Deep Indigo):** Anchor color used for key interactive elements, selected navigation states, primary callouts, and primary active strokes. Conveys depth, academic rigor, and intent.
- **Secondary (`#059669` - Sage Emerald):** Applied exclusively to positive trajectory indicators, strong fit evaluations, complete milestones, and readiness scoring.
- **Tertiary (`#D97706` - Warm Ochre):** Reserved for upcoming deadlines, attention-required states, and high-impact timeline alerts. Used sparingly to avoid stress fatigue.
- **Neutral (`#475569` - Slate):** Anchors the tonal hierarchy. Neutral layers transition from pure canvas white (`#FFFFFF`) through subtle structural washes (`#F8FAFC`, `#F1F5F9`) with boundary lines rendered in light slate (`#E2E8F0`). High-contrast copy reads in `#0F172A`.

Functional color rules:
- Interactive elements must never compete with status markers. Secondary and tertiary colors are strictly evaluative and should not be used as generic surface fills.
- Text contrast must exceed WCAG AA 4.5:1 standards across all tinted badge backgrounds.

## Typography

The type system relies on **Plus Jakarta Sans** across all roles to maintain structural purity, legibility, and an open, contemporary voice. Tightened negative letter spacing at display and headline sizes sharpens presence without feeling cold.

Guidelines:
- Long-form narrative guidance (such as essay critique, program evaluations, or admissions strategy) must never exceed a 65-character line length to minimize cognitive load.
- `label-sm` is strictly styled in uppercase with intentional positive tracking for metadata, dates, categorization pills, and milestone metrics.
- Weights are strictly restricted to 400 (Regular), 600 (Semi-Bold), and 700 (Bold) to eliminate visual fuzziness.

## Layout & Spacing

The architecture operates on an 8pt spatial grid built around a structured fixed-width fluid content spine. Layouts avoid expansive edge-to-edge stretching in favor of focused reading containers (maximum canvas width: 1280px; primary content tracks capped at 780px for planning workflows).

- **Desktop (1024px+):** Asymmetrical 12-column setup. Left-hand vertical navigation/milestone index (3 columns), contextual intelligence spine (6 columns), contextual metadata/deadlines shelf (3 columns). Gutters hold steady at `gutter-lg` (2rem).
- **Tablet (768px - 1023px):** 8-column layout. Structural navigation shrinks into an accessible top or rail system; secondary inspector stacks sequentially beneath core roadmap cards.
- **Mobile (Below 768px):** 4-column single-stream stack. Margins collapse to `margin-mobile` (1rem), gutters adjust to `gutter-sm` (1rem). Horizontal workflows (e.g., academic semesters or college shortlists) translate into smooth-snapping pagination strips rather than crowded tables.

## Elevation & Depth

Visual depth avoids heavy skeuomorphic drop-shadows or stark dark outlines, opting instead for a layered **Tonal Substrate** model accented by soft, ambient diffusion.

- **Base Layer (Canvas):** Tone `#F8FAFC`. Provides a cool, glare-free foundation.
- **Surface Level 1 (Panels & Cards):** Background `#FFFFFF` bordered with a continuous `1px solid #E2E8F0`. Offset by a diffused ambient shadow: `0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 4px 12px -2px rgba(15, 23, 42, 0.03)`.
- **Surface Level 2 (Interactive Floating Elements, Dropdowns, Flyouts):** Background `#FFFFFF`, bordered with `1px solid #CBD5E1`. Shadow: `0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)`.
- **Active Focus & Micro-Depth:** When cards are selected or hovered, increase border clarity to `#C7D2FE` (soft indigo) rather than dramatically escalating shadow distance. This maintains stability while conveying responsive tactile feedback.

## Shapes

The design uses a balanced `rounded-2` scale with tailored radius tokens for specific component tiers:

- **Primary Cards & Containers:** Fixed `16px` (`rounded-lg`) corner radii to maintain a warm, welcoming presence without sliding into juvenile circularity.
- **Interactive Controls (Inputs, Selectors, Default Buttons):** `8px` corner radii (`rounded`) for ergonomic precision.
- **Badges, Status Chips, & Filter Pills:** `9999px` (Full pill shape) to instantly separate status and diagnostic metadata from interactive operational containers.
- **Dividers & Structural Hairlines:** Terminated cleanly with squared endpoints to preserve geometric order inside softened containers.

## Components

### Buttons
- **Primary:** Solid Deep Indigo (`#3730A3`), white bold text, `8px` radius, padding: `10px 20px`. Hover brings subtle brightness shifts (`#312E81`) without vertical translation.
- **Secondary:** Surface `#FFFFFF`, outline `1px solid #CBD5E1`, text `#334155`. Hover shifts border to `#94A3B8` and background to `#F8FAFC`.
- **Ghost/Tertiary:** No background or border. Text `#3730A3` with standard inline hit targets for auxiliary workflow actions.

### Cards & Dossier Modules
- Enclosed with `16px` radii, `#FFFFFF` fill, and a crisp `#E2E8F0` hairline border.
- Header bands integrate category tags alongside clean status dots rather than full solid banners.
- Padding inside cards adheres strictly to `space-lg` (24px) on desktop and `space-md` (16px) on mobile viewports.

### Chips & Badges
- **Fit Indicators (Emerald):** Background `#ECFDF5`, text `#065F46`, subtle border `#A7F3D0`.
- **Deadline/Priority Markers (Ochre):** Background `#FFFBEB`, text `#92400E`, subtle border `#FDE68A`.
- **Academic Stream/Subject Pills (Neutral):** Background `#F1F5F9`, text `#475569`, border transparent.
- Sizing is compact (`label-sm`), styled with uppercase tracking.

### Form Inputs & Selectors
- Background `#FFFFFF`, default border `1px solid #CBD5E1`, internal height 44px for touch accessibility.
- Active focus state: border shifts to `#4338CA`, accompanied by a diffuse outer ring `0 0 0 3px rgba(67, 56, 202, 0.12)`.
- Helper and diagnostic text remains anchored at `body-sm` in slate `#64748B`.

### Lists & Timelines
- Multi-year milestones use continuous vertical hairline tracks (`#E2E8F0`) paired with solid nodes.
- Completed grades/terms display solid `#059669` markers; active focus displays an Indigo ring node with a white center; future terms are dashed `#CBD5E1`.

### Intelligence Briefings (Contextual AI Layer)
- Rendered as structured memo cards rather than conversational text bubbles.
- Framed by a pale indigo edge line (`2px solid #C7D2FE`) on the left margin, background `#F8FAFC`, presenting actionable synthesis, bulleted takeaways, and linked academic next steps.
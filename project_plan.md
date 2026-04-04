# Obra Majoralia — Design Studio Portfolio

## 1. Project Description
A high-end editorial architectural portfolio website for Obra Majoralia, an architectural design studio based in Cebu, Philippines. The site functions as a curated portfolio — minimal, design-led, and intentional. It is NOT a corporate website. No services, no testimonials, no sales language. The primary goal is to present architectural work with clarity and refinement.

## 2. Page Structure
- `/` — Home (immediate project grid, asymmetric layout)
- `/projects` — Full projects listing
- `/about` — Studio / About page (minimal)

## 3. Core Features
- [x] Adaptive navigation (dark/light background detection — white or black logo/text)
- [x] Asymmetric project grid (landing page shows projects immediately)
- [x] Project tiles with hover zoom + text fade
- [x] Smooth scroll + fade-in animations
- [x] Project detail view (fullscreen image entry, minimal text)
- [x] Minimal About/Studio page
- [x] Minimal footer

## 4. Data Model Design
No database needed. All project data stored as mock data in `src/mocks/projects.ts`.

## 5. Backend / Third-party Integration Plan
- Supabase: Not needed
- Shopify: Not needed
- Stripe: Not needed

## 6. Development Phase Plan

### Phase 1: Core Portfolio Build (Current)
- Goal: Build all 3 pages with full design fidelity
- Deliverable: Home, Projects, About pages with adaptive nav

### Phase 2: Project Detail Pages (Future)
- Goal: Add individual project detail pages
- Deliverable: Fullscreen image entry, vertical storytelling layout per project

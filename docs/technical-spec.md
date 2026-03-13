# NURIT Technical Specification

## Project Goal
Build a modern website for Russian Junior N'shei Chabad that keeps the current navigation familiar while making the experience dramatically easier to read and use for older women.

## Platform
- Next.js App Router
- TypeScript
- CSS with a custom design system
- GitHub for source control
- Vercel for deployment

## Primary UX Principles
- Large text across the entire website
- Very clear top navigation with no complex dropdowns
- Strong contrast and large click areas
- One primary action per section
- Registration that feels simple even for a first-time internet user
- Mobile layout that remains easy to tap and read

## Navigation
The public navigation should keep the same logic as the current website:
- Home
- Donate
- About Us
- Annual Event
- Services
- Gallery
- Contact
- Register

## Pages Included In Phase 1
- Home
- Donate
- About Us
- Annual Event
- Services
- Gallery
- Contact
- Register
- Thank You
- Privacy Policy
- 404 page

## Registration Requirements
- Minimal fields: first name, last name, phone, email
- Optional fields: number of guests, notes
- Large submit button
- Clear success confirmation
- Admin notification in phase 2
- Store submissions in Supabase or email workflow in phase 2

## SEO Requirements
- Server-rendered pages
- Unique metadata per page
- Semantic headings
- Open Graph support
- Canonical URLs
- `robots.txt`
- `sitemap.xml`
- Alt text for all images
- Google-friendly performance and accessibility
- Schema markup for organization and annual event

## Visual Direction
- Calm, elegant, welcoming
- Warm neutrals with gold accents
- Serif headlines and highly readable body text
- Spacious sections
- Buttons and menu items visibly large without zooming

## Phase 2
- Real form backend
- Admin-editable CMS
- Uploadable gallery
- Events editable without developer help

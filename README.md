# Table Issue Tracker App

## Overview

Table Issue Tracker App is a Next.js-based issue tracking application that prioritizes accessibility while focusing on tabular data presentation. This project leverages the App Router for efficient routing, React components for modular UI design, and CSS modules for scoped styling, all while ensuring the highest standards of web accessibility.

## Key Features

- Dynamic issue routing and detailed view with accessibility considerations
- Reusable UI components including fully accessible tables and search functionality
- Custom data fetching hook for efficient and accessible API interactions
- Modular project structure following Next.js 13+ best practices
- Comprehensive implementation of WCAG 2.1 guidelines

## Accessibility Focus

- Keyboard navigation support throughout the application
- Proper ARIA attributes and roles for enhanced screen reader compatibility
- Sufficient color contrast and text sizing for readability
- Descriptive alt text for images and icons
- Focus management for dynamic content changes
- Accessible form controls with clear labels and error messages

## Tech Stack

- Next.js 13+
- React
- TypeScript
- CSS Modules
- ARIA (Accessible Rich Internet Applications)

## Project Structure

Table-Issue-Tracker-App/
├── .next/
├── app/
│ ├── (root)/
│ │ ├── page.module.css
│ │ └── page.tsx
│ ├── issues/
│ │ └── [id]/
│ │ ├── page.module.css
│ │ └── page.tsx
│ ├── favicon.ico
│ └── layout.tsx
├── components/
│ ├── ClientIssuesDetails/
│ │ └── ClientIssuesDetails.tsx
│ ├── ClientIssuesTable/
│ │ └── ClientIssuesTable.tsx
│ ├── Header/
│ │ └── Header.tsx
│ └── ui/
│ │ ├── Icon/
│ │ ├── Search/
│ │ └── Table/
│ │ │ ├── TableSkeleton/
│ │ ├── Table.module.css
│ │ └── Table.tsx
├── hooks/
│ └── useFetch.ts
├── lib/
│ └── utils.ts
├── mock/
├── node_modules/
├── public/
└── styles/

## Getting Started

To get TABLE-APP running locally, follow these steps:

1. **Clone the repository**

   ```
   git clone https://github.com/hashkov/table-issue-tracker.git
   cd table-app
   ```

2. **Install dependencies**

   ```
   npm install
   ```

3. **Run the development server**

   ```
   npm run dev
   ```

4. **Open the application**
   Navigate to `http://localhost:3000` in your web browser.

## Accessibility Testing

We are committed to maintaining high accessibility standards. Here's how we ensure and test for accessibility:

### Manual Testing

- Keyboard Navigation: Regularly test all features using only a keyboard.
- Screen Reader Testing: We test with popular screen readers like NVDA (Windows) and VoiceOver (macOS).
- Browser Testing: We ensure compatibility with major browsers and their built-in accessibility tools.

### Accessibility Checklist

Before submitting a pull request, ensure:

- [ ] All images have meaningful alt text
- [ ] Color contrast ratios meet WCAG AA standards
- [ ] ARIA attributes are correctly used where necessary
- [ ] Forms are fully accessible with proper labels and error messages
- [ ] Dynamic content changes are announced to screen readers

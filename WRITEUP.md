# Lendsqr Frontend Engineering Assessment — Write-Up

* **Candidate Name**: Ali Imtiyaz Khan
* **Repository Link**: [https://github.com/ali-imtiyazkhan/lendsqr-fe-test](https://github.com/ali-imtiyazkhan/lendsqr-fe-test)
* **Deployed URL**: [https://imtiyaz-lendsqr-fe-test.vercel.app/login](https://imtiyaz-lendsqr-fe-test.vercel.app/login)

---

## 🛠️ Approach & Tech Stack Decisions

### 1. **Framework & Language**
- **Vite 8 + React 19**: Selected Vite as the build tool to facilitate instant hot-reloading and lightning-fast production bundles. Used React 19 for modern component orchestration.
- **TypeScript**: Utilized strict static typing to ensure type safety, especially when passing data models for `User` objects, `UserFilters`, and pagination types.

### 2. **Styling Architecture**
- **SCSS (7-1 Pattern)**: Structured CSS rule hierarchies into separate, modular style files loaded inside a singular index file using Sass `@use` imports. This keeps breakpoints, tokens, form components, dashboard grids, and details sections clean and maintains strict separation of concerns.

### 3. **Testing Suite**
- **Vitest & React Testing Library**: Reached for Vitest as it runs natively within Vite's configuration environment, leading to quick setup. The test suite has 42 test cases covering pagination components, profile badges, authorization routes, services caching, and all form validation outcomes on the Login page.

---

## 📐 Architecture Tradeoffs & Decisions

### ⚖️ Pagination vs. Virtualization (Data Handling at Scale)
* **Decision**: Implemented **Page-based Pagination (10 rows per page)** instead of scrolling virtualization for the 500-record dataset.
* **Tradeoff & Reasoning**: While virtualization (using tools like react-window) is highly performant for datasets of 10,000+ items, it introduces significant engineering and layout complexity for 500 items. Additionally, virtualized scrolling can break native browser text searches (`Cmd+F`), make keyboard tab focusing highly complex, and pose accessibility challenges for screen readers. Pagination divides data into accessible chunks, maintains standard tab-indices, and guarantees complete searchability.

### 📂 Dynamic Search & Filtering Layer
* **Decision**: Implemented the filtering predicate on the client-side cache layer inside `userApi.ts` before calculating slices for pagination.
* **Reasoning**: Performing search calculations before page slicing ensures the pagination navigation adjusts dynamically (e.g. updating the total count and pages from 50 pages down to 2 pages if filters yield fewer records), mirroring correct API behaviors.

---

## ♿ Accessibility Enhancements
To achieve Stage 1 scoring criteria, several accessibility considerations were built:
* **Semantic HTML**: Replaced flat divs with proper `<header>`, `<main>`, `<section>`, and `<aside>` layouts.
* **Screen Reader Access**: Hidden visual labels (`sr-only` class) are attached to all inputs using matching `htmlFor` identifiers to support screen readers without altering the visual design of the mockups.
* **Form States**: Linked fields use `aria-invalid` and `aria-describedby` referencing inline alert messages so assistive technologies announce submission errors immediately.
* **Focus Management**: Applied active, visible outline focus rings (`box-shadow` matching the theme) across inputs, buttons, and links.

---

## 🧪 Verification & Local Setup

### Running Tests
To verify all test suites, run:
```bash
npm run test
```

### Building the Project
To compile the production code, run:
```bash
npm run build
```
This runs `generate:users` to generate the 500 mock users at `public/data/users.json`, runs TypeScript checks, and outputs build files to `/dist`.

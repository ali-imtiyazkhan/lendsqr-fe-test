# Lendsqr Admin Portal (Assessment)

A premium, state-of-the-art admin dashboard built as a solution for the Lendsqr Frontend Engineering Assessment. The application mirrors the required Figma designs with high fidelity, complete responsiveness, full state validation, interactive filtering, and comprehensive test coverage.

---

## 📸 Interface Preview

### Dashboard & Users Directory
![Dashboard Screen](./public/Lendsqr%20Frontend%20Engineering%20Assessment/Lendsqr%20Frontend%20Engineering%20Assessment.png)

### Secure Login
![Login Screen](./public/Lendsqr%20Frontend%20Engineering%20Assessment/Log%20In.png)

---

## ✨ Features Implemented

### 1. **Authentication (Login) with Strict Validation**
- Fully responsive screen matching the 2-column illustration & form layout.
- Controlled state form inputs with instant visual indicators.
- Email formatting validation (Regex) and Password strength/length checks.
- Accessibility labels (`htmlFor`) and visible focus ring indicators.
- Show/hide toggle option for the password field.

### 2. **Responsive Shell & Navigation**
- Sidebar navigation with active teal visual indicator on currently highlighted tab.
- Hamburger menu toggling for tablet and mobile sizes.
- Search input bar and notification badges in Topbar.

### 3. **Data Grid & Management (500 Records)**
- Served from a custom self-generated mock dataset containing 500 detailed user objects.
- High performance pagination (10 rows per page) showing page list, next/prev controls, and ellipsis jumps.
- Interactive stats cards detailing total users, active users, users with loans, and users with savings.
- Status Badge component matching appropriate state colors (Active, Inactive, Pending, Blacklisted).

### 4. **Functional Filter Panel**
- Inline filter toggle.
- Search query filtering across multiple columns:
  - **Organization** (Dropdown dynamically populated from the active dataset).
  - **Status** (Dropdown supporting Active, Inactive, Pending, Blacklisted).
  - **Username** (Partial text search).
  - **Email** (Partial text search).
  - **Phone Number** (Partial text search).
  - **Date Joined** (Calendar picker matching parsed dates).
- Clean "Reset" and "Filter" logic with local state optimizations.

### 5. **User Details view**
- Three-tier rating visualization (Stars matching the user's tier level).
- Tabs bar for navigation inside details (General Info, Documents, Bank Details, etc.).
- 5-column layout displaying user info, education & employment details, socials, and guarantor information.

### 6. **State Persistence**
- Fully integrated LocalStorage backup so user detailed modifications or refreshes persist across sessions.

---

## 🛠️ Technology Stack

- **Core**: React 19 (Hooks, Contexts)
- **Language**: TypeScript (Strict typing compliance)
- **Styling**: Sass/SCSS (7-1 pattern structural architecture using `@use` module syntax)
- **Bundler**: Vite 8
- **Testing**: Vitest & React Testing Library (39+ unit and integration test cases)

---

## 🚀 Getting Started

### 📋 Prerequisites
Make sure you have Node.js (v18 or higher) and npm installed.

### 🔧 Installation
1. Clone this repository to your local system:
   ```bash
   git clone <repository-url>
   cd lendsqr-fe-test
   ```

2. Install all dependencies:
   ```bash
   npm install
   ```

3. Generate the 500 mock users database (automatically generates `/public/data/users.json`):
   ```bash
   npm run generate:users
   ```

### 💻 Local Development
To launch the development server:
```bash
npm run dev
```
Navigate to `http://localhost:5173` in your browser.

### 🧪 Running Tests
To execute all Vitest suites:
```bash
npm run test
```

For watch mode:
```bash
npm run test:watch
```

### 🏗️ Build & Production Deployment
To generate the production-ready optimized build bundle:
```bash
npm run build
```
You can preview the build locally using:
```bash
npm run preview
```

**Deployment guidelines for Vercel/Netlify**:
Ensure the deployment project name follows the format: `https://<your-name>-lendsqr-fe-test.vercel.app` (e.g. `https://ali-imtiyazkhan-lendsqr-fe-test.vercel.app`).

---

## 📐 Architecture & Core Design Decisions

### **Pagination over Virtualization**
For a dataset containing 500 records, virtualized scrolling introduces unnecessary engineering overhead and accessibility constraints. Pagination (10 records/page) delivers an optimal user experience by dividing data into readable chunks, preserving native browser search capabilities, and allowing keyboard focus navigation to run natively.

### **SCSS Partial Architecture (7-1 Pattern)**
All CSS rules are written as modular SCSS sheets imported inside `main.scss`. This prevents file clutter and guarantees consistent variables, mixins, and theme consistency across all views:
- `_variables.scss` - Colors, spacing metrics, and screen media breakpoints.
- `_globals.scss` - Global browser overrides, fonts (Work Sans), and box models.
- `_layout.scss` - Topbar, Sidebar navigation, and workspace responsiveness.
- `_login.scss` - Authentication cards and validation message styling.
- `_users.scss` - Directory stats, Tables, filter inputs, and pagination components.
- `_details.scss` - User detail profile summary and info grids.

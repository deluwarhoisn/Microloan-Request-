# Assignment 11 Update - R&D Documentation

## Objective
Upgrade the existing Assignment 11 project with 3 meaningful features, integrate at least one new technology, and prepare the project for production deployment.

## New Technology Researched and Integrated
### Technology: TanStack Query
Why chosen:
- Replaces repetitive useEffect + useState fetch logic.
- Built-in loading/error/caching/retry behavior.
- Cleaner and more scalable data layer for dashboard-heavy apps.

How it improves the project:
- More reliable data-fetching for loans, loan details, and dashboard content.
- Reduced duplicate API code and fewer loading state bugs.
- Faster UI response when navigating between previously fetched pages due to caching.

### Additional Technology: Recharts
Why chosen:
- Lightweight React-native charting library.
- Good fit for role-based dashboard analytics.

How it improves the project:
- Admin dashboard now visualizes loan categories and interest trends.
- User dashboard now visualizes personal loan statuses and amount trends.
- Makes dashboard more professional and data-driven.

## 3 New Features Implemented

### Feature 1: Advanced Loan Discovery (All Loans)
Implemented on All Loans page:
- Search by loan title.
- Filter by category.
- Sort by interest and max amount.
- Reset filters.

Impact:
- Improves discoverability and helps users select better loan products faster.

### Feature 2: Loan Compare + Save
Implemented on All Loans page:
- Quick Compare tray (up to 3 loans).
- Save/Unsave loans in localStorage.

Impact:
- Better decision support before application.
- Users can keep track of shortlisted loans.

### Feature 3: Role-based Professional Dashboard
Implemented across routes/layout/dashboard pages:
- Admin and User receive different dashboard home UIs.
- Admin-only and user-only routes are separated.
- Admin can control all protected dashboard pages when needed.
- Sidebar and experience vary by role.

Impact:
- Cleaner UX and clearer responsibility boundaries.
- Better access control and professional product feel.

## Deployment Readiness
Project configured for SPA deployment:
- Firebase Hosting rewrite already configured.
- Added Vercel and Netlify config files for easier deployment.

Deployment steps are documented in README and DEPLOYMENT section.

## Risks / Future Work
- Current role system is frontend-controlled (localStorage bootstrap for admin email).
- For production security, role authorization should be enforced in backend with JWT and protected APIs.
- Add automated tests for role-based routing and dashboard guards.

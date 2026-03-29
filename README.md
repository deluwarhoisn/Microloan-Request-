# LoanLink - Microloan Request & Approval Tracker

## Project Overview
LoanLink is a role-based microloan web application where users can browse loans, view details, apply for loans, and track application status. Admins can manage loans, users, and applications from a dedicated dashboard.

The project is built with a modern React stack and deployed as a live SPA.

## Live Demo
- Client Live URL: https://microloan-reques.web.app
- Server Live URL: https://microloan-request-server.vercel.app

## Assignment 11 Update (March 2026)
This repository was upgraded with 3 new features, new technology integration, R&D documentation, and live deployment.

### 3 New Features Implemented
1. Advanced Loan Discovery
- Search by loan title
- Filter by category
- Sort by interest and max amount
- Reset filters

2. Loan Compare + Save
- Compare up to 3 loans in a quick comparison tray
- Save/unsave loans (localStorage-based shortlist)

3. Professional Role-Based Dashboard
- Separate admin and user dashboard experiences
- Role-based route protection and role-specific sidebar
- Admin can control all protected dashboard pages

## New Technology Integrated
1. TanStack Query
- Implemented for data fetching, caching, loading/error state management, and cleaner API usage.

2. Recharts
- Integrated for dashboard analytics visualization (admin and user insights).

## Core Features
- Firebase email/password and Google authentication
- Private and role-based routes
- All Loans, Loan Details, and Loan Application flows
- Admin user/loan/application management pages
- User loan tracking and profile pages
- Responsive UI with Tailwind CSS + DaisyUI + Framer Motion

## Tech Stack
- Frontend: React, React Router, Tailwind CSS, DaisyUI, Framer Motion
- Data Fetching: TanStack Query, Axios
- Charts: Recharts
- Auth: Firebase
- Notifications: SweetAlert2
- Build Tool: Vite
- Deployment: Firebase Hosting (also configured for Vercel/Netlify)

## R&D Documentation
Detailed research notes are available here:
- [docs/R_AND_D.md](docs/R_AND_D.md)

## Test Accounts

### Admin
- **Email**: `babuhossen301@gmail.co` (or `babuhossen301@gmail.com`)
- **Status**: Active

### Manager
- **Email**: `tagyl@mailinator.com` | Status: Active
- **Email**: `jynix@mailinator.com` | Status: Active
- **Email**: `hobe@mailinator.com` | Status: Active

### User (Borrower)
- **Email**: `tuvynyw@mailinator.com` | Status: Active

### How to Login
1. **Google Login** (Recommended): Click "Login with Google" to sign in with any Google account
2. **Email/Password**: Use the email addresses above (passwords managed by Firebase during registration)
3. **Create New Test Account**: Register with "Register" page, then use ManageUsers panel to change role

## Local Setup
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
npm run preview
```

## Deployment

### Firebase (current live deployment)
```bash
npm run build
firebase login
firebase deploy --only hosting --project prod
```

### Vercel
1. Import repository to Vercel
2. Build command: npm run build
3. Output directory: dist
4. SPA rewrites are already configured in vercel.json

### Netlify
1. Connect repository to Netlify
2. Build command: npm run build
3. Publish directory: dist
4. SPA redirects are already configured in netlify.toml

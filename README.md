# LoanLink – Microloan Request & Approval Tracker System

## Project Overview
**LoanLink** is a web-based microloan request, review, and approval management system designed to help small financial organizations, NGOs, and microloan providers streamline their loan management process. It allows users to apply for loans, managers to review pending applications, and admins to manage users and loans efficiently.

The system integrates **MongoDB** for backend data storage, **Firebase** for authentication, and modern front-end technologies for a smooth user experience.

---

## Live Demo
[Insert your live site link here]

---

## Features

### General Features
- Responsive and modern UI with smooth **Framer-Motion** animations.
- Theme toggling (Dark/Light mode).
- Dynamic page titles and route-based content.
- Loading spinner during API calls.
- Toast/SweetAlert notifications for CRUD actions.
- 404 Not Found page for invalid routes.

### Home Page
- Hero Banner with CTA buttons (Apply for Loan / Explore Loans).
- Available Loans section (6 cards from MongoDB).
- "How It Works" step-by-step guide.
- Customer feedback carousel.
- 2 extra relevant sections for enhanced UX.
- Smooth navigation to loan details page.

### Authentication
- Email & Password login and registration.
- Google/GitHub OAuth login (optional one).
- Password validation: uppercase, lowercase, minimum 6 characters.
- Role selection during registration: Borrower / Manager.
- Toast notifications on successful login/register.

### Loan Management
- **All Loans Page**: 3-column grid layout with loan info cards.
- **Loan Details Page**: Private route showing detailed loan info and Apply Now button.
- **Loan Application Form**: Auto-fills user email, loan title, interest rate; collects borrower info; stores applications in MongoDB.

### Dashboard
#### Admin Dashboard
- Manage Users: Update roles, suspend users with reason.
- All Loans: Add/update/delete loans, select which loans appear on home page.
- Loan Applications: Filter by status (Pending/Approved/Rejected), view details.

#### Manager Dashboard
- Add Loans: Upload loan details with images, EMI plans, and toggle Show on Home.
- Manage Loans: Edit or delete loans, search/filter by title or category.
- Pending Applications: Approve/Reject loans.
- Approved Applications: View all approved loans.
- My Profile: View profile info.

#### Borrower Dashboard
- My Loans: View and manage loan applications; cancel pending loans; pay application fees via Stripe.
- My Profile: View personal information.

### Challenge Features
- JWT/Firebase authentication with tokens stored in cookies.
- Search and filter functionality on user management and loans pages.
- Pagination implemented on relevant pages.
- Payment integration with Stripe ($10 per application).
- Modals and reusable components across the app.

---

## Technologies Used
- **Frontend:** React.js, Tailwind CSS, Framer-Motion, React Router, React Hook Form, SweetAlert2
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Firebase
- **Deployment:** Netlify / Vercel / Surge
- **Others:** JWT, Stripe Payment API

---

## Folder Structure

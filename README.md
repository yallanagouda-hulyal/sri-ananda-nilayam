# SHRI ANANDA NILAYAM — DESIGN | CONSTRUCTION | INTERIORS
> **A Luxury MERN Stack Architectural, Civil Construction & Bespoke Interior Design Platform**  
> *Crafted for real client demonstration with complete MongoDB-backed CMS, business enquiry workflows, and admin workspace.*

---

## 🏛️ 1. Project Overview

**Shri Ananda Nilayam** is an end-to-end, production-ready MERN stack web application engineered for a premier architecture, luxury residential construction, and turnkey interior design studio headquartered in Bengaluru, Karnataka.

This platform delivers:
- **Cinematic Public Experience**: Glassmorphism navigation, editorial storytelling, interactive portfolio with high-resolution lightbox, dynamic services with FAQs, client testimonials, and business enquiry forms.
- **Administrative CMS Suite**: Dark navy & royal gold admin workspace, real-time KPI metrics, lead pipeline tracking, service CRUD, portfolio management, gallery curation, page content controls, and role-based access control.
- **Robust Backend Engine**: Express.js RESTful API, MongoDB Mongoose data modeling, JWT authentication, rate limiting, and input sanitization.

---

## 🎨 2. Brand Identity & Design System

| Element | Specification | Hex / Value | Usage |
| :--- | :--- | :--- | :--- |
| **Primary Navy** | Midnight Navy | `#102A4C` | Deep background overlays, glass panels, cards |
| **Primary Gold** | Royal Gold | `#D6A43B` | Accents, active indicators, CTA gradients, badges |
| **Primary Ivory** | Warm Ivory | `#F7F5F0` | Body typography, high-contrast headings |
| **Dark Base** | Deep Navy Black | `#061121` | Page background, root surface |
| **Typography** | Classical Serif | `'Cinzel', Georgia, serif` | Headings & architectural statements |
| **Typography** | Modern Sans | `'Plus Jakarta Sans', sans-serif` | Body text, forms, navigation |

---

## 📁 3. Project Directory Structure

```text
shri-ananda-nilayam/
├── client/                     # Vite + React 18 Frontend
│   ├── public/
│   │   └── images/             # Downloaded architectural photography & brand SVGs
│   └── src/
│       ├── api/                # Axios API clients (publicApi, adminApi)
│       ├── components/
│       │   ├── common/         # Header, Footer, PageBanner, Lightbox, SeoMeta, FloatActions
│       │   └── home/           # Hero, AboutPreview, Services, Projects, Gallery, Testimonials, CTA
│       ├── context/            # SiteContext (dynamic settings), AuthContext (session)
│       ├── layouts/            # PublicLayout.jsx, AdminLayout.jsx
│       ├── pages/              # 12 Public Pages (Home, About, Services, Projects, Gallery, etc.)
│       │   └── admin/          # 8 Admin CMS Screens (Dashboard, Enquiries, Services, Projects, etc.)
│       ├── App.jsx             # Master React Router, HelmetProvider, Toaster
│       └── index.css           # Luxury design system tokens and utilities
├── server/                     # Node.js + Express + MongoDB Backend
│   ├── config/                 # db.js (Mongoose connection)
│   ├── controllers/            # auth, dashboard, enquiry, project, service, gallery, settings
│   ├── middleware/             # auth (JWT), errorHandler, rateLimiter, upload
│   ├── models/                 # 10 Mongoose schemas (AdminUser, Enquiry, Project, Service, etc.)
│   ├── routes/                 # public.js, auth.js, admin.js
│   ├── scripts/                # seed.js (realistic demo data), createAdmin.js (bootstrap)
│   ├── uploads/                # Local file storage for images & assets
│   ├── .env                    # Server environment variables
│   └── server.js               # Express application entry point
├── package.json                # Root orchestration scripts
└── README.md                   # Complete architectural and deployment manual
```

---

## 🚀 4. Quick Start (Local Development)

### Prerequisites
- **Node.js**: v18+ or v20+
- **MongoDB**: Community Server running locally at `mongodb://127.0.0.1:27017` or MongoDB Atlas URI

### Step 1: Install Dependencies
From the repository root directory:
```bash
npm run install:all
```
*(Or navigate to `/client` and `/server` independently and run `npm install`)*

### Step 2: Configure Environment Variables
Ensure `server/.env` is configured (or copy from `server/.env.example`):
```env
MONGODB_URI=mongodb://127.0.0.1:27017/shri-ananda-nilayam
PORT=5000
NODE_ENV=development
JWT_SECRET=shri_ananda_nilayam_jwt_secret_dev_key_89234789123
JWT_EXPIRES_IN=7d
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
BOOTSTRAP_ADMIN_EMAIL=admin@srianandanilayam.example
BOOTSTRAP_ADMIN_PASSWORD=Admin@123456
```

### Step 3: Seed Database & Bootstrap Admin
Populate the 8 services, 10 showcase projects, 16 gallery exhibits, 5 testimonials, and global settings:
```bash
npm run seed
```

Verify or bootstrap the Super Administrator account:
```bash
npm run create-admin
```

### Step 4: Run Development Servers
To start both the Express API (`http://localhost:5000`) and the Vite React app (`http://localhost:5173`):
```bash
npm run dev
```

---

## 🔑 5. Administrator CMS Access

- **Admin Login URL**: `http://localhost:5173/admin/login`
- **Default Administrator Credentials**:
  - **Email**: `admin@srianandanilayam.example`
  - **Password**: `Admin@123456`
  *(A quick "Click to fill sample credentials" button is also provided on the sign-in card for instant demonstration access)*

---

## 🗺️ 6. Public & Admin Routes

### Public Website Routes
| Route | Component | Description |
| :--- | :--- | :--- |
| `/` | `Home.jsx` | Cinematic Hero, Story, Featured Services, Projects, Visual Gallery, Testimonials, CTA |
| `/about` | `About.jsx` | Editorial narrative, Mission & Vision, 4-Stage Architectural Journey, Core Values |
| `/services` | `Services.jsx` | All 8 services with category filters, benefits, and Turnkey Advantage highlights |
| `/services/:slug`| `ServiceDetail.jsx`| Dynamic overview, benefits checklist, 4-step workflow, FAQs accordion, and consultation form |
| `/projects` | `Projects.jsx` | Portfolio with search, multi-category filters (Residential, Commercial, Interior, Ongoing, Completed) |
| `/projects/:slug`| `ProjectDetail.jsx`| Project specifications bar, client brief, architectural story, and interactive Lightbox gallery |
| `/gallery` | `Gallery.jsx` | Curated visual archive with category filters and keyboard-accessible LightboxModal |
| `/testimonials` | `Testimonials.jsx` | 5-star ratings, client reflections, and Ananda Nilayam Quality Guarantees |
| `/contact` | `Contact.jsx` | Studio location details, click-to-call, WhatsApp direct routing, Google Maps, and validated enquiry form |
| `/privacy-policy`| `PrivacyPolicy.jsx`| Blueprint confidentiality, data protection, and disclosure terms |
| `/terms` | `Terms.jsx` | Architectural scope, BOQ guidelines, and 10-year structural warranty terms |
| `*` | `NotFound.jsx` | Luxury 404 error screen with quick navigation pathways |

### Admin CMS Routes (`/admin/*`)
| Route | Component | Purpose |
| :--- | :--- | :--- |
| `/admin/login` | `AdminLogin.jsx` | Authenticated session sign-in with JWT generation |
| `/admin/forgot-password`| `AdminForgotPassword.jsx`| Password recovery request |
| `/admin/dashboard` | `AdminDashboard.jsx` | Real-time KPI counters, enquiry pipeline status distribution, recent leads |
| `/admin/enquiries` | `AdminEnquiries.jsx` | Lead management, status changes (New, Contacted, Qualified, Converted), internal notes, CSV export |
| `/admin/services` | `AdminServices.jsx` | Service catalog management, order sorting, publication toggles |
| `/admin/services/new` | `AdminServiceForm.jsx` | Service creation with dynamic benefits and FAQs builder |
| `/admin/projects` | `AdminProjects.jsx` | Portfolio item management, stage badges (Ongoing vs Completed) |
| `/admin/projects/new` | `AdminProjectForm.jsx` | Project creation with specifications, client brief, and attached gallery |
| `/admin/gallery` | `AdminGallery.jsx` | Photo gallery upload, category tagging, and exhibit management |
| `/admin/testimonials` | `AdminTestimonials.jsx`| Testimonial CRUD, star rating, and display controls |
| `/admin/newsletter` | `AdminNewsletter.jsx` | Email subscribers list and CSV export |
| `/admin/pages` | `AdminPages.jsx` | Live CMS editor for Hero headlines, statistics, and mission statements |
| `/admin/settings` | `AdminSettings.jsx` | Global studio contact numbers, WhatsApp hotline, address, and developer credits |
| `/admin/users` | `AdminUsers.jsx` | Super Admin and Editor role permissions |

---

## 🔒 7. Security & Engineering Standards

- **Password Hashing**: Industry-standard `bcryptjs` with salt rounds.
- **Session Tokens**: JWT with customizable expiration and HttpOnly cookie transmission.
- **Brute Force Protection**: Account lockout after 5 consecutive failed login attempts.
- **Input Sanitization**: `mongoSanitize` against NoSQL injection; Zod and frontend verification.
- **Security Headers**: `helmet` configured with strict CORS rules and cross-origin resource policy.
- **Rate Limiting**: `express-rate-limit` protecting API endpoints and login routes.
- **Graceful Fallbacks**: All client pages include robust offline/fallback data structures, ensuring flawless demonstration even during maintenance windows.

---

## 🚢 8. Production Deployment Guide

### Recommended Subdomain Architecture
- **Public Domain**: `https://srianandanilayam.com`
- **Admin Subdomain**: `https://admin.srianandanilayam.com`
- **Backend API**: `https://api.srianandanilayam.com`

### Production Build
To create the optimized client production bundle:
```bash
npm run build
```
The output will be generated in `client/dist/`.

### Serving Frontend with Nginx (Example)
```nginx
server {
    listen 80;
    server_name srianandanilayam.com www.srianandanilayam.com;

    root /var/www/shri-ananda-nilayam/client/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass http://localhost:5000/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## ✒️ Mandatory Credit
**Designed and developed by [bookmywebsite.in](https://bookmywebsite.in)**

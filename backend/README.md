# Dott Ciblez – Backend API

A complete, production-ready Node.js + Express backend aligned specifically with the Dott Ciblez React frontend requirements.

## 🚀 Key Features

- **Admin Authentication:** Secure JWT-based authentication for the admin panel.
- **Job Management:** CRUD for job listings with fields matching the frontend.
- **Job Applications:** Handles multi-step form submissions from the frontend.
- **Team Management:** Manages team members with avatars and specific roles/categories used in frontend filters.
- **Service Bookings:** Processes booking requests from the Services page.
- **Contact Inquiries:** Processes contact form submissions with read/unread tracking.
- **Blogs:** Manage blog posts with categorical filtering and images.
- **Newsletter Subscriptions:** Collects subscriber emails from various frontend CTAs.
- **Admin Dashboard:** Aggregates statistics and recent activities for a high-level overview.

## 🛠️ Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Setup environment variables
cp .env.example .env
# Edit .env with your MongoDB URI, JWT secret, etc.

# 3. Seed your first Admin Account
npm run seed:admin

# 4. Start the development server
npm run dev
```

## 📁 Project Structure

```text
Backend/
├── .env                  # Environment variables
├── src/
│   ├── server.js         # Entry point (connects DB & starts app)
│   ├── app.js            # Express app configuration & middleware
│   ├── models/           # Mongoose schemas (Admin, Job, Application, etc.)
│   ├── controllers/      # Route handlers implementing business logic
│   ├── routes/           # Express router definitions
│   ├── middlewares/      # Custom middlewares (auth, validation, upload)
│   ├── utils/            # Utilities (error handling, logging)
│   └── seeds/            # Database seeding scripts
└── uploads/              # Storage for uploaded files (team avatars, blog images)
```

## 🌐 API Endpoints Reference

### Public Endpoints (Frontend Use)
- **POST** `/api/applications` - Submit a multi-step job application.
- **POST** `/api/inquiries` - Submit a contact form.
- **POST** `/api/bookings` - Submit a service booking request.
- **POST** `/api/newsletter/subscribe` - Subscribe to the newsletter.
- **GET** `/api/jobs` - Retrieve all active jobs (with `postedAgo` virtual).
- **GET** `/api/jobs/:id` - Retrieve a specific job.
- **GET** `/api/team` - Retrieve active team members (supports `?category=`).
- **GET** `/api/blogs` - Retrieve active blogs (supports `?category=`, `?featured=true`, etc).

### Admin Endpoints (Require Authentication)
- **POST** `/api/auth/login` - Admin login (returns JWT token in cookie).
- **POST** `/api/auth/logout` - Clear auth cookie.
- **GET** `/api/auth/me` - Get current admin session info.

*All endpoints below require a valid admin JWT token.*
- **GET** `/api/dashboard` - Get summary stats and recent activities.

**Jobs Management:**
- **POST** `/api/jobs` - Create a new job.
- **PUT** `/api/jobs/:id` - Update an existing job.
- **DELETE** `/api/jobs/:id` - Delete a job.

**Applications Management:**
- **GET** `/api/applications` - List all applications (supports pagination, filtering by `status` or `job`).
- **GET** `/api/applications/:id` - Get specific application details.
- **PUT** `/api/applications/:id/status` - Update application status (pending/reviewed/shortlisted/rejected).
- **DELETE** `/api/applications/:id` - Remove an application.

**Team Management:**
- **POST** `/api/team` - Add team member (supports `multipart/form-data` for avatar image).
- **PUT** `/api/team/:id` - Update team member.
- **DELETE** `/api/team/:id` - Delete team member.

**Inquiries & Bookings Management:**
- **GET** `/api/inquiries`, `/api/bookings` - List submissions.
- **PUT** `/api/bookings/:id/status` - Update a booking's status.
- **DELETE** `/api/inquiries/:id`, `/api/bookings/:id` - Remove entries.

**Blogs & Newsletters Management:**
- **POST/PUT** `/api/blogs` - Add/Update blog post (supports `multipart/form-data` for image).
- **DELETE** `/api/blogs/:id` - Delete a blog post.
- **GET** `/api/newsletter` - List newsletter subscribers.
- **DELETE** `/api/newsletter/:id` - Remove a subscriber.

## 📝 Error Handling
Standardized error responses are structured as:
```json
{
  "success": false,
  "message": "Human readable error message."
}
```
Validation errors automatically list what inputs were faulty.

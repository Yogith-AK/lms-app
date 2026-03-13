# 📚 LearnHub — Learning Management System

A modern, BYJU'S-inspired LMS built with **Next.js 14**, **TypeScript**, and **Tailwind CSS**. Features video courses, user authentication, progress tracking, and a beautiful UI.

---

## ✨ Features

- 🔐 **Auth** — Sign up / Sign in with JWT (httpOnly cookies)
- 🎥 **Video Courses** — YouTube-embedded lesson player
- 📊 **Progress Tracking** — Mark lessons complete, see % progress
- 🔍 **Course Discovery** — Filter by level, category, search
- 📱 **Responsive** — Works on mobile, tablet, desktop
- ⚡ **Fast** — Next.js App Router, server components

---

## 🚀 Quick Start (Local)

```bash
# 1. Clone your repo
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your own secrets

# 4. Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

**Demo Login:**
- Email: `demo@learnhub.com`
- Password: `password`

---

## 📁 Project Structure

```
lms-app/
├── app/
│   ├── api/
│   │   ├── auth/         # signin, signup, signout, me
│   │   ├── courses/      # list, detail, enroll
│   │   └── progress/     # mark lesson complete
│   ├── auth/             # Sign in / Sign up page
│   ├── courses/          # Course listing & detail
│   │   └── [id]/learn/   # Lesson video player
│   ├── dashboard/        # Student dashboard
│   └── page.tsx          # Landing page
├── components/
│   ├── Navbar.tsx
│   ├── CourseCard.tsx
│   └── VideoPlayer.tsx
├── lib/
│   ├── db.ts             # In-memory data store
│   └── auth.ts           # JWT helpers
├── types/                # TypeScript types
└── middleware.ts          # Route protection
```

---

## 🌐 Deploy to Vercel

### Step 1 — Push to GitHub

```bash
# In your project folder
git init
git add .
git commit -m "feat: initial LMS build"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 2 — Connect to Vercel

1. Go to [vercel.com](https://vercel.com) → **New Project**
2. Import your GitHub repository
3. Framework: **Next.js** (auto-detected)
4. Add Environment Variables:

| Variable | Value |
|---|---|
| `JWT_SECRET` | A random 32+ char string |
| `NEXTAUTH_SECRET` | Another random string |
| `NEXTAUTH_URL` | `https://your-app.vercel.app` |

5. Click **Deploy** 🚀

### Step 3 — Generate secrets

Run this in your terminal to generate a secure JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🗄️ Upgrading to a Real Database

The app currently uses an **in-memory store** (`lib/db.ts`) — data resets on server restart. For production:

### Option A: Vercel Postgres (Easiest)
1. In Vercel dashboard → Storage → Create Postgres DB
2. Install: `npm install @vercel/postgres`
3. Replace functions in `lib/db.ts` with SQL queries

### Option B: MongoDB Atlas (Free tier)
1. Create cluster at [mongodb.com](https://mongodb.com)
2. Install: `npm install mongoose`
3. Add `MONGODB_URI` to env variables

### Option C: PlanetScale / Neon (Serverless SQL)
1. Create DB and get connection string
2. Install: `npm install drizzle-orm`

---

## 🎨 Customization

**Add a new course:** Edit `lib/db.ts` → add to `courses` array with YouTube video IDs.

**Change colors:** Edit `tailwind.config.js` → `colors.brand` values.

**Add more categories:** Edit the categories array in `app/page.tsx`.

---

## 📦 Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Auth | JWT + httpOnly cookies |
| Video | YouTube IFrame API |
| Hosting | Vercel |
| Database | In-memory (upgrade to Postgres) |

---

Built with ❤️ using Next.js + Tailwind CSS

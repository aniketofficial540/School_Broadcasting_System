# EduBroadcast — Content Broadcasting System

A React.js frontend for an educational content broadcasting system. Teachers upload content, principals approve or reject it, and students can view live broadcasts on a public page.

---

## Getting Started

### Prerequisites
- Node.js (version 16 or above)
- npm (comes with Node.js)

### Installation

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd School_Broadcasting_System

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
```

The app will open at **http://localhost:3000**

---

## Demo Login Credentials

| Role       | Email                    | Password     |
|------------|--------------------------|--------------|
| Principal  | principal@school.com     | password123  |
| Teacher 1  | teacher1@school.com      | password123  |
| Teacher 2  | teacher2@school.com      | password123  |

> You can also click the **Quick Demo Login** buttons on the login page.

---

## Live Broadcast URLs (No Login Required)

```
http://localhost:3000/live/teacher-1    → Mr. Rahul's broadcast
http://localhost:3000/live/teacher-2    → Ms. Priya's broadcast
```

---

## Deployment

The app is deployed at: **https://edu-broadcast.vercel.app** *(update this link after deploying)*

To deploy your own instance:

```bash
npm run build
# Then drag the build/ folder into Vercel, Netlify, or any static host
```

Or connect the GitHub repository to [Vercel](https://vercel.com) for automatic deployments.

---

## Project Structure

```
src/
├── components/common/    Reusable UI components (Button, Modal, etc.)
├── context/              AuthContext for global login state
├── data/                 Mock data (506 items for realistic pagination)
├── hooks/                Custom React hooks (usePagination)
├── layouts/              Main sidebar/navbar layout
├── pages/
│   ├── auth/             Login page
│   ├── teacher/          Teacher dashboard, upload, my content
│   ├── principal/        Principal dashboard, pending, all content
│   └── public/           Live broadcast page (no login needed)
├── services/             API call layer (auth, content, approval)
└── utils/                Helper functions (formatDate, validateFile, etc.)
```

---

## Features

### Authentication
- Email + password login with validation
- Role-based redirect (teacher vs principal)
- Session persists on page refresh
- Protected routes

### Teacher Features
- Dashboard with content stats (total, pending, approved, rejected)
- Upload content form with:
  - File upload (JPG, PNG, GIF — max 10MB)
  - Image preview before upload
  - Start/end time scheduling
  - Rotation duration setting
  - Validation for all fields
- My Content page with status filter + pagination

### Principal Features
- Dashboard with school-wide stats
- Pending Approvals page with approve/reject actions
- Reject requires a mandatory reason (via modal)
- All Content page with search + status filter + pagination

### Public Live Page
- No login required
- Shows currently active (approved + in-time) content
- Auto-rotates slides based on rotation duration
- Auto-refreshes every 60 seconds
- Empty state when no content is live

### UI/UX
- Skeleton loaders while fetching data
- Toast notifications for actions
- Empty states with helpful messages
- Error states with retry options
- Responsive design (mobile + desktop)
- Animated page transitions

---

## Tech Stack

| Tool              | Purpose                        |
|-------------------|--------------------------------|
| React 18          | UI framework                   |
| React Router v6   | Page navigation / routing      |
| Tailwind CSS      | Styling                        |
| React Hot Toast   | Toast notifications            |
| localStorage      | Session persistence            |

---

## Notes

- **No backend needed** — uses mock data for demonstration
- **To connect a real API**: update files in `src/services/` only
- See `Frontend-notes.txt` for detailed architecture explanation

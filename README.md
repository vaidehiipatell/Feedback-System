# Feedback Dashboard (MERN)

Production-ready MERN app to submit feedback, view all feedback, and see analytics.

## Structure

- backend/
  - server.js
  - routes/feedbackRoutes.js
  - controllers/feedbackController.js
  - models/Feedback.js
  - config/db.js
  - package.json
  - .env.example
- frontend/
  - src/
    - components/
    - pages/
    - services/
    - App.jsx
    - main.jsx
    - index.css
  - tailwind.config.js
  - vite.config.js
  - vercel.json
  - .env.example

## Environment Variables

Backend:
- MONGO_URI=
- MONGO_DB= (optional)
- PORT=5000
- NODE_ENV=production
- CORS_ORIGIN=*

Frontend:
- VITE_API_BASE_URL=http://localhost:5000

## Run Locally

1. Backend
```
cd backend
npm install
cp .env.example .env
# set MONGO_URI in .env
npm run dev
```
Server runs on http://localhost:5000

2. Frontend
```
cd frontend
npm install
cp .env.example .env
# adjust VITE_API_BASE_URL if backend URL differs
npm run dev
```
App opens on http://localhost:5173

## API

- POST /api/feedback
  - body: { name, email?, message, rating: 1-5 }
  - returns: { success, feedback }
- GET /api/feedback
  - returns: { success, feedbacks: [] }
- GET /api/stats
  - returns: { total, averageRating, positive, negative }

## Deployment

Backend (Render/Railway):
- Render: uses render.yaml or set Build Command: `npm install`, Start Command: `npm start`, Root: backend
- Set env vars: MONGO_URI, CORS_ORIGIN (e.g. https://your-frontend.vercel.app)

Frontend (Vercel):
- Framework: Other (Vite)
- Build Command: `npm run build`
- Output Directory: `dist`
- Root: frontend
- Env: VITE_API_BASE_URL=https://your-backend.onrender.com

## Postman Collection
See `postman/FeedbackDashboard.postman_collection.json`.

## Notes
- CORS: configure CORS_ORIGIN to your Vercel domain.
- Tailwind warnings in IDE are harmless; Tailwind compiles during build.
# Feedback-System

# 🚀 Deployment Guide

## 1. Backend Deployment (Render)

1. **Log in to Render**: Go to [render.com](https://render.com) and log in.
2. **New Web Service**: Click **New +** -> **Web Service**.
3. **Connect GitHub**: Select "Build and deploy from a Git repository" and connect your `shantanu945/law` repo.
4. **Configuration**:
   - **Name**: `law-backend` (or similar)
   - **Region**: Closest to you (e.g., Singapore/Mumbai if available, or US)
   - **Branch**: `main`
   - **Root Directory**: `backend` (Important!)
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Instance Type**: Free

5. **Environment Variables**:
   Scroll down to "Environment Variables" and add:
   - `RETELL_API_KEY`: (Your key starting with `key_...`)
   - `AGENT_ID`: (Your agent ID starting with `agent_...`)
   - `PORT`: `8000` (Optional, Render enforces its own text port but good to have)

6. **Deploy**: Click **Create Web Service**.

Wait for it to say "Live". Copy the URL (e.g., `https://law-backend-xyz.onrender.com`).

## 2. Connect Frontend to Backend

Once your backend is live:

1. Open `frontend/app.js` locally.
2. Find the line:
   ```javascript
   const BACKEND_URL = 'http://localhost:8000';
   ```
3. Change it to your new Render URL:
   ```javascript
   const BACKEND_URL = 'https://law-backend-xyz.onrender.com'; // No trailing slash
   ```
4. Save and push changes:
   ```bash
   git add .
   git commit -m "fix: update backend url"
   git push
   ```

## 3. Frontend Deployment (Netlify)

1. **Log in to Netlify**: [netlify.com](https://netlify.com).
2. **Add New Site**: Import from Git -> GitHub -> `law` repo.
3. **Configuration**:
   - **Base directory**: `frontend`
   - **Publish directory**: `frontend` (or leave empty if it auto-detects)
   - **Build command**: (Leave empty, it's static HTML)
4. **Deploy**: Click **Deploy Site**.

Your AI Receptionist will now be live on the web! 🌍

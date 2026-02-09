# LearnFast Frontend (Vite)

## Local Development
1. Install deps:
   `npm install`
2. Set API URL (optional if using Vite proxy):
   Create `frontend/.env` with `VITE_API_URL=http://localhost:8001`
3. Start dev server:
   `npm run dev`

## Vercel Deployment (Frontend Only)
Set the following environment variable in Vercel:
- `VITE_API_URL` = your backend base URL (for example, `https://api.example.com`)

The app will show a connection overlay if the API is unreachable or misconfigured.

## Build
`npm run build` outputs to `frontend/dist`.

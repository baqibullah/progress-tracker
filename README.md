# Progress Tracker

A minimal, ink-and-paper styled progress tracking app. Month → Week → Day goal grid with checkboxes, streaks, and a calendar heatmap. Built for personal use with a small group of collaborators everyone's progress is visible to others (public accountability feed style), but each person can only edit their own goals.

## Stack

- **Frontend:** Next.js (App Router)
- **Backend / DB:** Supabase (Postgres + Auth + RLS)
- **Deployment:** Vercel
- **Styling:** Tailwind CSS "ink and paper" logbook aesthetic (off-white paper background, near-black ink text, deep forest green for done states, muted amber for streaks)

## Features

- Email + password auth (Supabase Auth), with a separate `username` display field set at signup
- Grid view: goals as rows, weeks as column groups, days as checkboxes within each week
- Calendar heatmap of completions (hero element on the home page)
- Global streak tracking (any completion, any goal, consecutive real-world days)
- Per-user pages at `/u/[username]` read-only view of another user's grid
- Goal creation and deletion (deletion is destructive cascades to completions and gated behind a confirm dialog)

## Data model

- `profiles`: `id`, `username`, `avatar_url`, `created_at`
- `goal_templates`: `id`, `user_id`, `title`, `created_at`
- `completions`: `id`, `goal_template_id`, `user_id`, `date`, `is_completed`, `completed_at`

Row Level Security is enabled on all three tables: public read access, but writes require `auth.uid() = user_id`. `completions.goal_template_id` has `ON DELETE CASCADE`, so deleting a goal template removes its completion history automatically.

## Environment variables

Create a `.env.local` file at the project root (never commit this file):

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

You'll set the same two variables in Vercel's project settings when deploying.

## Local development

```bash
npm install
npm run dev
```

App runs at `http://localhost:3000`.

## Deployment

Deployed on Vercel's free tier, connected to this GitHub repo. Pushes to `main` deploy automatically.

## Status

Actively in development. Currently preparing for first deployment to Vercel.

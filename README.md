# 🧭 Mental Health App MVP  
**Team:** CareCampus  
**Competition:** University Mental Health Competition (2025–2026)

---

## 🌱 Overview  
This project is a **Mental Health MVP** — a guided, curriculum-style web app designed to help students learn about mental health, reflect, and build habits for emotional well-being.  

It combines **self-paced learning**, **daily reflections**, and a **supportive AI companion**, all while keeping data **private and local-first**.  

---

## 🎯 Goals  
- Build a **curriculum-driven** wellness app inspired by Duolingo’s structure.  
- Help students **learn, reflect, and track progress** safely and privately.  
- Offer **personalized lessons, check-ins, and progress tracking**.  
- Integrate **local campus resources** for quick access to help.  
- Maintain strong **ethical and safety boundaries** — this app does *not* replace therapy.  

---

## 🧩 Tech Stack (Planned)  
- **Frontend:** Next.js (App Router) + Tailwind + shadcn/ui  
- **Backend:** Supabase (PostgreSQL)  
- **AI Layer:** Local AI mock for structured reflection prompts  
- **Auth & Data:** Supabase Auth + local-first storage  
- **Testing:** Playwright for E2E smoke tests  

---

## 🧠 Inspiration  
> “Mental health isn’t a destination — it’s a daily practice.”  

This MVP is designed to guide students through short lessons, exercises, and reflections that help them understand themselves better, one step at a time.  

---

## 🚧 Current Status  
- 🧾 Supabase schema designed  
- 💬 AI reflection logic planned  
- 📘 Lesson + module structure defined  
- 🧱 Prototype in progress  

---

## ⚙️ Local Development Setup

Follow these steps to get the app running locally.

### 🧱 Prerequisites
- **Node.js** ≥ 18  
- **npm** or **pnpm/yarn**  
- **Supabase CLI** → install via
```bash
npm install supabase --save-dev
```
or follow the [Supabase CLI install guide](https://supabase.com/docs/guides/local-development/cli/getting-started)

### 🧩 Quickstart

1. Clone the repository
```bash
git clone https://github.com/sachelsout/mental-health-app-mvp.git
cd mental-health-app-mvp
```

2. Install dependencies
```bash
npm install
```

3. Start Supabase locally
```bash
npx supabase start
```
This runs Postgres, Auth, and Storage locally.

4. Copy environment variables
```bash
cp .env.example .env.local
```
Then, add the values printed by Supabase (usually `SUPABASE_URL` and `SUPABASE_ANON_KEY`).

5. Run the app
```bash
npm run dev
```

6. (Optional) Create a test user
You can sign up manually via the app’s sign-up screen or through Supabase Studio → Auth → “Add User”.

### 🧪 Useful Commands

| Command              | Description                    |
| -------------------- | ------------------------------ |
| `npx supabase start` | Start local Supabase stack     |
| `npx supabase stop`  | Stop local Supabase stack      |
| `npm run dev`        | Run the Next.js frontend       |
| `npm run test`       | Run basic tests (if available) |

### 🧰 Troubleshooting

- Port already in use? → Run npx supabase stop and try again.

- Env variables not loading? → Ensure you copied .env.example to .env.local.

- Supabase connection errors? → Check your SUPABASE_URL and SUPABASE_ANON_KEY values.

### 🔐 .env.example

```env
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

---

## 🗂️ Supabase Schema (Concise Reference)  
```sql
users(id uuid pk, email text, campus_id text, goals_json jsonb, consent_accepted_at timestamptz)
modules(id serial pk, title text, description text, order int)
lessons(id serial pk, module_id int fk, title text, order int, content_json jsonb)
progress(user_id uuid fk, lesson_id int fk, status text, xp_earned int, updated_at timestamptz)
check_ins(id serial pk, user_id uuid fk, mood int, stress int, energy int, note text, created_at timestamptz)
assessments(id serial pk, user_id uuid fk, type text, answers_json jsonb, score int, created_at timestamptz)
resources(id serial pk, campus_id text, name text, type text, contact text, url text, hours_json jsonb, tags text[])
events(id serial pk, user_id uuid fk, event_type text, event_props_json jsonb, created_at timestamptz)
ai_interactions(id serial pk, user_id uuid fk, message text, assistant_reply text, flagged_crisis_bool bool, created_at timestamptz)
```

## 🤝 Team
CareCampus - a multidisciplinary team of students passionate about mental wellness, accessibility, and ethical AI.

## ⚠️ Disclaimer
This app is designed for education and awareness only.

It is not a substitute for therapy or counseling.

If you or someone you know is in crisis, please reach out to your local helpline or campus mental health services immediately.

## 💡 Future Directions

- AI reflection summaries and streak rewards

- Adaptive lesson recommendations

- Mood visualization dashboard

- Offline sync & caching

- Voice-based check-ins
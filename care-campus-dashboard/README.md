
# Next.js with Supabase Integration

This is a **Next.js** project bootstrapped with `create-next-app`, enhanced with **Supabase** for authentication, database, and real-time features.

---

## Table of Contents

- [Getting Started](#getting-started)  
- [Environment Variables](#environment-variables)  
- [Run the Development Server](#run-the-development-server)  
- [Key Features](#key-features)  
- [Usage Examples](#usage-examples)  
- [Development Scripts](#development-scripts)  
- [Project Structure](#project-structure)  
- [Learn More](#learn-more)  
- [Deployment](#deployment)  
- [Contributing](#contributing)  
- [License](#license)  

---

## Getting Started

Clone the repository and install dependencies:

```bash
git clone <your-repo-url>
cd <project-name>
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

---

## Environment Variables

Create a `.env.local` file in the root directory and add your Supabase credentials. Get these from your Supabase project dashboard:

```makefile
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

⚠️ **Important:** Never commit `.env.local` or real secrets to Git. A `.env.example` file is provided as a template—copy it to `.env.local` and fill in your values.

---

## Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

---

## Key Features

- **Next.js App Router:** Modern routing and server-side rendering.  
- **Supabase Integration:**  
  - Authentication (sign up, sign in, sign out via email/password or OAuth providers).  
  - PostgreSQL Database with ORM-like queries.  
  - Real-time subscriptions to database changes.  
  - Storage support for file uploads and management (if enabled).  
- **TypeScript Support:** Full type safety for components, pages, and Supabase queries.  
- **Tailwind CSS:** Pre-configured for styling (if added during setup).  
- **Optimized Fonts:** Using `next/font` to load and optimize Geist.

---

## Usage Examples

Supabase client initialization is in `lib/supabase.ts` (or similar):

```ts
import { createClient } from '@/lib/supabase'

const supabase = createClient()

// Example: Fetch user data
const { data: { user } } = await supabase.auth.getUser()
```

Check `supabase/migrations/` for database schema and seed data.

---

## Development Scripts

| Command                  | Description                          |
|---------------------------|--------------------------------------|
| `npm run dev`             | Start development server             |
| `npm run build`           | Build for production                 |
| `npm run start`           | Run the built app                    |
| `npm run lint`            | Run ESLint for code quality          |

Replace `npm` with `yarn`, `pnpm`, or `bun` depending on your package manager.

---

## Project Structure

```
app/          - Next.js App Router pages and layouts
components/   - Reusable UI components
lib/          - Utilities, including Supabase client
supabase/     - Supabase CLI config, migrations, functions (if using edge functions)
public/       - Static assets
```

---

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.  
- [Learn Next.js](https://nextjs.org/learn) - An interactive Next.js tutorial.  
- [Next.js GitHub](https://github.com/vercel/next.js) - Contributions welcome!  
- [Supabase with Next.js Guide](https://supabase.com/docs/guides/with-nextjs)

---

## Deployment

### Deploy on Vercel

The easiest way to deploy your Next.js app is using the **Vercel Platform** from the creators of Next.js.

1. Add your environment variables (`NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`) in Vercel's dashboard under project settings.  
2. Ensure your Supabase project allows connections from Vercel's domain (update CORS in Supabase settings).  
3. For production, enable Supabase Row Level Security (RLS) policies.  
4. Follow [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

---

## Contributing

1. Fork the repo and create a feature branch:

```bash
git checkout -b feat/your-feature
```

2. Commit your changes:

```bash
git commit -m "Add your feature"
```

3. Push to the branch:

```bash
git push origin feat/your-feature
```

4. Open a Pull Request on GitHub.  

See `CONTRIBUTING.md` for more details (create one if it doesn’t exist).

---

## License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

# Mermaid Charting App

This is a **MermaidJS editor tool** built with [Next.js](https://nextjs.org). It integrates **Clerk** for authentication and **Supabase** for user-specific chart management.

## Features

- **MermaidJS Editor**: Create and render diagrams using Mermaid syntax.
- **Authentication**: Secure user authentication powered by [Clerk](https://clerk.dev).
- **Database Integration**: Save and retrieve user-specific charts using [Supabase](https://supabase.com).

## How It Works

1. **Authentication with Clerk**:
   - Users can sign in or sign up using Clerk.
   - Once authenticated, user sessions are managed seamlessly.

2. **Chart Management with Supabase**:
   - Authenticated users can save their Mermaid charts to a Supabase database.
   - Charts are fetched and displayed for the logged-in user.

3. **MermaidJS Rendering**:
   - The app uses the Mermaid library to parse and render diagrams in real-time.

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- Supabase project with the required database table (`charts`).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/mermaid-charting-app.git
   cd mermaid-charting-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Add your **Clerk** and **Supabase** keys in `.env.local`:
     ```env
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
     CLERK_SECRET_KEY=your-clerk-secret-key
     NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
     ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

### Core Tools & Libraries

- **Next.js**: Framework for building the app.
- **Clerk**: Authentication and user management.
- **Supabase**: Database for storing user charts.
- **Mermaid.js**: Library for rendering diagrams.
- **ShadCN**: UI components and styling.

### Database Schema

Ensure your Supabase database has the following table:

```sql
CREATE TABLE charts (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## License

This project is licensed under the MIT License.
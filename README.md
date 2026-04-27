# SoleDrop

SoleDrop is a full-stack Next.js application where authenticated users can list,
browse, filter, and manage sneaker drops.

## Key Features

- **Advanced Auth**: Firebase integration with secure JWT-based session management.
- **Item Management**: Full CRUD lifecycle for drops (Create, Read, Update, Delete).
- **Admin Dashboard**: Role-based access control for user management and promotion.
- **Smart Search**: High-performance fuzzy search across titles, brands, and categories.
- **Resilient Data**: Global database retry mechanism for high availability.
- **Premium UX**: Dynamic hero animations, adaptive skeleton loaders, and curated design systems.
- **Image Handling**: Optimized media delivery via Cloudinary.
- **Performance**: Edge-ready rate limiting and modern App Router architecture.
- **Workflow**: Automated code quality with Husky pre-commit hooks and lint-staged.

## Tech Stack

| Layer          | Technology                    |
| -------------- | ----------------------------- |
| **Framework**  | Next.js 16 (App Router)       |
| **Auth**       | Firebase + JWT Sessions       |
| **Database**   | Neon PostgreSQL               |
| **ORM**        | Drizzle ORM (with retries)    |
| **Styling**    | Tailwind CSS v4 + shadcn/ui   |
| **Animations** | Framer Motion                 |
| **Search**     | Fuse.js                       |
| **Storage**    | Cloudinary                    |
| **Middleware** | Upstash Redis (Rate Limiting) |

## Setup

### Prerequisites

- Node.js 18+
- Firebase project with Email/Password and Google providers enabled
- NeonDB database
- Cloudinary account
- Upstash Redis database

### Installation

1. Clone and install dependencies:

```bash
git clone https://github.com/yourusername/soledrop.git
cd soledrop
npm install
```

2. Create local environment file:

```bash
cp .env.sample .env.local
```

3. Fill all environment variables in `.env.local`.

4. Push database schema:

```bash
npm run db:migrate
```

5. Run development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Folder Architecture

The project follows a modular, feature-based architecture for scalability and maintainability.

```text
├── app/                 # Next.js App Router (Pages, Layouts, APIs)
│   ├── (auth)/          # Authentication routes (Login, Register)
│   ├── (root)/          # Main application routes (Marketplace, Admin)
│   └── api/             # Backend API endpoints
├── features/            # Feature-specific logic & components
│   ├── items/           # Item management, cards, filters, and hooks
│   ├── auth/            # Auth-specific UI and logic
│   └── ui/              # Global UI sections (Hero, Navigation)
├── components/          # Reusable shared UI components
│   └── shared/          # Generic visual components (Skeletons, Cards)
├── shared/              # Application-wide utilities and design system
│   ├── ui-components/   # Base UI primitive components (Buttons, Inputs)
│   ├── hooks/           # Global React hooks
│   ├── libs/            # Shared third-party configurations
│   └── utils/           # Helper functions and styling configurations
├── lib/                 # Core infrastructure and service integrations
│   ├── db/              # Database schema and Drizzle client
│   ├── auth/            # Session management and server-side auth
│   ├── firebase/        # Firebase Admin/Client initialization
│   └── validations/     # Zod schema definitions
├── public/              # Static assets (Images, Icons)
└── drizzle/             # Database migration files
```

## Route Summary

| Route                  | Type      | Description                           |
| ---------------------- | --------- | ------------------------------------- |
| `/`                    | Public    | Immersive Landing Page                |
| `/items`               | Public    | Item Marketplace with Smart Filters   |
| `/items/[id]`          | Public    | Product Details + Related Drops       |
| `/login` / `/register` | Public    | Authentication flow                   |
| `/items/add`           | Protected | Publish a new drop                    |
| `/items/manage`        | Protected | User's personal collection management |
| `/items/manage/[id]`   | Protected | Edit existing drop details            |
| `/admin/users`         | Admin     | Global User Management Console        |
| `/api/items`           | API       | Item collection operations            |
| `/api/upload`          | API       | Secure media ingestion                |

## Admin Utilities

Manage users directly from the CLI:

```bash
npx tsx promote-user.ts --email user@example.com
```

## Scripts

```bash
npm run dev        # start dev server
npm run build      # production build
npm run lint       # run ESLint
npm run db:push    # sync schema logic with DB
npm run db:studio  # interactive DB explorer
```

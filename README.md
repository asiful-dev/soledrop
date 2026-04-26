# SoleDrop

SoleDrop is a full-stack Next.js application where authenticated users can list,
browse, filter, and manage sneaker drops.

## Key Features

- Firebase authentication (Email/Password and Google Sign-In)
- Protected routes via Next.js proxy
- Fuzzy search with Fuse.js across title, brand, category, and description
- Category filtering and sorting by date, price, and rating
- Cloudinary image upload support
- NeonDB (Postgres) with Drizzle ORM
- Zod validation and React Hook Form integration
- shadcn/ui component system with Tailwind CSS
- Rate limiting with Upstash Redis

## Tech Stack

| Layer         | Technology                  |
| ------------- | --------------------------- |
| Framework     | Next.js 16 (App Router)     |
| Language      | TypeScript                  |
| Styling       | Tailwind CSS v4 + shadcn/ui |
| Auth          | Firebase                    |
| Database      | NeonDB (Postgres)           |
| ORM           | Drizzle ORM                 |
| Storage       | Cloudinary                  |
| Rate Limiting | Upstash Redis               |
| Animations    | Framer Motion               |
| Search        | Fuse.js                     |
| Validation    | Zod + React Hook Form       |

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

## Route Summary

| Route             | Type      | Description                           |
| ----------------- | --------- | ------------------------------------- |
| `/`               | Public    | Landing page                          |
| `/about`          | Public    | About page                            |
| `/items`          | Public    | Item listing with filters and sorting |
| `/items/[id]`     | Public    | Item details and related items        |
| `/login`          | Public    | Login page                            |
| `/register`       | Public    | Register page                         |
| `/items/add`      | Protected | Add item form                         |
| `/items/manage`   | Protected | Manage current user's items           |
| `/api/items`      | API       | Get items, create item                |
| `/api/items/[id]` | API       | Get item by id, delete item           |
| `/api/upload`     | API       | Upload image to Cloudinary            |
| `/api/session`    | API       | Set/clear session cookie              |

## Scripts

```bash
npm run dev        # start dev server
npm run lint       # run ESLint
npm run build      # production build
npm run db:migrate # run drizzle migration
```

## Deployment

Deploy with Vercel:

```bash
npm i -g vercel
vercel
```

After deployment:

1. Add all environment variables in Vercel project settings.
2. Add your production domain to Firebase authorized domains.

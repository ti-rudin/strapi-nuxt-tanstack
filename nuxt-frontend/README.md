# Nuxt + Strapi Blog Application

Blog application with email authentication integrated with Strapi CMS.

## Setup

### 1. Install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

### 2. Environment Variables

Create a `.env` file in the root directory:

```env
NUXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

Update this URL if your Strapi backend is running on a different port.

### 3. Make sure Strapi backend is running

The application requires a Strapi backend running on port 1337 (or the port specified in your `.env` file).

## Features

- ✅ Email-based registration and login
- ✅ Protected user session management
- ✅ Responsive article listing
- ✅ Dark mode support

## Authentication

- **Login**: Navigate to `/login` or click the "Войти" button in the header
- **Register**: Navigate to `/register` to create a new account
- **Logout**: Click the "Выйти" button when logged in

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

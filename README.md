# CodeLeap Network

A social feed application built with React, TypeScript, and Vite as part of the CodeLeap Engineering Test.

## Features

- **Sign in** — Enter a username to access the feed (persisted in localStorage)
- **Create posts** — Write a title and content to publish a new post
- **Edit posts** — Update your own posts via an inline modal
- **Delete posts** — Remove your own posts with a confirmation modal
- **Like posts** — Toggle likes on any post (persisted in localStorage)
- **Search** — Filter posts by username, title, or content in real time
- **Sort** — Switch between newest-first and oldest-first ordering
- **Infinite scroll** — Automatically loads more posts as you scroll down

## Tech Stack

| Layer      | Technology                                               |
| ---------- | -------------------------------------------------------- |
| Framework  | React 19                                                 |
| Language   | TypeScript                                               |
| Build tool | Vite 7                                                   |
| Styling    | CSS (custom properties) + Tailwind CSS v4                |
| Icons      | Lucide React                                             |
| API        | [CodeLeap REST API](https://dev.codeleap.co.uk/careers/) |

## Project Structure

```
src/
├── components/
│   ├── features/
│   │   ├── Feed/          # AppHeader, CreatePost, FilterBar, PostCard, PostList
│   │   ├── Modals/        # DeleteModal, EditModal
│   │   └── SignIn/        # SignIn form
│   └── ui/                # Reusable — Avatar, FieldInput, Modal, Spinner
├── hooks/
│   ├── useAuth.ts         # Login / logout state
│   ├── useLikes.ts        # Like toggle with localStorage persistence
│   ├── usePostFilters.ts  # Search and sort logic
│   └── usePosts.ts        # API integration + infinite scroll
├── lib/
│   ├── api.ts             # Fetch wrappers for the CodeLeap API
│   └── utils.ts           # timeAgo, avatarColor, localStorage helpers
├── pages/
│   ├── MainPage.tsx       # Main feed page
│   └── SignInPage.tsx     # Sign-in page
├── styles/
│   └── globals.css        # Global styles and design tokens
└── types/
    └── index.ts           # Shared TypeScript types
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install dependencies

```bash
npm install
```

### Run in development mode

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
```

Output is generated in the `dist/` folder.

### Preview the production build

```bash
npm run preview
```

## API

All data is fetched from the public CodeLeap API:

```
https://dev.codeleap.co.uk/careers/
```

Supports `GET`, `POST`, `PATCH`, and `DELETE` operations. No authentication required.

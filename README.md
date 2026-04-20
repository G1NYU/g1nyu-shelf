# G1NYU Shelf

A neo-otaku personal media shelf for manga, manhwa, music, and books.

## Stack
- Next.js 14
- Tailwind CSS
- Framer Motion
- AniList GraphQL API
- Last.fm API
- Open Library API

## Features in V2
- Cinematic hero with rotating spotlight
- View mode toggles for poster wall and spotlight layout
- Genre/tag chips and section filtering
- Sticky media detail panel with descriptions and links
- Mobile-friendly glassmorphism layout
- Dynamic bookshelf source via Open Library seeds

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local`:
```bash
LASTFM_API_KEY=your_lastfm_api_key
ANILIST_USERNAME=your_anilist_username
LASTFM_USERNAME=your_lastfm_username
OPENLIBRARY_BOOKS=9780811204816,9781400079273,9780802128251
NEXT_PUBLIC_SITE_NAME=G1NYU Shelf
```

3. Run locally:
```bash
npm run dev
```

## Notes
- AniList powers manga/manhwa.
- Last.fm powers albums/artists.
- Books use Open Library cover + works search, seeded by ISBN list.
- Deploy on Vercel and set the same environment variables there.

# Riyad-us-Salihin — رياض الصالحين

A minimal, installable web app for reading **Riyad-us-Salihin** (Gardens of the Righteous), the classical hadith collection compiled by Imam an-Nawawi (رَحِمَهُ اللهُ). One hadith at a time, with Arabic, English translation, and commentary.

The English translation and commentary are sourced from **Muslims At Work Publications** (South Africa), 3-volume edition under General Editor Moulana Afzal Ismail.

## Features

- **1,896 hadiths** across 372 chapters / 19 books
- Arabic text + English translation + commentary
- Quranic intro verses at the start of each chapter
- **Full-text search** across narrators, text, and commentary
- **3-slot reading progress** — auto-saves your position to `localStorage`; create new slots when you jump elsewhere
- **Keyboard navigation** (← / →)
- **PWA** — installable, works offline
- Dark, glass-morphism UI

## Stack

- **SvelteKit 2** + **Svelte 5** (runes)
- **Tailwind CSS v4**
- **Vite** + **vite-plugin-pwa** (Workbox)
- **Vercel** for hosting

## Development

```sh
bun install
bun run dev
```

Build a production bundle:

```sh
bun run build
bun run preview
```

## Routes

- `/` — hadith reader with search and bookmarks
- `/about` — info on the book, author, translation source

## Credits

- **Imam an-Nawawi** (631–676 AH / 1233–1277 CE) — original compiler
- **Muslims At Work Publications** ([matwork.co.za](https://www.matwork.co.za)) — English translation & commentary
- Darussalam Publishers / Hafiz Salahuddin Yusuf — inspiration for this project

> This is a free resource for the Muslim community. All praise is due to Allah, Lord of the worlds.

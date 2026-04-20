'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ShelfSection from '@/components/ShelfSection';
import SpotlightPanel from '@/components/SpotlightPanel';
import FilterBar from '@/components/FilterBar';

function collectTags(groups) {
  const set = new Set();
  groups.flat().forEach((item) => {
    (item.tags || item.genres || []).forEach((tag) => set.add(tag));
  });
  return [...set].filter(Boolean).slice(0, 18);
}

function filterItems(items, tag) {
  if (tag === 'all') return items;
  return items.filter((item) => (item.tags || item.genres || []).includes(tag));
}

export default function ClientHome({ manga, manhwa, artists, albums, recent, books }) {
  const allBackdrop = useMemo(() => {
    return [
      ...manga.map((x) => x.banner || x.image),
      ...manhwa.map((x) => x.banner || x.image),
      ...albums.map((x) => x.image),
      ...recent.map((x) => x.image),
      ...books.map((x) => x.image),
    ].filter(Boolean);
  }, [manga, manhwa, albums, recent, books]);

  const initialSpotlight = manga[0] || manhwa[0] || albums[0] || books[0] || null;
  const [backdrop, setBackdrop] = useState(initialSpotlight?.banner || initialSpotlight?.image || allBackdrop[0] || '');
  const [selected, setSelected] = useState(initialSpotlight);
  const [activeTag, setActiveTag] = useState('all');
  const [mode, setMode] = useState('spotlight');

  const tags = useMemo(() => collectTags([manga, manhwa, artists, albums, books]), [manga, manhwa, artists, albums, books]);

  const filtered = {
    manhwa: filterItems(manhwa, activeTag),
    manga: filterItems(manga, activeTag),
    albums: filterItems(albums, activeTag),
    artists: filterItems(artists, activeTag),
    recent: filterItems(recent, activeTag),
    books: filterItems(books, activeTag),
  };

  function handleSelect(item) {
    setSelected(item);
    setBackdrop(item.banner || item.image || '');
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <AnimatePresence mode="wait">
        {backdrop && (
          <motion.div
            key={backdrop}
            className="pointer-events-none fixed inset-0 -z-20 bg-cover bg-center"
            style={{ backgroundImage: `url(${backdrop})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        )}
      </AnimatePresence>

      <div className="pointer-events-none fixed inset-0 -z-10 bg-black/75 backdrop-blur-[28px]" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-grid bg-[size:42px_42px] opacity-30" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(139,92,246,0.25),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.18),transparent_30%)]" />

      <section className="mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-6 pb-12 pt-28 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.45em] text-cyan/80">Neo-otaku archive</p>
          <h1 className="text-gradient text-5xl font-black tracking-tight md:text-7xl">
            {process.env.NEXT_PUBLIC_SITE_NAME || 'G1NYU Shelf'}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/75 md:text-lg">
            A future-facing media shrine for manga, manhwa, books, and music — cinematic, obsessive, and unapologetically nerdy.
          </p>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-8 md:px-10">
        <FilterBar tags={tags} activeTag={activeTag} setActiveTag={setActiveTag} mode={mode} setMode={setMode} />
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 pb-24 md:grid-cols-[minmax(0,1fr)_340px] md:px-10">
        <div className="space-y-16">
          <ShelfSection title="Manhwa" items={filtered.manhwa} setBackdrop={setBackdrop} onSelect={handleSelect} mode={mode} />
          <ShelfSection title="Manga" items={filtered.manga} setBackdrop={setBackdrop} onSelect={handleSelect} mode={mode} />
          <ShelfSection title="Top Albums" items={filtered.albums} setBackdrop={setBackdrop} onSelect={handleSelect} mode={mode} />
          <ShelfSection title="Top Artists" items={filtered.artists} setBackdrop={setBackdrop} onSelect={handleSelect} mode={mode} />
          <ShelfSection title="Recent Tracks" items={filtered.recent} setBackdrop={setBackdrop} onSelect={handleSelect} mode={mode} />
          <ShelfSection title="Books" items={filtered.books} setBackdrop={setBackdrop} onSelect={handleSelect} mode={mode} />
        </div>

        <div className="hidden md:block">
          <SpotlightPanel item={selected} />
        </div>
      </section>
    </main>
  );
}

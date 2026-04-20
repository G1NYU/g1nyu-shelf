'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ShelfSection from '@/components/ShelfSection';

export default function ClientHome({ manga, manhwa, artists, albums, books }) {
  const pool = useMemo(() => {
    return [
      ...manga.map((x) => x.banner || x.image).filter(Boolean),
      ...manhwa.map((x) => x.banner || x.image).filter(Boolean),
      ...albums.map((x) => x.image).filter(Boolean),
      ...books.map((x) => x.image).filter(Boolean),
    ];
  }, [manga, manhwa, albums, books]);

  const [backdrop, setBackdrop] = useState(pool[0] || '');

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

      <div className="pointer-events-none fixed inset-0 -z-10 bg-black/70 backdrop-blur-[24px]" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-grid bg-[size:42px_42px] opacity-30" />

      <section className="mx-auto flex min-h-screen max-w-7xl flex-col justify-end px-6 pb-12 pt-28 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <p className="mb-4 text-sm uppercase tracking-[0.45em] text-cyan/80">Neo-otaku archive</p>
          <h1 className="text-gradient text-5xl font-black tracking-tight md:text-7xl">
            G1NYU Shelf
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-white/75 md:text-lg">
            A cinematic archive of manga, manhwa, books, and soundtracks — built like a future museum for obsession.
          </p>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl space-y-16 px-6 pb-24 md:px-10">
        <ShelfSection title="Manhwa" items={manhwa} setBackdrop={setBackdrop} />
        <ShelfSection title="Manga" items={manga} setBackdrop={setBackdrop} />
        <ShelfSection title="Top Albums" items={albums} setBackdrop={setBackdrop} />
        <ShelfSection title="Top Artists" items={artists} setBackdrop={setBackdrop} />
        <ShelfSection title="Books" items={books} setBackdrop={setBackdrop} />
      </section>
    </main>
  );
}

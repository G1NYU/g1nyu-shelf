'use client';

import { motion } from 'framer-motion';

export default function FilterBar({ tags, activeTag, setActiveTag, mode, setMode }) {
  return (
    <div className="glass flex flex-col gap-4 rounded-[24px] p-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTag('all')}
          className={`rounded-full px-4 py-2 text-sm ${activeTag === 'all' ? 'bg-white text-black' : 'bg-white/5 text-white/70'}`}
        >
          All
        </button>
        {tags.map((tag) => (
          <motion.button
            whileTap={{ scale: 0.97 }}
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`rounded-full px-4 py-2 text-sm ${activeTag === tag ? 'bg-white text-black' : 'bg-white/5 text-white/70'}`}
          >
            {tag}
          </motion.button>
        ))}
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => setMode('poster')}
          className={`rounded-full px-4 py-2 text-sm ${mode === 'poster' ? 'bg-accent text-white' : 'bg-white/5 text-white/70'}`}
        >
          Poster wall
        </button>
        <button
          onClick={() => setMode('spotlight')}
          className={`rounded-full px-4 py-2 text-sm ${mode === 'spotlight' ? 'bg-accent text-white' : 'bg-white/5 text-white/70'}`}
        >
          Spotlight
        </button>
      </div>
    </div>
  );
}

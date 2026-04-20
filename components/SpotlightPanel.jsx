'use client';

import { ExternalLink, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SpotlightPanel({ item }) {
  if (!item) return null;

  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass sticky top-6 h-fit rounded-[28px] p-5 shadow-glow"
    >
      <p className="text-xs uppercase tracking-[0.35em] text-cyan/80">spotlight</p>
      <h3 className="mt-3 text-2xl font-bold">{item.title}</h3>
      <p className="mt-2 text-sm text-white/70">{item.subtitle}</p>

      {item.score ? (
        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/80">
          <Star size={14} className="text-yellow-300" />
          <span>{item.score}</span>
        </div>
      ) : null}

      {item.description ? (
        <p className="mt-4 line-clamp-6 text-sm leading-6 text-white/75">{item.description}</p>
      ) : null}

      {item.tags?.length ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75">
              {tag}
            </span>
          ))}
        </div>
      ) : null}

      <a
        href={item.link}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition hover:opacity-90"
      >
        Open source page <ExternalLink size={15} />
      </a>
    </motion.aside>
  );
}

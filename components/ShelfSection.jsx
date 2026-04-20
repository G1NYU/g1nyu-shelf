'use client';

import { motion } from 'framer-motion';
import MediaCard from './MediaCard';

export default function ShelfSection({ title, items, setBackdrop, onSelect, mode = 'poster' }) {
  if (!items?.length) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-cyan/80">curated</p>
          <h2 className="text-2xl font-semibold md:text-3xl">{title}</h2>
        </div>
        <p className="text-sm text-white/50">{items.length} entries</p>
      </div>

      <motion.div
        className="flex gap-4 overflow-x-auto pb-2"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        {items.map((item) => (
          <MediaCard
            key={`${title}-${item.title}`}
            item={item}
            onHover={setBackdrop}
            onSelect={onSelect}
            mode={mode}
          />
        ))}
      </motion.div>
    </section>
  );
}

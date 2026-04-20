'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function MediaCard({ item, onHover, onSelect, mode = 'poster' }) {
  return (
    <motion.button
      type="button"
      onMouseEnter={() => onHover?.(item.banner || item.image)}
      onFocus={() => onHover?.(item.banner || item.image)}
      onClick={() => onSelect?.(item)}
      className={`group glass relative overflow-hidden rounded-[24px] text-left ${mode === 'spotlight' ? 'min-w-[280px] max-w-[280px]' : 'min-w-[180px] max-w-[180px]'}`}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <div className={`relative w-full overflow-hidden ${mode === 'spotlight' ? 'h-[340px]' : 'h-[260px]'}`}>
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full bg-white/10" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="line-clamp-2 text-sm font-semibold md:text-base">{item.title}</h3>
        <p className="mt-1 line-clamp-1 text-xs text-white/70 md:text-sm">{item.subtitle}</p>
      </div>
    </motion.button>
  );
}

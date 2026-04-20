'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function MediaCard({ item, onHover }) {
  return (
    <motion.a
      href={item.link}
      target="_blank"
      rel="noreferrer"
      onHoverStart={() => onHover?.(item.banner || item.image)}
      className="group glass relative min-w-[180px] max-w-[180px] overflow-hidden rounded-2xl"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
    >
      <div className="relative h-[260px] w-full overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <h3 className="line-clamp-2 text-sm font-semibold">{item.title}</h3>
        <p className="mt-1 line-clamp-1 text-xs text-white/70">{item.subtitle}</p>
      </div>
    </motion.a>
  );
}

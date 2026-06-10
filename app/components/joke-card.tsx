'use client'

import { motion } from 'motion/react'

interface JokeCardProps {
  joke: string
  index: number
  total: number
  direction: number
  onDragEnd?: (offset: { x: number; y: number }) => void
}

export function JokeCard({ joke, index, total, direction, onDragEnd }: JokeCardProps) {
  return (
    <motion.div
      id={`joke-card-${index}`}
      key={index}
      custom={direction}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.7}
      onDragEnd={(_, info) => onDragEnd?.(info.offset)}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={{
        initial: (dir: number) => ({
          opacity: 0,
          scale: dir === 0 ? 0.95 : 0.98,
          x: dir === 0 ? 0 : dir * 50,
          y: 0
        }),
        animate: { opacity: 1, scale: 1, x: 0, y: 0 },
        exit: (dir: number) => ({
          opacity: 0,
          scale: dir === 0 ? 0.95 : 0.98,
          x: dir === 0 ? 0 : dir * -50,
          y: 0
        })
      }}
      transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
      className="relative flex min-h-[350px] flex-col items-center justify-center rounded-3xl bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] dark:bg-neutral-900 dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] dark:hover:shadow-[0_12px_40px_rgb(0,0,0,0.3)] sm:p-12 md:min-h-[450px] md:p-16 lg:p-20 touch-pan-y cursor-grab active:cursor-grabbing transition-shadow duration-300"
    >
      {/* Quote decoration top-left */}
      <div className="absolute top-8 left-8 opacity-10 dark:opacity-20">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-12 w-12 rotate-180">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8">
        <p id="joke-text" className="max-w-[90%] text-center font-serif text-3xl font-light leading-relaxed tracking-tight text-neutral-800 dark:text-neutral-200 sm:text-4xl md:text-5xl lg:text-6xl select-none animate-fadeIn">
          {joke}
        </p>

        <div className="flex items-center gap-4 opacity-30">
          <div className="h-px w-8 bg-current" />
          <span className="font-mono text-xs tracking-widest uppercase">
            {String(index + 1).padStart(3, '0')} / {String(total).padStart(3, '0')}
          </span>
          <div className="h-px w-8 bg-current" />
        </div>
      </div>

      {/* Quote decoration bottom-right */}
      <div className="absolute bottom-8 right-8 opacity-10 dark:opacity-20">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-12 w-12">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
        </svg>
      </div>
    </motion.div>
  )
}

'use client'

import { motion } from 'motion/react'
import { Quote } from 'lucide-react'

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
      transition={{ duration: 0.25 }}
      className="relative flex min-h-[350px] flex-col items-center justify-center rounded-3xl bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:bg-neutral-900 dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] sm:p-12 md:min-h-[450px] md:p-16 lg:p-20 touch-pan-y cursor-grab active:cursor-grabbing"
    >
      <div className="absolute top-8 left-8 opacity-10 dark:opacity-20">
        <Quote className="h-12 w-12 rotate-180 fill-current" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8">
        <p id="joke-text" className="max-w-[90%] text-center font-serif text-3xl font-light leading-snug tracking-tight text-neutral-800 dark:text-neutral-200 sm:text-4xl md:text-5xl lg:text-6xl select-none">
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

      <div className="absolute bottom-8 right-8 opacity-10 dark:opacity-20">
        <Quote className="h-12 w-12 fill-current" />
      </div>
    </motion.div>
  )
}

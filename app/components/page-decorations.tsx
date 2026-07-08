// app/components/page-decorations.tsx v6.2.0

import React from 'react'

export const LogoIcon = React.memo(function LogoIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M12 2l2.39 5.37L20 8l-4.2 3.73L17.5 18l-5.5-3.27L6.5 18 17.18 8 12 2z" />
    </svg>
  )
})

export const SkeletonCard = React.memo(function SkeletonCard() {
  return (
    <div
      aria-hidden="true"
      className="flex min-h-[360px] flex-col justify-center rounded-3xl bg-card p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.20)] md:min-h-[480px] md:p-12"
    >
      <div className="h-12 w-3/4 animate-pulse self-center rounded-xl bg-muted dark:bg-neutral-800" />
    </div>
  )
})

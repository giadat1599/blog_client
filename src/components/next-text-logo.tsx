import { cn } from '@/lib/utils'

interface NextTextLogoProps {
  className?: string
}

export default function NextTextLogo({ className }: NextTextLogoProps) {
  return (
    <span
      className={cn(
        'text-2xl font-extrabold bg-gradient-to-r from-primary to-primary/40 bg-clip-text text-transparent',
        className
      )}
    >
      NEXT
    </span>
  )
}

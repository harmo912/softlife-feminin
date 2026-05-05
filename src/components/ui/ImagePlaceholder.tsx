// src/components/ui/ImagePlaceholder.tsx
interface Props {
  label?: string
  className?: string
  dark?: boolean
}

export function ImagePlaceholder({ label = 'Photo à venir', className = '', dark = false }: Props) {
  return (
    <div className={`w-full h-full flex flex-col items-center justify-center gap-3 ${className}`}>
      <i className={`bi bi-image text-6xl ${dark ? 'text-white/20' : 'text-rose/20'}`} />
      <span className={`text-xs tracking-wide ${dark ? 'text-white/30' : 'text-gris'}`}>{label}</span>
    </div>
  )
}

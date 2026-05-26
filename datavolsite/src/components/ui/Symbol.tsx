interface SymbolProps {
  variant?: 'principal' | 'azul' | 'dark' | 'lime' | 'light' | 'outline'
  size?: number
  className?: string
}

const configs = {
  principal: { bg: '#3B5A67', arrow: '#F2EDE0', radius: 16 },
  azul:      { bg: '#3B5A67', arrow: '#F2EDE0', radius: 16 },
  dark:      { bg: '#111111', arrow: '#F2EDE0', radius: 16 },
  lime:      { bg: '#111111', arrow: '#C6FF4D', radius: 16 },
  light:     { bg: '#F2EDE0', arrow: '#111111', radius: 16 },
  outline:   { bg: 'transparent', arrow: '#3B5A67', stroke: '#3B5A67', radius: 16 },
}

export default function Symbol({ variant = 'principal', size = 40, className = '' }: SymbolProps) {
  const c = configs[variant]
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      aria-label="DATA.VOL"
      role="img"
      style={{ display: 'block' }}
    >
      {variant === 'outline' ? (
        <rect x="6" y="6" width="88" height="88" rx={c.radius} fill="none" stroke={c.stroke} strokeWidth="4" />
      ) : (
        <rect x="5" y="5" width="90" height="90" rx={c.radius} fill={c.bg} />
      )}
      {/* L-stub + V + diagonal (brandbook exact) */}
      <path d="M12 50 L36 50 L56 84 L82 22" stroke={c.arrow} strokeWidth="14" strokeLinejoin="miter" strokeLinecap="butt" fill="none" />
      {/* Bold arrowhead pointing up-right */}
      <polygon points="94,8 70,16 84,32" fill={c.arrow} />
    </svg>
  )
}

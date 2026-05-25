interface SymbolProps {
  variant?: 'principal' | 'dark' | 'lime' | 'light' | 'outline'
  size?: number
  className?: string
}

const configs = {
  principal: { bg: '#3B5A67', arrow: '#F2EDE0' },
  dark:      { bg: '#111111', arrow: '#F2EDE0' },
  lime:      { bg: '#111111', arrow: '#C6FF4D' },
  light:     { bg: '#F2EDE0', arrow: '#111111' },
  outline:   { bg: 'transparent', arrow: '#3B5A67', stroke: '#3B5A67' },
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
    >
      {variant === 'outline' ? (
        <rect x="5" y="5" width="90" height="90" rx="16" fill="none" stroke={c.stroke} strokeWidth="4" />
      ) : (
        <rect x="5" y="5" width="90" height="90" rx="16" fill={c.bg} />
      )}
      <path
        d="M26 46 L43 66 L64 36"
        fill="none"
        stroke={c.arrow}
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M73 23 L73 38 L59 28 Z" fill={c.arrow} />
    </svg>
  )
}

import Link from 'next/link'
import Symbol from '@/components/ui/Symbol'

interface LockupProps {
  size?: number
  fontSize?: number
  dot?: 'lime' | 'azul'
  href?: string
}

export default function Lockup({ size = 30, fontSize = 26, dot = 'lime', href = '/' }: LockupProps) {
  return (
    <Link href={href} className="lockup">
      <Symbol variant={dot === 'lime' ? 'lime' : 'principal'} size={size} />
      <span className="word" style={{ fontSize }}>
        DATA<span className="dot" style={{ color: dot === 'lime' ? 'var(--lime)' : 'var(--azul)' }}>.</span>VOL
      </span>
    </Link>
  )
}

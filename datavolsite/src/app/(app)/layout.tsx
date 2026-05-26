'use client'

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import Lockup from '@/components/layout/Lockup'
import { APP_NAV, TICKER_DATA } from '@/lib/data'

function TickerBar() {
  const items = [...TICKER_DATA, ...TICKER_DATA]
  return (
    <div className="ticker-bar">
      <div className="ticker-track">
        {items.map((t, i) => (
          <span key={i} className="ticker-item">
            <span className="symbol-label">{t.sym}</span>
            <span className="value">{t.v.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}{t.suffix ?? ''}</span>
            {t.d !== 0 && <span className={'delta ' + (t.d > 0 ? 'up' : 'down')}>{t.d > 0 ? '+' : ''}{t.d.toFixed(2)}%</span>}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    document.body.classList.add('app-dark')
    return () => document.body.classList.remove('app-dark')
  }, [])

  const crumbs = (() => {
    for (const group of APP_NAV) {
      const item = group.items.find(it => it.route === pathname)
      if (item) return [group.group, item.label]
    }
    return []
  })()

  return (
    <div className="app-shell">
      <TickerBar />

      <div className="app-header">
        <button
          onClick={() => setSidebarOpen(o => !o)}
          aria-label="Menu"
          className="mobile-toggle-btn"
          style={{ display: 'none' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M3 7h18 M3 12h18 M3 17h18" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </button>
        <Lockup size={28} fontSize={22} dot="lime" />
        <div className="crumb" style={{ marginLeft: 8 }}>
          {crumbs.map((c, i) => (
            <span key={i}>
              <span className="sep">/</span>
              <span className={i === crumbs.length - 1 ? 'current' : ''}>{c}</span>
            </span>
          ))}
        </div>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 14 }}>
          <span className="label-sm" style={{ color: 'var(--cinza)' }}>25 mai 2026 · 14:42 BRT</span>
          <Link href="/" className="btn btn-quiet btn-sm" style={{ color: 'var(--cinza)', borderColor: 'var(--rule-dark-strong)' }}>Sair</Link>
        </div>
        <style>{`@media (max-width: 980px) { .mobile-toggle-btn { display: flex !important; align-items: center; justify-content: center; width: 36px; height: 36px; color: var(--off); } }`}</style>
      </div>

      <div className="app-body">
        <aside className={'sidebar' + (sidebarOpen ? ' open' : '')}>
          {APP_NAV.map((group, gi) => (
            <div key={gi} className="sidebar-section">
              <h6>{group.group}</h6>
              {group.items.map(item => (
                <Link
                  key={item.route}
                  href={item.route}
                  className={'sidebar-item' + (pathname === item.route ? ' active' : '')}
                  onClick={() => setSidebarOpen(false)}
                >
                  {item.label}
                  {item.beta && <span className="badge" style={{ background: 'rgba(246,183,60,.15)', color: 'var(--warn)' }}>BETA</span>}
                  {item.soon && <span className="badge" style={{ background: 'rgba(166,166,166,.12)', color: 'var(--cinza)' }}>EM BREVE</span>}
                </Link>
              ))}
            </div>
          ))}
        </aside>

        <main className="app-main">
          {children}
        </main>
      </div>
    </div>
  )
}

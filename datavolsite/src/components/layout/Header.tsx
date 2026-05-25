'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { Menu, X, ChevronDown } from 'lucide-react'
import Symbol from '@/components/ui/Symbol'
import { TOOLS } from '@/lib/tools'

const NAV_SIMPLE = [
  { href: '/',      label: 'Home'  },
  { href: '/basic', label: 'BASIC' },
  { href: '/pro',   label: 'PRO'   },
  { href: '/room',  label: 'Room'  },
]

export default function Header() {
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const [toolsOpen,   setToolsOpen]   = useState(false)
  const toolsRef = useRef<HTMLDivElement>(null)

  /* Close dropdown on outside click */
  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (toolsRef.current && !toolsRef.current.contains(e.target as Node)) {
        setToolsOpen(false)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-50 bg-off/96 backdrop-blur-sm border-b border-[rgba(166,166,166,.28)]">
      <div className="wrap">
        <div className="flex items-center justify-between h-[66px] gap-6">

          {/* ── Logo ── */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0">
            <Symbol size={34} />
            <span className="text-[26px] leading-none tracking-wide"
                  style={{ fontFamily: 'var(--font-display)' }}>
              DATA<span className="text-azul">.</span>VOL
            </span>
          </Link>

          {/* ── Desktop nav ── */}
          <nav className="hidden md:flex items-center gap-1 flex-1">

            {NAV_SIMPLE.map(n => (
              <Link key={n.href} href={n.href}
                className="type-label px-3 py-2 rounded text-grafite hover:text-azul hover:bg-azul/5 transition-colors">
                {n.label}
              </Link>
            ))}

            {/* Ferramentas dropdown */}
            <div ref={toolsRef} className="relative">
              <button
                onClick={() => setToolsOpen(o => !o)}
                className="flex items-center gap-1 type-label px-3 py-2 rounded text-grafite hover:text-azul hover:bg-azul/5 transition-colors"
              >
                Ferramentas
                <ChevronDown size={13}
                  className={`transition-transform duration-200 ${toolsOpen ? 'rotate-180' : ''}`} />
              </button>

              {toolsOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-off border border-[rgba(166,166,166,.35)] rounded-md shadow-lg overflow-hidden">
                  {/* Header do painel */}
                  <div className="px-4 py-3 bg-azul">
                    <p className="type-label text-off">DATA.VOL Tools</p>
                  </div>

                  {/* BASIC tools */}
                  <div className="px-3 py-2">
                    <p className="type-label text-cinza px-1 py-1">BASIC</p>
                    {TOOLS.filter(t => t.category === 'basic').map(t => (
                      <Link key={t.slug} href={`/tools/${t.slug}`}
                        onClick={() => setToolsOpen(false)}
                        className="block px-2 py-2 rounded text-sm text-grafite hover:text-azul hover:bg-azul/5 transition-colors">
                        {t.name}
                      </Link>
                    ))}
                  </div>

                  <div className="border-t border-[rgba(166,166,166,.28)] mx-3" />

                  {/* PRO tools */}
                  <div className="px-3 py-2">
                    <p className="type-label text-cinza px-1 py-1">PRO</p>
                    {TOOLS.filter(t => t.category === 'pro').map(t => (
                      <Link key={t.slug} href={`/tools/${t.slug}`}
                        onClick={() => setToolsOpen(false)}
                        className="block px-2 py-2 rounded text-sm text-grafite hover:text-azul hover:bg-azul/5 transition-colors">
                        {t.name}
                      </Link>
                    ))}
                  </div>

                  <div className="border-t border-[rgba(166,166,166,.28)] px-4 py-3 bg-azul/5">
                    <Link href="/tools" onClick={() => setToolsOpen(false)}
                      className="type-label text-azul hover:underline">
                      Ver todas as ferramentas
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* ── Desktop CTA ── */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            <Link href="/login"
              className="type-label text-azul border border-azul px-4 py-2 rounded hover:bg-azul hover:text-off transition-colors">
              Entrar
            </Link>
          </div>

          {/* ── Mobile toggle ── */}
          <button className="md:hidden p-2 text-grafite" onClick={() => setMobileOpen(o => !o)} aria-label="Menu">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[rgba(166,166,166,.28)] bg-off">
          <div className="wrap py-5 flex flex-col gap-1">
            {NAV_SIMPLE.map(n => (
              <Link key={n.href} href={n.href} onClick={() => setMobileOpen(false)}
                className="type-label px-3 py-3 rounded text-grafite hover:text-azul transition-colors">
                {n.label}
              </Link>
            ))}

            <div className="border-t border-[rgba(166,166,166,.2)] my-2" />
            <p className="type-label text-cinza px-3 py-1">Ferramentas BASIC</p>
            {TOOLS.filter(t => t.category === 'basic').map(t => (
              <Link key={t.slug} href={`/tools/${t.slug}`} onClick={() => setMobileOpen(false)}
                className="px-5 py-2 text-sm text-grafite hover:text-azul transition-colors">
                {t.name}
              </Link>
            ))}
            <p className="type-label text-cinza px-3 py-1 mt-1">Ferramentas PRO</p>
            {TOOLS.filter(t => t.category === 'pro').map(t => (
              <Link key={t.slug} href={`/tools/${t.slug}`} onClick={() => setMobileOpen(false)}
                className="px-5 py-2 text-sm text-grafite hover:text-azul transition-colors">
                {t.name}
              </Link>
            ))}

            <div className="border-t border-[rgba(166,166,166,.2)] my-2" />
            <Link href="/login" onClick={() => setMobileOpen(false)}
              className="type-label text-azul border border-azul px-4 py-3 rounded text-center">
              Entrar
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}

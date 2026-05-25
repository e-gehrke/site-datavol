'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import Symbol from '@/components/ui/Symbol'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const router       = useRouter()
  const searchParams = useSearchParams()
  const next         = searchParams.get('next') ?? '/'

  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })

    if (authError) {
      setError('Email ou senha inválidos.')
      setLoading(false)
      return
    }

    router.push(next)
    router.refresh()
  }

  return (
    <div className="min-h-screen bg-off flex flex-col">

      {/* Top bar */}
      <div className="border-b border-[rgba(166,166,166,.28)] px-8 py-4">
        <Link href="/" className="flex items-center gap-2.5 w-fit">
          <Symbol size={28} />
          <span className="text-[22px] leading-none tracking-wide"
                style={{ fontFamily: 'var(--font-display)' }}>
            DATA<span className="text-azul">.</span>VOL
          </span>
        </Link>
      </div>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-sm">
          <p className="type-label text-azul mb-2">Acesso</p>
          <h1 className="type-h2 mb-8">Entrar</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="type-label text-grafite/60 block mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="seu@email.com"
                className="w-full border border-[rgba(166,166,166,.4)] rounded px-3 py-3 text-sm bg-off focus:outline-none focus:border-azul font-mono"
              />
            </div>
            <div>
              <label className="type-label text-grafite/60 block mb-2">Senha</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full border border-[rgba(166,166,166,.4)] rounded px-3 py-3 text-sm bg-off focus:outline-none focus:border-azul font-mono"
              />
            </div>

            {error && (
              <p className="type-label text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full type-label bg-azul text-off py-3 rounded hover:bg-azul/90 transition-colors disabled:opacity-50">
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <p className="type-label text-grafite/40 mt-8 text-center">
            Acesso por convite. Sem autoregistro.
          </p>
        </div>
      </div>

    </div>
  )
}

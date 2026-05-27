'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import Symbol from '@/components/ui/Symbol'

interface LoginModalProps {
  onClose: () => void
}

export default function LoginModal({ onClose }: LoginModalProps) {
  const router = useRouter()
  const [email, setEmail]     = useState('')
  const [pwd, setPwd]         = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const supabase = createClient()
      const { error: authErr } = await supabase.auth.signInWithPassword({ email, password: pwd })
      if (authErr) {
        setError('Credenciais inválidas.')
        setLoading(false)
        return
      }
      const { data: profile } = await supabase
        .from('profiles').select('role').eq('email', email).single()
      onClose()
      router.refresh()
      router.push(profile?.role === 'admin' ? '/admin' : '/dashboard')
    } catch {
      setError('Erro inesperado. Tente novamente.')
      setLoading(false)
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()}
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', maxWidth: 820 }}
      >
        {/* Left visual */}
        <div style={{
          background: 'var(--black)', color: 'var(--off)',
          padding: '36px 32px', display: 'flex', flexDirection: 'column',
          justifyContent: 'space-between', minHeight: 420,
          backgroundImage: 'linear-gradient(rgba(166,166,166,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(166,166,166,.06) 1px,transparent 1px)',
          backgroundSize: '28px 28px',
        }}>
          <p className="label" style={{ color: 'var(--cinza)' }}>Acesso restrito</p>
          <div>
            <Symbol variant="lime" size={72} />
            <h2 className="display-md" style={{ marginTop: 22, maxWidth: '14ch' }}>
              O usuário<br/>entende o preço.
            </h2>
            <p style={{ fontSize: 13, color: 'var(--cinza)', lineHeight: 1.55, marginTop: 12, maxWidth: '34ch' }}>
              Acesso por assinatura. Cálculo de curvas, comparativos e leitura de preço para tesouraria.
            </p>
          </div>
          <p className="label-sm" style={{ color: 'var(--cinza-3)' }}>volatis.com.br</p>
        </div>

        {/* Right form */}
        <div style={{ background: 'var(--off)', padding: '40px 36px', display: 'flex', alignItems: 'center', position: 'relative' }}>
          <button onClick={onClose} aria-label="Fechar" style={{
            position: 'absolute', top: 14, right: 14,
            width: 32, height: 32, borderRadius: 3,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'var(--grafite)',
          }}>
            <svg width="14" height="14" viewBox="0 0 16 16">
              <path d="M3 3 L13 13 M13 3 L3 13" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </button>
          <div style={{ width: '100%', maxWidth: 320 }}>
            <p className="label" style={{ color: 'var(--azul)', marginBottom: 8 }}>Entrar</p>
            <h1 className="display-sm" style={{ marginBottom: 6, fontSize: 36 }}>Acesso por convite.</h1>
            <p style={{ fontSize: 13, color: 'var(--cinza-3)', marginBottom: 24, lineHeight: 1.55 }}>
              DATA.VOL não possui cadastro aberto.
            </p>
            <form onSubmit={submit}>
              <div style={{ marginBottom: 16 }}>
                <label className="label-input">Email</label>
                <input type="email" required autoFocus value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" className="input" />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label className="label-input">Senha</label>
                <input type="password" required value={pwd} onChange={e => setPwd(e.target.value)} placeholder="••••••••" className="input" />
              </div>
              {error && <p style={{ fontFamily: 'var(--mono)', fontSize: 11, color: '#b04848', marginBottom: 12, letterSpacing: 1 }}>⚠ {error}</p>}
              <button type="submit" disabled={loading} className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '13px 20px', opacity: loading ? .6 : 1 }}>
                {loading ? 'Validando…' : 'Entrar →'}
              </button>
            </form>
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 720px) { .modal { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  )
}

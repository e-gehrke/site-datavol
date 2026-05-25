'use client'

import { useState } from 'react'

const Z_SCORES: Record<string, number> = { '90': 1.282, '95': 1.645, '99': 2.326, '99.9': 3.090 }

export default function VaRCalculator() {
  const [vol,        setVol]        = useState('')
  const [confidence, setConfidence] = useState('95')
  const [horizon,    setHorizon]    = useState('')
  const [portfolio,  setPortfolio]  = useState('')
  const [result,     setResult]     = useState<{ var: number; cvar: number; varPct: number } | null>(null)
  const [error,      setError]      = useState('')

  function calculate() {
    const sigma  = parseFloat(vol.replace(',', '.')) / 100
    const h      = parseInt(horizon)
    const P      = parseFloat(portfolio.replace(',', '.'))
    const z      = Z_SCORES[confidence]
    if (isNaN(sigma) || isNaN(h) || isNaN(P) || sigma <= 0 || h <= 0 || P <= 0) {
      setError('Preencha todos os campos com valores positivos.'); setResult(null); return
    }
    setError('')
    const varPct = z * sigma * Math.sqrt(h)
    const varR   = varPct * P
    const cvarR  = varR * (Math.exp(-0.5 * z * z) / (Math.sqrt(2 * Math.PI) * (1 - parseFloat(confidence) / 100)))
    setResult({ var: varR, cvar: cvarR, varPct })
  }

  const fmt = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  return (
    <div className="space-y-6">
      <div className="bg-off border border-[rgba(166,166,166,.3)] rounded p-4 space-y-1">
        <p className="font-mono text-sm text-azul">VaR Paramétrico (Normal)</p>
        <p className="font-mono text-sm">VaR = sigma × z_alpha × sqrt(h) × P</p>
        <p className="type-label text-cinza/70 mt-2">Premissa: retornos normalmente distribuídos. Subestima caudas gordas.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Volatilidade diária (%)" value={vol}       onChange={setVol}       placeholder="1.5" />
        <Field label="Horizonte (dias)"        value={horizon}   onChange={setHorizon}   placeholder="10" />
        <Field label="Portfólio (R$)"          value={portfolio} onChange={setPortfolio} placeholder="1000000" />
        <div>
          <label className="type-label text-azul block mb-2">Nível de confiança</label>
          <select value={confidence} onChange={e => setConfidence(e.target.value)}
            className="w-full border border-[rgba(166,166,166,.4)] rounded px-3 py-2 text-sm bg-off focus:outline-none focus:border-azul font-mono">
            {Object.keys(Z_SCORES).map(k => <option key={k} value={k}>{k}%</option>)}
          </select>
        </div>
      </div>

      {error && <p className="type-label text-red-600">{error}</p>}

      <button onClick={calculate}
        className="type-label bg-azul text-off px-6 py-3 rounded hover:bg-azul/90 transition-colors">
        Calcular
      </button>

      {result && (
        <div className="card-dark p-6 space-y-4">
          <div className="flex justify-between items-baseline">
            <span className="type-label text-cinza">VaR ({confidence}%, {horizon}d)</span>
            <span className="font-mono text-xl text-lime font-semibold">{fmt(result.var)}</span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="type-label text-cinza">VaR em % do portfólio</span>
            <span className="font-mono text-off">{(result.varPct * 100).toFixed(3)}%</span>
          </div>
          <div className="rule-dark" />
          <div className="flex justify-between items-baseline">
            <span className="type-label text-cinza">CVaR (Expected Shortfall)</span>
            <span className="font-mono text-off">{fmt(result.cvar)}</span>
          </div>
          <p className="type-label text-cinza/70 mt-2">
            Resultado sob hipótese de normalidade. Leia sempre com a premissa.
          </p>
        </div>
      )}
    </div>
  )
}

function Field({ label, value, onChange, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; placeholder: string
}) {
  return (
    <div>
      <label className="type-label text-azul block mb-2">{label}</label>
      <input type="text" inputMode="decimal" value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-[rgba(166,166,166,.4)] rounded px-3 py-2 text-sm bg-off focus:outline-none focus:border-azul font-mono" />
    </div>
  )
}

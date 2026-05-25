'use client'

import { useState } from 'react'

export default function CompoundInterest() {
  const [principal, setPrincipal]   = useState('')
  const [rate,      setRate]        = useState('')
  const [periods,   setPeriods]     = useState('')
  const [result,    setResult]      = useState<{ compound: number; simple: number; gain: number } | null>(null)
  const [error,     setError]       = useState('')

  function calculate() {
    const P = parseFloat(principal.replace(',', '.'))
    const r = parseFloat(rate.replace(',', '.')) / 100
    const n = parseInt(periods)

    if (isNaN(P) || isNaN(r) || isNaN(n) || P <= 0 || r <= 0 || n <= 0) {
      setError('Preencha todos os campos com valores positivos.')
      setResult(null)
      return
    }
    setError('')
    const compound = P * Math.pow(1 + r, n)
    const simple   = P * (1 + r * n)
    setResult({ compound, simple, gain: compound - simple })
  }

  const fmt = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Field label="Principal (R$)" value={principal} onChange={setPrincipal} placeholder="1000" />
        <Field label="Taxa por período (%)" value={rate} onChange={setRate} placeholder="1" />
        <Field label="Períodos" value={periods} onChange={setPeriods} placeholder="24" />
      </div>

      {error && <p className="type-label text-red-600">{error}</p>}

      <button
        onClick={calculate}
        className="type-label bg-azul text-off px-6 py-3 rounded hover:bg-azul/90 transition-colors"
      >
        Calcular
      </button>

      {result && (
        <div className="card-dark p-6 space-y-4">
          <Row label="Montante composto" value={fmt(result.compound)} highlight />
          <div className="rule-dark" />
          <Row label="Montante simples"  value={fmt(result.simple)} />
          <Row label="Diferença (juros s/ juros)" value={fmt(result.gain)} />
          <p className="type-label text-cinza mt-2">
            M = C(1+i)^n — simulação didática. Não considera IR nem IOF.
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
      <input
        type="text"
        inputMode="decimal"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-[rgba(166,166,166,.4)] rounded px-3 py-2 text-sm bg-off focus:outline-none focus:border-azul font-mono"
      />
    </div>
  )
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between items-baseline">
      <span className="type-label text-cinza">{label}</span>
      <span className={`font-mono text-lg font-semibold ${highlight ? 'text-lime' : 'text-off'}`}>{value}</span>
    </div>
  )
}

'use client'

import { useState } from 'react'

export default function RealRate() {
  const [nominal,   setNominal]   = useState('')
  const [inflation, setInflation] = useState('')
  const [result,    setResult]    = useState<{ real: number; approx: number } | null>(null)
  const [error,     setError]     = useState('')

  function calculate() {
    const n = parseFloat(nominal.replace(',', '.')) / 100
    const i = parseFloat(inflation.replace(',', '.')) / 100
    if (isNaN(n) || isNaN(i)) { setError('Preencha os dois campos.'); setResult(null); return }
    if (i <= -1) { setError('Inflação não pode ser menor que -100%.'); setResult(null); return }
    setError('')
    const real   = (1 + n) / (1 + i) - 1
    const approx = n - i
    setResult({ real, approx })
  }

  const pct = (v: number) => (v * 100).toFixed(4) + '%'

  return (
    <div className="space-y-6">
      <div className="bg-off border border-[rgba(166,166,166,.3)] rounded p-4">
        <p className="font-mono text-sm text-azul mb-1">Fórmula de Fisher</p>
        <p className="font-mono text-lg">(1 + i<sub>nominal</sub>) / (1 + i<sub>inflacao</sub>) - 1 = i<sub>real</sub></p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Taxa nominal (%)" value={nominal}   onChange={setNominal}   placeholder="12" />
        <Field label="Inflação (%)"     value={inflation} onChange={setInflation} placeholder="5" />
      </div>

      {error && <p className="type-label text-red-600">{error}</p>}

      <button onClick={calculate}
        className="type-label bg-azul text-off px-6 py-3 rounded hover:bg-azul/90 transition-colors">
        Calcular
      </button>

      {result && (
        <div className="card-dark p-6 space-y-4">
          <div className="flex justify-between items-baseline">
            <span className="type-label text-cinza">Taxa real (Fisher)</span>
            <span className="font-mono text-xl text-lime font-semibold">{pct(result.real)}</span>
          </div>
          <div className="rule-dark" />
          <div className="flex justify-between items-baseline">
            <span className="type-label text-cinza">Aproximação (n - i)</span>
            <span className="font-mono text-off">{pct(result.approx)}</span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="type-label text-cinza">Diferença (erro da aproximação)</span>
            <span className="font-mono text-cinza">{pct(Math.abs(result.real - result.approx))}</span>
          </div>
          <p className="type-label text-cinza/70 mt-2">Simulação didática. Use Fisher para cálculos precisos.</p>
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

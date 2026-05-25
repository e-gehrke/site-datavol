'use client'

import { useState } from 'react'

export default function Duration() {
  const [faceValue, setFaceValue] = useState('')
  const [couponRate, setCouponRate] = useState('')
  const [ytm, setYtm] = useState('')
  const [maturity, setMaturity] = useState('')
  const [result, setResult] = useState<{
    macaulay: number; modified: number; dollar: number; price: number
  } | null>(null)
  const [error, setError] = useState('')

  function calculate() {
    const FV = parseFloat(faceValue.replace(',', '.'))
    const c  = parseFloat(couponRate.replace(',', '.')) / 100
    const y  = parseFloat(ytm.replace(',', '.')) / 100
    const n  = parseInt(maturity)

    if (isNaN(FV) || isNaN(c) || isNaN(y) || isNaN(n) || FV <= 0 || y <= 0 || n <= 0) {
      setError('Preencha todos os campos.'); setResult(null); return
    }
    setError('')

    const coupon = FV * c
    let price = 0
    let weightedTime = 0

    for (let t = 1; t <= n; t++) {
      const cf = t === n ? coupon + FV : coupon
      const pv = cf / Math.pow(1 + y, t)
      price += pv
      weightedTime += t * pv
    }

    const macaulay = weightedTime / price
    const modified  = macaulay / (1 + y)
    const dollar    = modified * price / 100

    setResult({ macaulay, modified, dollar, price })
  }

  const fmt = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

  return (
    <div className="space-y-6">
      <div className="bg-off border border-[rgba(166,166,166,.3)] rounded p-4 space-y-1">
        <p className="font-mono text-sm text-azul">Macaulay Duration</p>
        <p className="font-mono text-sm">D = sum[t × PV(CFt)] / P</p>
        <p className="font-mono text-sm text-azul mt-1">Duration Modificada</p>
        <p className="font-mono text-sm">DM = D / (1 + y)</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Valor de face (R$)"        value={faceValue}  onChange={setFaceValue}  placeholder="1000" />
        <Field label="Taxa de cupom anual (%)"    value={couponRate} onChange={setCouponRate} placeholder="10" />
        <Field label="YTM / Taxa de desconto (%)" value={ytm}        onChange={setYtm}        placeholder="12" />
        <Field label="Prazo (períodos)"           value={maturity}   onChange={setMaturity}   placeholder="5" />
      </div>

      {error && <p className="type-label text-red-600">{error}</p>}

      <button onClick={calculate}
        className="type-label bg-azul text-off px-6 py-3 rounded hover:bg-azul/90 transition-colors">
        Calcular
      </button>

      {result && (
        <div className="card-dark p-6 space-y-4">
          <div className="flex justify-between items-baseline">
            <span className="type-label text-cinza">Preço do título</span>
            <span className="font-mono text-off">{fmt(result.price)}</span>
          </div>
          <div className="rule-dark" />
          <div className="flex justify-between items-baseline">
            <span className="type-label text-cinza">Duration de Macaulay</span>
            <span className="font-mono text-lime font-semibold">{result.macaulay.toFixed(4)} períodos</span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="type-label text-cinza">Duration Modificada</span>
            <span className="font-mono text-off">{result.modified.toFixed(4)}</span>
          </div>
          <div className="flex justify-between items-baseline">
            <span className="type-label text-cinza">Duration do Dólar (por bp)</span>
            <span className="font-mono text-off">{fmt(result.dollar)}</span>
          </div>
          <p className="type-label text-cinza/70 mt-2">
            DM interpreta: variacao de 1% na taxa causa -{result.modified.toFixed(2)}% no preco.
            Simulacao didatica, cupons periodicos.
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

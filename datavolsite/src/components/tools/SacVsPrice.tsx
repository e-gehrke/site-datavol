'use client'

import { useState } from 'react'

interface Installment { n: number; balance: number; interest: number; amort: number; payment: number }

function calcSAC(pv: number, r: number, n: number): Installment[] {
  const amort = pv / n
  const rows: Installment[] = []
  let bal = pv
  for (let i = 1; i <= n; i++) {
    const interest = bal * r
    const payment  = amort + interest
    bal -= amort
    rows.push({ n: i, balance: bal < 0 ? 0 : bal, interest, amort, payment })
  }
  return rows
}

function calcPrice(pv: number, r: number, n: number): Installment[] {
  const payment = pv * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
  const rows: Installment[] = []
  let bal = pv
  for (let i = 1; i <= n; i++) {
    const interest = bal * r
    const amort    = payment - interest
    bal -= amort
    rows.push({ n: i, balance: bal < 0 ? 0 : bal, interest, amort, payment })
  }
  return rows
}

const fmt  = (v: number) => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
const sum  = (rows: Installment[]) => rows.reduce((a, r) => a + r.payment, 0)

export default function SacVsPrice() {
  const [pv,     setPv]    = useState('')
  const [rate,   setRate]  = useState('')
  const [n,      setN]     = useState('')
  const [result, setResult]= useState<{ sac: Installment[]; price: Installment[] } | null>(null)
  const [error,  setError] = useState('')
  const [showTable, setShowTable] = useState(false)

  function calculate() {
    const pvN  = parseFloat(pv.replace(',', '.'))
    const rN   = parseFloat(rate.replace(',', '.')) / 100
    const nN   = parseInt(n)
    if (isNaN(pvN) || isNaN(rN) || isNaN(nN) || pvN <= 0 || rN <= 0 || nN <= 0 || nN > 480) {
      setError('Valores inválidos. Prazo máximo: 480 períodos.')
      setResult(null); return
    }
    setError('')
    setResult({ sac: calcSAC(pvN, rN, nN), price: calcPrice(pvN, rN, nN) })
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Field label="Valor financiado (R$)" value={pv}   onChange={setPv}   placeholder="300000" />
        <Field label="Taxa mensal (%)"       value={rate} onChange={setRate} placeholder="0.8" />
        <Field label="Prazo (meses)"         value={n}    onChange={setN}    placeholder="360" />
      </div>

      {error && <p className="type-label text-red-600">{error}</p>}

      <button onClick={calculate}
        className="type-label bg-azul text-off px-6 py-3 rounded hover:bg-azul/90 transition-colors">
        Simular
      </button>

      {result && (
        <div className="space-y-4">
          <div className="card-dark p-6 grid grid-cols-2 gap-6">
            <div>
              <p className="type-label text-cinza mb-3">SAC</p>
              <p className="font-mono text-sm text-cinza">1ª parcela: <span className="text-off">{fmt(result.sac[0].payment)}</span></p>
              <p className="font-mono text-sm text-cinza">Última:     <span className="text-off">{fmt(result.sac[result.sac.length-1].payment)}</span></p>
              <p className="font-mono text-sm text-cinza mt-2">Total pago: <span className="text-lime font-semibold">{fmt(sum(result.sac))}</span></p>
            </div>
            <div>
              <p className="type-label text-cinza mb-3">Price (Francês)</p>
              <p className="font-mono text-sm text-cinza">Parcela fixa: <span className="text-off">{fmt(result.price[0].payment)}</span></p>
              <p className="font-mono text-sm text-cinza">&nbsp;</p>
              <p className="font-mono text-sm text-cinza mt-2">Total pago: <span className="text-lime font-semibold">{fmt(sum(result.price))}</span></p>
            </div>
          </div>

          <div className="card-dark p-4">
            <p className="font-mono text-sm text-cinza">
              Diferença de custo total:{' '}
              <span className="text-lime font-semibold">{fmt(Math.abs(sum(result.price) - sum(result.sac)))}</span>
              {sum(result.price) > sum(result.sac) ? ' a mais no Price.' : ' a mais no SAC.'}
            </p>
          </div>

          <button onClick={() => setShowTable(t => !t)}
            className="type-label text-azul border border-azul/40 px-4 py-2 rounded text-sm hover:border-azul transition-colors">
            {showTable ? 'Ocultar tabela' : 'Ver tabela completa'}
          </button>

          {showTable && (
            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono border-collapse">
                <thead>
                  <tr className="bg-azul text-off">
                    {['Mês', 'SAC Parcela', 'SAC Saldo', 'Price Parcela', 'Price Saldo'].map(h => (
                      <th key={h} className="px-3 py-2 text-left type-label font-normal">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.sac.map((s, i) => (
                    <tr key={s.n} className={i % 2 === 0 ? 'bg-off' : 'bg-off/60'}>
                      <td className="px-3 py-1.5 text-cinza">{s.n}</td>
                      <td className="px-3 py-1.5">{fmt(s.payment)}</td>
                      <td className="px-3 py-1.5 text-cinza">{fmt(s.balance)}</td>
                      <td className="px-3 py-1.5">{fmt(result.price[i].payment)}</td>
                      <td className="px-3 py-1.5 text-cinza">{fmt(result.price[i].balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <p className="type-label text-cinza/70">Simulação didática. Não inclui seguros, tarifas e IOF.</p>
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

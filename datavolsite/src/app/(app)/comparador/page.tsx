'use client'

import { useState } from 'react'

export default function ComparadorPage() {
  const [bankPrice, setBankPrice] = useState('5,5600')
  const [usdAmount, setUsdAmount] = useState('500000')
  const refPrice = 5.5180
  const bp   = parseFloat(bankPrice.replace(',', '.')) || refPrice
  const usd  = parseFloat(usdAmount.replace(/\D/g, '')) || 0
  const spread = bp - refPrice
  const bps    = Math.round(spread / refPrice * 10000)
  const cost   = usd * spread

  return (
    <div>
      <div style={{ marginBottom: 22 }}>
        <p className="label" style={{ color: 'var(--lime)', marginBottom: 8 }}>Comparador</p>
        <h1 className="display-md" style={{ color: 'var(--off)' }}>Banco × referência</h1>
        <p className="label-sm" style={{ color: 'var(--cinza)', marginTop: 8 }}>Cole a cotação que o banco enviou. Compare com a referência calculada e veja o custo implícito.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '380px 1fr', gap: 24 }} className="cmp-grid">
        <div className="panel">
          <div className="panel-header"><span className="panel-title">Cotação a comparar</span></div>
          <div style={{ marginBottom: 16 }}>
            <label className="label-input on-dark">Par</label>
            <select className="input on-dark"><option>USD/BRL</option><option>EUR/BRL</option></select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label className="label-input on-dark">Vencimento</label>
            <select className="input on-dark" defaultValue="12M">
              <option>1M</option><option>3M</option><option>6M</option><option>12M</option><option>24M</option>
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label className="label-input on-dark">Cotação do banco · BRL/USD</label>
            <input className="input on-dark" value={bankPrice} onChange={e => setBankPrice(e.target.value)} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label className="label-input on-dark">Notional · USD</label>
            <input className="input on-dark" value={usdAmount} onChange={e => setUsdAmount(e.target.value)} />
          </div>
          <button className="btn btn-lime" style={{ width: '100%', justifyContent: 'center' }}>Calcular →</button>
        </div>

        <div>
          <div className="comparator" style={{ marginBottom: 16 }}>
            <div className="comparator-cell ref">
              <p className="label-sm" style={{ color: 'var(--lime)', marginBottom: 8 }}>Referência DATA.VOL · 12M</p>
              <p className="mono" style={{ fontSize: 42, lineHeight: 1, color: 'var(--off)', marginBottom: 8 }}>{refPrice.toFixed(4).replace('.',',')}</p>
              <p className="label-sm" style={{ color: 'var(--cinza)' }}>Carrego 6,49% a.a.</p>
            </div>
            <div className="comparator-vs">VS</div>
            <div className="comparator-cell">
              <p className="label-sm" style={{ color: 'var(--cinza)', marginBottom: 8 }}>Banco</p>
              <p className="mono" style={{ fontSize: 42, lineHeight: 1, color: spread > 0 ? 'var(--down)' : 'var(--up)', marginBottom: 8 }}>
                {bp.toFixed(4).replace('.',',')}
              </p>
              <p className="label-sm" style={{ color: spread > 0 ? 'var(--down)' : 'var(--up)' }}>
                {spread > 0 ? '+' : ''}{bps} bps vs referência
              </p>
            </div>
          </div>

          <div className="panel" style={{ background: 'var(--black)' }}>
            <div className="panel-header">
              <span className="panel-title">Impacto no contrato</span>
              <span className="panel-sub">USD {usd.toLocaleString('pt-BR')} · vencimento 12M</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 16 }}>
              {[
                { l: 'Spread',       v: bps + ' bps',                                                                 color: spread > 0 ? 'var(--down)' : 'var(--up)' },
                { l: 'Δ por USD',    v: 'R$ ' + spread.toFixed(4).replace('.',','),                                   color: spread > 0 ? 'var(--down)' : 'var(--up)' },
                { l: 'Custo total',  v: 'R$ ' + Math.abs(cost).toLocaleString('pt-BR', { minimumFractionDigits: 2 }), color: spread > 0 ? 'var(--down)' : 'var(--up)' },
                { l: 'BRL no banco', v: 'R$ ' + (bp * usd).toLocaleString('pt-BR', { maximumFractionDigits: 0 }),     color: 'var(--off)' },
                { l: 'BRL na ref',   v: 'R$ ' + (refPrice * usd).toLocaleString('pt-BR', { maximumFractionDigits: 0 }), color: 'var(--off)' },
              ].map((k, i) => (
                <div key={i}>
                  <p className="label-sm" style={{ color: 'var(--cinza-3)', marginBottom: 6 }}>{k.l}</p>
                  <p className="mono" style={{ fontSize: 20, color: k.color }}>{k.v}</p>
                </div>
              ))}
            </div>
            <p className="mono" style={{ fontSize: 11, color: 'var(--cinza-3)', marginTop: 18, lineHeight: 1.6 }}>
              Cálculo informativo. Compare com o que o banco está cobrando, mas considere prazo de liquidação, garantias, IOF e contexto contratual.
            </p>
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 960px) { .cmp-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  )
}

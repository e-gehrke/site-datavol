'use client'

import { useState } from 'react'
import { FORWARD_DATA } from '@/lib/data'

export default function CurvaForwardPage() {
  const [showBank, setShowBank] = useState(true)

  const W = 900, H = 420
  const PAD = { l: 70, r: 30, t: 32, b: 50 }
  const innerW = W - PAD.l - PAD.r, innerH = H - PAD.t - PAD.b
  const xMax = 36, yMin = 5.10, yMax = 6.30
  const xs = (m: number) => PAD.l + (m / xMax) * innerW
  const ys = (v: number) => PAD.t + innerH - ((v - yMin) / (yMax - yMin)) * innerH
  const refPath  = FORWARD_DATA.map((d, i) => `${i===0?'M':'L'} ${xs(d.m).toFixed(1)} ${ys(d.ref).toFixed(1)}`).join(' ')
  const bankPath = FORWARD_DATA.map((d, i) => `${i===0?'M':'L'} ${xs(d.m).toFixed(1)} ${ys(d.bank).toFixed(1)}`).join(' ')
  const yTicks = [5.1,5.3,5.5,5.7,5.9,6.1,6.3]
  const xTicks = [0,1,3,6,9,12,18,24,36]

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 22 }}>
        <div>
          <p className="label" style={{ color: 'var(--lime)', marginBottom: 8 }}>Curva forward</p>
          <h1 className="display-md" style={{ color: 'var(--off)' }}>USD/BRL</h1>
          <p className="label-sm" style={{ color: 'var(--cinza)', marginTop: 8 }}>Curva calculada a partir de DI futuro × taxa internacional · vértices até 36 meses</p>
        </div>
        <span className="pill live">Atualizada agora</span>
      </div>

      <div className="panel tight" style={{ marginBottom: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto auto', gap: 16, alignItems: 'end' }} className="inputs-grid">
          <div>
            <label className="label-input on-dark">Par</label>
            <select className="input on-dark"><option>USD/BRL</option><option>EUR/BRL</option></select>
          </div>
          <div>
            <label className="label-input on-dark">Data de referência</label>
            <input type="text" defaultValue="25/05/2026" className="input on-dark" />
          </div>
          <div>
            <label className="label-input on-dark">Curva base</label>
            <select className="input on-dark"><option>DI futuro × CME (auto)</option><option>Manual</option></select>
          </div>
          <button className="btn btn-lime">Recalcular</button>
          <button className="btn btn-quiet" style={{ color: 'var(--cinza)' }}>Exportar</button>
        </div>
        <style>{`@media (max-width: 880px) { .inputs-grid { grid-template-columns: 1fr 1fr !important; } }`}</style>
      </div>

      <div className="kpi-row" style={{ marginBottom: 20 }}>
        {[
          { l: 'Spot',               v: '5,1820', d: '+0,34% hoje',      up: true  },
          { l: 'Carrego 12M',        v: '6,49%',  d: 'a.a. · base DU',   dim: true },
          { l: 'Ref. DATA.VOL 12M',  v: '5,5180', d: '↑ +0,336 vs spot', dim: true },
          { l: 'Banco típico 12M',   v: '5,5600', d: '+76 bps vs ref',    down: true },
          { l: 'Próximo update',      v: '00:18',  d: 'min',              dim: true },
        ].map((k, i) => (
          <div key={i} className="kpi">
            <div className="kpi-label">{k.l}</div>
            <div className="kpi-value">{k.v}</div>
            <div className={'kpi-delta' + (k.dim ? '' : k.up ? ' up' : ' down')}>{k.d}</div>
          </div>
        ))}
      </div>

      <div className="chart" style={{ background: 'var(--black-2)', marginBottom: 20 }}>
        <span className="chart-title">USD/BRL · forward curve · ref. 25 mai 2026</span>
        <div className="chart-legend">
          <span className="item"><span className="swatch" style={{ background: 'var(--lime)' }} />DATA.VOL</span>
          <span className="item"><span className="swatch dashed" />Banco típico</span>
          <button onClick={() => setShowBank(b => !b)} className="label-sm" style={{ color: 'var(--cinza)', cursor: 'pointer', marginLeft: 14 }}>
            {showBank ? '[ esconder banco ]' : '[ mostrar banco ]'}
          </button>
        </div>
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block' }}>
          {yTicks.map(t => <line key={'y'+t} x1={PAD.l} y1={ys(t)} x2={W-PAD.r} y2={ys(t)} stroke="rgba(166,166,166,.1)" strokeDasharray="2 4" />)}
          {xTicks.map(t => <line key={'x'+t} x1={xs(t)} y1={PAD.t} x2={xs(t)} y2={H-PAD.b} stroke="rgba(166,166,166,.07)" />)}
          <line x1={PAD.l} y1={H-PAD.b} x2={W-PAD.r} y2={H-PAD.b} stroke="rgba(166,166,166,.4)" />
          <line x1={PAD.l} y1={PAD.t}   x2={PAD.l}   y2={H-PAD.b} stroke="rgba(166,166,166,.4)" />
          {yTicks.map(t => <text key={'yl'+t} x={PAD.l-10} y={ys(t)+3} textAnchor="end" fill="#A6A6A6" fontFamily="IBM Plex Mono" fontSize="10">{t.toFixed(2)}</text>)}
          {xTicks.map(t => <text key={'xl'+t} x={xs(t)} y={H-PAD.b+18} textAnchor="middle" fill="#A6A6A6" fontFamily="IBM Plex Mono" fontSize="10" letterSpacing="1">{t===0?'SPOT':t+'M'}</text>)}
          {showBank && <path d={bankPath} fill="none" stroke="#A6A6A6" strokeWidth="1.5" strokeDasharray="5 4" />}
          <path d={refPath} fill="none" stroke="#C6FF4D" strokeWidth="2.2" />
          {showBank && <path d={refPath + ' ' + FORWARD_DATA.slice().reverse().map(d => `L ${xs(d.m).toFixed(1)} ${ys(d.bank).toFixed(1)}`).join(' ') + ' Z'} fill="rgba(255,107,107,.08)" />}
          {FORWARD_DATA.map(d => (
            <g key={d.vert}>
              <circle cx={xs(d.m)} cy={ys(d.ref)} r="3.5" fill="#C6FF4D" />
              {showBank && d.m > 0 && <circle cx={xs(d.m)} cy={ys(d.bank)} r="2.5" fill="#A6A6A6" />}
            </g>
          ))}
          <g>
            <line x1={xs(12)} y1={ys(5.518)} x2={xs(12)} y2={ys(5.560)} stroke="#ff6b6b" strokeWidth="1.5" />
            <rect x={xs(12)+10} y={ys(5.54)-10} width="100" height="20" fill="#080A0B" stroke="rgba(255,107,107,.4)" />
            <text x={xs(12)+16} y={ys(5.54)+4} fill="#ff6b6b" fontFamily="IBM Plex Mono" fontSize="10" letterSpacing="1">SPREAD 76 BPS</text>
          </g>
        </svg>
      </div>

      <div className="panel" style={{ padding: 0, marginBottom: 20 }}>
        <div className="panel-header" style={{ padding: '14px 22px' }}>
          <span className="panel-title">Tabela de vencimentos</span>
          <span className="panel-sub">9 vértices · BRL/USD · ref 25/05/2026</span>
        </div>
        <table className="dtable">
          <thead>
            <tr>
              <th>Vencimento</th><th>Dias úteis</th><th>Ref. DATA.VOL</th>
              <th>Carrego (a.a.)</th><th>Banco típico</th><th>Spread</th>
              <th>Custo embutido</th><th>Δ vs spot</th>
            </tr>
          </thead>
          <tbody>
            {FORWARD_DATA.map((d, i) => {
              const spread = d.bank - d.ref
              const bps = Math.round(spread / d.ref * 10000)
              const carrego = i === 0 ? 0 : ((d.ref / 5.182 - 1) * 360 / d.du) * 100
              const deltaSpot = d.ref - 5.182
              return (
                <tr key={d.vert}>
                  <td className="bold">{d.vert}</td>
                  <td className="dim">{d.du}</td>
                  <td className="bold" style={{ color: 'var(--lime)' }}>{d.ref.toFixed(4).replace('.',',')}</td>
                  <td>{i === 0 ? '—' : carrego.toFixed(2).replace('.',',') + '%'}</td>
                  <td>{i === 0 ? '—' : d.bank.toFixed(4).replace('.',',')}</td>
                  <td className={i === 0 ? 'dim' : 'down'}>{i === 0 ? '—' : '+' + bps + ' bps'}</td>
                  <td className={i === 0 ? 'dim' : 'down'}>{i === 0 ? '—' : 'R$ ' + spread.toFixed(4).replace('.',',') + '/USD'}</td>
                  <td className={i === 0 ? 'dim' : 'up'}>{i === 0 ? '—' : '+' + deltaSpot.toFixed(4).replace('.',',')}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div style={{ marginBottom: 20 }}>
        <div className="seclabel lime">Comparador rápido</div>
        <div className="comparator">
          <div className="comparator-cell ref">
            <p className="label-sm" style={{ color: 'var(--lime)', marginBottom: 8 }}>Referência DATA.VOL · 12M</p>
            <p className="mono" style={{ fontSize: 42, lineHeight: 1, color: 'var(--off)', marginBottom: 8 }}>5,5180</p>
            <p className="label-sm" style={{ color: 'var(--cinza)' }}>Carrego 6,49% a.a. · spot 5,182 + 0,336</p>
          </div>
          <div className="comparator-vs">VS</div>
          <div className="comparator-cell">
            <p className="label-sm" style={{ color: 'var(--cinza)', marginBottom: 8 }}>Cotação do banco · 12M</p>
            <p className="mono" style={{ fontSize: 42, lineHeight: 1, color: 'var(--down)', marginBottom: 8 }}>5,5600</p>
            <p className="label-sm" style={{ color: 'var(--down)' }}>+76 bps · custo embutido R$ 0,042/USD</p>
          </div>
        </div>
        <p className="label-sm" style={{ color: 'var(--cinza-3)', marginTop: 12, lineHeight: 1.6 }}>
          Em um contrato de USD 500.000, o spread implícito representa <span style={{ color: 'var(--down)' }}>R$ 21.000</span> de custo adicional vs. a referência calculada.
        </p>
      </div>

      <p className="mono" style={{ fontSize: 11, color: 'var(--cinza-3)', lineHeight: 1.7, marginTop: 26, maxWidth: '92ch' }}>
        Os valores apresentados são estimativas baseadas em dados e premissas informadas. Não constituem recomendação individual de investimento, hedge ou contratação de produto financeiro.
      </p>
    </div>
  )
}

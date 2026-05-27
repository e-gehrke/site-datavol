import type { Metadata } from 'next'
import { FORWARD_DATA } from '@/lib/data'

export const metadata: Metadata = { title: 'Dashboard' }

function HeroChart() {
  const W = 640, H = 280
  const PAD = { l: 60, r: 24, t: 28, b: 38 }
  const innerW = W - PAD.l - PAD.r, innerH = H - PAD.t - PAD.b
  const xMax = 36, yMin = 5.10, yMax = 6.30
  const xs = (m: number) => PAD.l + (m / xMax) * innerW
  const ys = (v: number) => PAD.t + innerH - ((v - yMin) / (yMax - yMin)) * innerH
  const refPath  = FORWARD_DATA.map((d, i) => `${i===0?'M':'L'} ${xs(d.m).toFixed(1)} ${ys(d.ref).toFixed(1)}`).join(' ')
  const bankPath = FORWARD_DATA.map((d, i) => `${i===0?'M':'L'} ${xs(d.m).toFixed(1)} ${ys(d.bank).toFixed(1)}`).join(' ')
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" style={{ display: 'block' }}>
      <path d={bankPath} fill="none" stroke="#A6A6A6" strokeWidth="1.4" strokeDasharray="4 3" />
      <path d={refPath}  fill="none" stroke="#C6FF4D" strokeWidth="2" />
      {FORWARD_DATA.map(d => <circle key={d.vert} cx={xs(d.m)} cy={ys(d.ref)} r="3" fill="#C6FF4D" />)}
      <line x1={PAD.l} y1={H-PAD.b} x2={W-PAD.r} y2={H-PAD.b} stroke="rgba(166,166,166,.3)" />
      <line x1={PAD.l} y1={PAD.t}   x2={PAD.l}   y2={H-PAD.b} stroke="rgba(166,166,166,.3)" />
      <text x={PAD.l} y={20} fill="#F2EDE0" fontFamily="IBM Plex Mono" fontSize="10" letterSpacing="2">USD/BRL · FORWARD CURVE · ref 25 mai 2026</text>
    </svg>
  )
}

export default function DashboardPage() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
        <div>
          <p className="label" style={{ color: 'var(--lime)', marginBottom: 8 }}>Painel</p>
          <h1 className="display-md" style={{ color: 'var(--off)' }}>Dashboard</h1>
        </div>
        <p className="label-sm" style={{ color: 'var(--cinza)' }}>Última atualização · 25/mai 14:42:18</p>
      </div>

      <div className="kpi-row" style={{ marginBottom: 24 }}>
        {[
          { l: 'USD/BRL spot',    v: '5,1820', d: '+0,34% hoje',        up: true },
          { l: 'DI 1Y',           v: '11,18%', d: '+4 bps',             up: true },
          { l: 'Forward 12M',     v: '5,5180', d: 'carrego 6,49% a.a.', dim: true },
          { l: 'Consultas / mês', v: '124',    d: 'limite ∞',           dim: true },
          { l: 'Sessão atual',    v: '00:38',  d: 'desde 14:04',        dim: true },
        ].map((k, i) => (
          <div key={i} className="kpi">
            <div className="kpi-label">{k.l}</div>
            <div className="kpi-value">{k.v}</div>
            <div className={'kpi-delta' + (k.dim ? '' : k.up ? ' up' : ' down')}>{k.d}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24 }} className="dash-grid">
        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">Curva dólar forward · USD/BRL</span>
            <a href="/curva" className="btn-link">Abrir ferramenta →</a>
          </div>
          <HeroChart />
          <p className="label-sm" style={{ color: 'var(--cinza-3)', marginTop: 16 }}>
            Referência DATA.VOL em lime · cotação típica de banco em tracejado · spread anotado em 12M
          </p>
        </div>

        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">Atividade recente</span>
            <a href="/historico" className="btn-link">Histórico →</a>
          </div>
          {[
            { t: '14:38', a: 'Comparador',    e: 'USD/BRL 6M banco 5,392 vs ref 5,362 · spread 30 bps' },
            { t: '14:21', a: 'Curva forward', e: 'Curva exportada (PDF) USD/BRL 36M' },
            { t: '13:54', a: 'Curva juros',   e: 'Vértices DI futuro recalculados (auto)' },
            { t: 'ontem', a: 'Comparador',    e: 'EUR/BRL 3M banco 5,712 vs ref 5,696' },
            { t: 'ontem', a: 'Curva forward', e: 'USD/BRL 12M consulta · 5,518' },
            { t: '23 mai', a: 'Biblioteca',   e: 'Definição "carrego cambial" consultada' },
          ].map((row, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '52px 96px 1fr', gap: 12, padding: '11px 0', borderBottom: i === 5 ? 'none' : '1px solid var(--rule-dark)', alignItems: 'baseline' }}>
              <span className="label-sm" style={{ color: 'var(--cinza-3)' }}>{row.t}</span>
              <span className="label-sm" style={{ color: 'var(--lime)' }}>{row.a}</span>
              <span style={{ fontSize: 12.5, color: 'var(--off)', fontFamily: 'var(--mono)' }}>{row.e}</span>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 1100px) { .dash-grid { grid-template-columns: 1fr !important; } }`}</style>

      <div style={{ marginTop: 24 }}>
        <div className="seclabel" style={{ color: 'var(--cinza)' }}>Ferramentas</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 12 }}>
          {[
            { t: 'Curva forward', s: 'USD/BRL · 36M',   r: '/curva',      live: true },
            { t: 'Curva de juros', s: 'DI · Pré · Cupom', r: '/juros',    beta: true },
            { t: 'Comparador',    s: 'Banco × referência', r: '/comparador', beta: true },
            { t: 'NDF',           s: 'Non-deliverable',  r: '/ndf',        soon: true },
            { t: 'Swaps',         s: 'DI × Pré · USD',   r: '/swaps',      soon: true },
            { t: 'Biblioteca',    s: 'Glossário',        r: '/biblioteca', live: true },
          ].map((tool, i) => (
            <a key={i} href={tool.r} className="panel" style={{ padding: 18, display: 'block' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <p style={{ fontFamily: 'var(--display)', fontSize: 22, color: 'var(--off)' }}>{tool.t}</p>
                <span className={'pill' + (tool.live ? ' live' : tool.beta ? ' beta' : ' soon')}>
                  {tool.live ? 'Live' : tool.beta ? 'Beta' : 'Em breve'}
                </span>
              </div>
              <p className="label-sm" style={{ color: 'var(--cinza)' }}>{tool.s}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

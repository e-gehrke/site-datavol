import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Curva de Juros' }

export default function JurosPage() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 22 }}>
        <div>
          <p className="label" style={{ color: 'var(--lime)', marginBottom: 8 }}>Curvas de juros</p>
          <h1 className="display-md" style={{ color: 'var(--off)' }}>DI futuro · Pré · Cupom</h1>
        </div>
        <span className="pill beta">Beta</span>
      </div>

      <div className="kpi-row" style={{ marginBottom: 20 }}>
        {[
          { l: 'DI 1Y',          v: '11,18%', d: '+4 bps',          up: true },
          { l: 'DI 2Y',          v: '11,72%', d: '+2 bps',          up: true },
          { l: 'DI 5Y',          v: '12,84%', d: '-2 bps',          down: true },
          { l: 'CDI',            v: '10,40%', d: 'estável',         dim: true },
          { l: 'Inclinação 1×5', v: '+166 bps', d: 'estrutura normal', dim: true },
        ].map((k, i) => (
          <div key={i} className="kpi">
            <div className="kpi-label">{k.l}</div>
            <div className="kpi-value">{k.v}</div>
            <div className={'kpi-delta' + (k.dim ? '' : k.up ? ' up' : ' down')}>{k.d}</div>
          </div>
        ))}
      </div>

      <div className="panel" style={{ padding: 0 }}>
        <div className="panel-header" style={{ padding: '14px 22px' }}>
          <span className="panel-title">Vértices DI futuro</span>
          <span className="panel-sub">B3 · interpolação linear · 25/05/2026</span>
        </div>
        <table className="dtable">
          <thead>
            <tr><th>Vencimento</th><th>Dias úteis</th><th>Taxa nominal</th><th>Taxa exponencial</th><th>PU</th><th>Volume</th></tr>
          </thead>
          <tbody>
            {[
              { v: 'JAN26', du: 154,  tn: '10,85%', te: '10,89%', pu: '95.412,18', vol: 'R$ 142 bi' },
              { v: 'JUL26', du: 280,  tn: '11,18%', te: '11,24%', pu: '92.108,76', vol: 'R$ 98 bi' },
              { v: 'JAN27', du: 406,  tn: '11,42%', te: '11,49%', pu: '88.842,32', vol: 'R$ 76 bi' },
              { v: 'JAN28', du: 658,  tn: '11,72%', te: '11,82%', pu: '80.218,44', vol: 'R$ 52 bi' },
              { v: 'JAN29', du: 911,  tn: '12,18%', te: '12,32%', pu: '72.418,12', vol: 'R$ 31 bi' },
              { v: 'JAN31', du: 1416, tn: '12,84%', te: '13,06%', pu: '58.842,90', vol: 'R$ 14 bi' },
            ].map((r, i) => (
              <tr key={i}>
                <td className="bold">{r.v}</td>
                <td className="dim">{r.du}</td>
                <td className="bold" style={{ color: 'var(--lime)' }}>{r.tn}</td>
                <td>{r.te}</td>
                <td>{r.pu}</td>
                <td className="dim">{r.vol}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

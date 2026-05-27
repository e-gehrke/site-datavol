import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Swaps' }

export default function SwapsPage() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 22 }}>
        <div>
          <p className="label" style={{ color: 'var(--lime)', marginBottom: 8 }}>Instrumento</p>
          <h1 className="display-md" style={{ color: 'var(--off)' }}>Swaps</h1>
          <p className="label-sm" style={{ color: 'var(--cinza)', marginTop: 8 }}>DI × Pré, USD × CDI, hedge accounting (IFRS 9)</p>
        </div>
        <span className="pill soon">Em desenvolvimento</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }} className="stub-grid">
        <div className="panel">
          <div className="panel-header"><span className="panel-title">O que essa ferramenta vai responder</span></div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              'Qual é o valor de mercado atual do swap (MTM)?',
              'Qual o resultado financeiro acumulado no contrato?',
              'A efetividade do hedge está dentro do range (80%-125%)?',
              'Qual o impacto contábil em hedge designado vs não designado?',
            ].map((b, i) => (
              <li key={i} style={{ display: 'grid', gridTemplateColumns: '32px 1fr', gap: 12, alignItems: 'baseline', fontSize: 13, color: 'var(--off)', lineHeight: 1.55 }}>
                <span className="label-sm" style={{ color: 'var(--lime)' }}>{String(i+1).padStart(2,'0')}</span>{b}
              </li>
            ))}
          </ul>
        </div>
        <div className="panel" style={{ padding: 0 }}>
          <div className="panel-header" style={{ padding: '14px 22px' }}>
            <span className="panel-title">Saída prevista</span>
            <span className="panel-sub">mock</span>
          </div>
          <table className="dtable">
            <thead><tr><th>Trade</th><th>Tipo</th><th>Vencimento</th><th>MTM</th></tr></thead>
            <tbody>
              {[1,2,3,4,5].map(i => (
                <tr key={i}><td className="bold">SWP-{2000+i}</td><td className="dim">—</td><td className="dim">—</td><td className="dim">—</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="panel" style={{ marginTop: 24, background: 'transparent', borderStyle: 'dashed' }}>
        <p className="label" style={{ color: 'var(--cinza)', marginBottom: 12 }}>Cronograma</p>
        <p style={{ fontSize: 14, color: 'var(--off)', lineHeight: 1.6, marginBottom: 16, maxWidth: '64ch' }}>
          Esta ferramenta está sendo desenvolvida com base em casos reais de clientes da mesa DATA.VOL.
        </p>
        <a href="mailto:mesa@datavol.com" className="btn-link">Enviar caso de uso →</a>
      </div>
      <style>{`@media (max-width: 880px) { .stub-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  )
}

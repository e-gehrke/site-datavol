import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'NDF' }

export default function NDFPage() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 22 }}>
        <div>
          <p className="label" style={{ color: 'var(--lime)', marginBottom: 8 }}>Instrumento</p>
          <h1 className="display-md" style={{ color: 'var(--off)' }}>NDF</h1>
          <p className="label-sm" style={{ color: 'var(--cinza)', marginTop: 8 }}>Non-deliverable forward · contratos cambiais sem entrega física</p>
        </div>
        <span className="pill soon">Em desenvolvimento</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }} className="stub-grid">
        <div className="panel">
          <div className="panel-header"><span className="panel-title">O que essa ferramenta vai responder</span></div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              'Qual é o prêmio implícito de NDF para um vencimento específico?',
              'A taxa cotada pelo banco é coerente com a curva de mercado?',
              'Qual o custo de carregamento de NDF vs forward com entrega?',
              'Qual o impacto fiscal e contábil estimado do contrato?',
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
            <thead><tr><th>Vencimento</th><th>NDF teórica</th><th>Spread vs banco</th><th>Custo carrego</th></tr></thead>
            <tbody>
              {['1M','3M','6M','12M','24M'].map(v => (
                <tr key={v}><td className="bold">{v}</td><td className="dim">—</td><td className="dim">—</td><td className="dim">—</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="panel" style={{ marginTop: 24, background: 'transparent', borderStyle: 'dashed' }}>
        <p className="label" style={{ color: 'var(--cinza)', marginBottom: 12 }}>Cronograma</p>
        <p style={{ fontSize: 14, color: 'var(--off)', lineHeight: 1.6, marginBottom: 16, maxWidth: '64ch' }}>
          Esta ferramenta está sendo desenvolvida com base em casos reais de clientes da mesa DATA.VOL. Membros podem solicitar prioridade ou enviar casos de uso.
        </p>
        <a href="mailto:mesa@datavol.com" className="btn-link">Enviar caso de uso →</a>
      </div>
      <style>{`@media (max-width: 880px) { .stub-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  )
}

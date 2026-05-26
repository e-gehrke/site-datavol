import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Assinatura' }

export default function AssinaturaPage() {
  return (
    <div>
      <div style={{ marginBottom: 22 }}>
        <p className="label" style={{ color: 'var(--lime)', marginBottom: 8 }}>Conta</p>
        <h1 className="display-md" style={{ color: 'var(--off)' }}>Assinatura</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24 }} className="sub-grid">
        <div className="panel">
          <div className="panel-header">
            <span className="panel-title">Plano atual</span>
            <span className="pill live">Ativo</span>
          </div>
          <h2 className="display-md" style={{ color: 'var(--off)', marginBottom: 6 }}>Mesa</h2>
          <p style={{ fontSize: 14, color: 'var(--cinza)', marginBottom: 22 }}>Acesso completo · até 3 usuários · cobrança trimestral</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0, border: '1px solid var(--rule-dark)' }}>
            {[
              { l: 'Mensalidade', v: 'R$ 480' },
              { l: 'Próximo ciclo', v: '15/jul/26' },
              { l: 'Valor previsto', v: 'R$ 1.440', lime: true },
            ].map((k, i) => (
              <div key={i} style={{ padding: 18, borderRight: i < 2 ? '1px solid var(--rule-dark)' : 'none' }}>
                <p className="label-sm" style={{ color: 'var(--cinza-3)', marginBottom: 6 }}>{k.l}</p>
                <p className="mono" style={{ fontSize: 24, color: k.lime ? 'var(--lime)' : 'var(--off)' }}>{k.v}</p>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 22 }}>
            <button className="btn btn-quiet" style={{ color: 'var(--off)', borderColor: 'var(--rule-dark-strong)' }}>Faturas</button>
            <button className="btn btn-quiet" style={{ color: 'var(--off)', borderColor: 'var(--rule-dark-strong)' }}>Método de pagamento</button>
            <button className="btn btn-quiet" style={{ color: 'var(--down)', borderColor: 'rgba(255,107,107,.3)' }}>Cancelar</button>
          </div>
        </div>

        <div className="panel" style={{ background: 'transparent', borderStyle: 'dashed' }}>
          <p className="label" style={{ color: 'var(--cinza)', marginBottom: 14 }}>Upgrade corporativo</p>
          <p className="lead-sm" style={{ color: 'var(--off)', marginBottom: 18 }}>Acima de 3 usuários, dados via API ou cobertura sob medida.</p>
          <p style={{ fontSize: 13, color: 'var(--cinza)', lineHeight: 1.6, marginBottom: 20 }}>Conversamos com a empresa antes de tabelar.</p>
          <a href="mailto:mesa@datavol.com" className="btn-link">mesa@datavol.com →</a>
        </div>
      </div>

      <div className="panel" style={{ marginTop: 24 }}>
        <div className="panel-header">
          <span className="panel-title">Uso este ciclo</span>
          <span className="panel-sub">desde 15/abr · 41 dias</span>
        </div>
        <div className="kpi-row" style={{ border: 'none', background: 'transparent' }}>
          {[
            { l: 'Consultas',    v: '124',  d: 'ilimitado' },
            { l: 'Exportações',  v: '08',   d: 'ilimitado' },
            { l: 'Usuários',     v: '02/3', d: '1 vaga aberta' },
            { l: 'API requests', v: '0',    d: 'não incluído' },
          ].map((k, i) => (
            <div key={i} className="kpi" style={{ borderRight: '1px solid var(--rule-dark)', borderBottom: 'none' }}>
              <div className="kpi-label">{k.l}</div>
              <div className="kpi-value">{k.v}</div>
              <div className="kpi-delta">{k.d}</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 980px) { .sub-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  )
}

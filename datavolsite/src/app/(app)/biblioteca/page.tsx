'use client'

import { useState } from 'react'

export default function BibliotecaPage() {
  const [q, setQ] = useState('')
  const entries = [
    { term: 'Carrego cambial',  desc: 'Diferença implícita entre taxa BRL e taxa USD que compõe o forward. Reflete custo de oportunidade do capital em uma moeda vs outra.' },
    { term: 'Curva forward',    desc: 'Conjunto de preços futuros derivados via paridade de juros. Cada vértice representa um vencimento específico.' },
    { term: 'NDF',              desc: 'Non-Deliverable Forward. Contrato cambial sem entrega física da moeda; liquida pela diferença de taxa.' },
    { term: 'Spread bancário',  desc: 'Diferença entre a cotação que o banco oferece e a referência teórica calculada. Inclui margem do dealer, custo de balanço e prêmio de risco.' },
    { term: 'DI futuro',        desc: 'Contrato futuro de taxa DI negociado na B3. Vetor de leitura da curva de juros doméstica.' },
    { term: 'Cupom cambial',    desc: 'Taxa de juros em USD aplicada a operações no Brasil. Reflete custo de financiamento em dólar localmente.' },
    { term: 'Hedge accounting', desc: 'Tratamento contábil que permite alinhar resultado de hedge e objeto coberto. IFRS 9 exige documentação e teste de efetividade.' },
    { term: 'MTM',              desc: 'Marcação a mercado. Valor presente que o contrato teria se fosse liquidado hoje, dadas as condições atuais de mercado.' },
    { term: 'PTAX',             desc: 'Cotação de referência do BCB, média ponderada das operações do dia. Usada para liquidação de contratos NDF e ajustes contábeis.' },
    { term: 'Basis swap',       desc: 'Swap entre duas taxas flutuantes. Útil para arbitrar diferenças entre indexadores.' },
  ]
  const filtered = entries.filter(e =>
    e.term.toLowerCase().includes(q.toLowerCase()) ||
    e.desc.toLowerCase().includes(q.toLowerCase())
  )

  return (
    <div>
      <div style={{ marginBottom: 22 }}>
        <p className="label" style={{ color: 'var(--lime)', marginBottom: 8 }}>Suporte</p>
        <h1 className="display-md" style={{ color: 'var(--off)' }}>Biblioteca técnica</h1>
        <p className="label-sm" style={{ color: 'var(--cinza)', marginTop: 8 }}>Glossário curto. Definições objetivas e fórmulas mínimas. Sem aula longa.</p>
      </div>

      <input value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar termo…" className="input on-dark" style={{ maxWidth: 360, marginBottom: 20 }} />

      <div className="panel" style={{ padding: 0 }}>
        {filtered.length === 0 && <p style={{ padding: 32, color: 'var(--cinza)', fontSize: 13 }}>Nenhum termo encontrado.</p>}
        {filtered.map((e, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 28, padding: '22px 26px', borderBottom: i === filtered.length - 1 ? 'none' : '1px solid var(--rule-dark)' }}>
            <p style={{ fontFamily: 'var(--display)', fontSize: 22, color: 'var(--lime)' }}>{e.term}</p>
            <p style={{ fontSize: 14, color: 'var(--off)', lineHeight: 1.6 }}>{e.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

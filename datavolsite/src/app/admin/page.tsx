'use client'

import { useState } from 'react'
import type { Metadata } from 'next'

export default function AdminPage() {
  const [tab, setTab] = useState<'overview' | 'members' | 'system'>('overview')

  return (
    <div>
      <div style={{ marginBottom: 22 }}>
        <p className="label" style={{ color: 'var(--lime)', marginBottom: 8 }}>Admin</p>
        <h1 className="display-md" style={{ color: 'var(--off)' }}>Painel de administração</h1>
      </div>

      <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--rule-dark)', marginBottom: 22 }}>
        {([
          { k: 'overview', l: 'Visão geral' },
          { k: 'members',  l: 'Membros' },
          { k: 'system',   l: 'Sistema' },
        ] as const).map(t => (
          <button key={t.k} onClick={() => setTab(t.k)} className="label" style={{ padding: '12px 18px', color: tab === t.k ? 'var(--lime)' : 'var(--cinza)', borderBottom: '2px solid', borderColor: tab === t.k ? 'var(--lime)' : 'transparent', transform: 'translateY(1px)' }}>
            {t.l}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <>
          <div className="kpi-row" style={{ marginBottom: 22 }}>
            {[
              { l: 'Assinantes ativos', v: '47',        d: '+5 esta semana',  up: true },
              { l: 'MRR',              v: 'R$ 22.560',  d: '+R$ 2.400',       up: true },
              { l: 'Sessões / 30d',    v: '1.218',      d: '+8%',             up: true },
              { l: 'Consultas / 30d',  v: '4.842',      d: 'média 103/usr',   dim: true },
              { l: 'Churn 30d',        v: '2,1%',       d: '-0,4 p.p.',       up: true },
            ].map((k, i) => (
              <div key={i} className="kpi">
                <div className="kpi-label">{k.l}</div>
                <div className="kpi-value">{k.v}</div>
                <div className={'kpi-delta' + (k.dim ? '' : k.up ? ' up' : ' down')}>{k.d}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 22 }} className="adm-grid">
            <div className="panel">
              <div className="panel-header">
                <span className="panel-title">Atividade do sistema</span>
                <span className="panel-sub">últimas 24h</span>
              </div>
              {[
                { t: '14:32', a: 'sistema',  e: 'Novo membro convidado: m.silva@cambio.com.br' },
                { t: '12:08', a: 'e.gehrke', e: 'Permissão alterada → admin' },
                { t: '09:14', a: 'sistema',  e: 'Atualização de curvas: DI futuro + CME (auto)' },
                { t: '08:55', a: 'sistema',  e: 'Backup Supabase concluído (4,2 GB)' },
                { t: 'ontem', a: 'sistema',  e: 'Vol Letter Nº 003 enviada (283 destinatários)' },
                { t: 'ontem', a: 'e.gehrke', e: 'Ferramenta publicada: Comparador (beta)' },
              ].map((row, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '60px 130px 1fr', gap: 14, padding: '12px 0', borderBottom: i === 5 ? 'none' : '1px solid var(--rule-dark)', alignItems: 'baseline' }}>
                  <span className="label-sm" style={{ color: 'var(--cinza-3)' }}>{row.t}</span>
                  <span className="label-sm" style={{ color: 'var(--lime)' }}>{row.a}</span>
                  <span style={{ fontSize: 12.5, color: 'var(--off)' }}>{row.e}</span>
                </div>
              ))}
            </div>

            <div>
              <div className="panel" style={{ marginBottom: 16 }}>
                <div className="panel-header"><span className="panel-title">Saúde dos dados</span></div>
                {[
                  { l: 'DI futuro (B3)', v: 'OK',  age: 'há 28s' },
                  { l: 'PTAX (BCB)',     v: 'OK',  age: 'há 1m' },
                  { l: 'CME SOFR',       v: 'OK',  age: 'há 3m' },
                  { l: 'Cupom cambial',  v: 'lag', age: 'há 22m', warn: true },
                  { l: 'Backup diário',  v: 'OK',  age: 'esta noite' },
                ].map((r, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: i === 4 ? 'none' : '1px solid var(--rule-dark)', fontSize: 13 }}>
                    <span style={{ color: 'var(--off)' }}>{r.l}</span>
                    <span style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <span className="label-sm" style={{ color: 'var(--cinza-3)' }}>{r.age}</span>
                      <span className="label-sm" style={{ color: r.warn ? 'var(--warn)' : 'var(--lime)' }}>● {r.v}</span>
                    </span>
                  </div>
                ))}
              </div>
              <div className="panel" style={{ background: 'transparent', borderStyle: 'dashed' }}>
                <p className="label" style={{ color: 'var(--cinza)', marginBottom: 10 }}>Próximo deploy</p>
                <p className="mono" style={{ fontSize: 14, color: 'var(--off)', marginBottom: 6 }}>v2.1 · 28/05/2026</p>
                <p style={{ fontSize: 12, color: 'var(--cinza)', lineHeight: 1.6 }}>NDF v1 e refinamento do comparador.</p>
              </div>
            </div>
          </div>
          <style>{`@media (max-width: 980px) { .adm-grid { grid-template-columns: 1fr !important; } }`}</style>
        </>
      )}

      {tab === 'members' && <MembersTab />}

      {tab === 'system' && (
        <div className="panel">
          <div className="panel-header"><span className="panel-title">Sistema</span></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 22 }}>
            <div>
              <p className="label-sm" style={{ color: 'var(--cinza)', marginBottom: 8 }}>Versão</p>
              <p className="mono" style={{ color: 'var(--off)', marginBottom: 18 }}>v2.0.4 · build 412</p>
              <p className="label-sm" style={{ color: 'var(--cinza)', marginBottom: 8 }}>Ambiente</p>
              <p className="mono" style={{ color: 'var(--off)', marginBottom: 18 }}>production · vercel us-east</p>
              <p className="label-sm" style={{ color: 'var(--cinza)', marginBottom: 8 }}>Backend</p>
              <p className="mono" style={{ color: 'var(--off)' }}>supabase · postgres 16 · RLS ON</p>
            </div>
            <div>
              <p className="label-sm" style={{ color: 'var(--cinza)', marginBottom: 8 }}>Uptime 30d</p>
              <p className="mono" style={{ color: 'var(--lime)', marginBottom: 18 }}>99,94%</p>
              <p className="label-sm" style={{ color: 'var(--cinza)', marginBottom: 8 }}>Última manutenção</p>
              <p className="mono" style={{ color: 'var(--off)', marginBottom: 18 }}>21/mai · 06:14 BRT · 3m22s</p>
              <p className="label-sm" style={{ color: 'var(--cinza)', marginBottom: 8 }}>Próxima janela</p>
              <p className="mono" style={{ color: 'var(--off)' }}>28/mai · 03:00 BRT · estimada 5min</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function MembersTab() {
  const [q, setQ] = useState('')
  const members = [
    { id: 1, name: 'Eduardo Gehrke',  email: 'e.gehrke@datavol.com',       role: 'admin',  since: '12/03/2026', co: 'Volatis',          status: 'ativo' },
    { id: 2, name: 'Mateus Silva',    email: 'm.silva@cambio.com.br',       role: 'membro', since: '24/04/2026', co: 'Câmbio Verde',     status: 'ativo' },
    { id: 3, name: 'Bruna Costa',     email: 'bruna@bcindustria.com.br',    role: 'membro', since: '15/04/2026', co: 'BC Indústria',     status: 'ativo' },
    { id: 4, name: 'Pedro Almeida',   email: 'pedro@almeidaexports.com',    role: 'membro', since: '02/04/2026', co: 'Almeida Exports',  status: 'ativo' },
    { id: 5, name: 'Ana Mendes',      email: 'ana@mendescapital.com.br',    role: 'membro', since: '28/03/2026', co: 'Mendes Capital',   status: 'inativo' },
    { id: 6, name: 'Rafael Lopes',    email: 'r.lopes@tradingdesk.com.br',  role: 'membro', since: '20/03/2026', co: 'Trading Desk',     status: 'ativo' },
    { id: 7, name: 'Júlia Tavares',   email: 'julia@tavarespartners.com',   role: 'membro', since: '18/03/2026', co: 'Tavares Partners', status: 'ativo' },
    { id: 8, name: 'Felipe Souza',    email: 'felipe@souzacommodities.com', role: 'membro', since: '14/03/2026', co: 'Souza Commodities',status: 'ativo' },
  ]
  const filtered = members.filter(m => [m.name, m.email, m.co].join(' ').toLowerCase().includes(q.toLowerCase()))
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar nome, email ou empresa…" className="input on-dark" style={{ maxWidth: 360 }} />
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-quiet btn-sm" style={{ color: 'var(--cinza)' }}>Exportar CSV</button>
          <button className="btn btn-lime btn-sm">Convidar membro</button>
        </div>
      </div>
      <div className="panel" style={{ padding: 0 }}>
        <table className="dtable">
          <thead>
            <tr><th>Nome</th><th>Email</th><th>Empresa</th><th>Papel</th><th>Desde</th><th>Status</th><th></th></tr>
          </thead>
          <tbody>
            {filtered.map(m => (
              <tr key={m.id}>
                <td className="bold">{m.name}</td>
                <td className="dim mono" style={{ fontSize: 11.5 }}>{m.email}</td>
                <td>{m.co}</td>
                <td>
                  <span className="pill" style={{ background: m.role === 'admin' ? 'var(--azul)' : 'transparent', color: m.role === 'admin' ? 'var(--off)' : 'var(--cinza)', borderColor: m.role === 'admin' ? 'var(--azul)' : 'var(--rule-dark-strong)' }}>
                    {m.role}
                  </span>
                </td>
                <td className="dim mono">{m.since}</td>
                <td>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--mono)', fontSize: 11, color: m.status === 'ativo' ? 'var(--lime)' : 'var(--cinza)' }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: m.status === 'ativo' ? 'var(--lime)' : 'var(--cinza)' }} />
                    {m.status}
                  </span>
                </td>
                <td className="right"><a className="btn-link" style={{ fontSize: 10 }} href="#">Editar →</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Histórico' }

const rows = [
  { d: '25/05 14:38', tool: 'Comparador',    inputs: 'USD/BRL · 6M · banco 5,392', result: 'spread +30 bps · custo R$ 15k em USD 500k', tag: 'comparador' },
  { d: '25/05 14:21', tool: 'Curva forward', inputs: 'USD/BRL · 36M · ref 25/mai', result: 'exportado PDF · 9 vértices',                tag: 'curva' },
  { d: '25/05 13:54', tool: 'Curva juros',   inputs: 'DI futuro · JAN26→JAN31',    result: '6 vértices recalculados (auto)',           tag: 'juros' },
  { d: '24/05 17:08', tool: 'Comparador',    inputs: 'EUR/BRL · 3M · banco 5,712', result: 'spread +28 bps · custo R$ 4k em EUR 100k', tag: 'comparador' },
  { d: '24/05 11:42', tool: 'Curva forward', inputs: 'USD/BRL · 12M',              result: 'consulta · ref 5,518',                     tag: 'curva' },
  { d: '23/05 16:30', tool: 'Biblioteca',    inputs: 'carrego cambial',            result: 'definição consultada',                     tag: 'biblioteca' },
  { d: '23/05 09:14', tool: 'Curva forward', inputs: 'USD/BRL · 24M',              result: 'consulta · ref 5,793 · spread banco +52',  tag: 'curva' },
  { d: '22/05 18:02', tool: 'Comparador',    inputs: 'USD/BRL · 12M · banco 5,584', result: 'spread +66 bps · custo R$ 33k em USD 500k', tag: 'comparador' },
]

export default function HistoricoPage() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 22 }}>
        <div>
          <p className="label" style={{ color: 'var(--lime)', marginBottom: 8 }}>Histórico</p>
          <h1 className="display-md" style={{ color: 'var(--off)' }}>Consultas</h1>
          <p className="label-sm" style={{ color: 'var(--cinza)', marginTop: 8 }}>Tudo que foi consultado, calculado ou exportado · auditabilidade completa</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-quiet btn-sm" style={{ color: 'var(--cinza)' }}>Filtrar</button>
          <button className="btn btn-quiet btn-sm" style={{ color: 'var(--cinza)' }}>Exportar CSV</button>
        </div>
      </div>
      <div className="panel" style={{ padding: 0 }}>
        <table className="dtable">
          <thead>
            <tr><th>Data / hora</th><th>Ferramenta</th><th>Parâmetros</th><th>Resultado</th><th></th></tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td className="dim mono">{r.d}</td>
                <td className="bold" style={{ color: 'var(--lime)' }}>{r.tool}</td>
                <td>{r.inputs}</td>
                <td className="dim">{r.result}</td>
                <td className="right"><a className="btn-link" style={{ fontSize: 10 }} href={'/' + r.tag}>Abrir →</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

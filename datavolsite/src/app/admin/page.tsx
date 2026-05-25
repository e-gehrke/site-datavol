import { createClient } from '@/lib/supabase/server'

export const metadata = {
  title: 'Admin — DATA.VOL',
}

export default async function AdminDashboard() {
  const supabase = await createClient()

  const { count: memberCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'member')

  const STATS = [
    { label: 'Membros ativos', value: memberCount ?? 0 },
    { label: 'Ferramentas publicadas', value: 5 },
    { label: 'Módulos BASIC', value: 9 },
    { label: 'Módulos PRO', value: 9 },
  ]

  return (
    <main>
      <section className="bg-off border-b border-[rgba(166,166,166,.28)]">
        <div className="wrap py-12">
          <p className="type-label text-azul mb-2">Painel</p>
          <h1 className="type-h2">Dashboard</h1>
        </div>
      </section>

      <section className="bg-off">
        <div className="wrap py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {STATS.map(s => (
              <div key={s.label} className="card-off p-5">
                <p className="type-label text-grafite/50 mb-2">{s.label}</p>
                <p className="font-mono text-3xl font-semibold">{s.value}</p>
              </div>
            ))}
          </div>

          <div className="card-off p-6">
            <p className="type-label text-grafite/50 mb-4">Ações rápidas</p>
            <div className="flex flex-wrap gap-3">
              <a href="/admin/members"
                className="type-label text-azul border border-azul px-4 py-2 rounded hover:bg-azul hover:text-off transition-colors">
                Gerenciar membros
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

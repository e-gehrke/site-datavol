import { createClient } from '@/lib/supabase/server'

export const metadata = {
  title: 'Membros — Admin DATA.VOL',
}

export default async function MembersPage() {
  const supabase = await createClient()

  const { data: members } = await supabase
    .from('profiles')
    .select('id, full_name, email, role, created_at')
    .order('created_at', { ascending: false })

  return (
    <main>
      <section className="bg-off border-b border-[rgba(166,166,166,.28)]">
        <div className="wrap py-12 flex items-end justify-between gap-4">
          <div>
            <p className="type-label text-azul mb-2">Admin / Membros</p>
            <h1 className="type-h2">Membros</h1>
          </div>
          <p className="type-label text-grafite/50">{members?.length ?? 0} cadastrados</p>
        </div>
      </section>

      <section className="bg-off">
        <div className="wrap py-10">
          {!members || members.length === 0 ? (
            <div className="card-off p-10 text-center">
              <p className="type-label text-grafite/40">Nenhum membro cadastrado.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[rgba(166,166,166,.3)]">
                    <th className="type-label text-grafite/50 text-left py-3 pr-6">Nome</th>
                    <th className="type-label text-grafite/50 text-left py-3 pr-6">Email</th>
                    <th className="type-label text-grafite/50 text-left py-3 pr-6">Papel</th>
                    <th className="type-label text-grafite/50 text-left py-3">Desde</th>
                  </tr>
                </thead>
                <tbody>
                  {members.map(m => (
                    <tr key={m.id} className="border-b border-[rgba(166,166,166,.15)] hover:bg-grafite/5">
                      <td className="py-3 pr-6 font-medium">{m.full_name ?? '—'}</td>
                      <td className="py-3 pr-6 font-mono text-xs">{m.email}</td>
                      <td className="py-3 pr-6">
                        <span className={`type-label px-2 py-1 rounded ${
                          m.role === 'admin'
                            ? 'bg-azul text-off'
                            : 'border border-[rgba(166,166,166,.4)] text-grafite/70'
                        }`}>
                          {m.role}
                        </span>
                      </td>
                      <td className="py-3 font-mono text-xs text-grafite/50">
                        {new Date(m.created_at).toLocaleDateString('pt-BR')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

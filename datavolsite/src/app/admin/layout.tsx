import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

const ADMIN_NAV = [
  { href: '/admin',         label: 'Dashboard' },
  { href: '/admin/members', label: 'Membros'   },
]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login?next=/admin')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('user_id', user.id)
    .single()

  if (profile?.role !== 'admin') redirect('/')

  return (
    <div className="min-h-screen bg-off">
      {/* Admin top bar */}
      <div className="bg-black-archive border-b border-[rgba(255,255,255,.08)]">
        <div className="wrap">
          <div className="flex items-center justify-between h-[54px]">
            <div className="flex items-center gap-6">
              <Link href="/" className="type-label text-cinza hover:text-off transition-colors">
                DATA.VOL
              </Link>
              <span className="text-[rgba(255,255,255,.15)]">/</span>
              <span className="type-label text-lime">Admin</span>
            </div>
            <nav className="flex items-center gap-1">
              {ADMIN_NAV.map(n => (
                <Link key={n.href} href={n.href}
                  className="type-label text-cinza px-3 py-2 rounded hover:text-off hover:bg-white/5 transition-colors">
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {children}
    </div>
  )
}

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AppShell from '@/app/(app)/layout'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/?login=1')

  const { data: profile } = await supabase
    .from('profiles').select('role').eq('user_id', user.id).single()

  if (profile?.role !== 'admin') redirect('/dashboard')

  return <AppShell>{children}</AppShell>
}

export type Role = 'admin' | 'pro' | 'member'

export interface Profile {
  id: string
  user_id: string
  full_name: string | null
  email: string
  role: Role
  created_at: string
}

export interface ToolMeta {
  slug: string
  name: string
  description: string
  category: 'basic' | 'pro'
}

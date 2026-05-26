export const TICKER_DATA = [
  { sym: 'USD/BRL',   v: 5.182,   d: 0.34 },
  { sym: 'EUR/BRL',   v: 5.612,   d: -0.12 },
  { sym: 'DI 1Y',     v: 11.18,   d: 0.04,  suffix: '%' },
  { sym: 'DI 3Y',     v: 12.42,   d: -0.02, suffix: '%' },
  { sym: 'CDI',       v: 10.40,   d: 0,     suffix: '%' },
  { sym: 'DOL JUN26', v: 5.215,   d: 0.28 },
  { sym: 'DOL SET26', v: 5.273,   d: 0.41 },
  { sym: 'DOL DEZ26', v: 5.362,   d: 0.52 },
  { sym: 'DOL JUN27', v: 5.518,   d: 0.71 },
  { sym: 'DDI JUL26', v: 6.85,    d: 0.08,  suffix: '%' },
  { sym: 'IBOV',      v: 142385,  d: 0.62,  suffix: '' },
  { sym: 'EWZ',       v: 28.42,   d: 0.18 },
]

export const FORWARD_DATA = [
  { vert: 'SPOT', m: 0,  ref: 5.182, bank: 5.182, du: 0 },
  { vert: '1M',   m: 1,  ref: 5.215, bank: 5.226, du: 21 },
  { vert: '3M',   m: 3,  ref: 5.273, bank: 5.291, du: 63 },
  { vert: '6M',   m: 6,  ref: 5.362, bank: 5.388, du: 126 },
  { vert: '9M',   m: 9,  ref: 5.448, bank: 5.485, du: 189 },
  { vert: '12M',  m: 12, ref: 5.518, bank: 5.560, du: 252 },
  { vert: '18M',  m: 18, ref: 5.658, bank: 5.715, du: 378 },
  { vert: '24M',  m: 24, ref: 5.793, bank: 5.870, du: 504 },
  { vert: '36M',  m: 36, ref: 6.094, bank: 6.215, du: 756 },
]

export type NavItem = {
  route: string
  label: string
  hint: string
  live?: boolean
  beta?: boolean
  soon?: boolean
}

export type NavGroup = {
  group: string
  items: NavItem[]
}

export const APP_NAV: NavGroup[] = [
  { group: 'Painel', items: [
    { route: '/dashboard',  label: 'Dashboard',      hint: 'Overview',        live: true },
  ]},
  { group: 'Curvas', items: [
    { route: '/curva',      label: 'Dólar forward',  hint: 'USD/BRL',         live: true },
    { route: '/juros',      label: 'Curva de juros', hint: 'DI · pré',        beta: true },
  ]},
  { group: 'Instrumentos', items: [
    { route: '/ndf',        label: 'NDF',            hint: 'Non-deliverable', soon: true },
    { route: '/swaps',      label: 'Swaps',          hint: 'DI × Pré · USD',  soon: true },
    { route: '/comparador', label: 'Comparador',     hint: 'Banco × ref.',    beta: true },
  ]},
  { group: 'Suporte', items: [
    { route: '/biblioteca', label: 'Biblioteca',     hint: 'Glossário curto', live: true },
    { route: '/historico',  label: 'Histórico',      hint: 'Consultas',       live: true },
  ]},
  { group: 'Conta', items: [
    { route: '/assinatura', label: 'Assinatura',     hint: 'Plano · fatura',  live: true },
    { route: '/admin',      label: 'Admin',          hint: 'Membros',         live: true },
  ]},
]

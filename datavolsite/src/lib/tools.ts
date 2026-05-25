import type { ToolMeta } from '@/types'

export const TOOLS: ToolMeta[] = [
  { slug: 'juros-compostos', name: 'Juros Compostos',      description: 'Montante e comparativo simples vs. composto.', category: 'basic' },
  { slug: 'sac-vs-price',    name: 'SAC vs. Price',         description: 'Tabela completa com comparativo de custo total.',  category: 'basic' },
  { slug: 'taxa-real',       name: 'Taxa Real (Fisher)',     description: 'Taxa real a partir de nominal e inflação.',       category: 'basic' },
  { slug: 'var-parametrico', name: 'VaR Paramétrico',       description: 'VaR e CVaR sob hipótese de normalidade.',         category: 'pro'   },
  { slug: 'duration',        name: 'Duration e Convexidade', description: 'Macaulay, Modificada e Duration do Dólar.',       category: 'pro'   },
]

export function getTool(slug: string) {
  return TOOLS.find(t => t.slug === slug) ?? null
}

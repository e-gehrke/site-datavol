import { notFound } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { getTool, TOOLS } from '@/lib/tools'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return TOOLS.map(t => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const tool = getTool(slug)
  if (!tool) return { title: 'Ferramenta não encontrada' }
  return { title: `${tool.name} — DATA.VOL Tools` }
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params
  const tool = getTool(slug)
  if (!tool) notFound()

  const isPro = tool.category === 'pro'

  return (
    <>
      <Header />
      <main>

        {/* HEADER */}
        <section className={isPro ? 'bg-grafite' : 'bg-off border-b border-[rgba(166,166,166,.28)]'}>
          <div className="wrap py-16">
            <div className="flex items-center gap-3 mb-6">
              <Link href="/tools"
                className={`type-label hover:underline ${isPro ? 'text-cinza' : 'text-grafite/50'}`}>
                ← Ferramentas
              </Link>
              <span className={isPro ? 'text-cinza' : 'text-grafite/30'}>/</span>
              <span className={`type-label ${isPro ? 'text-lime' : 'text-azul'}`}>
                {tool.category.toUpperCase()}
              </span>
            </div>
            <h1 className={`type-h1 ${isPro ? 'text-off' : ''}`}>{tool.name}</h1>
            <p className={`type-lead mt-4 max-w-[52ch] ${isPro ? 'text-cinza' : 'text-grafite/70'}`}>
              {tool.description}
            </p>
          </div>
        </section>

        {/* TOOL AREA — placeholder until calculators are integrated */}
        <section className={isPro ? 'bg-black-archive' : 'bg-off'}>
          <div className="wrap py-16">
            <div className={`rounded border-2 border-dashed p-16 text-center ${
              isPro
                ? 'border-[rgba(255,255,255,.12)] text-cinza'
                : 'border-[rgba(166,166,166,.3)] text-grafite/40'
            }`}>
              <p className="type-label mb-2">Em desenvolvimento</p>
              <p className="text-sm">A calculadora será integrada aqui.</p>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}

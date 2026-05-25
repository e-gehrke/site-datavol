import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { TOOLS } from '@/lib/tools'

export const metadata = {
  title: 'DATA.VOL Tools — A conta antes da decisão.',
}

export default function ToolsPage() {
  const basicTools = TOOLS.filter(t => t.category === 'basic')
  const proTools   = TOOLS.filter(t => t.category === 'pro')

  return (
    <>
      <Header />
      <main>

        {/* HERO */}
        <section className="bg-off border-b border-[rgba(166,166,166,.28)]">
          <div className="wrap py-20">
            <p className="type-label text-azul mb-6">DATA.VOL Tools</p>
            <h1 className="type-h1 max-w-[18ch]">A conta antes da decisão.</h1>
            <p className="type-lead text-grafite/70 mt-6 max-w-[56ch]">
              Calculadoras e simuladores que reproduzem a lógica dos conceitos ensinados.
              Sem caixas pretas. Sem promessas.
            </p>
          </div>
        </section>

        {/* BASIC TOOLS */}
        <section className="bg-off border-b border-[rgba(166,166,166,.28)]">
          <div className="wrap py-16">
            <div className="section-label">BASIC</div>
            <p className="type-label text-grafite/50 mt-1 mb-8">Para o dia a dia financeiro</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {basicTools.map(t => (
                <Link key={t.slug} href={`/tools/${t.slug}`}
                  className="card-off p-6 hover:border-azul transition-colors group">
                  <span className="type-label text-azul block mb-3">BASIC</span>
                  <p className="font-semibold text-sm group-hover:text-azul transition-colors">{t.name}</p>
                  <p className="text-sm text-grafite/60 mt-2 leading-relaxed">{t.description}</p>
                  <span className="type-label text-azul mt-4 block">Acessar →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* PRO TOOLS */}
        <section className="bg-grafite">
          <div className="wrap py-16">
            <div className="section-label light">PRO</div>
            <p className="type-label text-cinza mt-1 mb-8">Para análise técnica e modelagem</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {proTools.map(t => (
                <Link key={t.slug} href={`/tools/${t.slug}`}
                  className="card-dark p-6 hover:border-lime transition-colors group">
                  <span className="type-label text-lime block mb-3">PRO</span>
                  <p className="font-semibold text-sm text-off group-hover:text-lime transition-colors">{t.name}</p>
                  <p className="text-sm text-cinza mt-2 leading-relaxed">{t.description}</p>
                  <span className="type-label text-lime mt-4 block">Acessar →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}

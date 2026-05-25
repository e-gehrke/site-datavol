import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { TOOLS } from '@/lib/tools'

export const metadata = {
  title: 'DATA.VOL — Finanças explicadas. Decisões melhores.',
}

const PILLARS_BASIC = [
  'Conta do cotidiano', 'Organize antes de investir', 'Juros sem medo',
  'Financiamento explicado', 'Imposto de renda sem pânico', 'Inflação e poder de compra',
  'Renda fixa para começar', 'Investimentos sem misticismo', 'Economês traduzido',
]
const PILLARS_PRO = [
  'Curva de juros', 'Derivativos', 'Hedge accounting', 'Risco',
  'Duration e convexidade', 'Valuation avançado', 'Modelagem financeira',
  'Estatística aplicada', 'Mercado de capitais',
]

export default function HomePage() {
  return (
    <>
      <Header />
      <main>

        {/* HERO */}
        <section className="bg-black-archive text-off overflow-hidden">
          <div className="wrap py-24 md:py-36">
            <p className="type-label text-cinza mb-6">volatis.com.br</p>
            <h1 className="type-hero">DATA<span className="text-lime">.</span>VOL</h1>
            <p className="type-h2 text-cinza mt-6 max-w-[18ch]">
              Finanças explicadas.<br />Decisões melhores.
            </p>
            <p className="type-lead text-cinza mt-8 max-w-[52ch]">
              Educação financeira clara, objetiva e visual para a vida real.
              Do básico ao avançado. Do boleto ao valuation, sem mistificação.
            </p>
            <div className="flex flex-wrap gap-4 mt-10">
              <Link href="/basic" className="type-label bg-off text-grafite px-6 py-3 rounded hover:bg-lime transition-colors">
                DATA.VOL BASIC
              </Link>
              <Link href="/pro" className="type-label bg-azul text-off px-6 py-3 rounded hover:bg-azul/80 transition-colors">
                DATA.VOL PRO
              </Link>
            </div>
          </div>
        </section>

        {/* MANIFESTO */}
        <section className="bg-off border-b border-[rgba(166,166,166,.28)]">
          <div className="wrap py-20">
            <div className="section-label">Manifesto</div>
            <blockquote className="type-h1 max-w-[22ch]">
              Finanças não precisam de teatro. Precisam de conta, contexto e critério.
            </blockquote>
            <p className="type-lead mt-8 max-w-[60ch] text-grafite/70">
              DATA.VOL existe para traduzir números em decisões melhores.
              Aqui, juros não são mistério, risco não é medo, investimento não é promessa
              e cálculo não é barreira. É ferramenta de autonomia.
            </p>
          </div>
        </section>

        {/* PERFIS */}
        <section className="bg-grafite border-b border-black">
          <div className="wrap py-20">
            <div className="section-label light">Ecossistema</div>
            <h2 className="type-h1 text-off mb-12">Uma marca mãe. Dois pesos.</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card-off p-8">
                <div className="type-label text-azul mb-4">DATA.VOL BASIC</div>
                <h3 className="type-h2 mb-4">Para decidir melhor no dia a dia.</h3>
                <p className="text-sm text-grafite/70 mb-6 leading-relaxed">
                  Organização, juros, IR, contratos e renda fixa. Visual claro, exemplos reais.
                </p>
                <ul className="space-y-2 mb-8">
                  {PILLARS_BASIC.map(p => (
                    <li key={p} className="flex items-center gap-2 text-sm">
                      <span className="w-1 h-1 rounded-full bg-azul shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
                <Link href="/basic" className="type-label text-azul border border-azul px-4 py-2 rounded hover:bg-azul hover:text-off transition-colors">
                  Ver BASIC
                </Link>
              </div>
              <div className="card-dark p-8">
                <div className="type-label text-lime mb-4">DATA.VOL PRO</div>
                <h3 className="type-h2 text-off mb-4">Rigor técnico com clareza visual.</h3>
                <p className="text-sm text-cinza mb-6 leading-relaxed">
                  Curva de juros, valuation, derivativos e modelagem. Fórmulas com interpretação.
                </p>
                <ul className="space-y-2 mb-8">
                  {PILLARS_PRO.map(p => (
                    <li key={p} className="flex items-center gap-2 text-sm text-cinza">
                      <span className="w-1 h-1 rounded-full bg-lime shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
                <Link href="/pro" className="type-label text-grafite bg-lime px-4 py-2 rounded hover:opacity-90 transition-opacity">
                  Ver PRO
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* TOOLS TEASER */}
        <section className="bg-off border-b border-[rgba(166,166,166,.28)]">
          <div className="wrap py-20">
            <div className="section-label">DATA.VOL Tools</div>
            <h2 className="type-h1 mb-4">A conta antes da decisão.</h2>
            <p className="type-lead text-grafite/70 mb-12 max-w-[56ch]">
              Calculadoras e simuladores que reproduzem a lógica dos conceitos ensinados.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {TOOLS.map(t => (
                <Link key={t.slug} href={`/tools/${t.slug}`}
                  className="card-off p-5 hover:border-azul transition-colors group">
                  <span className="type-label text-cinza block mb-3">{t.category.toUpperCase()}</span>
                  <p className="font-semibold text-sm group-hover:text-azul transition-colors">{t.name}</p>
                  <p className="text-sm text-grafite/60 mt-1">{t.description}</p>
                </Link>
              ))}
            </div>
            <Link href="/tools" className="type-label text-azul border border-azul px-5 py-2.5 rounded hover:bg-azul hover:text-off transition-colors">
              Ver todas as ferramentas
            </Link>
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="bg-azul">
          <div className="wrap py-20">
            <div className="section-label light">The Vol Letter</div>
            <h2 className="type-h1 text-off mb-4">Sínteses semanais de mercado.</h2>
            <p className="type-lead text-off/70 mb-10 max-w-[50ch]">
              Fórmulas, mapas conceituais e notas de mercado. Educação progressiva.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md" onSubmit={e => e.preventDefault()}>
              <input type="email" placeholder="seu@email.com"
                className="flex-1 px-4 py-3 rounded text-grafite placeholder:text-grafite/50 focus:outline-none text-sm bg-off" />
              <button type="submit"
                className="type-label bg-lime text-grafite px-6 py-3 rounded hover:opacity-90 transition-opacity">
                Quero receber
              </button>
            </form>
            <p className="type-label text-off/40 mt-4">Sem spam. Cancele quando quiser.</p>
          </div>
        </section>

        {/* ACESSO */}
        <section className="bg-black-archive border-t border-[rgba(166,166,166,.1)]">
          <div className="wrap py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <div className="section-label light">Acesso</div>
              <h2 className="type-h2 text-off">Acesse todo o conteúdo.</h2>
              <p className="type-label text-cinza mt-3 max-w-[44ch]">
                Membros têm acesso completo ao BASIC, PRO, todas as ferramentas e conteúdo exclusivo.
              </p>
            </div>
            <Link href="/login" className="type-label bg-azul text-off px-6 py-3 rounded hover:bg-azul/80 transition-colors shrink-0">
              Entrar
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}

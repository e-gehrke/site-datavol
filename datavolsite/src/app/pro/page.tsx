import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'DATA.VOL PRO — Rigor técnico com clareza visual.',
}

const MODULES = [
  {
    id: '01',
    title: 'Curva de juros',
    description: 'Estrutura a termo, precificação de títulos e leitura de DI futuro.',
    status: 'em breve',
  },
  {
    id: '02',
    title: 'Derivativos',
    description: 'Futuros, opções, swaps. Estrutura, precificação e uso real no hedge.',
    status: 'em breve',
  },
  {
    id: '03',
    title: 'Hedge accounting',
    description: 'Designação, efetividade e impacto no resultado. IFRS 9 sem mistificação.',
    status: 'em breve',
  },
  {
    id: '04',
    title: 'Risco',
    description: 'VaR, CVaR, stress testing e gestão de risco de mercado e crédito.',
    status: 'em breve',
  },
  {
    id: '05',
    title: 'Duration e convexidade',
    description: 'Macaulay, Modified Duration, Dollar Duration e sensibilidade a juros.',
    status: 'em breve',
  },
  {
    id: '06',
    title: 'Valuation avançado',
    description: 'DCF, múltiplos, WACC, custo de capital e premissas que importam.',
    status: 'em breve',
  },
  {
    id: '07',
    title: 'Modelagem financeira',
    description: 'Construção de modelos, premissas, sensibilidade e análise de cenários.',
    status: 'em breve',
  },
  {
    id: '08',
    title: 'Estatística aplicada',
    description: 'Regressão, correlação, distribuições e o que os dados realmente dizem.',
    status: 'em breve',
  },
  {
    id: '09',
    title: 'Mercado de capitais',
    description: 'Estrutura do mercado brasileiro, regulação, liquidez e formação de preços.',
    status: 'em breve',
  },
]

export default function ProPage() {
  return (
    <>
      <Header />
      <main>

        {/* HERO */}
        <section className="bg-grafite">
          <div className="wrap py-20 md:py-28">
            <p className="type-label text-lime mb-6">DATA.VOL PRO</p>
            <h1 className="type-h1 text-off max-w-[16ch]">Rigor técnico com clareza visual.</h1>
            <p className="type-lead text-cinza mt-6 max-w-[56ch]">
              Curva de juros, valuation, derivativos e modelagem.
              Fórmulas com interpretação. Sem atalhos que mentem.
            </p>
          </div>
        </section>

        {/* MODULES */}
        <section className="bg-grafite border-t border-[rgba(255,255,255,.08)]">
          <div className="wrap py-16">
            <div className="section-label light">Módulos</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
              {MODULES.map(m => (
                <div key={m.id} className="card-dark p-6">
                  <div className="flex items-start justify-between mb-4">
                    <span className="font-mono text-xs text-cinza">{m.id}</span>
                    <span className="type-label text-cinza border border-[rgba(255,255,255,.15)] px-2 py-1 rounded">
                      {m.status}
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm text-off mb-2">{m.title}</h3>
                  <p className="text-sm text-cinza leading-relaxed">{m.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TOOLS CTA */}
        <section className="bg-black-archive border-t border-[rgba(255,255,255,.06)]">
          <div className="wrap py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="section-label light">Ferramentas PRO</div>
              <h2 className="type-h2 text-off mt-2">A conta antes da decisão.</h2>
              <p className="type-label text-cinza mt-3">
                Simuladores que reproduzem a lógica dos conceitos avançados.
              </p>
            </div>
            <Link href="/tools"
              className="type-label text-grafite bg-lime px-5 py-2.5 rounded hover:opacity-90 transition-opacity shrink-0">
              Ver ferramentas
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}

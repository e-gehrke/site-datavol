import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'DATA.VOL BASIC — Para decidir melhor no dia a dia.',
}

const MODULES = [
  {
    id: '01',
    title: 'Conta do cotidiano',
    description: 'Orçamento pessoal, fluxo de caixa e controle de gastos sem planilhas complicadas.',
    status: 'em breve',
  },
  {
    id: '02',
    title: 'Organize antes de investir',
    description: 'A sequência certa: reserva de emergência, dívidas, e só então investimentos.',
    status: 'em breve',
  },
  {
    id: '03',
    title: 'Juros sem medo',
    description: 'Juros simples, compostos, capitalização e o que isso significa no seu bolso.',
    status: 'em breve',
  },
  {
    id: '04',
    title: 'Financiamento explicado',
    description: 'SAC, Price, CET, IOF. O que assinar e o que calcular antes de assinar.',
    status: 'em breve',
  },
  {
    id: '05',
    title: 'Imposto de renda sem pânico',
    description: 'Declaração, isenções, rendimentos tributáveis e o que os bancos não explicam.',
    status: 'em breve',
  },
  {
    id: '06',
    title: 'Inflação e poder de compra',
    description: 'IPCA, IGP-M, correção monetária. O que os índices medem e o que eles escondem.',
    status: 'em breve',
  },
  {
    id: '07',
    title: 'Renda fixa para começar',
    description: 'Tesouro Direto, CDB, LCI/LCA. Rentabilidade real, FGC e onde está o risco.',
    status: 'em breve',
  },
  {
    id: '08',
    title: 'Investimentos sem misticismo',
    description: 'Ações, fundos, ETFs. O que é especulação e o que é análise.',
    status: 'em breve',
  },
  {
    id: '09',
    title: 'Economês traduzido',
    description: 'SELIC, Copom, spread, liquidez, duration. Um glossário que funciona.',
    status: 'em breve',
  },
]

export default function BasicPage() {
  return (
    <>
      <Header />
      <main>

        {/* HERO */}
        <section className="bg-off border-b border-[rgba(166,166,166,.28)]">
          <div className="wrap py-20 md:py-28">
            <p className="type-label text-azul mb-6">DATA.VOL BASIC</p>
            <h1 className="type-h1 max-w-[16ch]">Para decidir melhor no dia a dia.</h1>
            <p className="type-lead text-grafite/70 mt-6 max-w-[56ch]">
              Organização, juros, IR, contratos e renda fixa.
              Visual claro, exemplos reais, sem jargão gratuito.
            </p>
          </div>
        </section>

        {/* MODULES */}
        <section className="bg-off">
          <div className="wrap py-16">
            <div className="section-label">Módulos</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
              {MODULES.map(m => (
                <div key={m.id} className="card-off p-6">
                  <div className="flex items-start justify-between mb-4">
                    <span className="font-mono text-xs text-cinza">{m.id}</span>
                    <span className="type-label text-cinza border border-[rgba(166,166,166,.4)] px-2 py-1 rounded">
                      {m.status}
                    </span>
                  </div>
                  <h3 className="font-semibold text-sm mb-2">{m.title}</h3>
                  <p className="text-sm text-grafite/60 leading-relaxed">{m.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TOOLS CTA */}
        <section className="bg-grafite/5 border-t border-[rgba(166,166,166,.2)]">
          <div className="wrap py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <div className="section-label">Ferramentas BASIC</div>
              <h2 className="type-h2 mt-2">A conta antes da decisão.</h2>
              <p className="type-label text-grafite/60 mt-3">
                Calculadoras que reproduzem os conceitos ensinados nos módulos.
              </p>
            </div>
            <Link href="/tools"
              className="type-label text-azul border border-azul px-5 py-2.5 rounded hover:bg-azul hover:text-off transition-colors shrink-0">
              Ver ferramentas
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}

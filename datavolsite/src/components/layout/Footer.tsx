import Link from 'next/link'
import Symbol from '@/components/ui/Symbol'

export default function Footer() {
  return (
    <footer className="bg-black-archive text-cinza mt-auto">
      <div className="wrap py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 rule-dark">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Symbol variant="principal" size={34} />
              <span className="text-[26px] text-off leading-none tracking-wide"
                    style={{ fontFamily: 'var(--font-display)' }}>
                DATA<span className="text-lime">.</span>VOL
              </span>
            </div>
            <p className="type-label text-cinza leading-relaxed max-w-[28ch]">
              Finanças, dados e matemática aplicada.<br />
              A conta por trás da decisão.
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="type-label text-azul mb-5">Ecossistema</p>
            <nav className="flex flex-col gap-3">
              {[
                { href: '/basic',  label: 'DATA.VOL BASIC' },
                { href: '/pro',    label: 'DATA.VOL PRO' },
                { href: '/tools',  label: 'DATA.VOL Tools' },
                { href: '/room',   label: 'DATA.VOL Room' },
              ].map(l => (
                <Link key={l.href} href={l.href}
                  className="type-label text-cinza hover:text-off transition-colors">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Newsletter */}
          <div>
            <p className="type-label text-azul mb-5">The Vol Letter</p>
            <p className="text-sm text-cinza mb-4 max-w-[30ch] leading-relaxed">
              Sínteses semanais de mercado, fórmulas e educação progressiva.
            </p>
            <form className="flex gap-2" onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                placeholder="seu@email.com"
                className="flex-1 bg-transparent border border-[rgba(166,166,166,.3)] rounded px-3 py-2 text-sm text-off placeholder:text-cinza/60 focus:outline-none focus:border-azul"
              />
              <button
                type="submit"
                className="type-label text-grafite bg-lime px-4 py-2 rounded hover:opacity-90 transition-opacity"
              >
                OK
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="type-label text-cinza/60">
            volatis.com.br &mdash; DATA.VOL
          </p>
          <p className="text-[11px] text-cinza/50 max-w-[55ch] leading-relaxed">
            Conteúdo educacional. Não constitui recomendação individual de investimento.
            Exemplos numéricos são simulações didáticas. Rentabilidade passada não garante
            rentabilidade futura.
          </p>
        </div>
      </div>
    </footer>
  )
}

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'DATA.VOL Room — Em breve.',
}

export default function RoomPage() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-black-archive min-h-[70vh] flex items-center">
          <div className="wrap py-24">
            <p className="type-label text-cinza mb-6">DATA.VOL Room</p>
            <h1 className="type-h1 text-off max-w-[14ch]">Em construção.</h1>
            <p className="type-lead text-cinza mt-6 max-w-[48ch]">
              O Room é o espaço de discussão, análise colaborativa e conteúdo em tempo real.
              Em breve.
            </p>
            <div className="flex gap-2 items-center mt-10">
              <span className="w-2 h-2 rounded-full bg-lime animate-pulse" />
              <span className="type-label text-cinza">Construção ativa</span>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

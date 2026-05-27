import type { Metadata } from 'next'
import { Bebas_Neue, Inter, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'

const bebas = Bebas_Neue({ subsets: ['latin'], weight: '400', variable: '--font-bebas', display: 'swap' })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const ibm   = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400','500','600'], variable: '--font-ibm', display: 'swap' })

export const metadata: Metadata = {
  title: { default: 'DATA.VOL', template: '%s | DATA.VOL' },
  description: 'Infraestrutura de cálculo para tesouraria corporativa. Curvas calculadas, preços legíveis, decisões menos assimétricas.',
  metadataBase: new URL('https://volatis.com.br'),
  openGraph: { siteName: 'DATA.VOL', locale: 'pt_BR', type: 'website' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${bebas.variable} ${inter.variable} ${ibm.variable}`}>
      <body>{children}</body>
    </html>
  )
}

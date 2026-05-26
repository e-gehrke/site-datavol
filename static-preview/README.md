# DATA.VOL site — pacote estático

Versão **v2.0** do site DATA.VOL, alinhada com o manifesto: infraestrutura de cálculo financeiro para tesouraria corporativa. Foco em curva de dólar forward, NDF, swaps, comparador banco × referência.

> **Essência DATA.VOL.** O usuário entende o preço e decide com mais critério.

---

## Como visualizar localmente

Não precisa de build. Basta abrir o `index.html` em qualquer navegador moderno.

Se o navegador bloquear leitura de arquivos locais (por causa do `<link rel="stylesheet">`), rode um servidor estático qualquer na pasta:

```bash
# qualquer um destes serve
python3 -m http.server 8000
npx serve .
php -S localhost:8000
```

E abra `http://localhost:8000/`.

---

## Estrutura da pasta

```
datavol-site/
├── README.md                  # este arquivo
├── index.html                 # site standalone funcional, abre direto
├── styles.css                 # folha de estilos compartilhada
└── source/                    # fontes editáveis (JSX, opcional)
    ├── tweaks-panel.jsx       # painel de Tweaks reutilizável
    ├── dv-core.jsx            # Symbol, router, login modal, dados
    ├── dv-public.jsx          # landing pública + header público
    ├── dv-app.jsx             # AppShell + páginas do produto
    └── dv-router.jsx          # roteador + tweaks
```

O `index.html` já tem todo o JavaScript **inline** (consolidado da pasta `source/`). Os arquivos em `source/` são as fontes editáveis, prontas para serem refatoradas em componentes React do Next.js depois.

---

## Rotas implementadas

| Rota              | Página                                  |
| ----------------- | --------------------------------------- |
| `#/`              | Landing pública                         |
| `#/dashboard`     | Dashboard logado                        |
| `#/curva`         | Curva dólar forward (produto-âncora)    |
| `#/juros`         | Curvas de juros (DI futuro)             |
| `#/ndf`           | NDF (em desenvolvimento)                |
| `#/swaps`         | Swaps (em desenvolvimento)              |
| `#/comparador`    | Comparador banco × referência           |
| `#/biblioteca`    | Glossário técnico curto                 |
| `#/historico`     | Histórico de consultas                  |
| `#/assinatura`    | Plano e cobrança                        |
| `#/admin`         | Painel admin (membros, sistema, dados)  |

O login é um **modal popup** acionado de qualquer botão "Entrar".

Demo de credenciais (mock):
- `admin@datavol.com` / `admin` → painel admin
- Qualquer outro email + senha de 3+ caracteres → dashboard

---

## Subindo para o GitHub

A pasta `datavol-site/` é autossuficiente. Você pode:

**Opção A — substituir o repo atual** (se quiser começar do zero estaticamente):

```bash
cd /caminho/do/repo
git rm -rf .                                  # cuidado: limpa o repo
cp -r /caminho/datavol-site/* .
git add .
git commit -m "Reescrita v2.0: pivot manifesto para tesouraria"
git push
```

**Opção B — adicionar como pasta paralela** ao Next.js existente:

```bash
cd /caminho/do/repo
mkdir -p static-preview
cp -r /caminho/datavol-site/* static-preview/
git add static-preview/
git commit -m "Preview estático v2.0 (referência visual)"
git push
```

Útil enquanto a migração para Next.js é feita gradualmente. Você consulta o protótipo, copia padrões, traduz para `.tsx`.

**Opção C — Vercel direto** (deploy do estático):

A pasta já é deployável no Vercel/Netlify sem config. Basta apontar o root para `datavol-site/` e definir build command vazio + output directory `.` (ponto).

---

## Migração para Next.js (resumo)

Quando for portar para o repo Next.js atual (`datavolsite/`), siga esse mapeamento:

| Estático aqui                      | Next.js destino                                         |
| ---------------------------------- | ------------------------------------------------------- |
| `styles.css` tokens (`:root`)      | `src/app/globals.css` (já existe, refazer com os tokens novos) |
| `index.html` `<head>` font imports | `src/app/layout.tsx` (Bebas Neue, Inter, IBM Plex Mono) |
| `source/dv-core.jsx` Symbol        | `src/components/ui/Symbol.tsx` (reescrever em TS)       |
| `source/dv-core.jsx` LoginModal    | `src/components/auth/LoginModal.tsx`                    |
| `source/dv-core.jsx` Lockup, Ticker | `src/components/layout/`                               |
| `source/dv-public.jsx` PublicLanding | `src/app/page.tsx` (substitui a landing atual)        |
| `source/dv-app.jsx` AppShell       | `src/app/(app)/layout.tsx`                              |
| `source/dv-app.jsx` CurvaForwardPage | `src/app/(app)/curva/page.tsx` (rota nova)            |
| `source/dv-app.jsx` JurosPage      | `src/app/(app)/juros/page.tsx`                          |
| `source/dv-app.jsx` ComparadorPage | `src/app/(app)/comparador/page.tsx`                     |
| `source/dv-app.jsx` NDFPage, SwapsPage | `src/app/(app)/{ndf,swaps}/page.tsx`                |
| `source/dv-app.jsx` BibliotecaPage | `src/app/(app)/biblioteca/page.tsx`                     |
| `source/dv-app.jsx` HistoricoPage  | `src/app/(app)/historico/page.tsx`                      |
| `source/dv-app.jsx` AssinaturaPage | `src/app/(app)/assinatura/page.tsx`                     |
| `source/dv-app.jsx` AdminPage      | `src/app/admin/page.tsx` (já existe, refazer)           |

### Rotas removidas / renomeadas (vs versão anterior do repo)

- `/basic` e `/pro` → **remover**. Não há mais split. Tudo cai em `/dashboard` + ferramentas.
- `/tools` e `/tools/[slug]` → **substituir** por rotas dedicadas: `/curva`, `/ndf`, `/swaps`, `/juros`, `/comparador`.
- `/room` → **remover** (não cabe no manifesto).
- `/login` → **modal popup**, não rota dedicada. Manter `/api/auth/callback` do Supabase.

### Tokens de design (copiar para globals.css)

```css
:root {
  --azul: #3B5A67;
  --azul-deep: #2a4350;
  --lime: #C6FF4D;
  --off: #F2EDE0;
  --grafite: #111111;
  --cinza: #A6A6A6;
  --cinza-2: #7d7d7d;
  --cinza-3: #5d5d5d;
  --black: #080A0B;
  --black-2: #11141a;
  --up: #C6FF4D;
  --down: #ff6b6b;
  --warn: #f6b73c;
  --display: 'Bebas Neue', sans-serif;
  --body: 'Inter', system-ui, sans-serif;
  --mono: 'IBM Plex Mono', monospace;
}
```

Toda a paleta, tipografia e classes utilitárias (.label, .display-md, .seclabel, .panel, .kpi, .dtable, etc.) estão definidas em `styles.css`. **Copie esse arquivo inteiro** para `globals.css` como base — é compatível com Tailwind v4.

---

## Tom verbal do site

- Direto, técnico, adulto. Sem promessa, sem hype, sem "fique rico".
- Palavras centrais: **curva, preço, taxa, prazo, vencimento, spread, referência, cálculo, premissa, tesouraria, hedge, forward, NDF, swap**.
- Palavras proibidas: liberdade financeira, renda passiva, call, trade, day trade, gain, retorno garantido.
- **Sem travessão (—)** em textos de copy. Use vírgula, ponto, ou separação por estrutura visual.

---

## Compliance

Toda página com cálculo financeiro deve ter o disclaimer:

> DATA.VOL é uma ferramenta educacional e analítica de apoio à leitura de preços e instrumentos financeiros. Os cálculos apresentados são estimativas baseadas em dados, premissas e metodologias informadas. Não constituem recomendação individual de investimento, operação, hedge, compra, venda ou contratação de produto financeiro.

Já está presente no `index.html` (rodapé da landing + final da página `#/curva`).

---

## Próximos passos sugeridos

1. **Subir esta pasta** para o GitHub como referência (`Opção B` ou `C` acima).
2. **Aprovar a visual direction** com o irmão e validar tom verbal.
3. **Migração gradual para Next.js**:
   - Começar pelo `globals.css` (copiar tokens)
   - Refazer `Symbol.tsx`, `Header.tsx`, `Footer.tsx`, `LoginModal.tsx`
   - Portar `page.tsx` (landing) e `(app)/dashboard/page.tsx`
   - Portar `(app)/curva/page.tsx` (produto-âncora, mais complexo)
   - Portar restantes (NDF, swaps, juros, comparador)
   - Remover rotas obsoletas (`/basic`, `/pro`, `/tools`, `/room`)
4. **Dados reais**: conectar API de cotações (CME, B3, BCB PTAX) para alimentar curva forward e ticker.
5. **Supabase**: aproveitar a `profiles` table e middleware já configurados; ajustar `role` para incluir tipo de conta (mesa/corporativo) se relevante.

---

**Versão**: v2.0.0
**Data**: 25 mai 2026
**Manifesto**: ver `uploads/DATA_VOL_MANIFESTO.md` no projeto original

# Pilares de Conteúdo: Nota Técnica (Perfil Avançado)

## Estrutura Geral

O perfil Nota Técnica opera com 7 pilares editoriais. O público assume conhecimento prévio em finanças (graduação em economia, administração, engenharia, ou experiência de mercado). O conteúdo não repetirá conceitos básicos que o Conta Certa cobre.

---

## Pilar 1: Derivativos e Estruturas

**Objetivo:** Ensinar a mecânica de precificação, payoff e uso estratégico de derivativos: opções, futuros, swaps, forwards e estruturas compostas.

**Público-alvo:** Analistas de risco, gestores de portfólio, tesoureiros corporativos, estudantes de CFA/FRM, quants iniciantes.

**Temas incluídos:**
- Diagrama de payoff de opções (call, put, long, short)
- Put-call parity
- Gregas: Delta, Gamma, Vega, Theta, Rho (intuição e fórmula)
- Black-Scholes: derivação intuitiva, premissas e limitações
- Superfície de volatilidade implícita
- Swap de taxa de juros (IRS): mecânica e uso corporativo
- Futuros de DI1 no Brasil: precificação e aplicação
- Estruturas compostas: collar, straddle, strangle, butterfly
- Estratégias de hedge com opções
- Exóticas introdutórias: barreiras, asiáticas, digitais

**Formato ideal:** Cheat sheet de payoff, carrossel técnico com fórmulas anotadas, comparativo de estruturas.

**Progressão de dificuldade:** Começa com payoff e gregas (meses 1-2), avança para precificação e estruturas (meses 3-4), chega a exóticas e superfície de vol (meses 5+).

**Exemplos de conteúdo:**
- "Como ler um diagrama de payoff de opções sem confundir com o gráfico de P&L"
- "Delta não é probabilidade (mas é parecido). A diferença importa."
- "Swap de taxa de juros: o que cada perna representa e quem assume o quê"

---

## Pilar 2: Risco e Métricas Quantitativas

**Objetivo:** Ensinar as principais métricas de risco usadas no mercado: VaR, CVaR, Greeks, volatilidade, correlação, stress testing.

**Público-alvo:** Analistas de risco de mercado e crédito, gestores de portfólio, regulados por Basileia III, estudantes de FRM.

**Temas incluídos:**
- VaR paramétrico, histórico e Monte Carlo: cálculo e limitações
- CVaR (Expected Shortfall): por que o BIS prefere ao VaR
- Volatilidade histórica vs. realizada vs. implícita
- Correlação e copula: o que diversificação realmente faz ao risco
- Beta: o que mede, como estimar, por que o histórico não basta
- Tracking error e information ratio
- Stress testing e análise de cenário
- Risco de liquidez: bid-ask spread, impacto de mercado
- Basileia III: Tier 1, Tier 2, RWAN, LCR, NSFR (contexto regulatório)

**Formato ideal:** Fórmulas anotadas com intuição, tabelas de comparação metodológica, cheat sheets de métricas.

**Progressão de dificuldade:** VaR e volatilidade primeiro (meses 1-2), correlação e diversificação (mês 3), CVaR e stress testing (meses 4-5), Basileia (mês 6+).

**Exemplos de conteúdo:**
- "VaR 95%: o que o número diz e o que ele esconde"
- "Por que o CVaR substituiu o VaR como métrica preferida do BIS"
- "Correlação vs. covariância: qual usar para medir diversificação de portfólio"

---

## Pilar 3: Curva de Juros e Renda Fixa

**Objetivo:** Ensinar a estrutura temporal da taxa de juros, precificação de títulos de renda fixa, duration, convexidade e operações de renda fixa avançadas.

**Público-alvo:** Gestores de renda fixa, traders de DI, analistas macro, tesoureiros, candidatos a CFA nível 2 e 3.

**Temas incluídos:**
- Estrutura a termo da taxa de juros (ETTJ): construção e interpretação
- Teorias da ETTJ: expectativas puras, preferência pela liquidez, segmentação
- Taxa spot vs. taxa forward: cálculo e extração
- Bootstrap de curva zero-coupon a partir de títulos com cupom
- Duration de Macaulay e Duration Modificada
- Convexidade: cálculo, intuição e uso na gestão de portfólio
- Imunização de portfólio
- Futuros de DI no Brasil: convergência, precificação, basis risk
- Marked-to-market de títulos: por que o preço varia antes do vencimento
- Spread de crédito: componentes e decomposição

**Formato ideal:** Cheat sheet de fórmulas, carrossel de construção passo a passo, tabela de comparação de métricas.

**Progressão de dificuldade:** Duration e convexidade (meses 1-2), ETTJ e taxas forward (meses 3-4), imunização e futuros de DI (meses 5-6).

**Exemplos de conteúdo:**
- "Como extrair a taxa forward implícita entre dois vértices da curva"
- "Duration Modificada: a derivada do preço em relação à taxa (e por que isso importa)"
- "Convexidade: por que a relação preço-taxa não é linear e o que você ganha com isso"

---

## Pilar 4: Valuation e Modelagem Financeira

**Objetivo:** Ensinar os principais métodos de valuation (DCF, múltiplos, APV) e a construção de modelos financeiros estruturados.

**Público-alvo:** Analistas de M&A, private equity, equity research, sell-side e buy-side, estudantes de CFA.

**Temas incluídos:**
- DCF: estrutura, FCFF vs. FCFE, taxa de desconto, valor terminal
- WACC: cálculo detalhado, custo de equity (CAPM, Damodaran), custo de dívida
- Terminal value: perpetuidade com crescimento vs. múltiplo de saída
- Análise de sensibilidade: tabelas de WACC x crescimento
- Valuation por múltiplos: EV/EBITDA, P/L, P/VPA, EV/Receita
- APV (Adjusted Present Value): quando usar vs. WACC
- Valuation de empresas sem histórico (startups, pré-revenue)
- Modelagem financeira: estrutura de 3 demonstrações integradas
- Checagem de modelo: common size, análise de sensibilidade, stress test
- LBO (Leveraged Buyout): estrutura básica e retorno ao acionista

**Formato ideal:** Modelo comentado (imagem de planilha com anotações), cheat sheet de fórmulas, tabela de múltiplos por setor.

**Progressão de dificuldade:** WACC e DCF básico (meses 1-2), múltiplos e análise de sensibilidade (meses 3-4), APV e LBO (meses 5-6).

**Exemplos de conteúdo:**
- "WACC: os 3 erros de estimação mais comuns (e como evitar)"
- "Terminal value representa 60-80% do DCF. Sabe o que está assumindo?"
- "FCFF vs. FCFE: qual descontar e a que taxa"

---

## Pilar 5: Hedge Accounting e Finanças Corporativas

**Objetivo:** Ensinar como as decisões financeiras corporativas funcionam: estrutura de capital, hedge accounting (CPC 48/IFRS 9), política de dividendos, custo de capital.

**Público-alvo:** Controllers, auditores, analistas de finanças corporativas, estudantes de CFC e CPA.

**Temas incluídos:**
- Hedge accounting (CPC 48/IFRS 9): tipos, critérios de elegibilidade
- Hedge de valor justo vs. hedge de fluxo de caixa: diferença nos lançamentos contábeis
- Instrumento de hedge e objeto protegido: definição e documentação
- Teste de efetividade de hedge: método Dollar Offset, regressão
- Política de dividendos: trade-off de Miller e Modigliani, payout ratio, yield
- Estrutura de capital: teorema de MM, trade-off teoria, pecking order
- Custo de capital por estágio de crescimento (startup vs. empresa madura)
- Recompra de ações: impacto em EPS, sinalização ao mercado
- Emissão de dívida vs. capital: impacto em WACC e valor da empresa

**Formato ideal:** Quadro de lançamentos contábeis, cheat sheet de tipos de hedge, carrossel de estrutura de capital.

**Progressão de dificuldade:** Tipos de hedge e CPC 48 (meses 1-2), lançamentos e teste de efetividade (meses 3-4), estrutura de capital e dividendos (meses 5-6).

**Exemplos de conteúdo:**
- "Hedge de valor justo: o que entra em resultado e quando"
- "Documentação de hedge accounting: o que o CPC 48 exige antes de designar"
- "Teorema de Modigliani-Miller: o que as premissas impossíveis nos ensinam sobre o mundo real"

---

## Pilar 6: Matemática Quantitativa Aplicada

**Objetivo:** Ensinar os fundamentos matemáticos que sustentam finanças quantitativas: cálculo estocástico introdutório, processos de Wiener, simulação Monte Carlo, estatística financeira.

**Público-alvo:** Quants iniciantes, engenheiros e físicos migrando para finanças, estudantes de pós-graduação em finanças quantitativas.

**Temas incluídos:**
- Movimento Browniano e processo de Wiener: intuição e formalismo
- Lema de Itô: o que é e por que importa na precificação de opções
- Equação de Black-Scholes: derivação intuitiva e premissas
- Monte Carlo em finanças: geração de caminhos, redução de variância
- Regressão aplicada: OLS em finanças, beta por regressão, problemas de heteroscedasticidade
- Séries temporais: autocorrelação, ARMA, GARCH introdutório
- Simulação de estresse: copulas, tail dependence
- Principal Component Analysis (PCA) aplicado a curvas de juros

**Formato ideal:** Fórmula com derivação passo a passo, cheat sheet matemático, exemplo numérico com código (Python/R mencionado como referência).

**Progressão de dificuldade:** Probabilidade e estatística aplicada (meses 1-2), processos estocásticos introdutórios (meses 3-4), Monte Carlo e séries temporais (meses 5-6).

**Exemplos de conteúdo:**
- "Lema de Itô: por que a derivada de uma função estocástica tem um termo extra"
- "Monte Carlo em Python: gerando 10.000 caminhos de preço e o que fazer com eles"
- "GARCH(1,1): quando a volatilidade tem memória e por que isso importa para risco"

---

## Pilar 7: Mercado de Capitais e Regulação

**Objetivo:** Ensinar a estrutura do mercado de capitais brasileiro, instrumentos, participantes e regulação.

**Público-alvo:** Profissionais do mercado financeiro, assessores de investimentos, analistas de crédito estruturado, profissionais em busca de certificações (CEA, CFP, CFA).

**Temas incluídos:**
- Estrutura do mercado brasileiro: B3, ANBIMA, CVM, Bacen
- Emissões primárias e secundárias: IPO, follow-on, bookbuilding
- Debêntures: tipos (simples, conversíveis, incentivadas), covenants, rating
- CRI e CRA: estrutura, lastro, isenção fiscal
- FIDCs: estrutura de cotas, subordinação, cessão de crédito
- Fundos de Investimento: classificação ANBIMA, gestão ativa vs. passiva
- Derivativos listados na B3: contratos futuros de DI, câmbio, índice
- Private equity e venture capital: estrutura, múltiplos de saída (MOIC, IRR)
- Regulação: CVM, ANBIMA, instrução normativa relevante

**Formato ideal:** Mapa de participantes, tabela de instrumentos, cheat sheet de regulação.

**Progressão de dificuldade:** Instrumentos básicos e estrutura (meses 1-2), emissões e derivativos (meses 3-4), estruturas avançadas (FIDC, CRI, PE) (meses 5-6).

**Exemplos de conteúdo:**
- "FIDC: como funciona a subordinação entre cotas sênior e subordinada"
- "Bookbuilding: quem define o preço de uma ação no IPO e como"
- "CRI vs. LCI: o lastro diferente e o tratamento fiscal"

---

## Distribuição Semanal Recomendada

| Dia | Pilar | Formato |
|---|---|---|
| Segunda | Risco e Métricas Quantitativas | Cheat sheet ou carrossel técnico |
| Terça | Curva de Juros e Renda Fixa | Carrossel com fórmulas |
| Quarta | Valuation e Modelagem | Modelo comentado ou comparativo |
| Quinta | Derivativos e Estruturas | Diagrama de payoff ou carrossel |
| Sexta | Matemática Quantitativa | Cheat sheet técnico (série semanal) |
| Sábado | Série recorrente | Formato da série |
| Domingo | Mercado de Capitais ou Finanças Corporativas | Carrossel ou glossário técnico |

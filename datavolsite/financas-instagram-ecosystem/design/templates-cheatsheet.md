# Templates de Cheat Sheet

## Conceito

Cheat sheets são o formato mais proprietário do Nota Técnica e um formato de apoio no Conta Certa. São folhas de referência densas, visualmente organizadas, pensadas para serem salvas e consultadas depois.

Um cheat sheet bem feito substitui um bloco de anotações. Um cheat sheet mal feito é só uma lista com fundo escuro.

---

## Estrutura Base de Cheat Sheet

### Layout em Grade de 2 Colunas (padrão)

```
╔══════════════════════════════════════════════════════════╗
║  [TÍTULO DO CHEAT SHEET]        [LOGOTIPO NOTA TÉCNICA]  ║
╠══════════════════════════╦═══════════════════════════════╣
║  SEÇÃO 1: [nome]         ║  SEÇÃO 2: [nome]              ║
║                          ║                               ║
║  Termo:                  ║  Termo:                       ║
║  Fórmula                 ║  Fórmula                      ║
║  Interpretação           ║  Interpretação                ║
║                          ║                               ║
║  Termo 2:                ║  Termo 2:                     ║
║  Fórmula                 ║  Fórmula                      ║
║  Interpretação           ║  Interpretação                ║
╠══════════════════════════╩═══════════════════════════════╣
║  SEÇÃO 3: [nome]                                         ║
║                                                          ║
║  Item 1 │ Item 2 │ Item 3 │ Item 4                       ║
╠══════════════════════════════════════════════════════════╣
║  [Disclaimer educacional]      Fundamento - notatecnica  ║
╚══════════════════════════════════════════════════════════╝
```

### Layout em Lista Estruturada (para conteúdos lineares)

```
╔══════════════════════════════════════════════════════════╗
║  [TÍTULO]                       [LOGOTIPO]               ║
╠══════════════════════════════════════════════════════════╣
║  01. [Fórmula/Conceito]                                  ║
║      Definição concisa                                   ║
║      Quando usar │ Limitação principal                   ║
╠══════════════════════════════════════════════════════════╣
║  02. [Fórmula/Conceito]                                  ║
║      ...                                                 ║
╚══════════════════════════════════════════════════════════╝
```

---

## Cheat Sheet 1: Gregas de Opções

**Série:** Cheat Sheet Técnico  
**Perfil:** Nota Técnica  
**Número:** Cheat Sheet #01

### Conteúdo

**GREGAS DE PRIMEIRA ORDEM**

| Grega | Definição | Fórmula (BS) | Sinal (Long Call) | Sinal (Long Put) |
|---|---|---|---|---|
| Delta (Δ) | ∂C/∂S | N(d1) | 0 a +1 | -1 a 0 |
| Vega (ν) | ∂C/∂σ | S√T × N'(d1) | Positivo | Positivo |
| Theta (Θ) | ∂C/∂t | [fórmula completa] | Negativo | Negativo |
| Rho (ρ) | ∂C/∂r | KTe^(-rT)N(d2) | Positivo | Negativo |

**GREGAS DE SEGUNDA ORDEM**

| Grega | Definição | Fórmula | Interpretação |
|---|---|---|---|
| Gamma (Γ) | ∂²C/∂S² = ∂Δ/∂S | N'(d1)/(Sσ√T) | Taxa de variação do Delta. Positivo para long. |
| Vanna | ∂Δ/∂σ | -N'(d1)d2/σ | Sensibilidade do Delta à vol |
| Volga | ∂ν/∂σ | ν × d1d2/σ | Convexidade em relação à vol |

**RELAÇÕES ÚTEIS**
- Gamma máxima: opção ATM, prazo curto
- Vega máxima: opção ATM, prazo longo
- Theta: Θ ≈ -(S²σ²Γ)/2 - rKe^(-rT)N(-d2) para calls
- Long Gamma = Long Vega (correlação positiva quando ATM)

---

## Cheat Sheet 2: Duration e Convexidade

**Série:** Cheat Sheet Técnico  
**Perfil:** Nota Técnica  
**Número:** Cheat Sheet #02

### Conteúdo

**DURATION**

| Métrica | Fórmula | Unidade | Interpretação |
|---|---|---|---|
| Duration de Macaulay | Σ[t × PV(CFt)] / P | Anos | Prazo médio ponderado pelo PV dos fluxos |
| Duration Modificada | DM / (1+y) | Adimensional | Δ%P ≈ -DMod × Δy |
| Duration do Dólar | DMod × P | R$/% | ΔP em R$ para Δy de 1% |
| Duration de Portfólio | Σ(wi × DMod_i) | Adimensional | Média ponderada pelo valor |

**CONVEXIDADE**

| Métrica | Fórmula | Interpretação |
|---|---|---|
| Convexidade | [1/(P(1+y)²)] × Σ[CFt × t(t+1) / (1+y)^t] | Curva da função preço-taxa |
| Ajuste de convexidade | ½ × C × (Δy)² | Adicione ao efeito da Duration |

**FÓRMULA COMPLETA DE VARIAÇÃO DE PREÇO**

ΔP/P ≈ -DMod × Δy + ½ × C × (Δy)²

**REGRAS PRÁTICAS**
- Maior duration = maior sensibilidade a juros
- Maior convexidade = melhor em cenários de alta volatilidade de taxa
- Zero-coupon bond: Duration de Macaulay = Prazo até vencimento
- Títulos com cupom: Duration < Prazo

---

## Cheat Sheet 3: Derivativos (Estruturas e Payoffs)

**Série:** Cheat Sheet Técnico  
**Perfil:** Nota Técnica  
**Número:** Cheat Sheet #03

### Conteúdo

**PAYOFFS NO VENCIMENTO**

| Posição | Payoff | Custo Inicial | Risco Máximo |
|---|---|---|---|
| Long Call | max(S-K, 0) | Prêmio | Prêmio |
| Short Call | -max(S-K, 0) | +Prêmio | Ilimitado |
| Long Put | max(K-S, 0) | Prêmio | Prêmio |
| Short Put | -max(K-S, 0) | +Prêmio | K - Prêmio |
| Long Forward | S - F | 0 (a mercado) | F |
| Short Forward | F - S | 0 (a mercado) | Ilimitado |

**ESTRATÉGIAS COMPOSTAS**

| Estratégia | Composição | Expectativa |
|---|---|---|
| Straddle | Long call + Long put (mesmo K) | Alta volatilidade |
| Strangle | Long call(K2) + Long put(K1), K1<K2 | Alta volatilidade (mais barato) |
| Bull Spread | Long call(K1) + Short call(K2) | Alta moderada |
| Bear Spread | Long put(K2) + Short put(K1) | Queda moderada |
| Butterfly | Long call(K1) + 2×Short call(K2) + Long call(K3) | Baixa volatilidade |
| Collar | Long put(K1) + Short call(K2) | Hedge com cap |

**PUT-CALL PARITY**
C - P = S - Ke^(-rT)

---

## Cheat Sheet 4: Valuation - DCF e Múltiplos

**Série:** Cheat Sheet Técnico  
**Perfil:** Nota Técnica  
**Número:** Cheat Sheet #04

### Conteúdo

**DCF (DISCOUNTED CASH FLOW)**

| Elemento | Fórmula | Observação |
|---|---|---|
| FCFF | EBIT(1-T) + D&A - CAPEX - ΔCWC | Free cash flow para todos |
| FCFE | FCFF - Juros(1-T) + ΔDívida | Free cash flow para equity |
| WACC | (E/V)Re + (D/V)Rd(1-T) | Desconto para FCFF |
| Valor Terminal (Gordon) | FCFF_n+1 / (WACC - g) | Assumir g sustentável |
| Valor Terminal (Múltiplo) | EBITDA_n × Múltiplo | Usar múltiplo de exit relevante |

**CUSTO DE EQUITY**

Re = Rf + β × ERP + Country Risk Premium

| Parâmetro | Fonte comum |
|---|---|
| Rf | IPCA+ de longo prazo (Brasil) ou T-Bond 10Y (USD) |
| β | Damodaran (setorial, re-alavancado) |
| ERP | ERP histórico EUA + CRP do Damodaran |

**PRINCIPAIS MÚLTIPLOS**

| Múltiplo | Numerador | Denominador | Limitações |
|---|---|---|---|
| EV/EBITDA | Enterprise Value | EBITDA | Ignora Capex e capital de giro |
| P/L | Preço | LPA | Sensível à estrutura de capital e contabilidade |
| EV/Receita | Enterprise Value | Receita | Para empresas sem lucro |
| P/VPA | Preço | Valor Patrimonial/Ação | Útil para financeiras |

---

## Cheat Sheet 5: VaR e Métricas de Risco

**Série:** Cheat Sheet Técnico  
**Perfil:** Nota Técnica  
**Número:** Cheat Sheet #05

### Conteúdo

**VAR (VALUE AT RISK)**

| Método | Fórmula | Hipótese | Limitação |
|---|---|---|---|
| Paramétrico | σ × z_α × √h × P | Normalidade | Subestima caudas |
| Histórico | Percentil dos retornos hist. | Estacionariedade | Não captura inéditos |
| Monte Carlo | Percentil das simulações | Depende do modelo | Dependente das premissas |

**CVAR (EXPECTED SHORTFALL)**

CVaR_α = E[Perda | Perda > VaR_α]

Propriedades: monotônico, homogêneo, sub-aditivo, invariante por translação (medida de risco coerente - Artzner 1999)

**OUTRAS MÉTRICAS**

| Métrica | O que mede |
|---|---|
| Volatilidade (σ) | Dispersão dos retornos |
| Beta (β) | Risco sistêmico relativo ao mercado |
| Tracking Error | Desvio em relação ao benchmark |
| Information Ratio | Retorno ativo / Tracking Error |
| Sharpe | Retorno excessivo / σ do portfólio |
| Sortino | Retorno excessivo / σ dos retornos negativos |

**VOLATILIDADE GARCH(1,1)**

σ²_t = ω + α × ε²_{t-1} + β × σ²_{t-1}

Condição de estacionariedade: α + β < 1

---

## Cheat Sheet Conta Certa: Tributação de Investimentos

**Série:** Série Antes do IR  
**Perfil:** Conta Certa  
**Número:** Checklist tributário

### Conteúdo

**RENDA FIXA (tabela regressiva)**

| Prazo de aplicação | Alíquota de IR |
|---|---|
| Até 180 dias | 22,5% |
| De 181 a 360 dias | 20,0% |
| De 361 a 720 dias | 17,5% |
| Acima de 720 dias | 15,0% |

**ISENTOS DE IR (para pessoa física)**
- LCI e LCA
- CRI e CRA
- Debêntures incentivadas (Lei 12.431)
- Poupança
- Dividendos (distribuição de lucros - enquanto vigente a legislação atual)

**AÇÕES**
- Swing trade: 15% sobre ganho líquido
- Day trade: 20% sobre ganho líquido
- Isenção: vendas até R$ 20.000/mês (swing trade, ações)
- Dividendos: isentos (enquanto vigente a legislação atual)

**FIIs**
- Ganho de capital: 20% sobre ganho na venda
- Rendimento mensal distribuído: isento para PF (requisitos: fundo com +50 cotistas, cotas negociadas em bolsa, cotista não pode ter mais de 10% das cotas)

**FUNDOS DE INVESTIMENTO (come-cotas)**
- Come-cotas em maio e novembro
- Curto prazo (prazo médio < 365 dias): 20%
- Longo prazo (prazo médio ≥ 365 dias): 15%

> Legislação tributária pode ser alterada. Verificar normativa vigente antes de declarar.

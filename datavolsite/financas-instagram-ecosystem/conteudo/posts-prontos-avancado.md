# Posts Prontos: Nota Técnica (10 Posts Completos)

---

## Post 1: Duration e Convexidade

**Título:** "Duration Modificada e Convexidade: a segunda ordem que muda a gestão de portfólio de renda fixa"

### Estrutura Slide a Slide

**Slide 1 (Capa)**
"Duration é a derivada de primeira ordem do preço em relação à taxa. Convexidade é a segunda. Sabe o que isso significa para a sua carteira?"

**Slide 2**
"Duration de Macaulay: o que é."
DM = Σ [t × PV(CFt)] / Preço
É a média ponderada dos prazos dos fluxos, ponderados pelo valor presente de cada fluxo. Mede quanto tempo, em termos de valor presente, o título leva para ser pago.

**Slide 3**
"Duration Modificada: a versão prática."
DMod = DM / (1 + y)
Onde y é o yield por período. Interpretação: variação percentual aproximada no preço para uma variação de 1 ponto percentual na taxa.
ΔP/P ≈ -DMod × Δy

**Slide 4**
Exemplo numérico: título com DMod = 7. Se a taxa sobe 100 bps (1%): preço cai aproximadamente 7%. Se a taxa cai 100 bps: preço sobe aproximadamente 7%. A Duration diz que a resposta é simétrica. Ela não é.

**Slide 5**
"Por que a relação não é simétrica? Convexidade."
A função preço-taxa é convexa (curva), não linear. Duration é a tangente naquele ponto. Convexidade mede o erro da aproximação linear.

**Slide 6**
Fórmula de convexidade:
C = [1 / (P × (1+y)²)] × Σ [CFt × t × (t+1) / (1+y)^t]

Ajuste de preço com convexidade:
ΔP/P ≈ -DMod × Δy + ½ × C × (Δy)²

**Slide 7**
Exemplo numérico com os dois termos: Título com DMod = 7 e convexidade = 60. Variação de taxa: +200 bps.
Aproximação linear: -7% × 2 = -14%
Com convexidade: -14% + ½ × 60 × (0,02)² = -14% + 1,2% = -12,8%
O título cai menos do que a Duration sugere.

**Slide 8**
"O que mais convexidade significa?"
Para dois títulos com a mesma Duration: o de maior convexidade performará melhor se os juros se moverem muito em qualquer direção. A convexidade é um bem. Tem preço.

**Slide 9**
"Aplicação em gestão de portfólio:"
Imunização: match de Duration entre ativos e passivos. Mas Duration sozinha não é suficiente: é preciso também match de convexidade para proteger contra grandes movimentos de taxa.

**Slide 10 (Encerramento)**
Fórmulas sintetizadas. Logotipo Nota Técnica. Disclaimer educacional.

### Legenda

Duration mede a sensibilidade de primeira ordem do preço do título à taxa de juros. Convexidade corrige o erro dessa aproximação linear quando o movimento de taxa é grande.

Para gestão de portfólio de renda fixa, as duas métricas são inseparáveis. O post detalha fórmulas, intuição e aplicação prática.

Conteúdo educacional.

### CTA

"Calcule a convexidade do título de maior prazo na sua carteira. O exercício vale o tempo."

### Observação Visual

Gráfico preço-taxa mostrando a curva convexa e a tangente linear (Duration). A lacuna entre os dois é a contribuição da convexidade. Visual técnico, fundo escuro, tipografia mono para fórmulas.

---

## Post 2: VaR e CVaR

**Título:** "VaR paramétrico, histórico e Monte Carlo: quando cada método subestima o risco"

### Estrutura Slide a Slide

**Slide 1 (Capa)**
"O VaR 99% diz que você perde mais de X em 1% dos dias. Mas o que acontece nesse 1%? O VaR não responde. O CVaR responde."

**Slide 2**
"VaR Paramétrico:"
VaR = σ × z × √h
Onde σ é a volatilidade diária, z é o quantil da normal (2,33 para 99%), h é o horizonte em dias.
Hipótese central: retornos seguem distribuição normal.

**Slide 3**
"O problema da normalidade:"
Retornos financeiros têm caudas pesadas (fat tails) e assimetria negativa. O VaR paramétrico consistentemente subestima perdas extremas porque assume que o mundo tem caudas exponencialmente decrescentes.

**Slide 4**
"VaR Histórico:"
Ordena os retornos históricos do período. O VaR 99% é o percentil 1% dos retornos históricos observados.
Vantagem: não assume distribuição. Desvantagem: assume que o passado representa o futuro. Não captura cenários inéditos.

**Slide 5**
"VaR Monte Carlo:"
Simula N cenários futuros a partir de um modelo de processo de preços (ex: log-normal, GBM, modelos de volatilidade estocástica). Calcula a perda do percentil relevante nos cenários simulados.
Mais flexível. Mais dependente das hipóteses do modelo.

**Slide 6**
"CVaR (Expected Shortfall):"
CVaR_α = E[Perda | Perda > VaR_α]
É a perda esperada dado que você está na cauda. Captura não apenas onde a cauda começa, mas a severidade da cauda.

**Slide 7**
"Por que o BIS (Basel III) prefere CVaR ao VaR?"
VaR não é sub-aditivo: VaR(A+B) pode ser maior que VaR(A) + VaR(B). Isso viola o princípio de que diversificação reduz risco.
CVaR é coerente no sentido de Artzner (1999): satisfaz as quatro propriedades de uma medida de risco coerente.

**Slide 8**
Comparação em tabela:
| Métrica | Distribuição | Cauda | Coerência | Interpretação |
|---|---|---|---|---|
| VaR Param | Normal | Ignora | Não | Fácil |
| VaR Histórico | Nenhuma | Observada | Não | Moderada |
| Monte Carlo | Depende | Simulada | Não | Alta |
| CVaR | Qualquer | Captura | Sim | Moderada |

**Slide 9**
"Na prática:"
Muitos sistemas reportam VaR por requisito regulatório e CVaR internamente para gestão real. Saber as limitações de cada um é tão importante quanto calculá-los.

**Slide 10 (Encerramento)**
Cheat sheet de fórmulas. Logotipo. Disclaimer.

### Legenda

VaR e CVaR não são concorrentes. São métricas complementares que respondem a perguntas diferentes sobre o risco de cauda de um portfólio.

O post detalha os três métodos de VaR, suas hipóteses e limitações, e por que o regulador prefere o CVaR.

Conteúdo educacional.

### CTA

"Qual método de risco o seu desk usa? Sabe o que essa escolha implica sobre o que você não está medindo?"

### Observação Visual

Gráfico de distribuição de retornos com cauda pesada vs. normal. Marcação visual do VaR e do CVaR na distribuição. Fundo escuro, tipografia técnica.

---

## Post 3: Put-Call Parity

**Título:** "Put-Call Parity: a relação de arbitragem que conecta calls e puts. E o que acontece quando ela é violada."

### Estrutura Slide a Slide

**Slide 1 (Capa)**
"Se você conhece o preço de uma call, você pode calcular o preço teórico da put correspondente. Essa é a put-call parity."

**Slide 2**
"A fórmula:"
C - P = S - K × e^(-rT)
Onde: C = preço da call, P = preço da put, S = preço do ativo hoje, K = strike, r = taxa livre de risco, T = tempo até o vencimento.

**Slide 3**
"Derivação por arbitragem:"
Portfolio A: comprar call + investir K × e^(-rT) no ativo livre de risco.
Portfolio B: comprar put + comprar o ativo.
No vencimento, os dois portfólios têm o mesmo payoff para qualquer preço do ativo. Portanto, devem ter o mesmo custo hoje.

**Slide 4**
"O que acontece se a paridade for violada?"
Se C - P > S - K × e^(-rT): venda o portfolio A e compre o B. Lucro sem risco.
Se C - P < S - K × e^(-rT): compre o portfolio A e venda o B. Lucro sem risco.
Em mercados eficientes, a arbitragem elimina o desvio rapidamente.

**Slide 5**
"Exemplo numérico:"
S = R$ 50, K = R$ 50, r = 10% ao ano, T = 1 ano.
K × e^(-rT) = 50 × e^(-0,1) = R$ 45,24.
Se C = R$ 5,50 e P = R$ 0,00: paridade violada. C - P = 5,50 ≠ 50 - 45,24 = 4,76.
Posição de arbitragem disponível.

**Slide 6**
"Put-call parity para opções americanas:"
Não há igualdade, mas há um par de desigualdades:
S - K ≤ C - P ≤ S - K × e^(-rT)
Opções americanas podem ser exercidas antecipadamente, o que quebra a igualdade estrita.

**Slide 7**
"Implicações para precificação:"
Você não precisa do Black-Scholes para precificar uma call se já tem o preço da put e o ativo. A paridade é uma relação entre instrumentos, independente do modelo de precificação.

**Slide 8**
"Na prática:"
A put-call parity é usada para: verificar consistência de cotações, construir posições sintéticas, identificar desvios de fair value em mercados ilíquidos.

**Slide 9**
"Posições sintéticas:"
Call sintética = put + ativo.
Put sintética = call - ativo.
Forward sintético = call - put.
Essas equivalências têm uso direto em hedge e estruturação.

**Slide 10 (Encerramento)**
Fórmula resumida. Logotipo. Disclaimer.

### Legenda

Put-call parity não é apenas uma fórmula. É um argumento de arbitragem que conecta os preços de calls, puts, ativo e ativo livre de risco.

O post detalha a derivação, o exemplo numérico, a versão americana e as implicações para posições sintéticas.

Conteúdo educacional.

### CTA

"Veja no mercado de opções listado se a paridade está sendo respeitada para alguma série líquida."

### Observação Visual

Tabela de payoff dos dois portfólios no vencimento (para S > K e S < K). As fórmulas em destaque com variáveis claramente identificadas.

---

## Post 4: WACC

**Título:** "WACC: os 3 erros de estimação mais frequentes em modelos de valuation"

### Estrutura Slide a Slide

**Slide 1 (Capa)**
"O WACC entra em todo DCF. É o número que mais afeta o valor. E é o que mais contém erros de estimação."

**Slide 2**
"A fórmula:"
WACC = (E/V) × Re + (D/V) × Rd × (1 - T)
Onde: E = capital próprio, D = dívida, V = E + D, Re = custo do capital próprio, Rd = custo da dívida, T = alíquota de IR.

**Slide 3**
"Erro 1: usar beta histórico sem ajuste."
Beta estimado por regressão captura o risco histórico, mas empresas mudam de alavancagem, setor e momento operacional. Beta histórico de 5 anos pode não representar o beta forward-looking.
Alternativa: beta por setor (Damodaran), re-alavancado para a estrutura de capital atual.

**Slide 4**
"Como re-alavancar o beta:"
Fórmula de Hamada:
β_alavancado = β_desalavancado × [1 + (1-T) × (D/E)]
Desalavanca os betas de empresas comparáveis, tira a média e re-alavanca para a estrutura alvo da empresa avaliada.

**Slide 5**
"Erro 2: usar valor contábil em vez de valor de mercado para os pesos E/V e D/V."
O WACC reflete o custo de capital na margem. Os pesos devem refletir a estrutura de capital a valor de mercado, não a contábil.
Para empresas privadas: usar estrutura alvo ou comparáveis.

**Slide 6**
"Erro 3: usar a taxa de empréstimo como custo da dívida sem ajustar para o benefício fiscal correto."
O custo líquido da dívida é Rd × (1-T). Mas a alíquota T deve refletir a alíquota efetiva da empresa, não necessariamente 34% (alíquota nominal no Brasil).
Se a empresa tem prejuízo fiscal, o benefício do escudo fiscal pode não se materializar.

**Slide 7**
"O prêmio de risco de equity (ERP):"
Re = Rf + β × ERP + prêmio adicional (se aplicável)
Rf: taxa livre de risco (IPCA + para Brasil, T-Bill para USD).
ERP: geralmente usa-se o ERP histórico dos EUA + country risk premium para mercados emergentes (Damodaran publica anualmente).

**Slide 8**
"Análise de sensibilidade:"
O WACC é altamente sensível ao ERP e ao beta. Sempre construir tabela de sensibilidade WACC × taxa de crescimento terminal. Os dois números mais impactantes no DCF.

**Slide 9**
Tabela de sensibilidade: crescimento terminal (linhas) × WACC (colunas). Cada célula: valor da empresa. Mostra o intervalo de valuation resultante.

**Slide 10 (Encerramento)**
Fórmula resumida com os 3 erros destacados. Logotipo. Disclaimer.

### Legenda

WACC errado = valuation errado. E os erros mais comuns não são de aritmética. São de premissa.

O post detalha os 3 erros de estimação mais frequentes: beta histórico, pesos contábeis e escudo fiscal incorreto.

Conteúdo educacional. Usando empresa genérica como exemplo.

### CTA

"Pegue seu último modelo DCF. Qual fonte de beta você usou? Vale conferir."

### Observação Visual

Fórmula do WACC com cada componente colorido de forma diferente. Tabela de sensibilidade com heatmap de valores. Fundo escuro, destaque para os 3 erros em vermelho.

---

## Post 5: Hedge Accounting - CPC 48

**Título:** "Hedge de Valor Justo vs. Hedge de Fluxo de Caixa: a diferença que aparece no balanço"

### Estrutura Slide a Slide

**Slide 1 (Capa)**
"Você designou o hedge. O instrumento está funcionando. Mas onde o efeito entra no balanço? Depende do tipo de hedge."

**Slide 2**
"O CPC 48 (IFRS 9) define 3 tipos de hedge accounting:"
1. Hedge de valor justo (Fair Value Hedge)
2. Hedge de fluxo de caixa (Cash Flow Hedge)
3. Hedge de investimento líquido no exterior
O terceiro é específico para filiais externas. Os dois primeiros são os mais comuns.

**Slide 3**
"Hedge de Valor Justo: o mecanismo."
Objeto protegido: ativo ou passivo reconhecido, ou compromisso firme não reconhecido.
Risco hedgeado: variação no valor justo.
Efeito contábil: as variações do instrumento de hedge E do objeto protegido vão para resultado simultaneamente.

**Slide 4**
"Hedge de Valor Justo: exemplo."
Empresa tem um passivo de taxa fixa (dívida pré-fixada de R$ 100M a 10% a.a.).
Contrata swap: recebe taxa fixa + paga taxa variável.
Se as taxas sobem: o valor do passivo cai (ganho) e o swap gera perda. Se as taxas caem: o oposto.
Ambos vão para resultado: os efeitos se compensam.

**Slide 5**
"Hedge de Fluxo de Caixa: o mecanismo."
Objeto protegido: fluxo de caixa variável de ativo, passivo ou transação projetada altamente provável.
Risco hedgeado: variação no fluxo de caixa futuro.
Efeito contábil: a parcela efetiva do hedge vai para OCI (Outros Resultados Abrangentes). Migra para resultado quando o objeto protegido afeta resultado.

**Slide 6**
"Hedge de Fluxo de Caixa: exemplo."
Empresa exportadora tem receita futura em USD projetada.
Contrata forward de câmbio.
Ganhos ou perdas no forward entram em OCI. Quando a exportação ocorre e é reconhecida na DRE, o valor de OCI é liberado para resultado.

**Slide 7**
Quadro comparativo:
| Tipo | Objeto | Risco | Instrumento vai para |
|---|---|---|---|
| Valor Justo | Reconhecido/Compromisso | Variação VJ | Resultado |
| Fluxo de Caixa | Fluxo variável/Projetado | Variação fluxo | OCI → Resultado |

**Slide 8**
"O que vai para resultado vs. OCI no CFH:"
Apenas a parcela efetiva do hedge vai para OCI.
A parcela inefetiva vai diretamente para resultado.
Por isso o teste de efetividade é obrigatório.

**Slide 9**
"Critérios de elegibilidade (CPC 48):"
1. Documentação formal na data de designação.
2. Existência de relacionamento econômico entre objeto e instrumento.
3. Não dominância do risco de crédito.
4. Razão de hedge dentro de intervalo aceitável (não tipicamente >125% ou <80% para manter efetividade).

**Slide 10 (Encerramento)**
Resumo visual. Logotipo. Disclaimer: "Este conteúdo reflete o CPC 48 e IFRS 9. Verificar a versão vigente antes de aplicar."

### Legenda

A diferença entre hedge de valor justo e hedge de fluxo de caixa não é apenas conceitual. Ela determina onde o efeito do instrumento vai aparecer no balanço: resultado ou OCI.

O post detalha os dois mecanismos com exemplos numéricos e o quadro de critérios de elegibilidade do CPC 48.

Conteúdo educacional. Verifique a norma vigente para aplicação.

### CTA

"Você trabalha com hedge accounting? Qual tipo de hedge sua empresa usa mais frequentemente?"

### Observação Visual

Diagrama de fluxo mostrando o caminho contábil de cada tipo de hedge. Tabela comparativa limpa. Destaques em OCI vs. Resultado.

---

## Post 6: Estrutura a Termo da Taxa de Juros

**Título:** "ETTJ: como extrair a taxa forward implícita entre dois vértices quaisquer da curva"

### Estrutura Slide a Slide

**Slide 1 (Capa)**
"A curva de juros não é só um gráfico. É um mapa de expectativas e prêmios. Saber ler esse mapa é uma habilidade técnica."

**Slide 2**
"O que é a ETTJ:"
É a estrutura de taxas spot (zero-coupon) para diferentes horizontes. Cada ponto na curva é a taxa que um zero-coupon bond paga de hoje até aquele prazo.

**Slide 3**
"Taxa spot vs. taxa forward:"
Taxa spot (s_t): taxa da operação de hoje até t.
Taxa forward (f(t1,t2)): taxa implícita da operação de t1 até t2, visto de hoje.

**Slide 4**
"A relação de não-arbitragem:"
(1 + s_t2)^t2 = (1 + s_t1)^t1 × (1 + f(t1,t2))^(t2-t1)
Resolvendo para a taxa forward:
f(t1,t2) = [(1+s_t2)^t2 / (1+s_t1)^t1]^(1/(t2-t1)) - 1

**Slide 5**
"Exemplo numérico:"
Taxa spot de 1 ano (s_1) = 12% a.a.
Taxa spot de 2 anos (s_2) = 13% a.a.
Taxa forward implícita de 1 para 2 anos:
f(1,2) = [(1,13)^2 / (1,12)^1]^1 - 1 = (1,2769 / 1,12) - 1 = 13,97% a.a.

**Slide 6**
"O que essa taxa forward diz?"
O mercado está implicitamente precificando que a taxa de juros de 1 para 2 anos será de ~14%. Se você discordar, há uma operação de valor disponível.

**Slide 7**
"Teorias sobre por que a curva tem a forma que tem:"
1. Expectativas puras: a forward reflete expectativas de taxa futura.
2. Preferência por liquidez: a forward > expectativa por um prêmio de liquidez.
3. Segmentação de mercado: demanda e oferta por prazo específico determinam o yield.

**Slide 8**
"Aplicação em gestão de portfólio:"
Se as taxas forward superestimam as taxas futuras esperadas: prefira duration mais longa (a curva oferece carry positivo).
Se subestimam: reduza duration ou faça hedge.

**Slide 9**
"Bootstrap: construindo a curva zero-coupon a partir de títulos com cupom."
Para construir a ETTJ a partir de títulos que pagam cupons, usa-se o bootstrap iterativo: extrai-se a taxa zero de cada prazo progressivamente, começando pelo mais curto.

**Slide 10 (Encerramento)**
Fórmulas da taxa forward. Logotipo. Disclaimer.

### Legenda

Taxa spot e taxa forward não são a mesma coisa. A diferença entre elas revela o que o mercado está precificando para os juros futuros.

O post detalha a fórmula de extração de taxa forward, um exemplo numérico passo a passo e as teorias sobre a forma da curva.

Conteúdo educacional.

### CTA

"Calcule a taxa forward implícita de 1 para 2 anos usando os vértices do DI Futuro de hoje."

### Observação Visual

Gráfico da curva de juros com vértices marcados. Derivação da taxa forward passo a passo com setas indicando os prazos. Fundo escuro, destaque para os números calculados.

---

## Post 7: FCFF vs. FCFE

**Título:** "FCFF ou FCFE: qual fluxo descontar e a que taxa. O erro mais comum em modelos DCF."

### Estrutura Slide a Slide

**Slide 1 (Capa)**
"Você construiu o fluxo de caixa livre. Mas de quem é esse fluxo? Da empresa ou dos acionistas? A resposta muda a taxa de desconto."

**Slide 2**
"FCFF: Free Cash Flow to Firm"
Fluxo disponível para todos os provedores de capital (acionistas e credores).
FCFF = EBIT × (1-T) + D&A - CAPEX - ΔCWC
Desconta com WACC.

**Slide 3**
"FCFE: Free Cash Flow to Equity"
Fluxo disponível apenas para os acionistas, após pagamento de credores.
FCFE = FCFF - Juros × (1-T) + ΔDívida
Desconta com o custo do capital próprio (Re).

**Slide 4**
"A relação entre os dois:"
FCFE = FCFF - Juros líquidos + variação de dívida
O FCFE é mais volátil porque o nível de alavancagem afeta diretamente o que sobra para o acionista.

**Slide 5**
Tabela comparativa:
| | FCFF | FCFE |
|---|---|---|
| Para quem | Empresa toda | Acionistas |
| Taxa de desconto | WACC | Re (custo equity) |
| Resultado | Valor da empresa (EV) | Valor do equity |
| Alavancagem embutida | Não | Sim |

**Slide 6**
"Qual usar?"
FCFF: mais comum em M&A e equity research. Separa decisão de investimento da decisão de financiamento.
FCFE: mais direto para avaliar o retorno ao acionista. Útil quando a estrutura de capital muda ao longo do tempo (LBO, empresas em reestruturação).

**Slide 7**
"O erro clássico: misturar os dois."
Usar FCFF e descontar com Re (custo do equity): subestima o valor porque usa taxa mais alta que o WACC.
Usar FCFE e descontar com WACC: superestima o valor porque usa taxa mais baixa que Re.
As duas abordagens devem dar o mesmo resultado do patrimônio líquido se feitas corretamente.

**Slide 8**
Reconciliação: Se EV = VP(FCFF) com WACC, então Equity = EV - Dívida Líquida. Deve ser igual a VP(FCFE) com Re.

**Slide 9**
"Para empresas alavancadas:"
O FCFE pode ser negativo nos primeiros anos (empresa pagando dívida). Isso não é problemático. O modelo deve capturar isso corretamente, com FCFE tornando-se positivo quando a dívida é reduzida.

**Slide 10 (Encerramento)**
Cheat sheet: FCFF + WACC = EV. FCFE + Re = Equity Value. Logotipo. Disclaimer.

### Observação Visual

Diagrama de fluxo mostrando FCFF saindo da empresa para todos os provedores de capital e FCFE saindo para acionistas. Tabela comparativa clara. Fundo escuro.

### Legenda

FCFF desconta com WACC. FCFE desconta com o custo de equity. Usar a taxa errada para o fluxo certo gera erro sistemático de valuation.

O post detalha as fórmulas, as diferenças conceituais e quando cada abordagem é mais adequada.

Conteúdo educacional.

### CTA

"No seu próximo modelo DCF: verifique qual fluxo você construiu e qual taxa está usando para descontar."

---

## Post 8: Gregas de Opções - Gamma

**Título:** "Gamma: por que a convexidade das opções importa para quem faz hedge de Delta"

### Estrutura Slide a Slide

**Slide 1 (Capa)**
"Delta diz quanto seu portfólio de opções se move com o ativo. Gamma diz com que velocidade esse Delta muda. Se você não monitora Gamma, está voando cego."

**Slide 2**
"Delta revisado:"
Δ = ∂C/∂S (para calls)
Δ = ∂P/∂S (para puts)
Delta mede a sensibilidade de primeira ordem do preço da opção ao preço do ativo.

**Slide 3**
"Gamma:"
Γ = ∂²C/∂S² = ∂Δ/∂S
É a derivada de segunda ordem do preço da opção (ou equivalentemente, a taxa de variação do Delta).
Gamma é sempre positivo para posições long em calls e puts.

**Slide 4**
"Fórmula do Gamma (Black-Scholes):"
Γ = N'(d1) / (S × σ × √T)
Onde N'(d1) é a densidade normal padrão em d1.
Gamma é maior para opções at-the-money e com prazo curto.

**Slide 5**
"O que Gamma alto significa:"
Se Gamma é alto: o Delta muda rapidamente com o preço do ativo. Um portfólio delta-neutro deixa de ser neutro rapidamente. O custo de rebalancear é alto.

**Slide 6**
"Gamma e rebalanceamento de hedge:"
Delta hedge: você vende Delta unidades do ativo para cada opção comprada. Se Gamma = 0,05: para cada $1 de movimento no ativo, seu Delta muda em 0,05. Precisa rebalancear.

**Slide 7**
"Gamma vs. Theta: o trade-off central:"
Opções long têm Gamma positivo (benefício de convexidade) mas Theta negativo (decaimento temporal).
Vender Gamma (vender opções) gera Theta positivo mas Gamma negativo: ganhos com decaimento, mas vulnerabilidade a movimentos grandes.
Esse é o trade-off central de qualquer estratégia de opções.

**Slide 8**
Gráfico: Gamma ao longo do preço do ativo. Pico no strike, queda nas asas.

**Slide 9**
"Gamma scalping:"
Estratégia de comprar Gamma (comprar opções) e fazer delta hedge frequente. Se a volatilidade realizada superar a volatilidade implícita paga na compra, a estratégia é lucrativa.
Lucro ≈ ½ × Γ × S² × (σ_realizada² - σ_implícita²) × dt

**Slide 10 (Encerramento)**
Fórmula do Gamma. Relação com Delta e Theta. Logotipo. Disclaimer.

### Legenda

Gamma é a curvatura da curva de preço das opções. Quem faz delta hedge sem monitorar Gamma está ignorando o que vai errar no rebalanceamento seguinte.

O post detalha fórmula, intuição, o trade-off Gamma/Theta e a lógica do gamma scalping.

Conteúdo educacional.

### CTA

"Calcule o Gamma do maior risco de opções na sua carteira. Quantas vezes por dia você precisa rebalancear para manter delta-neutro?"

### Observação Visual

Gráfico de Gamma vs. preço do ativo com pico no ATM. Curva de preço da opção com tangente (Delta) e curvatura (Gamma) identificadas.

---

## Post 9: Modelo de 3 Demonstrações Integradas

**Título:** "3-statement model: como DRE, Balanço e DFC se conectam e onde os modelos costumam quebrar"

### Estrutura Slide a Slide

**Slide 1 (Capa)**
"DRE alimenta o Balanço. Balanço fecha com o Caixa. Caixa confirma a DRE. Quando um dos três não fecha, o modelo tem erro."

**Slide 2**
"A lógica da integração:"
DRE → Lucro líquido → Patrimônio Líquido (via Dividendos e JSCP retidos).
Balanço → variações de working capital e CAPEX → DFC.
DFC → saldo final de caixa → Balanço (linha de caixa).

**Slide 3**
"Links críticos entre DRE e Balanço:"
Lucro líquido → LAIR → PL (após dividendos).
Depreciação → reduz ativo imobilizado (net).
IR corrente → cria passivo de IR a pagar.
IR diferido → ativo/passivo de IR diferido.

**Slide 4**
"Links críticos entre Balanço e DFC:"
Variação de contas a receber: aumento → saída de caixa operacional.
Variação de estoques: aumento → saída de caixa.
Variação de fornecedores: aumento → entrada de caixa.
CAPEX: compra de ativo → saída de caixa de investimento.

**Slide 5**
"O modelo fecha quando:"
Caixa final da DFC = Caixa no Balanço do período seguinte.
Variação do PL = Lucro líquido - Dividendos.
Total do ativo = Total de passivo + PL.

**Slide 6**
"Onde os modelos costumam quebrar:"
1. Tratamento incorreto de IR diferido (esquece de criar o ativo/passivo).
2. Imposto sobre lucros não segue a alíquota efetiva real.
3. Juros de dívida nova não entram na DRE no período correto.
4. CAPEX não atualiza a depreciação no período seguinte.
5. Recompra de ações não reduz o PL corretamente.

**Slide 7**
"Checklist de consistência do modelo:"
- O caixa da DFC bate com o Balanço? [Sim/Não]
- O PL cresce pelo lucro e cai pelos dividendos? [Sim/Não]
- A depreciação da DFC bate com a variação do imobilizado? [Sim/Não]
- O IR da DRE bate com IR corrente + diferido? [Sim/Não]

**Slide 8**
"Circularidade do modelo:"
Dívida gera juros → juros reduzem LAIR → menos lucro → menos PL → estrutura de capital muda → novo WACC → nova linha de crédito → nova dívida. Em Excel, isso cria circularidade que precisa de iteração habilitada.

**Slide 9**
"Gestão da circularidade:"
Habilite cálculo iterativo no Excel. Ou: use o saldo de dívida do início do período (não do final) para calcular os juros. Isso é uma simplificação, mas elimina a circularidade sem perda material de precisão.

**Slide 10 (Encerramento)**
Diagrama dos 3 links principais. Logotipo. Disclaimer.

### Legenda

Um modelo de 3 demonstrações integradas não quebra porque a fórmula está errada. Quebra porque um link entre as demonstrações está errado.

O post detalha os links críticos, onde os modelos costumam falhar e o checklist de consistência para qualquer modelo financeiro.

Conteúdo educacional.

### CTA

"Rode o checklist de consistência no seu próximo modelo. Quantos dos 4 itens passam na primeira tentativa?"

### Observação Visual

Diagrama de fluxo circular mostrando DRE, Balanço e DFC conectados por setas com os links críticos identificados. Checklist visual com caixas de verificação.

---

## Post 10: Estrutura de Capital e Modigliani-Miller

**Título:** "Modigliani-Miller: o que as premissas impossíveis nos ensinam sobre o mundo real"

### Estrutura Slide a Slide

**Slide 1 (Capa)**
"MM diz que a estrutura de capital não afeta o valor da empresa. Ninguém acredita nisso. Mas sem entender por que MM está 'errado', você não entende por que a estrutura de capital importa."

**Slide 2**
"MM Proposição I (sem impostos):"
V_L = V_U
Empresa alavancada e não alavancada com os mesmos ativos têm o mesmo valor. A estrutura de capital não afeta o valor.
Premissa central: mercados perfeitos, sem impostos, sem custos de falência, sem assimetria de informação.

**Slide 3**
"A prova por arbitragem:"
Se V_L ≠ V_U, os investidores podem replicar a alavancagem por conta própria (homemade leverage) para explorar a diferença. A arbitragem fecha o gap até V_L = V_U.

**Slide 4**
"MM Proposição II (sem impostos):"
Re_L = Re_U + (Re_U - Rd) × (D/E)
O custo de equity aumenta com a alavancagem proporcionalmente ao risco financeiro adicionado.
Resultado: o WACC permanece constante à medida que a alavancagem aumenta. O benefício do custo mais baixo da dívida é exatamente compensado pelo aumento no custo do equity.

**Slide 5**
"MM com impostos (Proposição I):"
V_L = V_U + T × D
O valor da empresa aumenta com a alavancagem porque os juros são dedutíveis e o governo subsidia a dívida.
T × D = tax shield (valor presente do benefício fiscal da dívida).

**Slide 6**
"MM com impostos (Proposição II):"
Re_L = Re_U + (Re_U - Rd) × (1-T) × (D/E)
O WACC decresce com o aumento da alavancagem (devido ao tax shield).

**Slide 7**
"Por que isso implica estrutura 100% em dívida, o que é absurdo?"
Porque MM ainda ignora custos de falência. Em versões posteriores (trade-off theory): valor da empresa = V_U + T×D - PV(custos de falência).
Existe uma estrutura ótima onde o benefício marginal do tax shield = custo marginal de falência.

**Slide 8**
"Pecking order theory (alternativa ao trade-off):"
Empresas preferem financiamento interno antes de dívida, e dívida antes de equity, por causa da assimetria de informação.
A emissão de equity sinaliza que o gestor acha o papel sobrevalorizado: o mercado penaliza.

**Slide 9**
"O que MM realmente nos ensina:"
Para entender por que a estrutura de capital importa, você precisa identificar qual premissa de MM está sendo violada: impostos, custos de falência, assimetria de informação, agência. Cada violação cria uma teoria diferente de estrutura ótima de capital.

**Slide 10 (Encerramento)**
Fórmula com e sem impostos. Resumo das teorias alternativas. Logotipo. Disclaimer.

### Legenda

Modigliani-Miller está "errado" pelo design. Ele foi construído com premissas impossíveis para mostrar o que importa quando essas premissas são violadas.

O post detalha as proposições I e II (com e sem impostos), a trade-off theory e a pecking order.

Conteúdo educacional.

### CTA

"Qual teoria de estrutura de capital você acha que explica melhor as decisões de financiamento da empresa do seu setor? Por quê?"

### Observação Visual

Gráfico WACC vs. alavancagem para os dois mundos (com e sem impostos). Diagrama da trade-off theory mostrando o ótimo entre tax shield e custos de falência.

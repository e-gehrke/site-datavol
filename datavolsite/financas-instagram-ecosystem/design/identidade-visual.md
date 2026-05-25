# Identidade Visual

## Princípio Central

O design serve o conteúdo. Cada decisão visual deve aumentar a clareza, não a impressão estética. O que parece bonito mas confunde não é bom design para este ecossistema.

Os dois perfis compartilham o mesmo sistema visual, mas com camadas de personalidade distintas. O leitor que segue os dois deve sentir que são da mesma casa, mas com personalidades diferentes.

---

## a. Paleta de Cores

### Fundamento (marca guarda-chuva)

| Token | Valor | Uso |
|---|---|---|
| Fundamento Navy | #0F1B2D | Fundo primário em ambos os perfis |
| Fundamento White | #F4F4F0 | Texto principal sobre fundo escuro |
| Fundamento Slate | #8B95A3 | Texto secundário, subtítulos, números auxiliares |
| Fundamento Accent | #C8A96E | Destaques, números importantes, títulos de seção |
| Fundamento Neutral | #1E2D40 | Fundo secundário, slides de suporte |

### Conta Certa (camada adicional)

| Token | Valor | Uso |
|---|---|---|
| Conta Certa Teal | #3D8B8B | Acento do perfil leigo: séries, destaques, gráficos positivos |
| Conta Certa Warm | #E8D5B7 | Fundos de slides mais leves (máx. 20% do carrossel) |
| Conta Certa Alert | #C85A3A | Gráficos de dívida, variações negativas, alertas |

### Nota Técnica (camada adicional)

| Token | Valor | Uso |
|---|---|---|
| Nota Técnica Blue | #2C5282 | Acento do perfil avançado: fórmulas, cheat sheets |
| Nota Técnica Cold | #A0AEC0 | Tabelas técnicas, linhas de grid |
| Nota Técnica Electric | #63B3ED | Números em destaque, equações principais |

### Regras de uso de cor

1. Nunca usar verde-limão ou amarelo como cor principal: conotação de "dicas fáceis de riqueza".
2. Nunca usar vermelho como cor principal: conotação de perigo, não de educação.
3. A paleta deve funcionar em modo escuro (fundo navy) como padrão.
4. Versão clara (fundo branco) disponível para stories e conteúdo de checklist.

---

## b. Tipografia

### Fonte principal: Inter

Fonte sem serifa, open source, legível em qualquer tamanho no mobile. Disponível no Google Fonts.

| Peso | Uso |
|---|---|
| Inter Bold (700) | Títulos de slide, números em destaque |
| Inter SemiBold (600) | Subtítulos, rótulos de tabela |
| Inter Regular (400) | Corpo de texto |
| Inter Light (300) | Rodapé, disclaimers, texto de suporte |

### Fonte monoespaciada: JetBrains Mono

Para fórmulas matemáticas, código, cheat sheets e qualquer conteúdo que requeira alinhamento preciso.

| Peso | Uso |
|---|---|
| JetBrains Mono Regular | Fórmulas matemáticas |
| JetBrains Mono Bold | Variáveis destacadas nas fórmulas |

### Hierarquia tipográfica (referência para Canva/Figma)

| Elemento | Fonte | Tamanho (equivalente A4) | Peso |
|---|---|---|---|
| Título do carrossel | Inter | 48-56pt | Bold |
| Subtítulo | Inter | 28-32pt | SemiBold |
| Corpo do texto | Inter | 18-22pt | Regular |
| Nota de rodapé | Inter | 12-14pt | Light |
| Fórmula | JetBrains Mono | 20-24pt | Regular |
| Variável destacada | JetBrains Mono | 20-24pt | Bold |

---

## c. Estilo dos Carrosséis

### Estrutura padrão de carrossel (ambos os perfis)

**Slide 1 (Capa):** Título em 2-3 linhas máximo. Fundo Fundamento Navy. Logotipo do perfil no canto inferior. Sem imagens decorativas, apenas tipografia.

**Slides de desenvolvimento (2-N-1):** Fundo Fundamento Navy ou Fundamento Neutral. Título do slide (pequeno, no topo) + conteúdo principal + rodapé com número de slide e logotipo.

**Slide final:** CTA discreto. Número de slide. Disclaimer quando aplicável. Logotipo.

### Regras de layout

- Margem mínima de 64px em todos os lados
- Máximo de 5 elementos visuais por slide
- Texto de corpo nunca abaixo de 18pt equivalente (legibilidade mobile)
- Tabelas: máximo 5 colunas por slide; dividir se necessário
- Gráficos: sempre rotulados diretamente (sem legenda separada)

### Diferença de estilo entre perfis

| Elemento | Conta Certa | Nota Técnica |
|---|---|---|
| Cor de acento | Teal (#3D8B8B) | Blue (#2C5282) |
| Densidade de texto | Menor (mais espaçamento) | Maior (mais informação por slide) |
| Uso de analogias visuais | Frequente | Raro |
| Uso de fórmulas | Simplificadas, com tradução | Completas, com derivação |
| Estilo de gráficos | Minimalista, 1-2 variáveis | Técnico, múltiplas variáveis |
| Tom do título | Coloquial, pergunta ou afirmação | Técnico, descritivo |

---

## d. Estilo dos Cheat Sheets

Cheat sheets são o formato mais proprietário do Nota Técnica. Devem parecer uma folha de referência profissional, não um infográfico de Instagram.

**Layout de cheat sheet:**

```
[Título do tema]              [Logotipo Nota Técnica]
┌─────────────────────────────────────────────────────┐
│ SEÇÃO 1: [nome]                                     │
│                                                      │
│ Fórmula 1: [equação]                                │
│ Interpretação: [uma linha]                          │
│                                                      │
│ Fórmula 2: [equação]                                │
│ Interpretação: [uma linha]                          │
└─────────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────────┐
│ SEÇÃO 2: [nome]                                     │
│ ...                                                  │
└─────────────────────────────────────────────────────┘
[Disclaimer educacional]
```

**Regras de cheat sheet:**

- Fundo Fundamento Navy obrigatório
- Fórmulas em JetBrains Mono
- Rótulos de seção em Inter SemiBold + Nota Técnica Blue
- Máximo 3 seções por cheat sheet (senão dividir em dois)
- Grid lines visíveis mas discretas (Fundamento Neutral)
- Sem decoração: nenhum ícone genérico, nenhuma imagem de stock

---

## e. Estilo de Gráficos e Fórmulas

### Gráficos

**Tipo de gráfico por contexto:**

| Objetivo | Tipo preferido |
|---|---|
| Comparar dois cenários ao longo do tempo | Linha com duas séries |
| Mostrar composição | Gráfico de área empilhada (não pizza) |
| Distribuição de retornos | Histograma ou KDE |
| Relação entre variáveis | Scatter plot |
| Crescimento ao longo do tempo | Linha com área sombreada |
| Payoff de opção | Linha com eixo zero marcado |

**Regras de visualização:**

- Sempre rotular os eixos com unidade (%, R$, anos)
- Sempre incluir a fonte dos dados quando dados reais
- Nunca usar 3D em gráficos
- Nunca usar pizza chart para comparação de mais de 3 itens
- Sempre incluir valor zero no eixo Y quando relevante para o contexto

### Fórmulas

**Regras para apresentação de fórmulas:**

1. A fórmula vem primeiro. A tradução vem depois.
2. Cada variável deve ser identificada individualmente (glossário inline).
3. Nunca apresentar uma fórmula sem pelo menos um exemplo numérico.
4. Em posts para o Conta Certa: usar notação simplificada e escrever por extenso.
5. Em posts para o Nota Técnica: usar notação padrão da literatura financeira.

**Exemplo de apresentação para Conta Certa:**
```
Montante = Principal × (1 + taxa)^tempo

M = Principal = quanto você aplicou
taxa = a taxa de juros por período
tempo = número de períodos

Exemplo: R$ 1.000 a 12% ao ano por 2 anos
M = 1.000 × (1 + 0,12)² = R$ 1.254,40
```

**Exemplo de apresentação para Nota Técnica:**
```
DMod = DM / (1 + y)

DM = Duration de Macaulay
y = yield por período (convencional)

ΔP/P ≈ -DMod × Δy + ½ × C × (Δy)²
```

---

## f. Uso de Ícones

**Regra geral:** ícones devem ser funcionais, não decorativos.

**O que usar:**
- Ícones de seta para direção e causalidade
- Ícones de check para checklists
- Ícones de warning para alertas e limitações
- Ícones de calculadora/fórmula para conteúdo matemático

**O que não usar:**
- Ícones de cifrão (R$, $) como decoração de slides sobre dinheiro
- Ícones de piggy bank, cofre ou moedas
- Ícones de casa ou carro para ilustrar financiamento
- Emojis em qualquer tipo de post do feed

**Biblioteca de ícones recomendada:** Phosphor Icons (open source, coerente, disponível em SVG).

---

## g. Uso de Fundos

**Regra padrão:** fundo Fundamento Navy (#0F1B2D) é o padrão do ecossistema.

**Exceções permitidas:**

| Situação | Fundo alternativo |
|---|---|
| Checklist | Fundamento Neutral (#1E2D40) |
| Slide de capa com variação | Gradiente sutil de Navy para Neutral |
| Cheat sheet | Navy com grid lines discretas |
| Story | Branco com texto escuro (versão clara) |

**O que nunca usar:**
- Fundos com textura de papel, madeira ou qualquer material
- Fundos com imagem de mercado financeiro, bolsa de valores, Wall Street
- Gradientes muito saturados
- Fundos brancos no carrossel padrão do feed

---

## h. Como Parecer Educativo, Premium e Simples ao Mesmo Tempo

**A tensão do design educativo-premium:**

Premium sugere minimalismo e espaçamento. Educativo sugere densidade e informação. A solução é hierarquia tipográfica muito bem definida.

**Princípios que resolvem essa tensão:**

1. **Espaçamento generoso, não vazio:** margens largas criam respiro sem perder densidade de conteúdo.
2. **Uma ideia por slide:** não encher de texto. Se precisar de mais de 5 linhas de corpo, dividir em dois slides.
3. **Contraste de peso tipográfico:** título em Bold grande, corpo em Regular menor. O contraste cria hierarquia sem precisar de decoração.
4. **Cor como significado, não decoração:** o Teal/Blue aparece apenas onde quer destacar o número ou conceito principal. Não como "deixar bonito".
5. **Gráficos diretos:** um gráfico bem feito e simples sempre supera um gráfico complexo e estilizado.

---

## i. Diferenciação Visual Entre Perfis Dentro do Ecossistema

| Elemento visual | Conta Certa | Nota Técnica |
|---|---|---|
| Cor de acento principal | Teal (#3D8B8B) | Blue (#2C5282) |
| Logotipo | Conta Certa / Fundamento | Nota Técnica / Fundamento |
| Densidade de informação | Média | Alta |
| Uso de analogias visuais | Sim | Não |
| Estilo de tabelas | Simples, 2-3 colunas | Técnicas, até 5 colunas |
| Fórmulas | Simplificadas com tradução | Formais com derivação |
| Exemplo de título visual | Coloquial, conversacional | Técnico, preciso |

**Como manter a unidade mesmo com perfis distintos:**

- Mesmo fundo (Navy) em ambos
- Mesma tipografia base (Inter)
- Mesma estrutura de slides (margem, hierarquia)
- Logotipo "por @fundamento.fin" no rodapé de ambos
- Mesma linguagem de grid e espaçamento

O leitor que vê um slide de cada perfil deve sentir que são da mesma casa sem confundir os dois.

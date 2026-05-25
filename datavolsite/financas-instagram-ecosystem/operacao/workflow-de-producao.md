# Workflow de Produção

## Visão Geral

O processo de produção de cada post tem seis etapas. Cada etapa tem um responsável (pode ser a mesma pessoa no início) e um critério de saída claro.

---

## Etapas do Processo

### Etapa 1: Ideação e Seleção de Tema

**O que acontece:** Definir qual tema será publicado na próxima semana com base no calendário editorial e no backlog.

**Inputs:**
- Calendário 30 dias (`calendario-30-dias-leigo.md` ou `avancado.md`)
- Backlog de ideias (`backlog.md`)
- Comentários e perguntas de seguidores
- Novidades macroeconômicas ou regulatórias relevantes

**Critério de saída:**
- Tema definido
- Série identificada (se for série recorrente)
- Formato escolhido (carrossel, cheat sheet, Reels)
- Número de slides estimado

**Frequência:** Semanal (ideal: planejamento de toda a semana na segunda-feira)

---

### Etapa 2: Pesquisa e Validação Técnica

**O que acontece:** Verificar a acurácia técnica do conteúdo que será produzido.

**Para o Conta Certa:**
- Verificar dados utilizados (taxas, alíquotas, valores de referência)
- Confirmar que a legislação mencionada está vigente
- Verificar se a simplificação não gera erro técnico

**Para o Nota Técnica:**
- Verificar fórmulas com fonte primária (livro texto, norma, paper)
- Confirmar notação padrão da literatura
- Citar a fonte quando um resultado específico é atribuído a um autor

**Critério de saída:**
- Dados verificados com fonte identificada
- Fórmulas confirmadas com referência
- Simplificações aprovadas (não geram erro técnico)

**Checklist de verificação técnica:**
- [ ] Todos os valores numéricos têm fonte ou são hipotéticos (identificados como tal)?
- [ ] As fórmulas estão na notação padrão da literatura relevante?
- [ ] Legislação citada está vigente? (IRPF, CVM, Bacen, CPC)
- [ ] Nenhuma recomendação individualizada no texto?
- [ ] Nenhuma promessa de retorno?

---

### Etapa 3: Roteiro e Estrutura

**O que acontece:** Escrever o roteiro slide a slide antes de abrir qualquer ferramenta de design.

**Formato de roteiro:**

```
POST: [título]
SÉRIE: [nome da série, se aplicável]
PERFIL: [Conta Certa / Nota Técnica]
FORMATO: [carrossel / cheat sheet / Reels]
NÚMERO DE SLIDES: [estimado]

SLIDE 1: [capa]
Texto: [exatamente o que vai no slide]
Visual: [instrução para o designer]

SLIDE 2: [título do slide]
Texto: [...]
Visual: [...]

...

SLIDE N: [encerramento]
CTA: [texto exato]
Disclaimer: [texto padrão ou variação]
```

**Critério de saída:**
- Roteiro completo para todos os slides
- Nenhum slide com mais de 5 elementos de texto
- CTA identificado
- Disclaimer escrito

**Tempo estimado:** 30-90 minutos por post dependendo do tema

---

### Etapa 4: Design e Produção Visual

**O que acontece:** Criar o carrossel, cheat sheet ou vídeo de Reels usando o roteiro aprovado.

**Ferramenta recomendada:** Canva Pro ou Figma (com template do ecossistema configurado).

**Fluxo no Canva:**
1. Abrir template do perfil correspondente
2. Duplicar e renomear (nome do post + data de publicação)
3. Seguir o roteiro slide a slide
4. Não improvisar elementos que não estejam no roteiro
5. Verificar: tipografia, tamanho de fonte, margem, legibilidade em mobile

**Checklist de design:**
- [ ] Fundo correto (Navy para ambos)?
- [ ] Cor de acento correta (Teal para Conta Certa, Blue para Nota Técnica)?
- [ ] Logotipo no rodapé de todos os slides?
- [ ] Disclaimer no slide final?
- [ ] Fonte mínima 18pt equivalente?
- [ ] Legível em tela de celular 6 polegadas?
- [ ] Nenhum ícone de dinheiro ou piggynank?
- [ ] Nenhum emoji?

**Exportação:**
- Slides: PNG ou JPG em 1080×1080px (feed) ou 1080×1920px (stories)
- Reels: MP4 em 1080×1920px
- Cheat sheet: também exportar em PDF para uso como ferramenta

---

### Etapa 5: Revisão e Aprovação

**O que acontece:** Revisar o post completo antes de publicar.

**Revisão em dois níveis:**

**Nível 1: Revisão técnica**
- Todos os números estão corretos?
- Fórmulas estão corretas?
- O cálculo do exemplo numérico está certo?
- Fontes identificadas quando necessário?

**Nível 2: Revisão editorial**
- O título é forte o suficiente?
- O CTA está discreto (não vendedor)?
- O tom está correto para o perfil?
- O conteúdo está dentro dos limites de compliance?

**Critério de saída:**
- Zero erros numéricos ou de fórmula
- Tom adequado ao perfil
- Disclaimer presente quando necessário
- Aprovação registrada

---

### Etapa 6: Publicação e Monitoramento

**O que acontece:** Publicar o post no horário definido e monitorar o engajamento inicial.

**Dados de publicação:**

| Campo | Informação |
|---|---|
| Data | [data] |
| Horário | Terça-Quinta: 12h ou 18h (testar e ajustar) |
| Legenda | [texto da legenda com CTA e hashtags] |
| Primeiro comentário | Pin do CTA ou link para ferramenta |
| Hashtags | Ver lista em `backlog.md` |

**Monitoramento nas primeiras 24 horas:**
- Verificar se o post está aparecendo corretamente
- Responder comentários técnicos ou de dúvida
- Não responder comentários que peçam recomendação personalizada (redirecionar)

**Métricas para registrar (por post):**
- Alcance
- Impressões
- Salvamentos
- Compartilhamentos
- Comentários

---

## Cadência Operacional Semanal

| Dia | Atividade |
|---|---|
| Segunda | Planejamento da semana. Seleção de temas. Revisão do backlog. |
| Terça | Pesquisa técnica e roteiro do post de quarta |
| Quarta | Design e produção. Publicação (Conta Certa ou Nota Técnica). |
| Quinta | Pesquisa técnica e roteiro do post de sexta |
| Sexta | Design e produção. Publicação (série recorrente preferencial). |
| Sábado | Publicação de conteúdo de série ou cheat sheet |
| Domingo | Avaliação de métricas da semana. Atualização do backlog. |

---

## Gestão do Backlog

O backlog de ideias deve ser revisado semanalmente. Ideias entram no backlog de três formas:

1. **Planejamento interno:** temas mapeados nos pilares que ainda não foram cobertos
2. **Perguntas de seguidores:** dúvidas recorrentes nos comentários ou DMs
3. **Mudanças externas:** nova decisão do Copom, mudança de regulação, novidade tributária

Todo item do backlog deve ter: tema, perfil (Conta Certa ou Nota Técnica), série (se aplicável), urgência (normal / sazonal / urgente) e status (ideia / roteiro / em produção / publicado).

---

## Critérios de Não-Publicação

Um post não deve ser publicado se:

1. O dado ou taxa apresentado não foi verificado na fonte
2. O conteúdo pode ser interpretado como recomendação de investimento
3. O nome de um produto específico aparece de forma que pareça recomendação
4. O disclaimer está ausente em post sobre produto financeiro
5. Há promessa implícita ou explícita de retorno
6. O dado é de legislação que pode ter sido alterada e não foi verificado

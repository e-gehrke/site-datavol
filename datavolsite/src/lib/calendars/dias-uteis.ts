// Helpers de calendário — convenção B3/ANBIMA
//
// Convenções implementadas:
//   - DU entre datas: exclusivo no início, inclusivo no fim (padrão B3 para acúmulo de juros)
//   - DC entre datas: dias corridos puros (calendário gregoriano)
//   - Fim de semana: sábado (6) e domingo (0) — nunca aparecem na lista de feriados
//   - Datas tratadas em UTC para evitar drift de fuso horário/horário de verão

import { FERIADOS_ANBIMA } from './feriados-anbima'

const FERIADO_SET: ReadonlySet<string> = new Set(FERIADOS_ANBIMA)

export type DateInput = Date | string

function pad(n: number): string {
  return n < 10 ? '0' + n : String(n)
}

export function toIsoDate(d: Date): string {
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`
}

export function parseIsoDate(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number)
  if (!y || !m || !d) throw new Error(`Data ISO inválida: ${iso}`)
  return new Date(Date.UTC(y, m - 1, d))
}

function toDate(input: DateInput): Date {
  return typeof input === 'string' ? parseIsoDate(input) : new Date(Date.UTC(
    input.getFullYear(), input.getMonth(), input.getDate()
  ))
}

function toIso(input: DateInput): string {
  return typeof input === 'string' ? input : toIsoDate(input)
}

export function isFeriado(date: DateInput): boolean {
  return FERIADO_SET.has(toIso(date))
}

export function isFimDeSemana(date: DateInput): boolean {
  const wd = toDate(date).getUTCDay()
  return wd === 0 || wd === 6
}

export function isDiaUtil(date: DateInput): boolean {
  return !isFimDeSemana(date) && !isFeriado(date)
}

/**
 * DU entre duas datas — convenção B3:
 *   - início exclusivo, fim inclusivo
 *   - se fim ≤ início, retorna 0
 */
export function diasUteisEntre(inicio: DateInput, fim: DateInput): number {
  const start = toDate(inicio)
  const end = toDate(fim)
  if (end <= start) return 0
  let count = 0
  const cur = new Date(start)
  cur.setUTCDate(cur.getUTCDate() + 1)
  while (cur <= end) {
    if (isDiaUtil(cur)) count++
    cur.setUTCDate(cur.getUTCDate() + 1)
  }
  return count
}

/**
 * DC entre duas datas — dias corridos puros.
 */
export function diasCorridosEntre(inicio: DateInput, fim: DateInput): number {
  const start = toDate(inicio)
  const end = toDate(fim)
  return Math.round((end.getTime() - start.getTime()) / 86400000)
}

/**
 * Soma (ou subtrai, se n < 0) dias úteis a uma data, pulando feriados e fins de semana.
 */
export function addDiasUteis(date: DateInput, n: number): Date {
  const cur = toDate(date)
  const step = n >= 0 ? 1 : -1
  let remaining = Math.abs(n)
  while (remaining > 0) {
    cur.setUTCDate(cur.getUTCDate() + step)
    if (isDiaUtil(cur)) remaining--
  }
  return cur
}

/**
 * Retorna a próxima data útil ≥ date (a própria data, se já for útil).
 */
export function proximoDiaUtil(date: DateInput): Date {
  const cur = toDate(date)
  while (!isDiaUtil(cur)) cur.setUTCDate(cur.getUTCDate() + 1)
  return cur
}

/**
 * Retorna a data útil anterior ≤ date (a própria data, se já for útil).
 */
export function diaUtilAnterior(date: DateInput): Date {
  const cur = toDate(date)
  while (!isDiaUtil(cur)) cur.setUTCDate(cur.getUTCDate() - 1)
  return cur
}

/**
 * Último dia útil do mês de referência (útil para cálculo do dólar casado em virada de mês).
 */
export function ultimoDiaUtilDoMes(date: DateInput): Date {
  const d = toDate(date)
  const ultimo = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 0))
  return diaUtilAnterior(ultimo)
}

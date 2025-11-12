
export class FormatadorData {
/**
   * @param: string ISO "YYYY-MM-DD"
   * @return  string DD MM, YYYY
*/

  static formatarDataLocal(isoSemHora: string): string {
    if (!isoSemHora) {
      return 'Sem data'
    }

    const partes = isoSemHora.split('-')
    if (partes.length !== 3) {
      return 'Sem data'
    }

    const [anoStr, mesStr, diaStr] = partes
    const ano = Number(anoStr)
    const mes = Number(mesStr)
    const dia = Number(diaStr)

    if (!ano || !mes || !dia) {
      return 'Sem data'
    }

    const data = new Date(ano, mes - 1, dia)

    const diaFormatado = String(data.getDate()).padStart(2, '0')
    const mesCurto = data
      .toLocaleString('pt-BR', { month: 'short' })
      .replace('.', '')
      .toUpperCase()
    const anoFormatado = data.getFullYear()

    return `${diaFormatado} ${mesCurto}, ${anoFormatado}`
  }

  static hojeISO(): string {
    return new Date().toISOString().slice(0, 10)
  }
}

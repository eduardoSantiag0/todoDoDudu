import { useRef } from 'react'
import { BsFillCalendarWeekFill } from 'react-icons/bs'

interface PropriedadesDropdownDataConclusao {
  /** Data em ISO "YYYY-MM-DD" ou string vazia */
  valorISO: string;
  /** Callback com a nova data em ISO vinda do input */
  aoAlterarData: (novaDataISO: string) => void;
}

function formatarDataLocal(isoSemHora: string): string {
  if (!isoSemHora) {return 'Sem data'}

  // Divide a string "2025-12-01" em partes
  const [ano, mes, dia] = isoSemHora.split('-').map(Number)

  // Cria um Date no fuso LOCAL, sem converter UTC → Brasil
  const data = new Date(ano, mes - 1, dia)

  const diaStr = String(data.getDate()).padStart(2, '0')
  const mesCurto = data
    .toLocaleString('pt-BR', { month: 'short' })
    .replace('.', '')
    .toUpperCase()
  const anoStr = data.getFullYear()

  return `${diaStr} ${mesCurto}, ${anoStr}`
}

export function DropdownDataConclusao({
  valorISO,
  aoAlterarData,
}: PropriedadesDropdownDataConclusao) {
  const inputRef = useRef<HTMLInputElement>(null)

  /** Abre o seletor de data do navegador ao clicar no container */
  function abrirDatePicker() {
    if (!inputRef.current) {return}
    // Método moderno (Chrome/Edge)
    if (typeof (inputRef.current as any).showPicker === 'function') {
      (inputRef.current as any).showPicker()
    } else {
      // fallback universal
      inputRef.current.click()
    }
  }

  const label = valorISO ? formatarDataLocal(valorISO) : 'Sem data'

  return (
    <button
      type="button"
      onClick={abrirDatePicker}
      className="
        relative
        flex flex-row items-center justify-center
        h-7 w-[226px]
        px-2 py-1
        gap-2
        border border-[#4E4E4E]
        rounded-sm
        cursor-pointer
        bg-transparent
        hover:bg-background-secondary/20
        transition
      "
    >
      <BsFillCalendarWeekFill className="w-4 h-4 text-white" />
      <span
        className="
          text-[13.33px]
          leading-5
          font-semibold
          font-poppins
          text-white
        "
      >
        {label}
      </span>

      {/* Input de data invisível, mas funcional */}
      <input
        ref={inputRef}
        type="date"
        value={valorISO}
        onChange={(evento) => aoAlterarData(evento.target.value)}
        className="absolute inset-0 opacity-0 cursor-pointer"
      />
    </button>
  )
}

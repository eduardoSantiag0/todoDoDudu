import { useRef } from 'react'
import { BsFillCalendarWeekFill } from 'react-icons/bs'
import { FormatadorData } from '../../../../utils/FormatadorData'

interface DropdownDataConclusaoProps {
  valorISO: string;
  aoAlterarData: (novaDataISO: string) => void;
}

export function DropdownDataConclusao({
  valorISO,
  aoAlterarData,
}: DropdownDataConclusaoProps) {
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

  const label = valorISO ? FormatadorData.formatarDataLocal(valorISO) : 'Sem data'

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
        border border-button-hover
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
        "
      >
        {label}
      </span>

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
